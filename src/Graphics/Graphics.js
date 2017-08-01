/* @flow */
import React from 'react'
import {Container, Graphics} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof RPGGraphics
 */
type PropTypes = {
  container: Container,
  color: number,
  alpha: number,
  position: Vector,
  size: Vector
}

/**
 * @memberof RPGGraphics
 */
type DefaultPropTypes = {
  alpha: number,
  position: Vector
}

/**
 * @memberof RPGGraphics
 */
type StateTypes = {
  graphics: Graphics
}

/**
 * Abstract class for Pixi graphics.
 */
export default class RPGGraphics extends React.Component<DefaultPropTypes, PropTypes, *> {
  static defaultProps = {
    alpha: 1,
    position: new Vector()
  }
  state: StateTypes
  /**
   * Contstructor
   */
  constructor(props: PropTypes) {
    super(props)
    this.state = {
      graphics: new Graphics()
    }
  }

  /**
   * Drawing the shape goes here.
   * @memberof RPGGraphics
   * @abstract
   * @method
   * @instance
   */
  +drawGraphics: () => void
  /**
   * Updates the shape.
   * @memberof RPGGraphics
   * @method
   * @instance
   */
  updateGraphics(nextProps: PropTypes): void {
    const {graphics} = this.state
    const {alpha, position, size, color} = nextProps
    graphics.alpha = alpha
    graphics.x = position.x
    graphics.y = position.y
    graphics.width = size.x
    graphics.height = size.y
    graphics.graphicsData[0].fillColor = color
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof RPGGraphics
   * @instance
   * @method
   * @alias shouldComponentUpdate
   * @param {PropTypes} nextProps
   * @returns {boolean} If component should update.
   */
  shouldComponentUpdate(nextProps: PropTypes): boolean {
    return !shallowCompare(this.props, nextProps)
  }

  /**
   * Life cycle hook for mounting.
   * @memberof RPGGraphics
   * @instance
   * @method
   * @alias componentDidMount
   */
  componentDidMount(): void {
    const {graphics} = this.state
    const {container} = this.props
    this.drawGraphics()
    container.addChild(graphics)
  }

  /**
   * Life cycle hook for unmounting.
   * @memberof RPGGraphics
   * @instance
   * @method
   * @alias componentWillUnmount
   */
  componentWillUnmount() {
    const {graphics} = this.state
    const {container} = this.props
    container.removeChild(graphics)
  }

  /**
   * Updates component.
   * @param {PropTypes} nextProps
   */
  componentWillUpdate(nextProps: PropTypes): void {
    this.updateGraphics(nextProps)
  }

  /**
   * Renders react element.
   * @memberof RPGGraphics
   * @instance
   * @method
   * @alias render
   * @returns {React.Element}
   */
  render(): ?React.Element<*> {
    return null
  }
}
