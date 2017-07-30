/**
 * @module Hocs
 * @file Higher order components.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'

type PropTypes = {
  children?: React.Children,
  id?: string
}
/**
 * @class
 * @extends {React.Component}
 * Simple utility wrapper class
 */
export class Wrapper extends React.Component<void, PropTypes, void> {
  render() {
    const {children, id} = this.props
    return (
      <div id={id}>
        {children}
      </div>
    )
  }
}

/**
 * @param {object} childContextTypes Context types using React proptypes.
 * @param {function} getChildContext Function which returns context values.
 * @returns {function} A function which takes a component and returns a hoc providing context.
 */
export const provideContext = (childContextTypes: {}, getChildContext: ({}) => {}) => (Component: Class<React.Component<*,*,*>>) => {
  return class ContextProvider extends React.Component {
    static childContextTypes = childContextTypes

    getChildContext() {
      return getChildContext(this.props)
    }

    render() {
      return <Component {...this.props} />
    }
  }
}

/**
 * @param {object} contextTypes Context types using React proptypes.
 * @returns {function} A function which takes a component and returns a hoc which has access to context.
 */
export const withContext = (contextTypes: {}) => (Component: Class<React.Component<*,*,*>>) => {

  return class ContextConsumer extends React.Component {
    static contextTypes = contextTypes

    render(): React.Element<*> {
      return <Component {...this.props} {...this.context} />
    }
  }
}
