import React from 'react'
import {Game, Stage, ResourceProvider, TilingSprite} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'

console.log(TilingSprite)
export default class TilingSpriteExample extends React.Component {
  render() {
    return (
      <div>
        <Game>
          <Stage>
            <ResourceProvider resources={[['example', './assets/spritesheet.json']]}>
              <TilingSprite size={new Vector(600,600)} texture={['example', 'grass.png']} />
            </ResourceProvider>
          </Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted">The tiling sprite allows you to create backgrounds from a single sprite.</p>
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
            <code>{"   <TilingSprite size={new Vector(300,300)} texture={['example', 'grass.png']} />"}</code>
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
