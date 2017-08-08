/* @flow */
import {Graphics as PIXIGraphics, Point as PIXIPoint} from 'pixi.js'
import type {Container as PIXIContainer, DisplayObject as PIXIDisplayObject} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import mix from '../../mixins/mix.js'
import Mounted from './Mounted.js'
import {shallowCompare} from '../../utils.js'

export type PropTypes = {
  alpha: number,
  position: Vector,
  rotation: Vector,
  anchor: Vector,
  scale: Vector,
  container: PIXIContainer
}

type StateTypes = {
  displayObject: PIXIDisplayObject
}

/**
 * Mixin function for components that is a DisplayObject.
 * @alias DisplayObject
 * @param {Class} superclass
 */
const mixin = <PropType: PropTypes>(superclass: Class<any>) => class extends mix(superclass).with(Mounted('displayObject')) {
  state: StateTypes
  update(props: PropTypes) {
    const {displayObject} = this.state
    const {anchor, alpha, position, rotation, scale} = props
    displayObject.anchor = new PIXIPoint(anchor.x, anchor.y)
    displayObject.alpha = alpha
    displayObject.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
  }
  shouldComponentUpdate(nextProps: PropTypes, nextState: StateTypes): boolean {
    return (nextState.displayObject !== this.state.displayObject) || !shallowCompare(nextProps, this.props)
  }

  componentWillUpdate(nextProps: PropTypes, nextState: StateTypes): void {
    this.update(nextProps)
    if(nextState.displayObject !== this.state.displayObject || nextProps.container !== this.props.container) {
      this.props.container.removeChild(this.state.displayObject)
      nextProps.container.addChild(nextState.displayObject)
    }
  }

  render() {
    return null
  }
}

export default mixin
