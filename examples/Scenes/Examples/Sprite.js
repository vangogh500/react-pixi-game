import React from 'react'
import {Loop, Stage, ResourceLoader, Sprite} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'
import {FormattedMessage} from 'react-intl'

export default class SpriteExample extends React.Component {
  render() {
    return (
      <div>
        <Loop>
          <Stage>
            <ResourceLoader resources={[['example', './assets/spritesheet.json']]}>
              <Sprite position={new Vector(400,300)} res={['example', 'girl_1.png']} />
            </ResourceLoader>
          </Stage>
        </Loop>
        <Jumbotron className="m-w-800px">
          <p className="text-muted"><FormattedMessage id="sprites.line_1" /></p>
          <p className="text-muted"><FormattedMessage id="sprites.line_2" /></p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Loop, Stage, ResourceLoader, Sprite}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'react-pixi-game'</code>
            <br/>
            <code className="text-orange">import</code>{" "}
            <code>{"{Vector}"}</code>{" "}
            <code className="text-orange">from</code>{" "}
            <code className="text-green">'vangogh500-physics'</code>
            <br/>
            <code>{"<Loop>"}</code>
            <br/>
            <code>{" <Stage width={800} height={600}>"}</code>
            <br />
            <code>{"  <ResourceLoader resources={[['example', '/assets/spritesheet.json']]}>"}</code>
            <br/>
            <code>{"   <Sprite position={new Vector(400,300)} res={['example', 'girl_1.png']} />"}</code>
            <br/>
            <code>{"  </ResourceLoader>"}</code>
            <br />
            <code>{" </Stage>"}</code>
            <br />
            <code>{"</Loop>"}</code>
          </pre>
        </Jumbotron>
      </div>
    )
  }
}
