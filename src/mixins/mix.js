/* @flow */

/**
 * Creates a mixin base from which the class can be mixed.
 * @param {Class} baseclass
 * @returns {MixinBase}
 */
export default (baseclass: Class<any>): MixinBase => new MixinBase(baseclass)

class MixinBase {
  baseclass: Class<any>
  constructor(baseclass: Class<any>) {
    this.baseclass = baseclass
  }
  with(...mixins: Array<(superclass: Class<any>) => Class<any>>) {
    return mixins.reduce((acc, mixin) => mixin(acc), this.baseclass)
  }
}
