import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../Sidebar/Sidebar';

const useStyles = makeStyles(() => ({
  appBar:{
    color:'#35394a',
    backgroundColor:'#FFF',
    boxShadow:'0 0 6px 0 rgba(152, 132, 158, 0.76);',
    paddingLeft:0,
    '@media (min-width:992px)': {
      boxShadow:'none',
    },
  },
  menuButton: {
    position:'absolute',
    top:0,
    left:'15px',
    '@media (min-width:992px)': {
      display:'none'
    }

  },
  title: {
    flexGrow: 1,
    color:'#2c3e50',
    textAlign:'center',
  },

  drawer: {
    backgroundColor:'#32465a',
    width:'70%',
    maxWidth:'250px',
    borderRadius:'0 30px 30px 0',
    zIndex:2017,
    '@media (min-width:992px)': {
      display:'none'
    }
  },

}));

export default function NavBar({ users , name , avatar}) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <SwipeableDrawer
              anchor="left"
              classes={{paper: classes.drawer}}
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
            >
              <Sidebar users={users} name={name} avatar={avatar}/>
          </SwipeableDrawer>
          <Typography className={classes.title}>
            <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon style={{width:30,height:35,color:'#2c3e50'}}/>
            </IconButton>
            聊天室
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
