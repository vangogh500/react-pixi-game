/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {Application, ticker} from 'pixi.js'
import {provideContext, Wrapper} from './hocs.js'
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
  app: Application,
  Provider: Class<React.Component<*,*,*>>
}

/**
 * Pixi Game
 * @extends {React.Component}
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
  /**
   * Child context types.
   */
  static childContextTypes = {
    app: ReactPropTypes.object.isRequired,
    loop: ReactPropTypes.object.isRequired
  }
  /**
   * Get child context
   * @memberof Game
   * @instance
   * @method
   * @alias getChildContext
   */
  getChildContext() {
    return {
      app: this.state.app,
      loop: this.state.app.ticker
    }
  }
  state = {
    app: Game.createAppWithProps(this.props),
    Provider: provideContext(Game.childContextTypes, this.getChildContext)(Wrapper)
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof Game
   * @instance
   * @method
   * @alias shouldComponentUpdate
   * @param {PropTypes} nextProps
   * @returns {boolean} If component should update.
   */
  shouldComponentUpdate(nextProps: PropTypes): boolean {
    return shallowCompare(this.props, nextProps)
  }

  /**
   * Renders react element.
   * @memberof Game
   * @instance
   * @method
   * @alias render
   */
  render(): ?React.Element<*> {
    const {Provider} = this.state
    const children = this.props
    return (
      <Provider>
        {children}
      </Provider>
    )
  }
}
