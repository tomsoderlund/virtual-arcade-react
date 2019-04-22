import React from 'react'

export default class Draggable extends React.Component {
  constructor (props) {
    super(props)

    this.draggableElement = null
    this.targetElement = null
    this.parentElement = null

    this.setDraggableElement = element => {
      this.draggableElement = element
    }

    this.state = {
      isMoving: false,
      origin: { x: 0, y: 0 },
      target: undefined,
      parentElement: undefined,
      listeners: undefined
    }
  }

  componentDidMount () {
    this.parentElement = this.draggableElement.parentElement
    this.targetElement = this.draggableElement.children[0]
    const startPosition = {
      x: this.props.padding.left + this.props.position.x * (this.parentElement.offsetWidth - this.targetElement.getBoundingClientRect().width - this.props.padding.right - 2),
      y: this.props.padding.top + this.props.position.y * (this.parentElement.offsetHeight - this.targetElement.getBoundingClientRect().height - this.props.padding.bottom)
    }
    this.targetElement.style.left = `${startPosition.x}px`
    this.targetElement.style.top = `${startPosition.y}px`
  }

  limitValue (value, min, max) { return Math.min(Math.max(value, min), max) }

  handleStart (event) {
    this.targetElement = event.target
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event
    const listeners = {
      move: this.handleMove.bind(this),
      end: this.handleEnd.bind(this)
    }
    this.setState({
      isMoving: true,
      listeners,
      origin: {
        x: clientX - parseInt(this.targetElement.style.left || 0, 10),
        y: clientY - parseInt(this.targetElement.style.top || 0, 10)
      }
    })
    window.document.addEventListener('mousemove', listeners.move)
    window.document.addEventListener('mouseup', listeners.end)
    window.document.addEventListener('touchmove', listeners.move)
    window.document.addEventListener('touchend', listeners.end)
  }

  handleMove (event) {
    event.preventDefault()
    // x, y, clientX, clientY, movementX, movementY, pageX, pageY, screenX, screenY AND layerX, layerY, offsetX, offsetY
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event
    if (this.state.isMoving) {
      const position = { x: clientX - this.state.origin.x, y: clientY - this.state.origin.y }
      // Clip values to bounding box
      position.x = this.limitValue(position.x, this.props.padding.left, this.parentElement.offsetWidth - this.targetElement.getBoundingClientRect().width - this.props.padding.right)
      position.y = this.limitValue(position.y, this.props.padding.top, this.parentElement.offsetHeight - this.targetElement.getBoundingClientRect().height - this.props.padding.bottom)
      // Calculate relative value from 0 to 1
      const relativePosition = {
        x: (position.x - this.props.padding.left) / (this.parentElement.offsetWidth - this.targetElement.getBoundingClientRect().width - this.props.padding.right - 2), // why -2 needed ?!
        y: (position.y - this.props.padding.top) / (this.parentElement.offsetHeight - this.targetElement.getBoundingClientRect().height - this.props.padding.bottom)
      }
      if (this.props.onChange) this.props.onChange(relativePosition, position)
      this.targetElement.style.left = `${position.x}px`
      this.targetElement.style.top = `${position.y}px`
    }
  }

  handleEnd (event) {
    this.setState({ isMoving: false })
    window.document.removeEventListener('mousemove', this.state.listeners.move)
    window.document.removeEventListener('mouseup', this.state.listeners.end)
    window.document.removeEventListener('touchmove', this.state.listeners.move)
    window.document.removeEventListener('touchend', this.state.listeners.end)
    if (this.props.onEnd) this.props.onEnd()
  }

  render () {
    return <div
      onMouseDown={this.handleStart.bind(this)}
      onTouchStart={this.handleStart.bind(this)}
      ref={this.setDraggableElement}
      style={{ cursor: 'pointer' }}
    >
      {this.props.children}
    </div>
  }
}

Draggable.defaultProps = {
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  position: { x: 0.5, y: 0.5 }
}
