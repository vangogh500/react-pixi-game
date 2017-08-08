/* @flow */

/**
 * Mixin function for components whose contents must be added and removed (add child, remove child).
 * @param {Class} superclass
 */
const mixin = <PropType: {}>(target: string) => (superclass: Class<any>) => {
  const t = target
  return class extends superclass {
  /**
   * Life cycle hook for mounting.
   * @memberof Graphics
   * @instance
   * @method
   * @alias componentDidMount
   */
  componentDidMount(): void {
    if(super.componentDidMount) { super.componentDidMount() }
    console.log("mount")
    const target = this.state[t]
    const {container} = this.props
    container.addChild(target)
  }
  componentWillUnmount(): void {
    if(super.componentDidMount) { super.componentWillUnmount() }
    const target = this.state[t]
    const {container} = this.props
    container.removeChild(target)
  }
}
}
export default mixin
