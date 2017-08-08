/* @flow */
import {Graphics as PIXIGraphics, Point as PIXIPoint} from 'pixi.js'
import type {Sprite as PIXISprite, DisplayObject as PIXIDisplayObject} from 'pixi.js'
import {Vector} from 'vangogh500-physics'
import mix from '../../mixins/mix.js'
import DisplayObject from './DisplayObject.js'
import type {PropTypes as DisplayObjectPropTypes} from './DisplayObject.js'
import {deepCompare} from '../../utils.js'

export type PropTypes = {
  res: any,
  resources: any
} & DisplayObjectPropTypes

type StateTypes = {
  displayObject: PIXIDisplayObject
}

/**
 * Mixin function for components that extend Pixi.Sprite.
 * @alias SpriteMixin
 * @param {Class} superclass
 */
const mixin = <PropType: PropTypes>(superclass: Class<any>) => class extends mix(superclass).with(DisplayObject) {
  +createSpriteWithProps: (props: PropType) => PIXISprite
  constructor(props: PropTypes) {
    super(props)
    this.state = {
      displayObject: this.createSpriteWithProps(props)
    }
    this.update(props)
  }
  componentWillReceiveProps(nextProps: PropTypes): void {
    var {res} = nextProps
    if(!deepCompare(res, this.props.res)) {
      this.setState({ sprite: this.createSpriteWithProps(nextProps) })
    }
  }
}

export default mixin
