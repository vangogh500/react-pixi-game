/* @flow */
import React from 'react'
import RPGGraphics from './Graphics.js'
import ReactPropTypes from 'prop-types'
import {withContext} from '../hocs.js'

/**
 * RPG Rectangle.
 * @example
 *
 * <Game>
 *  <Stage autoResize={true}>
 *   <RPGRectangle color={0x000000} size={new Vector(100,100)} />
 *  </Stage>
 * </Game>
 */
class RPGRectangle extends RPGGraphics {
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
    graphics.drawRect(position.x, position.y, size.x, size.y)
    graphics.endFill()
    graphics.pivot.x = 50
    graphics.pivot.y = 50
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(RPGRectangle)
