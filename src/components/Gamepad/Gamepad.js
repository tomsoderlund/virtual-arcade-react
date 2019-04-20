import React, { Component } from 'react'
import styled from 'styled-components'

import DirectionalPad from './DirectionalPad'
import ActionButton from './ActionButton'

export default class Gamepad extends Component {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  render () {
    return <GamepadBackground>
      <GamepadSection>
        <DirectionalPad />
      </GamepadSection>
      <GamepadSection>
        <ActionButton />
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
