import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Screen.css'
import socket from '../../lib/socketClient'

class Screen extends Component {
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
      <div className='Screen'>
        <h1>Virtual Arcade</h1>
        <p>
          Message: {this.state.message}
        </p>
        <p>
          <button onClick={this.handleSend.bind(this)}>Send</button>
        </p>
        <Link to='/gamepad'>Show gamepad</Link>
      </div>
    )
  }
}

export default Screen
