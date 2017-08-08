import React from 'react'
import ReactDOM from 'react-dom'
import {Stage, Loop, ResourceLoader, TilingSprite, AnimatedSprite, TickEvent} from '../dist/index.js'
import {Vector} from 'vangogh500-physics'

class Animation extends React.Component {

  state = { pos:new Vector(0,200,0) }

  handleTick = (function() {
    this.setState({ pos: this.state.pos.add(new Vector(1,0,0))})
  }).bind(this)

  render() {
    return (
      <div>
        <TilingSprite res={['example', 'grass.png']} size={new Vector(1600,1200)} />
        {
        <AnimatedSprite animationSpeed={2} res={[['example','girl_1.png'], ['example', 'girl_2.png']]} position={this.state.pos}/>
        }
        <TickEvent onTick={this.handleTick} />
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
