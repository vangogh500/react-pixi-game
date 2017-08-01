import React from 'react'
import {loader} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactDOM from 'react-dom'
import {Game, Stage, ResourceProvider, Sprite, Rectangle, Circle, TickEvent} from '../src/index.js'

class Mario extends React.Component {
  state = {
    position: new Vector(),
    color: 0xffffff
  }
  handleTick = (function(){
    const {position, color} = this.state
    this.setState({ position: position.add(new Vector(1)), color: color - 1 })
  }).bind(this)
  render() {
    const {color, position} = this.state
    return (
      <div>
        {
          <div>
            <Circle position={position} size={new Vector(100,100)} color={color} />
          </div>
        }
        <TickEvent onTick={this.handleTick}/>
      </div>
    )
  }
}


ReactDOM.render(
  <Game>
    <ResourceProvider resources={[['mario', '/img/mario.png']]}>
      <Stage autoResize={false}>
        <Mario />
      </Stage>
    </ResourceProvider>
  </Game>,
  document.getElementById('example_1')
)
