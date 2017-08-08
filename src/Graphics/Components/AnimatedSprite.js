/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'

import {extras, Texture as PIXITexture} from 'pixi.js'

import type {PropTypes as DisplayObjectPropTypes} from '../mixins/DisplayObject.js'
import GameLoop from '../../GameLoop.js'
import mix from '../../mixins/mix.js'
import SpriteMixin from '../mixins/Sprite.js'
import {Vector} from 'vangogh500-physics'
import {withContext} from '../../hocs.js'

/**
 * Prop types. Inherits props from DisplayObject mixin.
 * @memberof AnimatedSprite
 * @prop {Array<string | [string,string]>} res Resources for creating the frames. Can be an array of urls or array of strings/tuples ref resources from the resource provider.
 * @prop {number} animationSpeed Speed of animation between frames. Defaults to 1.
 */
type PropTypes = {
  res: Array<string | [string,string]>,
  animationSpeed: number,
  resources: any,
  loop: GameLoop
} & DisplayObjectPropTypes


/**
 * Provides an animated sprite component.
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
    alpha: 1,
    animationSpeed: 1
  }

  props: PropTypes

  /**
   * Updates the sprite.
   */
  update(props: PropTypes) {
    super.update(props)
    this.state.displayObject.animationSpeed = props.animationSpeed
  }

  /**
   * Mounts the component. Subsribes to the game loop.
   */
  componentDidMount() {
    const {displayObject} = this.state
    this.props.loop.add(displayObject.update)
    super.componentDidMount()
  }
  /**
   * Unmounts the component. Unsubscribes from the game loop.
\   */
  componentWillUnmount() {
    const {displayObject} = this.state
    this.props.loop.remove(displayObject.update)
    super.componentWillUnmount()
  }

  /**
   * Creates an instance of Animated Sprite using props.
   * @param {PropTypes} props
   */
  createSpriteWithProps(props: PropTypes): extras.AnimatedSprite {
    const {resources, res, animationSpeed} = props
    const textureArray = res.map((texture) => {
      if(typeof texture === 'string') {
        if(resources && resources[texture]) {
          return resources[texture].texture
        }
        else {
          return new PIXITexture.fromImage(texture)
        }
      }
      if(resources) {
        const [resourceName, textureName] = texture
        return resources[resourceName].textures[textureName]
      }
      throw new ReferenceError('Incorrect prop types')
    })
    const sprite = new extras.AnimatedSprite(textureArray, false)
    sprite.animationSpeed = animationSpeed
    sprite.update = sprite.update.bind(sprite)
    return sprite
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object,
  loop: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(AnimatedSprite)
