/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import GameLoop from '../GameLoop.js'
import mix from '../mixins/mix.js'
import PropBasedUpdate from '../mixins/PropBasedUpdate.js'
import NonDom from '../mixins/NonDom.js'
import {withContext} from '../hocs.js'

/**
 * @memberof TickEvent
 */
type PropTypes = {
  loop: GameLoop,
  onTick: () => void
}

/**
 * A tick event.
 * @example
 *
 * handleTick = () => { this.setState({ tick: this.state.tick + 1 })}
 * render() {
 *  return (
 *   <TickEvent onTick={(delta) => this.handleTick()} />
 *  )
 * }
 */
class TickEvent extends mix(React.Component).with(PropBasedUpdate, NonDom) {
  /**
   * Life cycle hook for mounting.
   * @memberof TickEvent
   * @instance
   * @method
   * @alias componentDidMount
   */
  componentDidMount(): void {
    const {loop, onTick} = this.props
    loop.add(this.props.onTick)
  }
  /**
   * Life cycle hook for unmounting.
   * @memberof TickEvent
   * @instance
   * @method
   * @alias componentWillUnmount
   */
  componentWillUnmount(): void {
    const {loop, onTick} = this.props
    loop.remove(onTick)
  }
  /**
   * Life cycle hook for updating.
   * @memberof TickEvent
   * @instance
   * @method
   * @alias componentWillUpdate
   * @param {PropTypes} nextProps
   */
  componentWillUpdate(nextProps: PropTypes): void {
    this.props.loop.remove(this.props.onTick)
    nextProps.loop.add(nextProps.onTick)
  }
}

const contextTypes = {
  loop: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(TickEvent)
