import React from 'react'
import { momentFormatDate } from '@/helper'

const Message = ({ message }) => (
  <div className="message-wrapper broadcast">
    <div className="message new date">
      {momentFormatDate(message.time)}
    </div>
  </div>
)

export function DateMessage ({ messageList, index }) {
  const currentMessageDate = momentFormatDate(messageList[index]?.time)
  const prevMessageDate = momentFormatDate((messageList[index - 1])?.time)
  const isNotSameDate = currentMessageDate !== prevMessageDate

  if (isNotSameDate) return <Message message={messageList[index]} />
  else return null
}
