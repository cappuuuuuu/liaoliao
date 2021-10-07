import React from 'react'

export function BroadcastMessage ({ userName, message }) {
  const isMySelf = userName === message.name
  let broadcastMessage = ''

  switch (message.feature) {
    case 'userJoin':
      broadcastMessage = isMySelf ? '你已加入聊天室' : `${message.name} 已加入聊天室`
      break
    case 'userLeft':
      broadcastMessage = `${message.name} 離開聊天室`
      break
    default:
      broadcastMessage = `${message.name} 已加入聊天室`
  }

  return (
    <div className="message-wrapper broadcast">
      <div className="message new">
        { broadcastMessage }
      </div>
    </div>
  )
}
