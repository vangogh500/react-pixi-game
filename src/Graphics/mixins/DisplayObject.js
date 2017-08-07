/* @flow */
import React from 'react'

export default (component: Class<React.Component<*,*,*>>) => {
  component.prototype.configureDisplayObject = function(props) {
    const {anchor, alpha, position, rotation, scale} = props
    const {displayObject} = this.state
    displayObject.anchor = new PIXIPoint(anchor.x, anchor.y)
    displayObject.alpha = alpha
    displayObject.setTransform(position.x, position.y, scale.x, scale.y, rotation.z)
  }
}
