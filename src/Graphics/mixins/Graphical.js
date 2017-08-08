/* @flow */
import {Graphics as PIXIGraphics, Point as PIXIPoint} from 'pixi.js'
import type {Container as PIXIContainer} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import mix from '../../mixins/mix.js'
import PropBasedUpdate from '../../mixins/PropBasedUpdate.js'
import Mounted from './Mounted.js'


type PropTypes = {
  color: number,
  alpha: number,
  position: Vector,
  rotation: Vector,
  anchor: Vector,
  size: Vector,
  container: PIXIContainer
}

/**
 * Mixin function for components that is a Graphic.
 * @alias Graphical
 * @param {Class} superclass
 */
const mixin = <PropType: PropTypes>(superclass: Class<any>) => class extends mix(superclass).with(PropBasedUpdate, Mounted('graphics')) {
  +drawGraphics: () => void
  +updateGraphics: () => void
  static defaultProps = {
    alpha: 1,
    position: new Vector(),
    rotation: new Vector(),
    anchor: new Vector(0.5,0.5)
  }
  constructor(props: PropType) {
    super(props)
    this.state = {
      graphics: new PIXIGraphics()
    }
  }
  componentDidMount() {
    if(super.componentDidMount) { super.componentDidMount() }
    this.drawGraphics()
  }

  componentWillUpdate(nextProps: PropType): void {
    this.updateGraphics()
  }
  render() {
    return null
  }
}

export default mixin
