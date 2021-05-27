import React from 'react';
import './Avatar.scss';
import avatars from '../../Image/AvatarImage';

const AvatarContent = ({ i, getAvatar, avatar }) => {
  return (
    <li>
      <input type="radio" name="avatar" id={`avatar${i + 1}`} value={i} onChange={getAvatar} />
      <label htmlFor={`avatar${i + 1}`} style={{ backgroundImage: `url(${avatar})` }}>
      </label>
    </li>
  )
}
const Avatar = ({ getAvatar }) => {
  return (
    <div className="avatar-wrapper">
      <ul>
        {
          avatars
            .filter((avatar, i) => i < 4)
            .map((avatar, i) => {
              return (
                <AvatarContent i={i} getAvatar={getAvatar} avatar={avatar} key={avatar} />
              )
            })
        }
      </ul>
      <ul>
        {
          avatars
            .filter((avatar, i) => i >= 4)
            .map((avatar, i) => {
              return (
                <AvatarContent i={i} getAvatar={getAvatar} avatar={avatar} key={avatar} />
              )
            })
        }
      </ul>
    </div>
  )

}

export default Avatar;
