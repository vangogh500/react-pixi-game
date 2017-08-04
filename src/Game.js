/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {Application, ticker} from 'pixi.js'
import {contextProvider} from './hocs.js'
import {shallowCompare} from './utils.js'
/**
 * @memberof Game
 */
type PropTypes = {
  children?: React.Children
}
/**
 * @memberof Game
 */
type StateTypes = {
  app: Application
}

const contextTypes = {
  app: ReactPropTypes.object.isRequired,
  loop: ReactPropTypes.object.isRequired
}

const Provider = contextProvider(contextTypes, function(props) {
  return {
    app: props.app,
    loop: props.loop
  }
})
/**
 * Pixi Game
 * @extends {React.Component}
 * @example
 *
 * <Game>
 *  { //game contents go here }
 * </Game>
 */
export default class Game extends React.Component<void, PropTypes, StateTypes> {
  /**
   * Create Pixi app using props
   * @memberof Game
   * @method
   * @alias createAppWithProps
   * @param {PropTypes} props
   * @returns {PIXI.Application}
   */
  static createAppWithProps(props: PropTypes): Application {
    return new Application()
  }

  state = {
    app: Game.createAppWithProps(this.props)
  }

  /**
   * Lifecycle hook for mounting. Starts game loop.
   * @memberof Game
   * @instance
   * @method
   * @alias componentDidMount
   */
  componentDidMount() {
    this.state.app.ticker.start()
  }

  /**
   * Lifecycle hook for mounting. Stops game loop.
   * @memberof Game
   * @instance
   * @method
   * @alias componentDidMount
   */
  componentWillUnmount() {
    this.state.app.ticker.stop()
  }

  /**
   * Renders react element.
   * @memberof Game
   * @instance
   * @method
   * @alias render
   */
  render(): ?React.Element<*> {
    const {app} = this.state
    const {children} = this.props
    return (
      <Provider app={app} loop={app.ticker}>
        {children}
      </Provider>
    )
  }
}
