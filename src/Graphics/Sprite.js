/* @flow */
import React from 'react'
import {Sprite, Texture, Container, Point, loaders} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof RPGSprite
 */
type PropTypes = {
  texture?: Texture | string,
  container: Container,
  position: Vector,
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  resource?: string,
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
  sprite: Sprite
}

/**
 * RPG Sprite.
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
class RPGSprite extends React.Component<DefaultPropTypes, PropTypes, *> {
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
   * Configure a sprite using props.
   * @prop {PIXI.Sprite} sprite The sprite to configure.
   * @prop {PropTypes} props Props to use as configuration.
   * @returns {PIXI.Sprite} Returns the configured sprite after configuration.
   */
  static configureSpriteWithProps(sprite: Sprite, props: PropTypes): Sprite {
    const {anchor, alpha, position, rotation, scale} = props
    sprite.anchor = new Point(anchor.x, anchor.y)
    sprite.alpha = alpha
    sprite.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
    return sprite
  }

  state: StateTypes

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      sprite: RPGSprite.configureSpriteWithProps(RPGSprite.createSpriteWithProps(this.props), this.props)
    }
  }

  /**
   * Generate sprite using props.
   * @memberof RPGSprite
   * @method
   * @static
   * @param {PropTypes} props
   * @returns {PIXI.Sprite}
   */
  static createSpriteWithProps(props: PropTypes): Sprite {
    const {resources, resource, texture} = props
    if(typeof texture === 'string' && resources && resource) {
      return new Sprite(resources[resource].textures[texture])
    }
    if(!texture && resources && resource) {
      return new Sprite(resources[resource].texture)
    }
    if(texture) { return new Sprite(texture)}
    throw new ReferenceError('Incorrect prop types')
  }

  /**
   * Life cycle hook for mounting. Mounts sprite to container.
   * @memberof RPGSprite
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
   * @memberof RPGSprite
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
   * Modifies sprite in state depending on prop change.
   * @param {PropTypes} nextProps
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    var {texture} = nextProps
    if(this.props.texture !== texture) {
      this.setState({ sprite: new Sprite(texture) })
    }
  }

  /**
   * Updates component.
   * @param {PropTypes} nextProps
   * @param {StateTypes} nextState
   */
  componentWillUpdate(nextProps: PropTypes, nextState: StateTypes): void {
    RPGSprite.configureSpriteWithProps(nextState.sprite, nextProps)
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
    console.log("Sprite render")
    return null
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired,
  resources: ReactPropTypes.object
}

export default withContext(contextTypes)(RPGSprite)
