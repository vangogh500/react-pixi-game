/* @flow */
import React from 'react'
import {contextProvider} from '../hocs.js'

/**
 * Mixin functions for components that renders only to provide.
 * @alias PureProvider
 * @param {Class} superclass
 * @param {object} childContextTypes
 * @flow
 */
const mixin = (childContextTypes: {}) => (superclass: Class<any>) => {
  const keys = Object.keys(childContextTypes)
  const Provider = contextProvider(childContextTypes, (props) => {
    const context =  keys.reduce((acc, propName) => {
      acc[propName] = props[propName]
      return acc
    }, {})
    return context
  })
  return class extends superclass {
    +childContext: () => {}
    render() {
      const {children} = this.props
      return (
        <Provider {...this.childContext()}>
          {children}
        </Provider>
      )
    }
  }
}

export default mixin
