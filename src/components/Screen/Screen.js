import React, { Component } from 'react'
import './Screen.css'
import socket from '../../lib/socketClient'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
  }

  componentDidMount () {
    console.log(`componentDidMount:`, socket)
    socket.on('chat message', this.handleReceive.bind(this))
  }

  handleSend () {
    socket.emit('chat message', 'hello')
  }

  handleReceive (message) {
    this.setState({ message })
  }

  render () {
    return (
      <div className='App'>
        Virtual Arcade
        <p>
          Message: {this.state.message}
        </p>
        <p>
          <button onClick={this.handleSend.bind(this)}>Send</button>
        </p>
      </div>
    )
  }
}

export default App
