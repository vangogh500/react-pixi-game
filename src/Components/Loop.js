/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {ticker} from 'pixi.js'
import type {WebGLRenderer, CanvasRenderer} from 'pixi.js'
import {contextProvider} from '../hocs.js'

import GameLoop from '../GameLoop.js'
import mix from '../mixins/mix.js'
import PropBasedUpdate from '../mixins/PropBasedUpdate.js'
import PureProvider from '../mixins/PureProvider.js'
import PurePropUpdate from '../mixins/PurePropUpdate.js'

/**
 * Provides the rendering for react-pixi-game.
 * @example
 *
 * <Loop scale={0.5}>
 *   { // graphics go here }
 * </Loop>
 */
export default class Loop extends mix(React.Component).with(PropBasedUpdate, PurePropUpdate('loop'), PureProvider({ loop: ReactPropTypes.object.isRequired })) {
  /**
   * Prop types
   * @memberof Loop
   */
  props: {
    scale: number,
    fpsCap: number
  }
  static defaultProps = {
    fpsCap: 30
  }
  /**
   * State types
   * @memberof Loop
   */
  state: {
    loop: ticker.Ticker
  }
  constructor(props) {
    super(props)
    this.state = {
      loop: new GameLoop(props.fpsCap)
    }
  }
  childContext() {
    return { loop: this.state.loop }
  }

  /**
   * Life cycle hook for mounting.
   * @memberof Loop
   */
  componentDidMount() {
    this.state.loop.start()
  }

  /**
   * Life cycle hook for mounting.
   */
  componentWillUnmount() {
    this.state.loop.stop()
  }
}
