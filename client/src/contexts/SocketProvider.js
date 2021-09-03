import React, { useContext, useEffect, useState, createContext } from 'react'
import io from 'socket.io-client'
import { getConfigsJSON } from '@/helper'

const SocketContext = createContext()
const { SERVER_ORIGIN } = getConfigsJSON()

export function useSocket () {
  return useContext(SocketContext)
}

export function SocketProvider ({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(SERVER_ORIGIN)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}
