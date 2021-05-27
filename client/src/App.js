import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import './AnimatedSwitch.css';

const io = require('socket.io-client');
let socket;

const App = () => {
  const endPoint = 'https://caputalk.herokuapp.com/';
  // const endPoint = 'localhost:5000';

  socket = io(endPoint);

  return (
    <Router forceRefresh={true}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/" exact render={(props) => <Join {...props} socket={socket} />} />
        <Redirect exact from="/chat/logout" to="/" />
        <Route path="/chat" render={(props) => <Chat {...props} endPoint={endPoint} socket={socket} />} />
      </AnimatedSwitch>
    </Router>
  )
}

export default App;
