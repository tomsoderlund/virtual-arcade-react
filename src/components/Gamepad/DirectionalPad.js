import React from 'react'
import styled from 'styled-components'

import Draggable from './Draggable'

export default ({ onChange, onEnd }) => <DpadOuter>
  <BoundingBox>
    <Draggable
      onChange={onChange}
      onEnd={onEnd}
    >
      <DpadHandle />
    </Draggable>
  </BoundingBox>
</DpadOuter>

const DpadOuter = styled.div`
  font-size: 40vw;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: inset 0 0.005em 0.02em 0 rgba(0,0,0,0.40);
  position: relative;
  user-select: none;
`

const DpadHandle = styled.div`
  width: 0.4em;
  height: 0.4em;
  border-radius: 50%;
  background-color: #EDEDED;
  box-shadow: 0 0.010em 0.04em 0 rgba(0,0,0,0.40);
  position: absolute;
  left: 0.3em;
  top: 0.3em;
  user-select: none;
`

const BOUNDING_SIZE = 0.8

const BoundingBox = styled.div`
  width: ${BOUNDING_SIZE}em;
  height: ${BOUNDING_SIZE}em;
  position: absolute;
  left: ${(1 - BOUNDING_SIZE) / 2}em;
  top: ${(1 - BOUNDING_SIZE) / 2}em;
  user-select: none;
`
