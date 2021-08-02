import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { toggle, activeBubbleBackground } from '../../features/bubbleBackground/bubbleBackgroundSlice'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share';
import './style.scss';

const menuList = [
  { label: '背景泡泡效果', name: 'bubbleBackground', hasSwitch: true },
  { label: '分享', name: 'share', icon: ShareIcon },
]

const useStyles = makeStyles(() => ({
  menuItem: {
    margin: 0,
    padding: '5px 10px 5px 25px',
    color: 'rgb(44, 62, 80)',
    fontWeight: '450',

    '&:first-child': {
      paddingTop: '15px',
    },

    '&:last-child': {
      paddingBottom: '15px',
    },
  },

  menuItemIcon: {
    marginLeft: '12px',
    marginBottom: '2px',
    fontSize: '18px',
    color: '#5081ad',
  },

  moreVertIcon: {
    color: 'rgb(44, 62, 80)',
  },
}))

const BlueSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: '#5081ad',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    '&$checked + $track': {
      backgroundColor: '#5081ad',
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function MoreVertMenu () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const bubbleBackground = useSelector(activeBubbleBackground);
  const [anchorEl, setAnchorEl] = useState(null)

  const [switchState, setSwitchState] = useState({
    bubbleBackground,
    share: true,
  })

  const open = Boolean(anchorEl)

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleSwitchChange = (event) => {
    setSwitchState({ ...switchState, [event.target.name]: event.target.checked })
    dispatch(toggle())
  }

  const menuItemClickHandler = (name) => {
    if (navigator.share && name === 'share') {
      navigator.share({
        title: document.title,
        text: 'ㄌㄌ',
        url: window.location.host,
      })
        .then(() => console.log('分享成功！'))
        .catch((error) => console.warn('分享發生錯誤 !', error));
    }
  }

  return (
    <div>
      <IconButton 
        onClick={toggleMenu}
      >
        <MoreVertIcon className={classes.moreVertIcon}/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '30px',
            boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 5%), 0px 8px 10px 1px rgb(0 0 0 / 5%), 0px 3px 14px 2px rgb(0 0 0 / 5%)',
          },
        }}
      >
      <FormGroup>
        {menuList.map((item) => (
          item.hasSwitch 
          ? 
            <FormControlLabel
              className={classes.menuItem}
              key={item.label}
              control={<BlueSwitch checked={switchState[item.name]} onChange={handleSwitchChange} name={item.name} />}
              label={item.label}
              labelPlacement="start"
            />
          : 
            <MenuItem 
              className={classes.menuItem} 
              key={item.label}
              onClick={() => menuItemClickHandler(item.name)}
            > { item.label }
              { item?.icon ? React.createElement(item.icon, { className: classes.menuItemIcon }) : null }
            </MenuItem>
        ))}
      </FormGroup>
      </Menu>
    </div>
  );
}