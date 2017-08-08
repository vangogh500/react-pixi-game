import React from 'react'
import {PrismCode} from "react-prism"
import {Loop, Game, Stage, ResourceLoader, TilingSprite, AnimatedSprite, TickEvent, PointerEvent} from 'react-pixi-game'
import {Jumbotron} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import {Vector} from 'vangogh500-physics'


class Animation extends React.Component {
  state = { pos:new Vector(0,200,0) }
  handleTick = (function() {
    const {pos} = this.state
    const nextPos = (pos.x > 800) ? new Vector(0, pos.y) : pos.add(new Vector(2))
    this.setState({ pos: nextPos})
  }).bind(this)
  handleClick = (function(event) {
    const {x,y} = event.data.global
    this.setState({ pos: new Vector(x,y) })
  }).bind(this)
  render() {
    return (
      <div>
        <TilingSprite res={['example', 'grass.png']} size={new Vector(1590,1200)} />
        {
        <AnimatedSprite animationSpeed={2} res={[['example','girl_1.png'], ['example', 'girl_2.png']]} position={this.state.pos}/>
        }
        <TickEvent onTick={this.handleTick} />
        <PointerEvent onPointerDown={this.handleClick} />
      </div>
    )
  }
}

export default class BoilerPlate extends React.Component {
  render() {
    return(
      <div>
        <Loop>
          <Stage>
            <ResourceLoader resources={[['example', './assets/spritesheet.json']]}>
              <Animation />
            </ResourceLoader>
          </Stage>
        </Loop>
        <Jumbotron className="m-w-800px">
          <p className="font-bold"><FormattedMessage id="boilerplate.line_1" /></p>
          <p className="text-muted"><FormattedMessage id="boilerplate.line_2" /></p>
          <p className="text-muted"><FormattedMessage id="boilerplate.line_3" /></p>
          <p className="text-muted"><FormattedMessage id="boilerplate.line_4" /></p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Loop, Stage, ResourceLoader}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'react-pixi-game'</code>
            <br/>
            <code>{"<ResourceLoader resources={['example', 'assets/spritesheet.json']}>"}</code>
            <br/>
            <code>{" <Loop fpsCap={30}>"}</code>
            <br />
            <code>{"  <Stage width={800} height={600} resolution={1}>"}</code>
            <br/>
            <code>{"   { // visual content goes here }"}</code>
            <br/>
            <code>{"  </Stage>"}</code>
            <br />
            <code>{" </Loop>"}</code>
            <br />
            <code>{"</ResourceLoader>"}</code>
          </pre>
        </Jumbotron>
      </div>
    )
  }
}
