/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'

import {Body, World, BodyMiddleware, Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import {Vector, Component as BodyComponent, MutatorUtil} from 'vangogh500-physics'

ReactDOM.render(
  <Loop>
    <Stage>
      <World pre={[MutatorUtil.fromJS(undefined, undefined, Vector(0,5))]}>
        {
          Array(100).fill("").map((elem, i) => {
            return (
              <Body key={"particle" + i} id={"particle" + i} initialState={BodyComponent(Vector(0, 150), Vector(2*i, -30))} middleware={BodyMiddleware.position} >
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
