import React from 'react'
import {loader} from 'pixi.js'
import ReactDOM from 'react-dom'
import {Game, Stage, withLoop} from '../src/index.js'

class looper extends React.Component {
  componentDidMount() {

  }
  render() {

  }
}
const Looper = withLoop(looper)
loader.add('mario', 'http://cdn.ndtv.com/tech/gadgets/mario_8bit.jpg')
ReactDOM.render(
  <Game>
    <Stage autoResize={false}>
      <Looper />
    </Stage>
  </Game>,
  document.getElementById('example_1')
)
