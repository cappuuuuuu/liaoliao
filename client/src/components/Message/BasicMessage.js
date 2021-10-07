import React from 'react'
import { momentFormatTime } from '@/helper'

export function BasicMessage ({ message }) {
  const isSticker = message.typesOf === 'sticker'

  return (
    <React.Fragment>
      <div className={`message new ${isSticker ? 'sticker' : ''}`}>
        { isSticker ? <img src={message.msg} alt=""/> : message.msg }
      </div>
      <div className="time">{momentFormatTime(message.time)}</div>
    </React.Fragment>
  )
}
