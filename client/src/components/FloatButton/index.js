import React, { useState } from 'react'
import projectInfo from '@/configs/site'
import './style.scss'

export default function FloatButton () {
  const [toggle, setToggle] = useState(false)
  const [firstOpenMenu, setFirstOpenMenu] = useState(false)
  const buttonClickHandler = () => {
    setToggle((val) => !val)
    setFirstOpenMenu(true)
  }

  return (
    <div className={`float-btn-wrapper ${toggle ? 'open-menu' : ''}`}>
      <input type="checkbox" id="floating" name="floating" />
        <button className="float-btn" onClick={buttonClickHandler}>
          <span className="floating-options">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
      </button>
      <div className={`menu-wrapper ${firstOpenMenu ? '' : 'close'}`}>
        <div className="menu-item menu-item-top">
          <p className="menu-item-description">{ projectInfo.author }</p>
          <a className="menu-item-icon"
            href={ projectInfo.githubProjectLink }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={require('@/assets/images/brand/github-brands.svg')} alt="github__link"/>
          </a>
        </div>
        <div className="menu-item menu-item-bottom">
          <p className="menu-item-description">{ 'v' + projectInfo.version }</p>
          <img
            className="menu-item-icon"
            src={require('@/assets/images/icon/clock-regular.svg')}>
          </img>
        </div>
      </div>
    </div>
  )
}
