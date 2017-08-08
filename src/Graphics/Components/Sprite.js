/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'

import {Sprite as PIXISprite} from 'pixi.js'

import type {PropTypes as DisplayObjectPropTypes} from '../mixins/DisplayObject.js'
import mix from '../../mixins/mix.js'
import SpriteMixin from '../mixins/Sprite.js'
import {Vector} from 'vangogh500-physics'
import {withContext} from '../../hocs.js'
/**
 * Prop types.
 * @memberof Sprite
 */
type PropTypes = {
  res: string | [string,string],
  resources: any
} & DisplayObjectPropTypes


/**
 * Provides a sprite component.
 * @example
 *
 * <ResourceProvider resources={[['mario', '/img/mario.png']]}>
 *  <Stage autoResize={true}>
 *   <Sprite resource={'mario'} />
 *  </Stage>
 * </ResourceProvider>
 *
 */
class Sprite extends mix(React.Component).with(SpriteMixin) {
  static defaultProps = {
    position: new Vector(),
    anchor: new Vector(0.5,0.5),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1
  }

  props: PropTypes

  /**
   * Creates an instance of pixi sprite.
   * @memberof Sprite
   */
  createSpriteWithProps(props: PropTypes): PIXISprite {
    const {resources, res} = props
    if(typeof res === 'string') {
      if(resources && resources[res]) {
        return new PIXISprite(resources[res].texture)
      }
      return new PIXISprite(res)
    }
    if(resources) {
      const [resourceName, textureName] = res
      return new PIXISprite(resources[resourceName].textures[textureName])
    }
    throw new ReferenceError('Incorrect prop types')
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object
}

export default withContext(contextTypes)(Sprite)
