import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Loop, Stage } from 'react-game-kit'
import styled from 'styled-components'
import { set } from 'lodash'

import './Screen.css'
import socket from '../../lib/socketClient'

import GameScreen from '../../games/Game1/GameScreen'

let playerCount = 0
const COLORS = ['dodgerblue', 'greenyellow', 'darkorange', 'slateblue', 'deeppink', 'tomato', 'lemonchiffon']

class Screen extends Component {
  constructor (props) {
    super(props)
    this.state = { players: {} }
  }

  componentDidMount () {
    socket.on('join', this.handlePlayerJoin.bind(this))
    socket.on('leave', this.handlePlayerLeave.bind(this))
    socket.on('move', this.handlePlayerMove.bind(this))
    socket.on('button', this.handlePlayerButton.bind(this))
  }

  handlePlayerJoin ({ playerName }) {
    // console.log(`handlePlayerJoin:`, playerName)
    const players = { ...this.state.players }
    set(players, `${playerName}.color`, COLORS[playerCount])
    playerCount++
    this.setState({ players })
  }

  handlePlayerLeave ({ playerName }) {
    // console.log(`handlePlayerLeave:`, playerName)
    const players = { ...this.state.players }
    delete players[playerName]
    this.setState({ players })
  }

  handlePlayerMove ({ playerName, movement }) {
    // console.log(`handlePlayerMove:`, playerName)
    const players = { ...this.state.players }
    // Remap from 0-1 to -1 to +1
    set(players, `${playerName}.movement`, { x: movement.x * 2 - 1, y: movement.y * 2 - 1 })
    this.setState({ players })
  }

  handlePlayerButton ({ playerName, button }) {
    // console.log(`handlePlayerButton:`, playerName)
    const players = { ...this.state.players }
    set(players, `${playerName}.button`, button)
    this.setState({ players })
  }

  render () {
    return (
      <div className='Screen'>
        <Loop>
          {/*
          <Stage width={1024} height={576}>
          */}
          <GameScreen players={this.state.players} />
          {/*
            </Stage>
          */}
        </Loop>
        <CornerLinks>
          <Link to='/gamepad' target='_blank'>Show gamepad</Link>
        </CornerLinks>
      </div>
    )
  }
}

const CornerLinks = styled.nav`
  position: absolute;
  left: 1em;
  bottom: 1em;
  z-index: 100;
`

export default Screen
