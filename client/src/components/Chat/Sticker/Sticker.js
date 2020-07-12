import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import StickerList from './StickerList';

const useStyles = makeStyles(() => ({
  root: {
    position:'absolute',
    right:'55px',

  },
  appBar:{
    color:'#727373',
    backgroundColor:'transparent',
    boxShadow:'none',
   
  },
  title: {
    flexGrow: 1,
    color:'#2c3e50'
  },
  drawer: {
    backgroundColor:'#fff',
    height:'300px',
    ['@media (max-width:576px)']: { 
      height:'auto',
    }

  },

  arrowBtn: {
    backgroundColor:'#32465a',
    color:'rgb(255,255,255)',
    float:'right',

  },
  arrowIcon: {
    width:40,
    height:40
  },
  listWrapper: {
    boxSizing: 'border-box',
    width:'100%',
    padding:'20px',
    color:'#FFF',
    textAlign:'center'
  },

  stickerPopover :{
    
    "& .MuiPopover-paper":{
      width:'500px' ,
      borderRadius:'10px'
      
    }
  }

}));

export default function Sticker({users , name , sendSticker , stickers }) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const [state, setState] = React.useState(false); // control mobile sticker
  const [anchorEl, setAnchorEl] = React.useState(null); // control desktop sticker

  //control desktop sticker
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //Mobile sticker toggle
  const toggleSticker = (open) => (event) => {
    if(window.innerWidth > 576) {
      handleClick(event);
      return ;
    }
     
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open); 

  };

  const touchStickerHandler = (e) => {
      sendSticker(e);
      setState(false);
      setAnchorEl(null);
  } 



  return (
    <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar style={{minHeight:'auto',padding:0}}>
            <IconButton onClick={toggleSticker(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <InsertEmoticonIcon style={{color:'#5081ad'}}/>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              className={classes.stickerPopover}
            >
              <StickerList touchStickerHandler={ touchStickerHandler } stickers={stickers}/>
            </Popover>

            <SwipeableDrawer
                anchor="bottom"
                classes={{paper: classes.drawer}}
                open={state}
                onClose={toggleSticker(false)}
                onOpen={toggleSticker(true)}
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS}
                >
                <StickerList touchStickerHandler={ touchStickerHandler } stickers={stickers}/>

            </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    </div>
  );
}