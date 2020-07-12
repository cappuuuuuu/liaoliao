import React from 'react';

import './Avatar.scss';
import avatars from '../Image/AvatarImage';

const AvatarContent = ({i,getAvatar,avatar}) => {
    return (
        <li>
            <input type="radio" name="avatar" id={`avatar${i+1}`} value={i} onChange={ getAvatar }/>
            <label htmlFor={`avatar${i+1}`} style={{ backgroundImage:`url(${avatar})` }}>
            </label>
        </li>
    )
}
const Avatar = ({ getAvatar }) => {
    return(
        <div className="avatar-wrapper">
            <ul>
            {
                avatars.map((avatar,i)=>{
                    if(i >= 4) return ;
                    return(
                        <AvatarContent i={i} getAvatar={getAvatar} avatar={avatar} key={avatar}/>
                    )
                })
            }
            </ul>
            <ul>
            {
                avatars.map((avatar,i)=>{
                    if(i <=3 ) return ;
                    return(
                        <AvatarContent i={i} getAvatar={getAvatar} avatar={avatar} key={avatar}/>
                    )
                })
            }
            </ul>
        </div>
    )
    
}

export default Avatar ;