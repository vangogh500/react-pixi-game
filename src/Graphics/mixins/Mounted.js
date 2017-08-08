/* @flow */

/**
 * Mixin function for components whose contents must be added and removed (add child, remove child).
 * @alias Mounted
 * @param {Class} superclass
 */
const mixin = <PropType: {}>(target: string) => (superclass: Class<any>) => {
  const t = target
  return class extends superclass {
  componentDidMount(): void {
    if(super.componentDidMount) { super.componentDidMount() }
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
