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
class Position extends React.Component {
  render(){
    return (
      <div>
        {React.cloneElement(this.props.children, { position: this.props.body.s })}
      </div>
    )
  }
}

const contextTypes = {
  body: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(Position)
