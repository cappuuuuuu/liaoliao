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
  const [scrollPosition, setScrollPosition] = useState({ arriveTop: false })
  const [active, setActive] = useState(false)

  const scrollDebounce = useCallback(debounce(() => {
    setActive(false)

    if (messageContainer.current.scrollTop === 0) setScrollPosition({ ...scrollPosition, arriveTop: true })
    else setScrollPosition({ ...scrollPosition, arriveTop: false })
  }, 1000), [])

  const handleBackToTopButtonScroll = () => {
    scrollDebounce()
    setActive(true)
  }

  useEffect(() => {
    if (!messageContainer.current) return

    messageContainer.current.addEventListener('scroll', handleBackToTopButtonScroll)
  }, [])

  return (
    <div className={`back__to__top ${active && !scrollPosition.arriveTop ? 'active' : ''}`} onClick={ scrollToTop }>
      <img className="arrow__icon" src={require('@/assets/images/icon/arrow-up.svg')} alt=""/>
    </div>
  )
}
