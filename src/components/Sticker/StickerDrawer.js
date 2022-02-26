import React from 'react'
import { isIOS } from 'react-device-detect'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import StickerList from '@/components/StickerList'
import { useStyles } from './style'

export default function StickerDrawer ({ open, toggleSticker, touchStickerHandler }) {
  const classes = useStyles()

  return (
    <SwipeableDrawer
      anchor="bottom"
      classes={{ paper: classes.drawer }}
      open={open}
      onOpen={toggleSticker(true)}
      onClose={toggleSticker(false)}
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
    >
      <StickerList touchStickerHandler={ touchStickerHandler }/>
    </SwipeableDrawer>
  )
}
