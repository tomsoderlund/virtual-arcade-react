import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import socket from '../../lib/socketClient'
import DirectionalPad from './DirectionalPad'
import ActionButton from './ActionButton'

export const BUTTON_DOWN = 1
export const BUTTON_UP = 0
const CENTER_VALUE = 0.5

const COOKIE_NAME = 'game-playername'

export default class Gamepad extends Component {
  constructor (props) {
    super(props)
    this.playerName = null
    this.state = {
      movement: {
        x: CENTER_VALUE,
        y: CENTER_VALUE
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
    // console.log(`handleMove:`, relativePosition)
    this.setState({ movement: relativePosition })
    socket.emit('move', { playerName: this.playerName, movement: relativePosition })
  }

  handleStopMove () {
    // console.log(`handleStopMove`)
    this.setState({ movement: { x: CENTER_VALUE, y: CENTER_VALUE } })
    socket.emit('move', { playerName: this.playerName, movement: { x: CENTER_VALUE, y: CENTER_VALUE } })
  }

  handleButton (isButtonDown, event) {
    // console.log(`handleButton:`, isButtonDown)
    socket.emit('button', { playerName: this.playerName, button: isButtonDown })
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
