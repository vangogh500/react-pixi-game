/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import World from '../src/World/Components/World.js'
import Body from '../src/World/Components/Body.js'
import Position from '../src/World/Components/Position.js'

import {Stage, Loop, ResourceLoader, Rectangle, TickEvent, PointerEvent, Circle} from '../dist/index.js'
import {Vector, Acceleration, AccelerationMutator} from 'vangogh500-physics'

ReactDOM.render(
  <Loop>
    <Stage>
      <World mutators={[AccelerationMutator(Vector(0,10))]}>
        <Body id="particle1" initialState={Acceleration(Vector(), Vector(100), Vector())}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle2" initialState={Acceleration(Vector(), Vector(120), Vector(0,10))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle3" initialState={Acceleration(Vector(), Vector(130), Vector(0,30))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle4" initialState={Acceleration(Vector(), Vector(20), Vector(0,40))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle5" initialState={Acceleration(Vector(), Vector(50), Vector(0,60))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle6" initialState={Acceleration(Vector(), Vector(70), Vector(0,80))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle7" initialState={Acceleration(Vector(), Vector(50), Vector(0,100))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle8" initialState={Acceleration(Vector(), Vector(30), Vector(0,120))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle9" initialState={Acceleration(Vector(), Vector(55), Vector(0,150))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle10" initialState={Acceleration(Vector(), Vector(70), Vector(0,180))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle11" initialState={Acceleration(Vector(), Vector(30), Vector(0,200))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
        <Body id="particle12" initialState={Acceleration(Vector(), Vector(40), Vector(0,100))}>
          <Position>
            <Circle size={Vector(10,10)} color={0x888FFF} />
          </Position>
        </Body>
      </World>
    </Stage>
  </Loop>,
  document.getElementById('app')
)
