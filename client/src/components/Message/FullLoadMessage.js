import React from 'react'

export function FullLoadMessage ({ totalMessageCount, messageList }) {
  const hasLoadMessageCount = messageList.filter(item => item.msg).length
  const isFullLoadMessage = hasLoadMessageCount === totalMessageCount

  return (
    <div className={ `message-wrapper broadcast load-message-status ${totalMessageCount && isFullLoadMessage ? 'load-complete' : ''}`}>
      <div className="message">已經沒有更多訊息了!</div>
    </div>
  )
}
