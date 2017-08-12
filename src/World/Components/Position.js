/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {App as PhysicsApp, Component as BodyComponent} from 'vangogh500-physics'
import {contextProvider, withContext} from '../../hocs.js'
import mix from '../../mixins/mix.js'
import PropBasedUpdate from '../../mixins/PropBasedUpdate.js'
import PureProvider from '../../mixins/PureProvider.js'

/**
 * @memberof Body
 */
type PropTypes = {
  body: BodyComponent,
  children?: React.Children
}

/**
 * Physics body provider.
 * @example
 *
 * <World world={}>
 *  { \\bodies go here }
 * </World>
 */
class Position extends mix(React.Component).with(PropBasedUpdate, PureProvider({ position: ReactPropTypes.object.isRequired })) {
  childContext() {
    return { position: this.props.body.s }
  }
}

const contextTypes = {
  body: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(Position)
