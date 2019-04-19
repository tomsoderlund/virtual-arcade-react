import React, { Component } from 'react'
import './App.css'

const socket = window.io()
socket.on('chat message', function (msg) {
  console.log('chat message: ' + msg)
})

class App extends Component {
  componentDidMount () {
    console.log(`componentDidMount:`, socket)
    socket.emit('chat message', 'hello')
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
