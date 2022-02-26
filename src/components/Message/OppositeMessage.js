import React from 'react'
import { momentFormatTime } from '@/helper'
import Avatar from '@/components/Avatar'
import { BasicMessage } from '@/components/Message/BasicMessage'
import { DateMessage } from '@/components/Message/DateMessage'

// 簡化訊息顯示: 同一分鐘內同一人的訊息, 不顯示頭貼、名字
const isSimplifyMessageDisplay = (messageList, index) => {
  if (index === 0) return false
  const isSameTimeMessage = momentFormatTime(messageList[index].time) === momentFormatTime(messageList[index - 1].time)
  const isTextMessage = messageList[index - 1]?.msg ?? false
  const isSameUser = messageList[index].name === messageList[index - 1].name

  return isTextMessage && isSameUser && isSameTimeMessage
}

export function OppositeMessage ({ avatarList, message, messageList, index }) {
  return (
    <React.Fragment>
      <DateMessage messageList={messageList} index={index}/>
      <div className={`message-wrapper ${isSimplifyMessageDisplay(messageList, index) ? 'repeat' : ''}`}>
        <Avatar imageUrl={avatarList?.[message.avatar]?.url}/>
        <div>
          <div className="name">{message.name}</div>
          <BasicMessage message={message}/>
        </div>
      </div>
    </React.Fragment>
  )
}
