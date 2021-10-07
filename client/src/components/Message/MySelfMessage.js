import React from 'react'
import { BasicMessage } from '@/components/Message/BasicMessage'

export function MySelfMessage ({ message }) {
  return (
    <div className="message-wrapper message-personal" key={message.time}>
      <BasicMessage message={message}/>
    </div>
  )
}
