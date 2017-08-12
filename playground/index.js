/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import World from '../src/World/Components/World.js'
import Body from '../src/World/Components/Body.js'
import {Vector, Velocity} from 'vangogh500-physics'

ReactDOM.render(
  <Loop>
    <Stage>
      <World>
        <Body id="particle1" initialState={Velocity(Vector(10), Vector())}>
          <Circle positon={Vector(100)} size={Vector(150,100)} color={0x888FFF} />
        </Body>
      </World>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
