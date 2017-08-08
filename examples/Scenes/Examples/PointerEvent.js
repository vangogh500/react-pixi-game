import React from 'react'
import {PrismCode} from "react-prism"
import {Loop, Stage, Rectangle, Circle, PointerEvent} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'
import {FormattedMessage} from 'react-intl'

export default class PointerEventExample extends React.Component {
  state = {
    pos: new Vector(400,300)
  }
  handleClick = (function(event) {
    const {x,y} = event.data.global
    this.setState({ pos: new Vector(x,y) })
  }).bind(this)
  render() {
    return(
      <div>
        <Loop>
          <Stage height={600} width={800}>
            <Circle position={this.state.pos} size={new Vector(150,100)} color={0x888FFF} />
            <PointerEvent onPointerDown={this.handleClick} />
          </Stage>
        </Loop>
        <Jumbotron className="m-w-800px">
          <p className="text-muted"><FormattedMessage id="pointerevent.line_1" /></p>
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
            <code>{" state = { pos: new Vector(400,300) }"}</code>
            <br/>
            <code>{" handleClick = (function(event) {"}</code>
            <br/>
            <code>{"  const {x,y} = event.data.global"}</code>
            <br/>
            <code>{"  this.setState({ pos: new Vector(x,y) })"}</code>
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
            <code>{"     <Circle position={this.state.pos} size={new Vector(150,100)} color={0x888FFF} />"}</code>
            <br/>
            <code>{"     <PointerEvent onPointerDown={this.handleClick} />"}</code>
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
