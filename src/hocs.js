/**
 * @module Hocs
 * @file Higher order components.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'

type PropTypes = {
  children?: React.Children,
  id?: string
}

/**
 * @param {object} childContextTypes Context types using React proptypes.
 * @param {function} getChildContext Function which returns context values.
 * @returns {function} A hoc providing context.
 */
export const ContextProvider = (childContextTypes: {}, getChildContext: () => {}): Class<React.PureComponent<*,*,*>> => {
  return class ContextProvider extends React.PureComponent {
    static childContextTypes = childContextTypes
    getChildContext() {
      return getChildContext()
    }
    render(): React.Element<*> {
      return <div>
        {this.props.children}
      </div>
    }
  }
}

/**
 * @param {object} contextTypes Context types using React proptypes.
 * @returns {function} A function which takes a component and returns a hoc which has access to context.
 */
export const withContext = (contextTypes: {}) => (Component: Class<React.Component<*,*,*>>): Class<React.PureComponent<*,*,*>> => {
  return class ContextConsumer extends React.PureComponent {
    static contextTypes = contextTypes

    render(): React.Element<*> {
      return <Component {...this.props} {...this.context} />
    }
  }
}

export const withLoop = (Component: Class<React.Component<*,*,*>>): Class<React.PureComponent<*,*,*>> => {
  const contextTypes = {
    loop: ReactPropTypes.object.isRequired
  }
  return withContext(contextTypes)(Component)
}
