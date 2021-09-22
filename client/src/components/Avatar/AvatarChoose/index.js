import React from 'react'
import Avatar from '@/components/Avatar'
import { useSelector } from 'react-redux'
import { avatarData } from '@/redux/slices/avatarDataSlice'
import './style.scss'

const AvatarChoose = ({ avatarChangeHandler }) => {
  const avatarList = useSelector(avatarData)

  return (
    <div className="avatar-wrapper">
      <ul>
        {
          avatarList.map((avatar, index) => (
            <Avatar
              index={index}
              avatarChangeHandler={avatarChangeHandler}
              name={avatar.name}
              imageUrl={avatar.url}
              key={avatar._id}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default AvatarChoose
