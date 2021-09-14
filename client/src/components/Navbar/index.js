import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from '@/components/Sidebar'
import MoreVertMenu from '@/components/MoreVertMenu'
import { isIOS } from 'react-device-detect'
import { useStyles } from './style'

export default function NavBar ({ users, name, avatar }) {
  const classes = useStyles()
  const [openDrawerStatus, setOpenDrawerStatus] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpenDrawerStatus(open)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <SwipeableDrawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            open={openDrawerStatus}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableBackdropTransition={!isIOS}
            disableDiscovery={isIOS}
          >
            <Sidebar users={users} name={name} avatar={avatar}/>
          </SwipeableDrawer>
          <Typography className={classes.title}>
            <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon style={{ width: 30, height: 35, color: '#2c3e50' }}/>
            </IconButton>
          </Typography>
          <MoreVertMenu />
        </Toolbar>
      </AppBar>
    </div>
  )
}
