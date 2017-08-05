import React from 'react'
import {PrismCode} from "react-prism"
import {Game, Stage, Rectangle, Circle} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'
import {FormattedMessage} from 'react-intl'


export default class GeometryExample extends React.Component {
  render() {
    return(
      <div>
        <Game>
          <Stage>
            <Rectangle size={new Vector(300,300)} color={0xFFF888}/>
            <Circle position={new Vector(200,200)} size={new Vector(150,150)} color={0x888FFF} />
            <Rectangle size={new Vector(200,500)} color={0xFF88FF} position={new Vector(300,300)} />
          </Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted"><FormattedMessage id="geometry.line_1" /></p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, Rectangle, Circle}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'react-pixi-game'</code>
            <br/>
            <code className="text-orange">import</code>{" "}
            <code>{"{Vector}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'vangogh500-physics'</code>
            <br/>
            <code>{"<Game>"}</code>
            <br/>
            <code>{" <Stage width={800} height={600}>"}</code>
            <br />
            <code>{"  <Rectangle size={new Vector(300,300)} color={0xFFF888}/>"}</code>
            <br/>
            <code>{"  <Circle position={new Vector(200,200)} size={new Vector(150,150)} color={0x888FFF} />"}</code>
            <br/>
            <code>{"  <Rectangle size={new Vector(200,500)} color={0xFF88FF} position={new Vector(300,300)} />"}</code>
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
