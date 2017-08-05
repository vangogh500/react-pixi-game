import React from 'react'
import {Game, Stage, ResourceProvider, Sprite} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'

export default class SpriteExample extends React.Component {
  render() {
    return (
      <div>
        <Game>
          <Stage>
            <ResourceProvider resources={[['example', './assets/spritesheet.json']]}>
              <Sprite position={new Vector(100,100)} texture={['example', 'girl_1.png']} />
            </ResourceProvider>
          </Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted">Sprites can be created by an url. However it is recommended to use resource provider to preload the assets for performance reasons.</p>
          <p className="text-muted">In this example we provide the loader with a texture atlas of a sprite sheet (a sprite sheet is more efficient than loading in your assets seperately). The loader will refrain from rendering until all resources are loaded.</p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, ResourceProvider, Sprite}"}</code>{" "}
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
            <code>{"   <Sprite position={new Vector(100,100)} texture={['example', 'girl_1.png']} />"}</code>
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
