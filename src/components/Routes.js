import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Screen from './Screen/Screen'
import Gamepad from './Gamepad/Gamepad'

export default () => (
  <Router>
    <div>
      <Route path='/' exact component={Screen} />
      <Route path='/gamepad' component={Gamepad} />
    </div>
  </Router>
)
