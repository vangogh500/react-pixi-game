/* @flow */
import React from 'react'
import Graphics from './Graphics.js'
import ReactPropTypes from 'prop-types'
import {withContext} from '../hocs.js'

/**
 * RPG Rectangle.
 * @example
 *
 * <Game>
 *  <Stage autoResize={true}>
 *   <Rectangle color={0x000000} size={new Vector(100,100)} />
 *  </Stage>
 * </Game>
 */
class Rectangle extends Graphics {
  /**
   * Life cycle hook for drawing the graphics.
   * @memberof Rectangle
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

export default withContext(contextTypes)(Rectangle)
