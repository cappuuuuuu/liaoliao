import React, { useContext, useEffect, useState, createContext } from 'react'
import io from 'socket.io-client'
import { getConfigsJSONFromLocal } from '@/helper'

const SocketContext = createContext()
const { SOCKET_END_POINT } = getConfigsJSONFromLocal() || process.env

export function useSocket () {
  return useContext(SocketContext)
}

export function SocketProvider ({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(SOCKET_END_POINT)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}
