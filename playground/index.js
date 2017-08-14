/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import World from '../src/World/Components/World.js'
import Body from '../src/World/Components/Body.js'
import Position from '../src/World/Components/Position.js'

import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import {Vector, Component as BodyComponent, MutatorUtil} from 'vangogh500-physics'
import {BodyMiddleware} from '../src/World/Middleware.js'

ReactDOM.render(
  <Loop>
    <Stage>
      <World pre={[MutatorUtil.fromJS(undefined, undefined, Vector(0,5))]}>
        {
          Array(100).fill("").map((elem, i) => {
            return (
              <Body key={"particle" + i} id={"particle" + i} initialState={BodyComponent(Vector(), Vector(5*i))} middleware={BodyMiddleware.position} >
                <Circle size={Vector(10,10)} color={0x888FFF} />
              </Body>
            )
          })
        }
      </World>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
