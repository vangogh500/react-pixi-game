/* @flow */
import React from 'react'
import {extras, Point as PIXIPoint} from 'pixi.js'
import type {Container as PIXIContainer} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof TilingSprite
 */
type PropTypes = {
  // can be a url or a duple of resource name and texture name
  texture: string | [string,string],
  size: Vector,
  container: PIXIContainer,
  fullScreen: boolean,
  anchor: Vector,
  position: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  resources?: any
}

type DefaultPropTypes = {
  fullScreen: boolean,
  anchor: number,
  position: Vector,
  rotation: number,
  scale: Vector,
  alpha: number
}

type StateTypes = {
  sprite: extras.TilingSprite
}

/**
 * Animated Sprite.
 * @example
 *
 * <Game>
 *  <ResourceProvider resources={[['brick', '/img/brick.png']]}>
 *   <Stage autoResize={true}>
 *    <TilingSprite resource={'brick'} />
 *   </Stage>
 *  </ResourceProvider>
 * </Game>
 */
class TilingSprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  /**
   * Default props.
   * @prop {Vector} anchor Defaults to zero vector.
   * @prop {Vector} rotation Defaults to zero vector.
   * @prop {Vector} scale Defaults to zero vector.
   * @prop {number} alpha Defaults to 1.
   * @prop {number} animationSpeed Defaults to 1.
   */
  static defaultProps = {
    fullScreen: false,
    anchor: new Vector(),
    position: new Vector(),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1
  }

  /**
   * Generate sprite using props.
   * @memberof TilingSprite
   * @method
   * @alias createSpriteWithProps
   * @param {PropTypes} props
   * @returns {PIXI.extras.TilingSprite}
   */
  static createSpriteWithProps(props: PropTypes): extras.TilingSprite {
    const {resources, texture} = props
    if(typeof texture === 'string') {
      if(resources && resources[texture]) {
        return new extras.TilingSprite(resources[texture].texture)
      }
      return extras.TilingSprite.fromImage(texture)
    }
    if(resources) {
      const [resourceName, textureName] = texture
      return new extras.TilingSprite(resources[resourceName].textures[textureName])
    }
    throw new ReferenceError('Incorrect prop types')
  }

  /**
   * Configure a sprite using props.
   * @param {PIXI.Sprite} sprite The sprite to configure.
   * @param {PropTypes} props Props to use as configuration.
   * @returns {PIXI.extras.TilingSprite} Returns the configured sprite after configuration.
   */
  static configureSpriteWithProps(sprite: extras.TilingSprite, props: PropTypes): extras.TilingSprite {
    const {size, anchor, alpha, position, rotation, scale} = props
    sprite.size = size
    sprite.anchor = new PIXIPoint(anchor.x, anchor.y)
    sprite.alpha = alpha
    sprite.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
    return sprite
  }

  state: StateTypes

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      sprite: TilingSprite.configureSpriteWithProps(TilingSprite.createSpriteWithProps(this.props), this.props)
    }
  }

  /**
   * Life cycle hook for mounting. Mounts sprite to container.
   * @memberof TilingSprite
   * @method
   * @instance
   * @alias componentDidMount
   */
  componentDidMount(): void {
    const {container} = this.props
    const {sprite} = this.state
    container.addChild(sprite)
  }
  /**
   * Life cycle hook for unmounting. Unmounts sprite from container.
   * @memberof TilingSprite
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
    var {texture} = nextProps
    if(this.props.texture !== texture) {
      this.setState({ sprite: TilingSprite.createSpriteWithProps(nextProps) })
    }
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof TilingSprite
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
    TilingSprite.configureSpriteWithProps(nextState.sprite, nextProps)
    if(nextState.sprite !== this.state.sprite || nextProps.container !== this.props.container) {
      this.props.container.removeChild(this.state.sprite)
      nextProps.container.addChild(nextState.sprite)
    }
  }

  /**
   * Renders react element.
   * @memberof Sprite
   * @method
   * @instance
   * @alias render
   */
  render() {
    console.log("Tiling sprite render")
    return null
  }
}
