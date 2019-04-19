import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import './App.css'

const socket = openSocket('http://localhost:8888')

socket.on('chat message', function (msg) {
  console.log('chat message: ' + msg)
  io.emit('chat message', msg)
})

class App extends Component {
  componentDidMount () {
    console.log(`componentDidMount:`, socket)
  }

  render () {
    return (
      <div className='App'>
        Virtual Arcade
      </div>
    )
  }
}

export default App
