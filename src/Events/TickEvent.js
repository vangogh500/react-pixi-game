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
 * @prop {function(delta: number): void} onTick Call back to call for each tick. The time elapsed between each tick is passed as the first param.
 */
type PropTypes = {
  loop: GameLoop,
  onTick: (delta: number) => void
}

/**
 * A tick event.
 * @example
 *
 * handleTick = (delta) => { this.setState({ tick: this.state.tick + delta })}
 * render() {
 *  return (
 *   <TickEvent onTick={this.handleTick} />
 *  )
 * }
 */
class TickEvent extends mix(React.Component).with(PropBasedUpdate, NonDom) {
  /**
   * Life cycle hook for mounting. Subscribes onTick to the game loop.
   */
  componentDidMount(): void {
    const {loop, onTick} = this.props
    loop.add(this.props.onTick)
  }
  /**
   * Life cycle hook for unmounting. Unsubscribes onTick from the game loop.
   */
  componentWillUnmount(): void {
    const {loop, onTick} = this.props
    loop.remove(onTick)
  }
  /**
   * Life cycle hook for updating. If the call back is different, the old one will be unhooked and the new one will be subscribed to the game loop.
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
