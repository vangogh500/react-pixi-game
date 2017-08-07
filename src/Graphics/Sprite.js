/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import DisplayObject from './abstracts/DisplayObject.js'
import type {PropTypes as DOPT} from './abstracts/DisplayObject.js'
import {Sprite as PIXISprite} from 'pixi.js'
import {withContext} from '../hocs.js'

/**
 * @memberof Sprite
 */
type PropTypes = {
  // can be url, resource name, or a tuple of resource name and texture name
  texture: string | [string, string],
  resources?: any,
} & DOPT


/**
 * Sprite.
 * @example
 *
 * <Game>
 *  <ResourceProvider resources={[['mario', '/img/mario.png']]}>
 *   <Stage autoResize={true}>
 *    <Sprite resource={'mario'} />
 *   </Stage>
 *  </ResourceProvider>
 * </Game>
 */
class Sprite extends DisplayObject<{}, PropTypes> {
  /**
   * Generate sprite using props.
   * @memberof Sprite
   * @alias createSpriteWithProps
   * @param {PropTypes} props
   * @returns {PIXI.Sprite}
   */
  createDisplayObject() {
    const {resources, texture} = this.props
    if(typeof texture === 'string') {
      if(resources && resources[texture]) {
        return new PIXISprite(resources[texture].texture)
      }
      return PIXISprite.fromImage(texture)
    }
    if(resources) {
      const [resourceName, textureName] = texture
      return new PIXISprite(resources[resourceName].textures[textureName])
    }
    throw new ReferenceError('Incorrect prop types')
  }

  /**
   * Modifies sprite in state depending on prop change.
   * @param {PropTypes} nextProps
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    var {texture} = nextProps
    if(this.props.texture !== texture) {
      this.setState({ displayObject: this.createDisplayObject() })
    }
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object
}

export default withContext(contextTypes)(Sprite)
