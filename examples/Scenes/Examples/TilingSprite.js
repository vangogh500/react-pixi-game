import React from 'react'
import {Loop, Stage, ResourceLoader, TilingSprite} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
export default class TilingSpriteExample extends React.Component {
  render() {
    return (
      <div>
        <Loop>
          <Stage>
            <ResourceLoader resources={[['example', './assets/spritesheet.json']]}>
              <TilingSprite size={new Vector(1200,1200)} res={['example', 'grass.png']} />
            </ResourceLoader>
          </Stage>
        </Loop>
        <Jumbotron className="m-w-800px">
          <p className="text-muted"><FormattedMessage id="tilingsprite.line_1" /></p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, ResourceProvider, TilingSprite}"}</code>{" "}
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
            <code>{"  <ResourceProvider resources={[['example', '/assets/spritesheet.json']]}>"}</code>
            <br/>
            <code>{"   <TilingSprite size={new Vector(1200,1200)} texture={['example', 'grass.png']} />"}</code>
            <br/>
            <code>{"  </ResourceProvider>"}</code>
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
