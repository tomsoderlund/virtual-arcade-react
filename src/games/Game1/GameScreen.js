import React, { Component } from 'react'

export default class GameScreen extends Component {
  constructor (props) {
    super(props)
    this.state = { lastMessage: '' }
  }

  componentDidMount () {
    console.log(`this.context:`, this.context)
    // this.context.loop.subscribe(this.update)
  }

  componentWillUnmount () {
    // this.context.loop.unsubscribe(this.update)
  }

  update () {
    // tick logic
  }

  render () {
    return <div>
      GameScreen: {this.state.lastMessage}
    </div>
  }
}
