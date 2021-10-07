import React from 'react'
import Avatar from '@/components/Avatar'

export function TypingMessage ({ typingStatus, avatarList }) {
  return (
    typingStatus.isTyping
      ? <div className="message-wrapper typing">
          <Avatar imageUrl={avatarList?.[typingStatus.avatar]?.url}/>
          <div>
            <div className="name">{typingStatus.name}</div>
            <div className="message new loading">
              正在輸入
              <span></span>
            </div>
          </div>
        </div>
      : null
  )
}
