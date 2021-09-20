import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import StickerPopover from './StickerPopover'
import StickerDrawer from './StickerDrawer'
import { useStyles } from './style'

export default function Sticker ({ sendSticker }) {
  const classes = useStyles()

  // Control Desktop Sticker Popover
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)
  const [applyPopover, setApplyPopver] = useState(window.innerWidth > 576)

  // control Mobile Sticker Drawer
  const [drawerOpenStatus, setDrawerOpenStatus] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', function () {
      setApplyPopver(window.innerWidth > 576)
    })
  }, [])

  const handlePopoverClose = () => setPopoverAnchorEl(null)

  const togglePopover = (status) => (event) => {
    setPopoverAnchorEl(event.currentTarget)
  }

  const toggleDrawer = (status) => (event) => {
    setDrawerOpenStatus(status)
  }

  const touchStickerHandler = event => {
    sendSticker(event)

    // close Drawer or Popover
    setDrawerOpenStatus(false)
    setPopoverAnchorEl(null)
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar style={{ minHeight: 'auto', padding: 0 }}>
              <IconButton
                onClick={applyPopover ? togglePopover(true) : toggleDrawer(true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <InsertEmoticonIcon className={classes.emotionIcon}/>
              </IconButton>

              {/* Desktop sticker popover */}
              <StickerPopover
                open={Boolean(popoverAnchorEl)}
                anchorEl={popoverAnchorEl}
                handleClose={handlePopoverClose}
                touchStickerHandler={touchStickerHandler}
              />

              {/* Mobile sticker drawer */}
              <StickerDrawer
                open={drawerOpenStatus}
                toggleSticker={toggleDrawer}
                touchStickerHandler={touchStickerHandler}
              />
            </Toolbar>
        </AppBar>
    </div>
  )
}
