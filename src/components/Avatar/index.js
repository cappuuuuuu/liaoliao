import React from 'react'
import './style.scss'

const Avatar = ({ index, avatarChangeHandler, name, imageUrl }) => {
  return (
    <div className="single-avatar">
      <input type="radio" name="avatar" id={name} value={index} onChange={avatarChangeHandler} />
      <label htmlFor={name} style={{ backgroundImage: `url(${imageUrl})` }}></label>
    </div>
  )
}

export default Avatar
