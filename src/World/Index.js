/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {ContextProvider} from '../hocs.js'
import {shallowCompare} from '../utils.js'

/**
 * @memberof World
 */
type PropTypes = {
  world: {},
  children?: React.Children
}

/**
 * @memberof World
 */
type StateTypes = {
  Provider: Class<React.PureComponent<*,*,*>>
}

/**
 * Physics environment provider.
 * @example
 *
 * <World world={{p:1, temperature:10}}>
 *  { \\bodies go here }
 * </World>
 */
export default class World extends React.Component<void, PropTypes, StateTypes> {
  /**
   * Child context types.
   * @memberof World
   * @alias childContextTypes
   * @property {object} world
   */
  static childContextTypes = {
    world: ReactPropTypes.object.isRequired
  }
  /**
   * Get child context
   * @memberof World
   * @instance
   * @method
   * @alias getChildContext
   */
  getChildContext = (function() {
    return {
      world: this.props.world
    }
  }).bind(this)

  state = {
    Provider: ContextProvider(World.childContextTypes, this.getChildContext)
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof World
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
   * Renders react element.
   * @memberof World
   * @method
   * @instance
   * @returns {React.Element}
   */
  render(): React.Element<*> {
    const {Provider} = this.state
    const {children} = this.props
    return (
      <Provider>
        {children}
      </Provider>
    )
  }
}
