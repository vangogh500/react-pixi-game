import React from 'react'
import {Game, Stage} from 'react-pixi-game'

export default class BoilerPlate extends React.Component {
  render() {
    return(
      <Game>
        <Stage></Stage>
      </Game>
    )
  }
}
