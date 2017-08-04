/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {withContext} from '../../hocs.js'

const contextTypes = {
  resources: ReactPropTypes.object.isRequired
}

export default (component: Class<React.Component<*,*,*>>) => withContext(contextTypes)(component)
