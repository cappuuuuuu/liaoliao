import React from 'react'
import Popover from '@material-ui/core/Popover'
import StickerList from '@/components/StickerList'
import { useStyles } from './style'

export default function StickerPopover ({ open, anchorEl, handleClose, touchStickerHandler }) {
  const classes = useStyles()

  return (
    <Popover
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
      <StickerList touchStickerHandler={ touchStickerHandler }/>
    </Popover>
  )
}
