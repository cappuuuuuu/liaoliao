import React, { useRef, useContext, createContext } from 'react'
import ConsecutiveSnackbars from '@/components/Snackbar'

const SnackBarContext = createContext()

export function useSnackBar () {
  return useContext(SnackBarContext)
}

export function SnackBarProvider ({ children }) {
  const consecutiveSnackbars = useRef(null)

  function openSnackBar (message, duration) {
    if (message) consecutiveSnackbars.current.handleOpen(message, duration)
  }

  return (
    <SnackBarContext.Provider value={{ openSnackBar }}>
      <ConsecutiveSnackbars ref={ consecutiveSnackbars }/>
      { children }
    </SnackBarContext.Provider>
  )
}
