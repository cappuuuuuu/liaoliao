import React from 'react'
import './style.scss'

const Bubbles = ({ count }) => {
  const children = Array(count)
    .fill(count)
    .map((_, index) => (
      <li key={index}></li>
    ))

  return (
    <ul className="bg-bubbles">
      { children }
    </ul>
  )
}
export default Bubbles
