import React from 'react'
import styled from 'styled-components'

export default (props) => <DpadOuter>
  <DpadInner />
</DpadOuter>

const DpadOuter = styled.div`
  font-size: 40vw;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: inset 0 0.005em 0.02em 0 rgba(0,0,0,0.40);
  position: relative;
`

const DpadInner = styled.div`
  width: 0.4em;
  height: 0.4em;
  border-radius: 50%;
  background-color: #EDEDED;
  box-shadow: 0 0.010em 0.04em 0 rgba(0,0,0,0.40);
  position: absolute;
  left: 0.3em;
  top: 0.3em;
`
