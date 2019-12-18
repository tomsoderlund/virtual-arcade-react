import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get, set } from 'lodash'

import { BUTTON_DOWN } from '../../components/Gamepad/Gamepad'

const START_POSITION = 100
const SPEED_FACTOR = 2.0

export default class GameScreen extends Component {
  static contextTypes = {
    loop: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { characters: {} }
  }

  componentDidMount () {
    this.context.loop.subscribe(this.update.bind(this))
  }

  componentWillUnmount () {
    this.context.loop.unsubscribe(this.update.bind(this))
  }

  // Tick logic
  update () {
    const { players } = this.props
    // console.log(`Players:`, players)
    const characters = {...this.state.characters}
    for (let playerName in players) {
      set(characters, `${playerName}.playerName`, playerName)
      set(characters, `${playerName}.color`, players[playerName].color)
      set(characters, `${playerName}.speed`, players[playerName].movement)
      if (players[playerName].button === BUTTON_DOWN && !get(characters, `${playerName}.button`)) {
        console.log(`Fire!`)
      }
      set(characters, `${playerName}.button`, players[playerName].button)
      // Calculate position
      set(characters, `${playerName}.position.x`, get(characters, `${playerName}.position.x`, START_POSITION) + get(characters, `${playerName}.speed.x`, 0) * SPEED_FACTOR)
      set(characters, `${playerName}.position.y`, get(characters, `${playerName}.position.y`, START_POSITION) + get(characters, `${playerName}.speed.y`, 0) * SPEED_FACTOR)
      // Update state
      this.setState({ characters })
    }
  }

  render () {
    return <GameScreenBox>
      {Object.values(this.state.characters).map((character, index) => (
        <Character
          key={index}
          style={{
            left: get(character, 'position.x', 0),
            top: get(character, 'position.y', 0)
          }}
          color={character.color}
          title={`Character #${index}`}
        >
          {character.playerName}
        </Character>
      ))}
    </GameScreenBox>
  }
}

const GameScreenBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Character = styled.div`
  position: absolute;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

`
