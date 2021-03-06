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
  children?: React.Children
}

/**
 * @param {object} childContextTypes Context types using React proptypes.
 * @param {function} getChildContext Function which returns context values.
 * @returns {function} A hoc providing context.
 */
export const contextProvider = <P: PropTypes>(childContextTypes: {}, getChildContext: (props: P) => {}): Class<React.PureComponent<*,P,*>> => {
  return class ContextProvider extends React.PureComponent<*,P,*> {
    static childContextTypes = childContextTypes
    getChildContext = () => getChildContext(this.props)
    render(): React.Element<*> {
      return (<div>
        {this.props.children}
      </div>)
    }
  }
}

/**
 * @param {object} contextTypes Context types using React proptypes.
 * @returns {function} A function which takes a component and returns a hoc which has access to context.
 */
export const withContext = (contextTypes: {}) => (Component: Class<React.Component<*,*,*>>): Class<React.PureComponent<*,*,*>> => {
  return class ContextConsumer extends React.Component {
    static contextTypes = contextTypes

    render(): React.Element<*> {
      return <Component {...this.props} {...this.context} />
    }
  }
}

/**
 * Creates a hoc which provides resources through props.
 * @param {Class<React.Component>} Component to wrap.
 * @returns {Class<React.PureComponent>}
 */
export const withResources = (Component: Class<React.Component<*,*,*>>): Class<React.PureComponent<*,*,*>> => {
  const contextTypes = {
    resources: ReactPropTypes.object.isRequired
  }
  return withContext(contextTypes)(Component)
}
