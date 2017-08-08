/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import type {Container as PIXIContainer} from 'pixi.js'
import GameLoop from '../GameLoop.js'
import mix from '../mixins/mix.js'
import PropBasedUpdate from '../mixins/PropBasedUpdate.js'
import NonDom from '../mixins/NonDom.js'
import {withContext} from '../hocs.js'

/**
 * @memberof PointerEvent
 * @prop {function(delta: number): void} onPointerDown Call back to call for on a pointer down event. Event is passed to the call back.
 */
type PropTypes = {
  container: PIXIContainer,
  onPointerDown: (event: any) => void
}

/**
 * A pointer event.
 * @example
 *
 * handleClick = (event) => { this.setState({ toggle: !this.state.toggle })}
 * render() {
 *  return (
 *   <PointerEvent onPointerDown={this.handleClick} />
 *  )
 * }
 */
class PointerEvent extends mix(React.Component).with(PropBasedUpdate, NonDom) {
  props: PropTypes
  /**
   * Life cycle hook for mounting. Subscribes callbacks to the container.
   */
  componentDidMount(): void {
    const {container, onPointerDown} = this.props
    container.interactive = true
    console.log(container)
    container.on('pointerdown', onPointerDown)
  }
  /**
   * Life cycle hook for unmounting. Unsubscribes callbacks from the container.
   */
  componentWillUnmount(): void {
    const {container, onPointerDown} = this.props
    container.off('pointerdown', onPointerDown)
  }
  /**
   * Life cycle hook for updating. If the call back is different, unhook old ones and hook up the new ones.
   */
  componentWillUpdate(nextProps: PropTypes): void {
    const {container, onPointerDown} = this.props
    container.off('pointerdown', onPointerDown)
    container.on('pointerdown', nextProps.onPointerDown)
  }
}

const contextTypes = {
  container: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(PointerEvent)
