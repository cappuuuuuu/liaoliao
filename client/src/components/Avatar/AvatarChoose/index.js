import React from 'react'
import Avatar from '@/components/Avatar'
import { useSelector } from 'react-redux'
import { avatarData } from '@/redux/slices/avatarDataSlice'
import './style.scss'

const AvatarChoose = ({ getAvatar }) => {
  const avatarList = useSelector(avatarData)

  return (
    <div className="avatar-wrapper">
      <ul>
        {
          avatarList.map((avatar, index) => (
            <Avatar
              index={index}
              getAvatar={getAvatar}
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
