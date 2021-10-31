import React, { useRef, useState, useMemo, useLayoutEffect } from 'react'
import { useSocket } from '@/contexts/SocketProvider.js'
import { BackToTopButton } from '@/components/BackToTopButton'
import { MessageList } from '@/components/MessageList'

import './style.scss'

const onceLoadMessageCount = 20

const MessageContainer = ({ userName, messageList, typingStatus, isPullLoading, setIsPullLoading, totalMessageCount, messageContainer }) => {
  const socket = useSocket()
  const messageContent = useRef(null)

  // 剛進聊天室已有載入歷史訊息，下拉加載從第二頁開始
  const [currentLoadMessagePage, setCurrentLoadMessagePage] = useState(2)

  // 防止一開始進入聊天室時，scroll bar 下滑立即加載第二頁訊息
  const [scrollArriveBottom, setScrollArriveBottom] = useState(false)
  const [beforeUpdateContainerHeight, setBeforeUpdateContainerHeight] = useState(0)

  const isLoadAllMessage = useMemo(() => {
    if (!totalMessageCount) return false

    return currentLoadMessagePage - 1 >= (totalMessageCount / onceLoadMessageCount)
  }, [currentLoadMessagePage, totalMessageCount])

  const pullLoadMessage = () => {
    const getRecordRequestBody = {
      page: currentLoadMessagePage,
      loadCount: onceLoadMessageCount
    }

    socket.emit('getRecord', getRecordRequestBody)
    setBeforeUpdateContainerHeight(messageContent.current.offsetHeight)
    setIsPullLoading(true)
  }

  const isFullFillRequestMessageHistoryCondition = () => {
    const scrollArriveTop = messageContainer.current.scrollTop < 50

    // 觸發下拉加載訊息條件 1. 尚未載入全部訊息  2. scrollbar 位置接近上方  3. 沒有在請求加載訊息時
    return !isLoadAllMessage && scrollArriveTop && !isPullLoading && scrollArriveBottom
  }

  const scrollHandler = () => {
    if (isFullFillRequestMessageHistoryCondition()) pullLoadMessage()

    // 判斷是否滾到聊天室底部
    if (!scrollArriveBottom) {
      const isArriveBottom = messageContainer.current.scrollTop + messageContainer.current.offsetHeight + 1 >= messageContainer.current.scrollHeight
      if (isArriveBottom) setScrollArriveBottom(true)
    }
  }

  useLayoutEffect(() => {
    if (!isPullLoading) {
      // 計算載入新訊息的高度 (載入訊息後高度 - 載入訊息前高度 - 65) , 65px 為 Loading 元件的高度
      setCurrentLoadMessagePage(currentLoadMessagePage => currentLoadMessagePage + 1)
      const loadMessageOffsetHeight = messageContent.current.offsetHeight - beforeUpdateContainerHeight - 65
      messageContainer.current.scrollTop = loadMessageOffsetHeight + messageContainer.current.scrollTop
    }
  }, [isPullLoading])

  return (
    <div id="messages" className="messages" ref={messageContainer} onScroll={scrollHandler}>
      <BackToTopButton isLoadAllMessage={isLoadAllMessage} messageContainer={messageContainer}/>
      <MessageList
        messageList={messageList}
        userName={userName}
        typingStatus={typingStatus}
        isPullLoading={isPullLoading}
        totalMessageCount={totalMessageCount}
        messageContent={messageContent}
        isLoadAllMessage={isLoadAllMessage}
      />
    </div>
  )
}

export default MessageContainer
