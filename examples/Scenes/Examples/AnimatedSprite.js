import React from 'react'
import {Game, Stage, ResourceProvider, AnimatedSprite} from 'react-pixi-game'
import {Vector} from 'vangogh500-physics'
import {Jumbotron} from 'reactstrap'

export default class AnimatedSpriteExample extends React.Component {
  render() {
    return (
      <div>
        <Game>
          <Stage>
            <ResourceProvider resources={[['example', '/assets/spritesheet.json']]}>
              <AnimatedSprite animationSpeed={0.03} position={new Vector(400,300)} anchor={new Vector(0.5,0.5)} textures={[['example', 'girl_1.png'], ['example', 'girl_2.png']]} />
            </ResourceProvider>
          </Stage>
        </Game>
        <Jumbotron className="m-w-800px">
          <p className="text-muted">RPG also comes with an extension of Pixi's animated sprite, which allows for easy sprite animations.</p>
          <pre className="font-weight-500">
            <code className="text-orange">import</code>{" "}
            <code>{"{Game, Stage, ResourceProvider, AnimatedSprite}"}</code>{" "}
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
            <code>{"   <AnimatedSprite animationSpeed={0.03} position={new Vector(100,100)} texture={[['example', 'girl_1.png'],['example','girl_2.png']]} />"}</code>
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
