/* @flow */
import React from 'react'
import RPGGraphics from './Graphics.js'
import ReactPropTypes from 'prop-types'
import {withContext} from '../hocs.js'

/**
 * RPG Circle
 * @example
 *
 * <Game>
 *  <Stage autoResize={true}>
 *   <RPGCircle color={0x000000} size={new Vector(100,100)} />
 *  </Stage>
 * </Game>
 */
class RPGCircle extends RPGGraphics {
  /**
   * Life cycle hook for drawing the graphics.
   * @memberof RPGCircle
   * @method
   * @instance
   * @alias drawGraphics
   */
  drawGraphics(): void {
    const {graphics} = this.state
    const {container, color, alpha, position, size} = this.props
    graphics.beginFill(color)
    graphics.alpha = alpha
    graphics.drawEllipse(position.x, position.y, size.x, size.y)
    graphics.endFill()
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(RPGCircle)
