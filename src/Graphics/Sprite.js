/* @flow */
import React from 'react'
import {Sprite as PIXISprite, Point as PIXIPoint} from 'pixi.js'
import type {PIXIContainer} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof RPGSprite
 */
type PropTypes = {
  // can be url, resource name, or a tuple of resource name and texture name
  texture: string | [string, string],
  container: PIXIContainer,
  position: Vector,
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  resources?: any
}

type DefaultPropTypes = {
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number
}

/**
 * @memberof RPGSprite
 */
type StateTypes = {
  sprite: PIXISprite
}

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
class Sprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  /**
   * Default props.
   * @prop {Vector} anchor Defaults to 0,0.
   * @prop {Vector} rotation Defaults to 0,0.
   * @prop {Vector} scale Defaults to 0,0.
   * @prop {number} alpha Defaults to 1.
   */
  static defaultProps = {
    anchor: new Vector(),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1
  }

  /**
   * Generate sprite using props.
   * @memberof Sprite
   * @method
   * @static
   * @param {PropTypes} props
   * @returns {PIXI.Sprite}
   * @throws {ReferenceError} For incorrect prop types.
   */
  static createSpriteWithProps(props: PropTypes): PIXISprite {
    const {resources, texture} = props
    if(typeof texture === 'string') {
      if(resources && resources[texture]) {
        return new PIXISprite(resources[texture].texture)
      }
      return new PIXISprite(texture)
    }
    if(resources) {
      const [resourceName, textureName] = texture
      return new PIXISprite(resources[resourceName].textures[textureName])
    }
    throw new ReferenceError('Incorrect prop types')
  }

  /**
   * Configure a sprite using props.
   * @prop {PIXI.Sprite} sprite The sprite to configure.
   * @prop {PropTypes} props Props to use as configuration.
   * @returns {PIXI.Sprite} Returns the configured sprite after configuration.
   */
  static configureSpriteWithProps(sprite: PIXISprite, props: PropTypes): PIXISprite {
    const {anchor, alpha, position, rotation, scale} = props
    sprite.anchor = new PIXIPoint(anchor.x, anchor.y)
    sprite.alpha = alpha
    sprite.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
    return sprite
  }

  state: StateTypes

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      sprite: Sprite.configureSpriteWithProps(Sprite.createSpriteWithProps(this.props), this.props)
    }
  }

  /**
   * Life cycle hook for mounting. Mounts sprite to container.
   * @memberof RPGSprite
   * @method
   * @instance
   * @alias componentDidMount
   */
  componentDidMount(): void {
    console.log("Sprite render")
    const {container} = this.props
    const {sprite} = this.state
    container.addChild(sprite)
  }
  /**
   * Life cycle hook for unmounting. Unmounts sprite from container.
   * @memberof RPGSprite
   * @method
   * @instance
   * @alias componentWillUnmount
   */
  componentWillUnmount(): void {
    const {container} = this.props
    const {sprite} = this.state
    console.log("sprite unmount")
    container.removeChild(sprite)
  }

  /**
   * Modifies sprite in state depending on prop change.
   * @param {PropTypes} nextProps
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    var {texture} = nextProps
    if(this.props.texture !== texture) {
      this.setState({ sprite: Sprite.createSpriteWithProps(nextProps) })
    }
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof RPGSprite
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
    Sprite.configureSpriteWithProps(nextState.sprite, nextProps)
    if(nextState.sprite !== this.state.sprite || nextProps.container !== this.props.container) {
      this.props.container.removeChild(this.state.sprite)
      nextProps.container.addChild(nextState.sprite)
    }
  }

  /**
   * Renders react element.
   * @memberof RPGSprite
   * @method
   * @instance
   * @alias render
   */
  render() {
    return null
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object
}

export default withContext(contextTypes)(Sprite)
