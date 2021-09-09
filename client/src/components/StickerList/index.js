import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from './style'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export default function FullWidthTabs ({ touchStickerHandler, stickers }) {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const TabsContent = ({ value }) => {
    return (
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {stickers.map((sticker, i) => {
            return (
                <Tab key={sticker.name} className={classes.stickerArticle} style={{ backgroundImage: `url(${sticker.imageUrl[0]})` }} {...a11yProps(i)} />
            )
          })}
        </Tabs>
    )
  }

  const StickerWrapper = ({ value }) => {
    return (
          <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          >
            {stickers.map((sticker, i) => {
              return (
                    <div key={sticker.name} value={value} index={i} dir={theme.direction}>
                      <div className={classes.listWrapper} >
                        <ul className={classes.stickerList}>
                            {sticker.imageUrl.map((url) => {
                              return <li key={url}><Button onClick={touchStickerHandler}><img src={url} alt=""/></Button></li>
                            })}
                        </ul>
                      </div>
                    </div>
              )
            })}
          </SwipeableViews>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
          <TabsContent value={value}/>
      </AppBar>
      <StickerWrapper value={value}/>
    </div>
  )
}
