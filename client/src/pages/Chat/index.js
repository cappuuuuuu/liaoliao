import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import debounce from 'lodash/debounce'
import { isIOS } from 'react-device-detect'
import Backdrop from '@material-ui/core/Backdrop'
import { animateScroll as scroll } from 'react-scroll'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import { disableBodyScroll } from 'body-scroll-lock'
import { activeBubbleBackground } from '@/redux/slices/bubbleBackgroundSlice'
import { getAvatarDataThunk, avatarData } from '@/redux/slices/avatarDataSlice'
import { StickerProvider } from '@/contexts/StickerProvider'

// components
import Messages from '@/components/Messages'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Sticker from '@/components/Sticker'
import Bubbles from '@/components/Bubbles'
import TimeLoading from '@/components/Loading/TimeLoading'

// CSS
import './style.scss'

// context
import { useSocket } from '@/contexts/SocketProvider.js'

// Time helper
import { getTime } from '@/helper'

const Chat = ({ location }) => {
  const socket = useSocket()
  const dispatch = useDispatch()
  const avatarList = useSelector(avatarData)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userList, setUserList] = useState([])
  const [messageInputValue, setMessageInputValue] = useState('')
  const [messageList, setMessageList] = useState([])
  const [isTyping, setTyping] = useState(false)
  const [typingStatus, setTypingStatus] = useState([])
  const [loadingHistoryMessage, setLoadingHistoryMessage] = useState(true)
  const [pullLoading, setpullLoading] = useState(false)
  const [totalMessageCount, setTotalMessageCount] = useState(0)
  const bubbleBackground = useSelector(activeBubbleBackground)

  // ref
  const inputText = useRef(null)
  const messageBox = useRef(null)
  const messageContent = useRef(null)
  const messagesContainer = useRef(null)

  useEffect(() => {
    if (!avatarList.length) dispatch(getAvatarDataThunk())
  }, [])

  useEffect(() => {
    if (socket === null) return

    const { name, avatar } = queryString.parse(location.search)
    setUserName(name)
    setUserAvatar(avatar)

    const getRecordRequestBody = {
      page: 1,
      loadCount: 10
    }

    // 一開始先載入第一頁訊息
    socket.emit('getRecord', getRecordRequestBody)

    // 修正畫面滾動問題
    if (isIOS) disableBodyScroll(document.getElementById('messages'))

    socket.on('userLeft', (leftUser) => {
      setUserList(users => users.filter((user) => user.name !== leftUser.name))
      setMessageList(messageList => [...messageList, { isLeftUser: true, name: leftUser.name, time: getTime() }])
      scroll.scrollToBottom({
        containerId: 'messages',
        duration: 1000
      })
    })

    socket.on('join', (newUsers) => {
      setUserList(newUsers)
      setMessageList(messageList => [...messageList, { isNewUser: true, name: newUsers[newUsers.length - 1].name, time: getTime() }])
      scroll.scrollToBottom({
        containerId: 'messages',
        duration: 1000,
        ignoreCancelEvents: true
      })
    })

    socket.on('chatRecord', (history) => {
      const { page, data, total } = history
      setTotalMessageCount(total)

      // 上拉加載
      if (page !== 1) {
        setTimeout(() => {
          setMessageList(messageList => [...data, ...messageList])
          setpullLoading(false)
        }, 750)
      } else {
        // 第一次載入
        const userData = queryString.parse(location.search)
        setMessageList(messageList => [...data, ...messageList])
        socket.emit('join', userData)
        scroll.scrollToBottom({
          containerId: 'messages',
          duration: 1000,
          ignoreCancelEvents: true
        })
        setTimeout(() => {
          setLoadingHistoryMessage(false)
        }, 1100)
      }
    })

    socket.on('getMessage', (data) => {
      const { name } = queryString.parse(location.search)
      setTypingStatus({
        isTyping: false
      })
      setMessageList(messageList => [...messageList, data])
      if (name === data.name) {
        scroll.scrollToBottom({
          containerId: 'messages',
          duration: 500
        })
      } else {
        scrollController()
      }
    })

    socket.on('typing', (data) => {
      const user = queryString.parse(location.search).name
      if (data.name !== user) {
        if (data.isTyping) {
          setTypingStatus({
            isTyping: true,
            name: data.name,
            avatar: data.avatar
          })
          scrollController()
        } else {
          setTypingStatus({
            isTyping: false
          })
        }
      }
    })

    return () => {
      socket.disconnect()
      socket.removeAllListeners()
    }
  }, [socket, location.search])

  // 根據是否有人正在打字，傳送某人打字狀態到 server
  useEffect(() => {
    if (socket === null) return
    socket.emit('typing', { isTyping, name: userName, avatar: userAvatar })
  }, [userName, userAvatar, socket, isTyping])

  // 若 viewport底部 距離 messagesContainer底部 400px 以下 ， scrollbar 將滑至底部
  const scrollController = () => {
    if (messagesContainer.current.scrollTop + 400 >= messagesContainer.current.scrollHeight - messagesContainer.current.offsetHeight) {
      scroll.scrollToBottom({
        containerId: 'messages',
        duration: 500
      })
    }
  }

  const sendSticker = (e) => {
    if (e.target.tagName !== 'IMG') {
      return
    }
    const data = {
      typesOf: 'sticker',
      name: userName,
      avatar: userAvatar,
      msg: e.target.src,
      time: getTime()
    }
    socket.emit('sendMessage', data)
  }

  const changeHandler = (e) => {
    setMessageInputValue(e.target.value)
    setTyping(true)
    handleTyping()
  }

  // debounce will be a new function for every render.
  // use the useCallback hook to make sure that
  // the same function is being persisted between renders.
  const handleTyping = useCallback(debounce(() => {
    setTyping(false)
  }, 1000), [])

  const sendMessage = (e) => {
    e.preventDefault()
    inputText.current.focus()
    if (!messageInputValue) return
    const time = getTime()
    socket.emit('sendMessage', { typesOf: 'text', name: userName, avatar: userAvatar, msg: messageInputValue, time })
    setMessageInputValue('')
  }

  const loadMoreMessage = () => {
    setpullLoading(true)
  }

  return (
        <div className="chat-container">
          <StickerProvider>
            <div className="chat">
                <Navbar userList={userList} userName={userName} avatar={userAvatar}/>
                <Backdrop open={loadingHistoryMessage} style={{ backgroundColor: 'rgba(0,0,0,.75)', zIndex: '1', position: 'absolute' }}>
                  <TimeLoading />
                </Backdrop>
                <Messages
                    loadMoreMessage={ loadMoreMessage }
                    loadingHistoryMessage = {loadingHistoryMessage}
                    pullLoading= {pullLoading}
                    messageList={messageList}
                    userName={userName}
                    isTyping={typingStatus}
                    ref={{ ref1: messagesContainer, ref2: messageContent }}
                    totalMessageCount={totalMessageCount}
                />
                <div className="message-box" ref={messageBox}>
                  <input type="text"
                    className="message-input"
                    ref={inputText}
                    value={messageInputValue}
                    onKeyPress={ e => e.key === 'Enter' ? sendMessage(e) : null }
                    onChange={changeHandler}
                    placeholder="輸入訊息"
                  />
                  <Sticker sendSticker={sendSticker}/>
                  <IconButton className="message-submit" onClick={ sendMessage }>
                    <SendIcon style={{ color: '#5081ad' }}/>
                  </IconButton>
                </div>
                <div id="layoutViewport"></div>
            </div>
            <div className='desktopSidebar'>
                <Sidebar userList={userList} userName={userName} avatar={userAvatar}/>
            </div>
            <div className="bubbles__container" style={ bubbleBackground ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <Bubbles count={14}/>
            </div>
          </StickerProvider>
        </div>

  )
}

export default Chat
