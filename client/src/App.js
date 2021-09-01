import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { SocketProvider } from '@/contexts/SocketProvider.js'
import Join from '@/components/Join/Join'
import Chat from '@/components/Chat/Chat'
import '@/AnimatedSwitch.css'
require('dotenv').config()

const App = () => {
  return (
    <SocketProvider>
      <Router forceRefresh={true}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
          >
          <Route path="/" exact render={(props) => <Join {...props} />} />
          <Redirect exact from="/chat/logout" to="/" />
          <Route path="/chat" render={(props) => <Chat {...props} />} />
        </AnimatedSwitch>
      </Router>
    </SocketProvider>
  )
}

export default App
