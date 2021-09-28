import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import Sticker from '@/components/Sticker'
import './style.scss'
import { useStyles } from './style'

export default function MessageInputBox ({
  sendMessageHandler,
  messageTextInput,
  messageInputValue,
  textInputChangeHandler,
  sendSticker
}) {
  const classes = useStyles()

  return (
    <div className="message-box">
      <input type="text"
        className="message-input"
        ref={messageTextInput}
        value={messageInputValue}
        onKeyPress={e => e.key === 'Enter' ? sendMessageHandler(e) : null}
        onChange={textInputChangeHandler}
        placeholder="輸入訊息"
      />
      <Sticker sendSticker={sendSticker} />
      <IconButton className="message-submit" onClick={sendMessageHandler}>
        <SendIcon className={classes.sendIcon} />
      </IconButton>
    </div>
  )
}
