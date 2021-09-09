import React, { forwardRef, useImperativeHandle } from 'react'
import { useStyles } from './style'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

const ConsecutiveSnackbars = forwardRef((props, ref) => {
  const [snackPack, setSnackPack] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)
  const [duration, setDuration] = React.useState(0)
  const classes = useStyles()

  useImperativeHandle(ref, () => ({
    handleOpen: (message, duration = 2000) => {
      setDuration(duration)
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }])
      return message
    },

    handleClose: (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    }

  }))

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return (
    <div>
      <Snackbar
        className={classes.snackbar}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={duration}
        TransitionComponent={Slide}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}

      />
    </div>
  )
})

export default ConsecutiveSnackbars
