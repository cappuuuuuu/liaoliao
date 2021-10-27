import React, { useState, useEffect, useCallback } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import debounce from 'lodash/debounce'
import './style.scss'

const scrollToTop = () => {
  scroll.scrollToTop({
    containerId: 'messages',
    duration: 1500,
    smooth: 'easeInOutQuint'
  })
}

export function BackToTopButton ({ messageContainer }) {
  const [isScrollArriveTop, setIsScrollArriveTop] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)

  const scrollDebounce = useCallback(debounce(() => {
    setButtonActive(false)
  }, 1000), [])

  const handleBackToTopButtonScroll = () => {
    scrollDebounce()
    setButtonActive(true)

    if (messageContainer.current.scrollTop === 0) setIsScrollArriveTop(true)
    else setIsScrollArriveTop(false)
  }

  useEffect(() => {
    if (!messageContainer.current) return

    messageContainer.current.addEventListener('scroll', handleBackToTopButtonScroll)
  }, [])

  return (
    <div className={`back__to__top ${buttonActive && !isScrollArriveTop ? 'active' : ''}`} onClick={ scrollToTop }>
      <img className="arrow__icon" src={require('@/assets/images/icon/arrow-up.svg')} alt=""/>
    </div>
  )
}
