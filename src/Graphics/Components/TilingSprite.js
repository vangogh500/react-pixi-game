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
 * Prop types. Inherits props from DisplayObject mixin.
 * @memberof TilingSprite
 * @prop {string | [string,string]} res Resource to create sprite. Can be an url or a reference to a resource from resource provider.
 * @prop {Vector} size Size of the sprite.
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
 * <ResourceProvider resources={[['grass', '/img/grass.png']]}>
 *  <Stage autoResize={true}>
 *   <TilingSprite resource={'grass'} />
 *  </Stage>
 * </ResourceProvider>
 *
 */
class TilingSprite extends mix(React.Component).with(SpriteMixin) {
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

export default withContext(contextTypes)(TilingSprite)
