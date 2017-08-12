/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import World from '../src/World/Components/World.js'
import Body from '../src/World/Components/Body.js'
import Position from '../src/World/Components/Position.js'

import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import {Vector, Velocity} from 'vangogh500-physics'

ReactDOM.render(
  <Loop>
    <Stage>
      <World>
        <Body id="particle1" initialState={Velocity(Vector(100), Vector())}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle2" initialState={Velocity(Vector(200), Vector(0,10))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle3" initialState={Velocity(Vector(100), Vector(0,30))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle4" initialState={Velocity(Vector(300), Vector(0,40))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle5" initialState={Velocity(Vector(50), Vector(0,60))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle6" initialState={Velocity(Vector(70), Vector(0,80))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle7" initialState={Velocity(Vector(50), Vector(0,100))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle8" initialState={Velocity(Vector(30), Vector(0,120))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle9" initialState={Velocity(Vector(400), Vector(0,150))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle10" initialState={Velocity(Vector(70), Vector(0,180))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle11" initialState={Velocity(Vector(600), Vector(0,200))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle12" initialState={Velocity(Vector(400), Vector(0,100))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
      </World>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
