/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../../utils.js'
import {Point as PIXIPoint} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import type {DisplayObject as PIXIDisplayObject, Container as PIXIContainer} from 'pixi.js'
import {withContext} from '../../hocs.js'

export type PropTypes = {
  anchor: Vector,
  position: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number,
  container: PIXIContainer
}

export type StateTypes = {
  displayObject: PIXIDisplayObject
}

export type DefaultPropTypes = {
  anchor: Vector,
  rotation: Vector,
  scale: Vector,
  alpha: number
}

/**
 * Abstract class for a DisplayObject react component.
 * @class
 * @alias DisplayObject
 */
export default class DisplayObject<D: {}, P: PropTypes> extends React.Component<DefaultPropTypes,P, StateTypes> {
  static defaultProps = {
    anchor: new Vector(),
    rotation: new Vector(),
    scale: new Vector(),
    alpha: 1
  }

  state: StateTypes

  /**
   * Must be implemented. Creates the display object.
   * @memberof DisplayObject
   * @method
   * @abstract
   */
  +createDisplayObject: () => PIXIDisplayObject
  +defaults: () => D

  /**
   * Constructor
   */
  constructor(props: P) {
    super(props)
    this.state = {
      displayObject: this.createDisplayObject()
    }
    this.configureDisplayObject(props)
  }

  /**
   * Configures display object using props.
   * @memberof DisplayObject
   * @method
   * @instance
   */
  configureDisplayObject(props: P) {
    const {anchor, alpha, position, rotation, scale} = props
    const {displayObject} = this.state
    displayObject.anchor = new PIXIPoint(anchor.x, anchor.y)
    displayObject.alpha = alpha
    displayObject.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
  }

  /**
   * Life cycle hook for mounting. Mounts component to container.
   * @memberof DisplayObject
   * @method
   * @instance
   * @alias componentDidMount
   */
  componentDidMount(): void {
    const {container} = this.props
    const {displayObject} = this.state
    container.addChild(displayObject)
  }
  /**
   * Life cycle hook for unmounting. Unmounts from container.
   * @memberof DisplayObject
   * @method
   * @instance
   * @alias componentWillUnmount
   */
  componentWillUnmount(): void {
    const {container} = this.props
    const {displayObject} = this.state
    container.removeChild(displayObject)
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof DisplayObject
   * @instance
   * @method
   * @alias shouldComponentUpdate
   * @param {PropTypes} nextProps
   * @returns {boolean} If component should update.
   */
  shouldComponentUpdate(nextProps: PropTypes, nextState: StateTypes): boolean {
    return (nextState.displayObject !== this.state.displayObject) || !shallowCompare(this.props, nextProps)
  }

  /**
   * Updates component.
   * @param {PropTypes} nextProps
   * @param {StateTypes} nextState
   */
  componentWillUpdate(nextProps: P, nextState: StateTypes): void {
    this.configureDisplayObject(nextProps)
    if(nextState.displayObject !== this.state.displayObject || nextProps.container !== this.props.container) {
      this.props.container.removeChild(this.state.displayObject)
      nextProps.container.addChild(nextState.displayObject)
    }
  }
  /**
   * Renders the react element.
   * @memberof DisplayObject
   * @method
   * @instance
   * @returns {React.Element}
   */
  render() {
    return null
  }
}
