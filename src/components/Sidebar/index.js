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

const ProjectDescription = () => (
  <div className="project__description">
    <div className="project__info">
      <div className="project__info__author">Made By { projectInfo.author }</div>
      <div className="project__info__version">v{ projectInfo.version }</div>
    </div>
    <a className="github__link" href={ projectInfo.githubProjectLink } target="_blank" rel="noopener noreferrer">
      <img className="github__link__icon" src={require('@/assets/images/brand/github-brands.svg')} alt="github__link"/>
    </a>
  </div>
)

const Sidebar = ({ userList, userName, avatar }) => {
  const avatarList = useSelector(avatarData)
  const classes = useStyles()

  const Profile = () => {
    return (
      <div className={classes.profile}>
        <Avatar imageUrl={avatarList?.[avatar]?.url}/>
        <div className={classes.name}>{userName}</div>
      </div>
    )
  }

  const LogoutButton = () => (
    <div className={classes.buttonBar}>
      <Link className="logout__button" to="/chat/logout">
        <Button>
          <ExitToAppIcon className={classes.exitToAppIcon} />
            登出
        </Button>
      </Link>
    </div>
  )

  const UserList = () => {
    const OnlySelfOnline = () => (
      <div className={classes.userListOnlySelf}>
        <p>只有你一個人嗎 ?</p>
        <p>沒關係的 ! 作者陪你聊 <span role="img" aria-label="smile">😂</span></p>
      </div>
    )

    const OtherUsersOnline = () => (
      userList
        .filter(user => user.name !== userName)
        .map(user => (
          <li key={user.id}>
            <Avatar imageUrl={avatarList?.[user.avatar]?.url}/>
            <span>{user.name}</span>
          </li>
        ))
    )

    return (
      <div className={classes.list}>
        <div>誰在線上</div>
        <ul className={classes.userList}>
          { userList.length > 1
            ? <OtherUsersOnline />
            : <OnlySelfOnline />
          }
        </ul>
      </div>
    )
  }

  return (
    <div className="sidebar">
      <Profile />
      <UserList />
      <ProjectDescription />
      <LogoutButton />
    </div>
  )
}

export default Sidebar
