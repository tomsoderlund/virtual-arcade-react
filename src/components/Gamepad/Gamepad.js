import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import socket from '../../lib/socketClient'
import DirectionalPad from './DirectionalPad'
import ActionButton from './ActionButton'

const BUTTON_DOWN = 1
const BUTTON_UP = 0

const COOKIE_NAME = 'game-playername'

export default class Gamepad extends Component {
  constructor (props) {
    super(props)
    this.playerName = null
    this.state = {
      movement: {
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount () {
    this.getPlayerName()
  }

  getPlayerName () {
    this.playerName = Cookies.get(COOKIE_NAME)
    if (!this.playerName) {
      this.playerName = window.prompt('Enter your player name:')
      Cookies.set(COOKIE_NAME, this.playerName)
    }
    console.log(`playerName:`, this.playerName)
    socket.emit('join', { playerName: this.playerName })
  }

  handleMove (relativePosition, position) {
    console.log(`handleMove:`, relativePosition)
    this.setState({ movement: relativePosition })
    socket.emit('move', { playerName: this.playerName, movement: relativePosition })
  }

  handleStopMove () {
    console.log(`handleStopMove`)
    this.setState({ movement: { x: 0, y: 0 } })
    socket.emit('move', { playerName: this.playerName, movement: { x: 0, y: 0 } })
  }

  handleButton (buttonDown, event) {
    console.log(`handleButton:`, buttonDown)
    socket.emit('button', { playerName: this.playerName, buttonDown })
  }

  render () {
    return <GamepadBackground>
      <GamepadSection>
        <DirectionalPad
          onChange={this.handleMove.bind(this)}
          onEnd={this.handleStopMove.bind(this)}
        />
      </GamepadSection>
      <GamepadSection>
        <ActionButton
          onButtonDown={this.handleButton.bind(this, BUTTON_DOWN)}
          onButtonUp={this.handleButton.bind(this, BUTTON_UP)}
        />
      </GamepadSection>
    </GamepadBackground>
  }
}

const GamepadBackground = styled.main`
  background-color: #EDEDED;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const GamepadSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
