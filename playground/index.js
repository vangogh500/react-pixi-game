/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent} from '../dist/index.js'
import Circle from '../src/Graphics/Components/Circle.js'
import {Vector} from 'vangogh500-physics'

class Animation extends React.Component {
  state = {
    pos: new Vector(400,300)
  }
  handleClick = (function(event) {
    const {x,y} = event.data.global
    this.setState({ pos: new Vector(x,y) })
  }).bind(this)
  render() {
    const {pos} = this.state
    return (
      <div>
        <Circle position={pos} size={new Vector(150,100)} color={0x888FFF} />
        <PointerEvent onPointerDown={this.handleClick} />
      </div>
    )
  }
}

ReactDOM.render(
  <Loop>
    <Stage>
      <ResourceLoader resources={[['example', '/assets/spritesheet.json']]}>
        <Animation />
      </ResourceLoader>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
