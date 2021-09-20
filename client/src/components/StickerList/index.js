import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from './style'
import { useSticker } from '@/contexts/StickerProvider'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export default function StickerList ({ touchStickerHandler }) {
  const stickerList = useSticker()
  const classes = useStyles()
  const theme = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)

  const tabChangeHandler = (_, activeIndex) => {
    setActiveIndex(activeIndex)
  }

  const swipeableViewsChangeHandler = (activeIndex) => {
    setActiveIndex(activeIndex)
  }

  const TabsContent = ({ activeIndex }) => (
    <Tabs
      value={activeIndex}
      onChange={tabChangeHandler}
      variant="fullWidth"
    >
      {
        stickerList.map(sticker => (
          <Tab
            key={sticker.name}
            className={classes.stickerArticle}
            style={{ backgroundImage: `url(${sticker.data[0].url})` }}
          />
        ))
      }
    </Tabs>
  )

  const StickerButton = ({ imageUrlList }) => (
    imageUrlList.map(item => (
      <Button key={item.description} onClick={touchStickerHandler}>
        <img src={item.url} alt=""/>
      </Button>
    ))
  )

  const StickerButtonWrapper = ({ activeIndex }) => (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeIndex}
      onChangeIndex={swipeableViewsChangeHandler}
    >
      {
        stickerList.map(sticker => (
          <div key={sticker.name} className={classes.listWrapper} >
            <ul className={classes.stickerList}>
              <StickerButton imageUrlList={sticker.data} />
            </ul>
          </div>
        ))
      }
    </SwipeableViews>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <TabsContent activeIndex={activeIndex}/>
      </AppBar>
      <StickerButtonWrapper activeIndex={activeIndex}/>
    </div>
  )
}
