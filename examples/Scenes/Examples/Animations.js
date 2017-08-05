import React from 'react'
import {Game, Stage, ResourceProvider, Sprite, TickEvent} from 'react-pixi-game'
import {Jumbotron} from 'reactstrap'
import {Vector} from 'vangogh500-physics'

type StateTypes = {
  rotation: Vector
}

export default class AnimationExample extends React.Component<void,void,StateTypes> {
  state = {
    rotation: new Vector()
  }
  handleTick = (function() {
    this.setState({ rotation: this.state.rotation.add(new Vector(0,0,0.01)) })
  }).bind(this)
  render() {
    return (
      <div>
        <Game>
          <Stage>
            <ResourceProvider resources={[['example', '/assets/spritesheet.json']]}>
              {
              <Sprite rotation={this.state.rotation} anchor={new Vector(0.5,0.5)} texture={['example', 'girl_1.png']} position={new Vector(400,300)}  />
              }
              <TickEvent onTick={this.handleTick} />
            </ResourceProvider>
          </Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted">You can automatically access the game loop using the tick event component and passing a custom callback. Ticks are generated at around 30FPS and can be modified. Make sure you pass a reference to a function. It will be needed later for identification when the function is unhooked from the event listener.</p>
          <p className="text-muted">This paradigm is an inspiration from the react-game-kit library.</p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, ResourceProvider, Sprite, TickEvent}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'react-pixi-game'</code>
            <br/>
            <code className="text-orange">import</code>{" "}
            <code>{"{Vector}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'vangogh500-physics'</code>
            <br/>
            <br/>
            <code className="text-orange">class</code> Example <code className="text-orange">extends </code><code>{"React.Component {"}</code>
            <br/>
            <code>{" state = { rotation: new Vector() }"}</code>
            <br/>
            <code>{" handleTick = (function() {"}</code>
            <br/>
            <code>{"  this.setState({ rotation: this.state.rotation.add(new Vector(0,0,0.01)) })"}</code>
            <br/>
            <code>{" }).bind(this)"}</code>
            <br/>
            <code>{" render() {"}</code>
            <br/>
            <code>{"  return ("}</code>
            <br/>
            <code>{"   <Game>"}</code>
            <br/>
            <code>{"    <Stage width={800} height={600}>"}</code>
            <br />
            <code>{"     <ResourceProvider resources={[['example', '/assets/spritesheet.json']]}>"}</code>
            <br/>
            <code>{"      {"}</code>
            <br/>
            <code>{"      <Sprite rotation={this.state.rotation} anchor={new Vector(0.5,0.5)} position={new Vector(400,300)} texture={['example', 'girl_1.png']} />"}</code>
            <br/>
            <code>{"      }"}</code>
            <br/>
            <code>{"      <TickEvent onTick={this.handleTick} />"}</code>
            <br/>
            <code>{"     </ResourceProvider>"}</code>
            <br />
            <code>{"    </Stage>"}</code>
            <br />
            <code>{"   </Game>"}</code>
            <br/>
            <code>{"  )"}</code>
            <br/>
            <code>{"}}"}</code>
          </pre>
        </Jumbotron>
      </div>
    )
  }
}
