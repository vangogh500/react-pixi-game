/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'

import {extras} from 'pixi.js'

import type {PropTypes as DisplayObjectPropTypes} from '../mixins/DisplayObject.js'
import mix from '../../mixins/mix.js'
import SpriteMixin from '../mixins/Sprite.js'
import {Vector} from 'vangogh500-physics'
import {withContext} from '../../hocs.js'

/**
 * Prop types.
 * @memberof AnimatedSprite
 */
type PropTypes = {
  res: string | [string,string],
  resources: any,
  size: Vector
} & DisplayObjectPropTypes


/**
 * Provides a tiling sprite component.
 * @example
 *
 * <ResourceProvider resources={[['mario', '/img/mario.png'], ['mario2', '/img/mario2.png']]}>
 *  <Stage autoResize={true}>
 *   <AnimatedSprite resource={['mario', 'mario2']} />
 *  </Stage>
 * </ResourceProvider>
 *
 */
class AnimatedSprite extends mix(React.Component).with(SpriteMixin) {
  static defaultProps = {
    position: new Vector(),
    anchor: new Vector(0.5,0.5),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1
  }

  props: PropTypes

  /**
   * Updates the sprite.
   * @memberof TilingSprite
   */
  update(props: PropTypes) {
    super.update(props)
    const {size} = this.props
    const {displayObject} = this.state
    displayObject.width = size.x
    displayObject.height = size.y
  }

  /**
   * Creates an instance of tiling sprite.
   * @memberof TilingSprite
   */
  createSpriteWithProps(props: PropTypes): extras.AnimatedSprite {
    const {resources, res} = props
    if(typeof res === 'string') {
      if(resources && resources[res]) {
        return new extras.TilingSprite(resources[res].texture)
      }
      return extras.TilingSprite.fromImage(res)
    }
    if(resources) {
      const [resourceName, textureName] = res
      return new extras.TilingSprite(resources[resourceName].textures[textureName])
    }
    throw new ReferenceError('Incorrect prop types')
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object,
  loop: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(AnimatedSprite)
