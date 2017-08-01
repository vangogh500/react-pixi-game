/* @flow */
import React from 'react'
import {ticker} from 'pixi.js'
import ReactPropTypes from 'prop-types'
import {shallowCompare} from '../utils.js'
import {withContext} from '../hocs.js'

/**
 * @memberof TickEvent
 */
type PropTypes = {
  loop: ticker.Ticker,
  onTick: () => void
}

/**
 * A tick event.
 * @example
 *
 * handleTick = () => { this.setState({ tick: this.state.tick + 1 })}
 * render() {
 *  return (
 *   <TickEvent onClick={(delta) => this.handleTick()} />
 *  )
 * }
 */
class TickEvent extends React.Component<void,PropTypes,void> {
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
    console.log('Tick Event unmount')
    const {loop, onTick} = this.props
    loop.remove(onTick)
  }
  /**
   * Optimization for life cycle hooks.
   * @memberof TickEvent
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

  /**
   * Renders react element.
   * @memberof TickEvent
   * @instance
   * @method
   * @alias render
   */
  render(): ?React.Element<*> {
    console.log('TickEvent render')
    return null
  }
}

const contextTypes = {
  loop: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(TickEvent)
