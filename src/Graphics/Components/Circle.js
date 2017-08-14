/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {withContext} from '../../hocs.js'
import {Point as PIXIPoint} from 'pixi.js'

import mix from '../../mixins/mix.js'
import PropBasedUpdate from '../../mixins/PropBasedUpdate.js'
import Graphical from '../mixins/Graphical.js'
import Mounted from '../mixins/Mounted.js'

/**
 * Provides a circle graphic. Inherits props from Graphical mixin.
 * @example
 *
 * <Circle position={new Vector()} color={0xFFF888} rotation={new Vector(0,0,Math.PI)} />
 */
class Circle extends mix(React.Component).with(Graphical) {
  /**
   * Draws a circle on the container.
   */
  drawGraphics() {
    const {graphics} = this.state
    const {color, alpha, position, size, rotation} = this.props
    console.log("draw")
    graphics.beginFill(color)
    graphics.position.x = position.x
    graphics.position.y = position.y
    graphics.drawEllipse(0, 0, size.x, size.y)
    graphics.alpha = alpha
    graphics.rotation = rotation.z
    graphics.endFill()
  }

  /**
   * Updates the circle graphic using props.
   */
  updateGraphics(props) {
    const {graphics} = this.state
    const {color, alpha, position, size, rotation} = props
    graphics.setTransform(position.x, position.y, 1, 1, rotation.z)
    graphics.alpha = alpha
    graphics.width = size.x * 2
    graphics.height = size.y * 2
    graphics.graphicsData[0].fillColor = color
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(Circle)
