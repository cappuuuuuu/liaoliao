import React from 'react'
import { useSelector } from 'react-redux'
import { avatarData } from '@/redux/slices/avatarDataSlice'
import MessageLoading from '@/components/Loading/CircleLoading'
import { FullLoadMessage } from '@/components/Message/FullLoadMessage'
import { OppositeMessage } from '@/components/Message/OppositeMessage'
import { MySelfMessage } from '@/components/Message/MySelfMessage'
import { BroadcastMessage } from '@/components/Message/BroadcastMessage'
import { TypingMessage } from '@/components/Message/TypingMessage'

export function MessageList ({ messageList, userName, typingStatus, isPullLoading, totalMessageCount, messageContent, isLoadAllMessage }) {
  const avatarList = useSelector(avatarData)

  return (
    <div className="messages-content" ref={messageContent}>
      { isLoadAllMessage ? <FullLoadMessage isLoadAllMessage={isLoadAllMessage}/> : null }
      <MessageLoading kind={'message'} load={isPullLoading}/>
        {
          messageList.map((message, index, messageList) => {
            const isMySelfMessage = message.name === userName
            const isBroadcastMessage = message.type === 'broadcast'

            if (isMySelfMessage && message.msg) {
              return (
                <MySelfMessage
                  message={message}
                  key={message.time}
                />
              )
            }

            if (isBroadcastMessage) {
              return (
                <BroadcastMessage
                  key={message.time}
                  userName={userName}
                  message={message}
                />
              )
            }

            return (
              <OppositeMessage
                key={message.time}
                avatarList={avatarList}
                message={message}
                messageList={messageList}
                index={index}
              />
            )
          })
        }
      <TypingMessage typingStatus={typingStatus} avatarList={avatarList} />
    </div>
  )
}
