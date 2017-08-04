import React from 'react'
import { Jumbotron, Button, Alert, Input, Label } from 'reactstrap';


export default class Home extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome to RPG</h1>
        <h5>By Vangogh500 (Kai Matsuda)</h5>
        <br />
        <p>A new way to code web applications using PIXI.js and Facebook's React.</p>
        <hr />
        <h4>Why use RPG?</h4>
        <ul>
          <li>
            <h5>Harness the power of WebGL:</h5>
            <p>Take advantage of the client's gpu, allowing for a more extensive and complex app with minimal performance costs. Using both the cpu and gpu will give your apps the power it deserves.</p>
          </li>
          <li>
            <h5>Take advantage of the modularity and simplicity of react:</h5>
            <p>Facebook's react is becoming one of the web's most popular frameworks. Encapsulating pixi with React allows for readable and reusable code for WebGL.</p>
          </li>
        </ul>
        <hr />
        <Alert color="warning">
          RPG is currently in beta version 0.0.3.
        </Alert>
        <Alert color="danger">
          Migrating to scala.js to take advantage of both the language features/performance advantages of scala and akka' concurrency model, which allows for multiprocesses on the browser.
        </Alert>
        <Alert color="warning">
          <h4>Dependencies</h4>
          <p>This project is in works with vangogh500-physics a concurrent physics engine utilizing akka's concurrency model.</p>
          <ul>
            <li>Pixi.js</li>
            <li>React.js</li>
            <li>vangogh500-physics</li>
          </ul>
        </Alert>
        <Alert color="success">
          Feel free to message me on my Github if you would like to contribute. Link <a href="https://github.com/vangogh500">here</a>.
        </Alert>
        <hr />
        <h4>Installation</h4>

        <Alert color="info">
          RPG is currently available on npm.
          <br/>
          To add it as a dependency to your project, simply run: <code>npm install --save react-pixi-game</code>
        </Alert>

        <hr />
        <h4>Dev log:</h4>
        <h5>v0.0.3</h5>
        <Label check>
          <Input checked disabled type="checkbox" /> App: loop, stage, loaders
        </Label>
        <br />
        <Label check>
          <Input checked disabled type="checkbox" /> Square
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Circle
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Animated Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Tiling Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Container
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Tick Action
        </Label>

        <h5 className="p-top-30px">v0.0.4</h5>
        <Label check>
          <Input disabled type="checkbox" /> Migrate to scala.js
        </Label>

        <h5 className="p-top-30px">v0.0.5</h5>
        <Label check>
          <Input disabled type="checkbox" /> Displacement Filter
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Blur Filter
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Color Matrix Filter
        </Label>

        <h5 className="p-top-30px">v0.0.6</h5>
        <Label check>
          <Input disabled type="checkbox" /> Mouse Action
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Keyboard Action
        </Label>

        <h5 className="p-top-30px">v0.0.7</h5>
        <Label check>
          <Input disabled type="checkbox" /> Physics Environment
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Physics Body
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Forces
        </Label>
      </Jumbotron>
    )
  }
}
