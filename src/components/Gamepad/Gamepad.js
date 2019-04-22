import React, { Component } from 'react'
import styled from 'styled-components'

import DirectionalPad from './DirectionalPad'
import ActionButton from './ActionButton'

const BUTTON_DOWN = 1
const BUTTON_UP = 0

export default class Gamepad extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movement: {
        x: 0,
        y: 0
      }
    }
  }

  handleMove (relativePosition, position) {
    console.log(`handleMove:`, relativePosition)
    this.setState({ movement: relativePosition })
  }

  handleStopMove () {
    console.log(`handleStopMove`)
    this.setState({ movement: {
      x: 0,
      y: 0
    } })
  }

  handleButton (buttonDown, event) {
    console.log(`handleButton:`, buttonDown)
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
