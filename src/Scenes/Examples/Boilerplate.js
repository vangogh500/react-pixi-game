import React from 'react'
import {PrismCode} from "react-prism"
import {Game, Stage} from 'react-pixi-game'
import {Jumbotron} from 'reactstrap'

export default class BoilerPlate extends React.Component {
  render() {
    return(
      <div>
        <Game>
          <Stage></Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted">A pixi app is initialized using the game component. Game loop is supplied here.</p>
          <p className="text-muted">The stage component creates the canvas and renderer for your app to use to display content. Thanks to Pixi.js, RPG will default to a basic HTML canvas if WebGL is not supported by the browser.</p>
          <p className="text-muted">The world (not yet implemented) provides physics for the bodies within it.</p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, World}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'react-pixi-game'</code>
            <br/>
            <code>{"<Game>"}</code>
            <br/>
            <code>{" <Stage width={800} height={600}>"}</code>
            <br />
            <code>{"  <World p={1}>"}</code>
            <br/>
            <code>{"   { // visual content goes here }"}</code>
            <br/>
            <code>{"  </World>"}</code>
            <br />
            <code>{" </Stage>"}</code>
            <br />
            <code>{"</Game>"}</code>
          </pre>
        </Jumbotron>
      </div>
    )
  }
}
