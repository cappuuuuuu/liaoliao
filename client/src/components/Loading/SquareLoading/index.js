import React from 'react'
import './style.scss'

const SquareLoading = ({ loadComplete }) => {
  return (
    <div className={`loader-container ${loadComplete ? 'already' : ''} `}>
      <div className="loader">
        <div className="loader-inner"></div>
      </div>
    </div>
  )
}

export default SquareLoading
