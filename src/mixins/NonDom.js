/* @flow */
import {shallowCompare} from '../utils.js'


/**
 * Mixin function for components that are not Dom components.
 * @param {Class} superclass
 */
const mixin = <PropType: {}>(superclass: Class<any>) => class extends superclass {
  render() {
    return null
  }
}

export default mixin
