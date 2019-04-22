import React from 'react'
import styled from 'styled-components'

export default ({ onButtonDown, onButtonUp }) => <ActionButton
  onMouseDown={onButtonDown}
  onTouchStart={onButtonDown}
  onMouseUp={onButtonUp}
  onTouchEnd={onButtonUp}
/>

const ActionButton = styled.div`
  font-size: 40vw;
  width: 0.4em;
  height: 0.4em;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0.010em 0.04em 0 rgba(0,0,0,0.40);
  border: none;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &:active {
    box-shadow: 0 0.001em 0.01em 0 rgba(0,0,0,0.40);
  }
`
