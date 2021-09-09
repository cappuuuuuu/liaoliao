import React from 'react'
import { isIOS } from 'react-device-detect'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import StickerList from '@/components/StickerList'
import { useStyles } from './style'

export default function Sticker ({ sendSticker, stickers }) {
  const classes = useStyles()
  const [state, setState] = React.useState(false) // control mobile sticker
  const [anchorEl, setAnchorEl] = React.useState(null) // control desktop sticker

  // control desktop sticker popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const toggleSticker = (open) => (event) => {
    if (window.innerWidth > 576) {
      handleClick(event)
      return
    }

    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    // Mobile sticker toggle
    setState(open)
  }

  const touchStickerHandler = (e) => {
    sendSticker(e)
    setState(false)
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar style={{ minHeight: 'auto', padding: 0 }}>
                <IconButton onClick={toggleSticker(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <InsertEmoticonIcon style={{ color: '#5081ad' }}/>
                </IconButton>

                {/* desktop sticker popover */}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  className={classes.stickerPopover}
                >
                  <StickerList touchStickerHandler={ touchStickerHandler } stickers={stickers}/>
                </Popover>

                {/* monbile sticker drawer */}
                <SwipeableDrawer
                    anchor="bottom"
                    classes={{ paper: classes.drawer }}
                    open={state}
                    onClose={toggleSticker(false)}
                    onOpen={toggleSticker(true)}
                    disableBackdropTransition={!isIOS}
                    disableDiscovery={isIOS}
                    >
                    <StickerList touchStickerHandler={ touchStickerHandler } stickers={stickers}/>
                </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    </div>
  )
}
