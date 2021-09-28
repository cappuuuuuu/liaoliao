import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import { isIOS } from 'react-device-detect'
import Backdrop from '@material-ui/core/Backdrop'
import { animateScroll as scroll } from 'react-scroll'
import { disableBodyScroll } from 'body-scroll-lock'
import { activeBubbleBackground } from '@/redux/slices/bubbleBackgroundSlice'
import { getAvatarDataThunk, avatarData } from '@/redux/slices/avatarDataSlice'
import { StickerProvider } from '@/contexts/StickerProvider'

// components
import Messages from '@/components/Messages'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Bubbles from '@/components/Bubbles'
import TimeLoading from '@/components/Loading/TimeLoading'
import MessageInputBox from '@/components/MessageInputBox'

// CSS
import './style.scss'
import { useStyles } from './style'

// context
import { useSocket } from '@/contexts/SocketProvider.js'

// Time helper
import { getTime } from '@/helper'

const Chat = ({ history, location }) => {
  const classes = useStyles()
  const socket = useSocket()
  const dispatch = useDispatch()
  const avatarList = useSelector(avatarData)
  const bubbleBackground = useSelector(activeBubbleBackground)

  // useState
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userList, setUserList] = useState([])
  const [messageInputValue, setMessageInputValue] = useState('')
  const [messageList, setMessageList] = useState([])
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false)
  const [typingStatus, setTypingStatus] = useState({})
  const [loadingHistoryMessage, setLoadingHistoryMessage] = useState(true)
  const [pullLoading, setPullLoading] = useState(false)
  const [totalMessageCount, setTotalMessageCount] = useState(0)

  // useRef
  const messageContainer = useRef(null)
  const messageTextInput = useRef(null)

  // debounce will be a new function for every render.
  // use the useCallback hook to make sure that
  // the same function is being persisted between renders.
  const handleDebounceTyping = useCallback(debounce(() => {
    setSomeoneIsTyping(false)
  }, 1000), [])

  const scrollToMessageContainerBottom = () => {
    scroll.scrollToBottom({
      containerId: 'messages',
      duration: 1000,
      ignoreCancelEvents: true
    })
  }

  // 若 viewport底部 距離 messageContainer底部 400px 以下 ， scrollbar 將滑至底部
  const sendMessageScrollController = () => {
    if (messageContainer.current.scrollTop + 400 >= messageContainer.current.scrollHeight - messageContainer.current.offsetHeight) {
      scrollToMessageContainerBottom()
    }
  }

  useEffect(() => {
    try {
      const { name, avatar } = location.state
      setUserName(name)
      setUserAvatar(avatar)
    } catch {
      // 若無經過 Login 頁面帶入 router params, 則自動導回首頁
      history.push('/')
    }

    // 取得頭貼 imageUrl
    if (!avatarList.length) dispatch(getAvatarDataThunk())

    // 修正畫面滾動問題
    if (isIOS) disableBodyScroll(document.getElementById('messages'))
  }, [])

  useEffect(() => {
    if (socket === null) return

    const getMessageRecordRequestBody = {
      page: 1,
      loadCount: 10
    }

    // 請求歷史訊息
    socket.emit('getRecord', getMessageRecordRequestBody)

    // 發出某人加入聊天室
    socket.emit('join', { name: userName, avatar: userAvatar })

    // 某人離開聊天室
    socket.on('userLeft', leftUser => {
      setUserList(userList => userList.filter(user => user.name !== leftUser.name))

      const newMessage = {
        isLeftUser: true,
        name: leftUser.name,
        time: getTime()
      }

      setMessageList(messageList => [...messageList, newMessage])
      scrollToMessageContainerBottom()
    })

    // 接收某人加入聊天室之訊息
    socket.on('join', newUsers => {
      setUserList(newUsers)

      const newMessage = {
        isNewUser: true,
        name: newUsers[newUsers.length - 1].name,
        time: getTime()
      }

      setMessageList(messageList => [...messageList, newMessage])
      scrollToMessageContainerBottom()
    })

    // 載入歷史訊息
    socket.on('chatRecord', historyMessage => {
      const { page, data: message, total } = historyMessage
      setTotalMessageCount(total)

      if (page === 1) {
        // 第一次載入
        setMessageList(messageList => [...messageList, ...message])
        scrollToMessageContainerBottom()

        // 1100ms timeout: 等待歷史訊息載入後滑動至底部時，才解除 Loading
        setTimeout(() => setLoadingHistoryMessage(false), 1100)
      } else {
        // 上拉加載，750ms timeout 修正 safari 滑動回彈導致一次載入兩筆
        setTimeout(() => {
          setMessageList(messageList => [...message, ...messageList])
          setPullLoading(false)
        }, 750)
      }
    })

    socket.on('getMessage', message => {
      // 接收到新訊息時中斷打字中動畫
      setTypingStatus({ isTyping: false })
      setMessageList(messageList => [...messageList, message])

      // 若為本人傳送的訊息，滑動至底部
      if (userName === message.name) scrollToMessageContainerBottom()

      // 需查看對方送出的訊息，亦須滑至底部 (需判斷使用者當下瀏覽器捲軸位置)
      else sendMessageScrollController()
    })

    socket.on('typing', message => {
      const otherIsTyping = message.name !== userName
      const { isTyping, name, avatar } = message

      // 當其他人打字時才顯示
      if (!otherIsTyping) return

      setTypingStatus({
        isTyping,
        name,
        avatar
      })
      sendMessageScrollController()
    })

    return () => {
      socket.disconnect()
      socket.removeAllListeners()
    }
  }, [socket])

  // 根據是否有人正在打字，傳送某人打字狀態到 server
  useEffect(() => {
    if (socket === null) return

    socket.emit('typing', {
      isTyping: someoneIsTyping,
      name: userName,
      avatar: userAvatar
    })
  }, [someoneIsTyping])

  const sendSticker = event => {
    const { tagName, src: imgElementSrc } = event.target
    if (tagName !== 'IMG') return

    const message = {
      typesOf: 'sticker',
      msg: imgElementSrc,
      name: userName,
      avatar: userAvatar,
      time: getTime()
    }

    socket.emit('sendMessage', message)
  }

  const textInputChangeHandler = event => {
    const messageInputValue = event.target.value
    setMessageInputValue(messageInputValue)
    if (messageInputValue.trim()) setSomeoneIsTyping(true)
    handleDebounceTyping()
  }

  const sendMessageHandler = (e) => {
    e.preventDefault()
    messageTextInput.current.focus()
    if (!messageInputValue.trim()) return

    const message = {
      typesOf: 'text',
      msg: messageInputValue,
      name: userName,
      avatar: userAvatar,
      time: getTime()
    }

    socket.emit('sendMessage', message)
    setMessageInputValue('')
  }

  return (
    <div className="chat-container">
      <StickerProvider>
        <div className="chat">
          <Navbar
            userList={userList}
            userName={userName}
            avatar={userAvatar}
          />
          <Backdrop className={classes.backDrop} open={loadingHistoryMessage} >
            <TimeLoading />
          </Backdrop>
          <Messages
            messageContainer={messageContainer}
            loadMoreMessage={() => setPullLoading(true)}
            loadingHistoryMessage={loadingHistoryMessage}
            pullLoading= {pullLoading}
            messageList={messageList}
            userName={userName}
            typingStatus={typingStatus}
            totalMessageCount={totalMessageCount}
          />
          <MessageInputBox
            sendMessageHandler={sendMessageHandler}
            messageTextInput={messageTextInput}
            messageInputValue={messageInputValue}
            textInputChangeHandler={textInputChangeHandler}
            sendSticker={sendSticker}
          />
        </div>
        <div className='desktopSidebar'>
          <Sidebar
            userList={userList}
            userName={userName}
            avatar={userAvatar}
          />
        </div>
        <div className={`${bubbleBackground ? 'active' : ''} bubbles__container`}>
          <Bubbles count={14}/>
        </div>
      </StickerProvider>
    </div>
  )
}

export default Chat
