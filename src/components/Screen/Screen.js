import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Loop, Stage } from 'react-game-kit'

import './Screen.css'
import socket from '../../lib/socketClient'

import GameScreen from '../../games/Game1/GameScreen'

class Screen extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
  }

  componentDidMount () {
    socket.on('join', this.handleReceive.bind(this))
    socket.on('leave', this.handleReceive.bind(this))
    socket.on('move', this.handleReceive.bind(this))
    socket.on('button', this.handleReceive.bind(this))
  }

  handleSend () {
  }

  handleReceive () {
    console.log(`handleReceive:`, arguments)
  }

  render () {
    return (
      <div className='Screen'>
        <h1>Virtual Arcade</h1>
        <Link to='/gamepad'>Show gamepad</Link>
        <Loop>
          <Stage>
            <GameScreen />
          </Stage>
        </Loop>
      </div>
    )
  }
}

export default Screen
