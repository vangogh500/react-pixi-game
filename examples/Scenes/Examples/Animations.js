import React from 'react'
import {Loop, Stage, ResourceLoader, Sprite, TickEvent} from 'react-pixi-game'
import {Jumbotron} from 'reactstrap'
import {Vector} from 'vangogh500-physics'
import {FormattedMessage} from 'react-intl'

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
        <Loop>
          <Stage>
            <ResourceLoader resources={[['example', './assets/spritesheet.json']]}>
              {
              <Sprite rotation={this.state.rotation} res={['example', 'girl_1.png']} position={new Vector(400,300)}  />
              }
              <TickEvent onTick={this.handleTick} />
            </ResourceLoader>
          </Stage>
        </Loop>
        <Jumbotron className="m-w-800px">
          <p className="text-muted"><FormattedMessage id="animations.line_1" /></p>
          <p className="text-muted"><FormattedMessage id="animations.line_2" /></p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Loop, Stage, ResourceLoader, Sprite, TickEvent}"}</code>{" "}
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
            <code>{"   <Loop fpsCap={30}>"}</code>
            <br/>
            <code>{"    <Stage width={800} height={600}>"}</code>
            <br />
            <code>{"     <ResourceLoader resources={[['example', '/assets/spritesheet.json']]}>"}</code>
            <br/>
            <code>{"      {"}</code>
            <br/>
            <code>{"      <Sprite rotation={this.state.rotation} position={new Vector(400,300)} res={['example', 'girl_1.png']} />"}</code>
            <br/>
            <code>{"      }"}</code>
            <br/>
            <code>{"      <TickEvent onTick={this.handleTick} />"}</code>
            <br/>
            <code>{"     </ResourceLoader>"}</code>
            <br />
            <code>{"    </Stage>"}</code>
            <br />
            <code>{"   </Loop>"}</code>
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
