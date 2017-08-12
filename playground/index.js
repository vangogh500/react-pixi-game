/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import {Vector, Velocity} from 'vangogh500-physics'

ReactDOM.render(
  <Loop>
    <Stage>
      <World>
        <Body id="particle1" initialState={Velocity(Vector(), Vector())}>
          <Position>
            <Circle size={Vector(150,100)} color={0x888FFF} />
          </Position>
        </Body>
      </World>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
