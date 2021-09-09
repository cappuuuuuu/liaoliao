import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import projectInfo from '@/configs/site'
import Avatar from '@/components/Avatar'
import { useSelector } from 'react-redux'
import { avatarData } from '@/redux/slices/avatarDataSlice'
import { useStyles } from './style'
import './style.scss'

const Sidebar = ({ users, name, avatar }) => {
  const avatarList = useSelector(avatarData)
  const classes = useStyles()
  const Profile = () => {
    return (
      <div className={classes.profile}>
        <Avatar imageUrl={avatarList?.[avatar]?.url}/>
        <div className={classes.name}>{name}</div>
      </div>
    )
  }

  const List = () => {
    return (
      <div className={classes.list}>
        <div style={{ fontSize: '1rem' }}>誰在線上</div>
        <ul className={classes.userList}>
          {users.length > 1
            ? users
              .filter(user => user.name !== name)
              .map((user) => {
                return (
                  <li key={user.id}>
                    <div>
                      {/* <img src={avatars[user.avatar]} alt="" /> */}
                      <Avatar imageUrl={avatarList?.[avatar]?.url}/>
                      <span>{user.name}</span>
                    </div>
                  </li>
                )
              })
            : <div style={{ fontSize: '.9rem', marginTop: '20px', color: '#5081AD' }}>
              <p style={{ margin: '5px 0' }}>只有你一個人嗎 ?</p>
              <p style={{ margin: '5px 0' }}>沒關係的 ! 作者陪你聊 <span role="img" aria-label="smile">😂</span></p>
            </div>
          }
        </ul>

        <div className="project__description">
          <div className="project__info">
            <div className="project__info__author">Made By { projectInfo.author }</div>
            <div className="project__info__version">v{ projectInfo.version }</div>
          </div>
          <a className="github__link" href={ projectInfo.githubProjectLink } target="_blank" rel="noopener noreferrer">
            <img className="github__link__icon" src={require('@/assets/images/brand/github-brands.svg')} alt=""/>
          </a>
        </div>

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

export default Sidebar
