/* @flow */
import React from 'react'
import {extras, Texture as PIXITexture, Point} from 'pixi.js'
import type {Container as PIXIContainer} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof AnimatedSprite
 */
type PropTypes = {
  // can be an array of url, resource names, or tuples of resource name and texture name
  textures: Array<string | [string,string]>,
  container: PIXIContainer,
  position: Vector,
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  animationSpeed: number,
  resources?: any
}

type DefaultPropTypes = {
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  animationSpeed: number
}

/**
 * @memberof AnimatedSprite
 */
type StateTypes = {
  sprite: extras.AnimatedSprite
}

/**
 * Animated Sprite.
 * @example
 *
 * <Game>
 *  <ResourceProvider resources={[['mario', '/img/mario.png', 'mario2', '/img/mario2.png']]}>
 *   <Stage autoResize={true}>
 *    <AnimatedSprite resourceArray={['mario', 'mario2']} />
 *   </Stage>
 *  </ResourceProvider>
 * </Game>
 */
class AnimatedSprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  /**
   * Default props.
   * @prop {Vector} anchor Defaults to zero vector.
   * @prop {Vector} rotation Defaults to zero vector.
   * @prop {Vector} scale Defaults to zero vector.
   * @prop {number} alpha Defaults to 1.
   * @prop {number} animationSpeed Defaults to 1.
   */
  static defaultProps = {
    anchor: new Vector(),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1,
    animationSpeed: 1
  }

  /**
   * Generate sprite using props.
   * @memberof AnimatedSprite
   * @method
   * @alias createSpriteWithProps
   * @param {PropTypes} props
   * @returns {PIXI.Sprite}
   */
  static createSpriteWithProps(props: PropTypes): extras.AnimatedSprite {
    const {resources, textures} = props
    const textureArray = textures.map((texture) => {
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
    console.log(textureArray)
    return new extras.AnimatedSprite(textureArray)
  }

  /**
   * Configure a sprite using props.
   * @prop {PIXI.Sprite} sprite The sprite to configure.
   * @prop {PropTypes} props Props to use as configuration.
   * @returns {PIXI.Sprite} Returns the configured sprite after configuration.
   */
  static configureSpriteWithProps(sprite: extras.AnimatedSprite, props: PropTypes): extras.AnimatedSprite {
    const {anchor, alpha, position, rotation, scale, animationSpeed} = props
    sprite.anchor = new Point(anchor.x, anchor.y)
    sprite.alpha = alpha
    sprite.animationSpeed = animationSpeed
    sprite.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
    sprite.play()
    return sprite
  }

  state: StateTypes

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      sprite: AnimatedSprite.configureSpriteWithProps(AnimatedSprite.createSpriteWithProps(this.props), this.props)
    }
  }

  /**
   * Life cycle hook for mounting. Mounts sprite to container.
   * @memberof AnimatedSprite
   * @method
   * @instance
   * @alias componentDidMount
   */
  componentDidMount(): void {
    const {container} = this.props
    const {sprite} = this.state
    console.log(sprite)
    container.addChild(sprite)
  }
  /**
   * Life cycle hook for unmounting. Unmounts sprite from container.
   * @memberof AnimatedSprite
   * @method
   * @instance
   * @alias componentWillUnmount
   */
  componentWillUnmount(): void {
    const {container} = this.props
    const {sprite} = this.state
    container.removeChild(sprite)
  }

  /**
   * Modifies sprite in state depending on prop change.
   * @param {PropTypes} nextProps
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    var {textures} = nextProps
    if(this.props.textures !== textures) {
      this.setState({ sprite: AnimatedSprite.createSpriteWithProps(nextProps) })
    }
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof AnimatedSprite
   * @instance
   * @method
   * @alias shouldComponentUpdate
   * @param {PropTypes} nextProps
   * @returns {boolean} If component should update.
   */
  shouldComponentUpdate(nextProps: PropTypes, nextState: StateTypes): boolean {
    return (nextState.sprite !== this.state.sprite) || !shallowCompare(this.props, nextProps)
  }

  /**
   * Updates component.
   * @param {PropTypes} nextProps
   * @param {StateTypes} nextState
   */
  componentWillUpdate(nextProps: PropTypes, nextState: StateTypes): void {
    AnimatedSprite.configureSpriteWithProps(nextState.sprite, nextProps)
    if(nextState.sprite !== this.state.sprite || nextProps.container !== this.props.container) {
      this.props.container.removeChild(this.state.sprite)
      nextProps.container.addChild(nextState.sprite)
    }
  }

  /**
   * Renders react element.
   * @memberof AnimatedSprite
   * @method
   * @instance
   * @alias render
   */
  render() {
    console.log("Animated sprite render")
    return null
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object
}

export default withContext(contextTypes)(AnimatedSprite)
