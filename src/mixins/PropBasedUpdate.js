/* @flow */
import {shallowCompare} from '../utils.js'

/**
 * Mixin function for components that should only update on prop changes.
 * @alias PropBasedUpdate
 * @param {Class} superclass
 */
const mixin = <PropType: {}>(superclass: Class<any>) => class extends superclass {
  shouldComponentUpdate(nextProps: PropType): boolean {
    return !shallowCompare(nextProps, this.props)
  }
}

export default mixin
