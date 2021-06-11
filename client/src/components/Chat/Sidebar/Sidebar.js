import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import avatars from '../../Image/AvatarImage';
import './Sidebar.scss';

const useStyles = makeStyles(() => ({

  profile: {
    margin: '20px auto',
    textAlign: 'center',
    color: '#fff',
    fontSize: '1.1rem'
  },
  arrowBtn: {
    backgroundColor: '#32465a',
    color: 'rgb(255,255,255)',
    padding: '20px',
    position: 'absolute',
    top: 0,
    right: 0

  },
  arrowIcon: {
    width: 40,
    height: 40
  },
  avatar: {
    display: 'flex',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    padding: '10px',
    margin: 'auto',
    marginBottom: '5px',
    backgroundColor: 'rgba(111, 160, 224, 0.25)',
    "@media(min-width:992px)": {
      width: '80px',
      height: '80px',
    },
    "& img": {
      width: '50px',
      margin: 'auto'
    }
  },
  name: {
    color: '#fff'
  },
  list: {
    boxSizing: 'border-box',
    backgroundColor: '#2c3e50',
    width: '100%',
    padding: '25px 10px',
    color: '#FFF',
    textAlign: 'center',
    borderRadius: '30px 30px 0 0',
    height: '90vh'
  },
  listNav: {
    position: 'relative',
    height: '80px',
    backgroundColor: '#32465a',
    color: '#fff',
    textAlign: 'center',
    "& p": {
      fontSize: '1.2rem',
      height: '80px',
      lineHeight: '80px'
    }
  },
  userList: {
    listStyle: 'none',
    marginTop: '20px',
    height: '700px',
    overflowY: 'auto',
    padding: '0 15px',
    '@media (max-width:992px)': {
      height: '320px',
    },
    "& li": {
      height: '35px',
      lineHeight: '35px',
      backgroundColor: '#32465a',
      padding: '10px 15px',
      marginBottom: '15px',
      borderRadius: '10px',
      fontSize: '1rem',
      color: '#94b2d3',
      textAlign: 'left',
      '@media (min-width:992px)': {
        height: '55px',
      },
      "& div": {
        display: 'flex',
        alignItems: 'center'
      },
      "& img": {
        width: '35px',
        verticalAlign: 'top',
        marginRight: '15px',
      }
    }
  },
  buttonBar: {
    position: 'absolute',
    width: '60%',
    borderRadius: '20px',
    height: '50px',
    margin: '0 auto',
    left: '50%',
    bottom: '10px',
    transform: 'translateX(-50%)',
    background: '#32465a',
    overflow: 'hidden',
    "& button": {
      color: '#fff',
      width: '100%',
      height: '100%',
      fontSize: '1rem',
      padding: '10px 0',
      borderRadius: '0',
      '&:hover': {
        background: '#435f7a'
      }

    }
  }
}))




const Sidebar = ({ users, name, avatar }) => {
  const classes = useStyles();

  const Profile = () => {
    return (
      <div className={classes.profile}>
        <div className={classes.avatar}>
          <img src={avatars[avatar]} alt="" />
        </div>
        <div className={classes.name}>{name}</div>
      </div>
    )
  }
  const List = () => {
    return (
      <div className={classes.list}>
        <div style={{ fontSize: '1rem' }}>誰在線上</div>
        <ul className={classes.userList}>
          {users.length > 1 ?
            users
              .filter(user => user.name !== name)
              .map((user) => {
                return (
                  <li key={user.id}>
                    <div>
                      <img src={avatars[user.avatar]} alt="" />
                      <span>{user.name}</span>
                    </div>
                  </li>
                )
              })
            :
            <div style={{ fontSize: '.9rem', marginTop: '20px', color: '#5081AD' }}>
              <p style={{ margin: '5px 0' }}>只有你一個人嗎 ?</p>
              <p style={{ margin: '5px 0' }}>沒關係的 ! 作者陪你聊 😂</p>
            </div>
          }
        </ul>

        <div className={classes.buttonBar}>
          <Link to="/chat/logout"><Button><ExitToAppIcon style={{ marginRight: '10px', width: 20, height: 20 }} />登出</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="sidebar">
      <Profile />
      <List />
    </div>
  )

}

export default Sidebar;
