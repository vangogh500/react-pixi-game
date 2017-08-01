import React from 'react'
import {loader} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactDOM from 'react-dom'
import {Game, Stage, ResourceProvider, Sprite, TickEvent} from '../src/index.js'

class Mario extends React.Component {
  state = {
    position: new Vector()
  }
  handleTick = (function(){
    const {position} = this.state
    this.setState({ position: position.add(new Vector(1)) })
  }).bind(this)
  render() {
    const {position} = this.state
    return (
      <div>
        {
          <Sprite resource={'mario'} position={position}/>
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
