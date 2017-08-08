/* @flow */
import {shallowCompare} from '../utils.js'

/**
 * Mixin function for components that have pure updates.
 * @param {Class} superclass
 */
const mixin = <PropType: {}>(target: string) => (superclass: Class<any>) => class extends superclass {
  componentWillUpdate(nextProps: PropType) {
    Object.keys(nextProps).forEach((propName) => {
      this.state[target][propName] = nextProps[propName]
    })
  }
}

export default mixin
