import World from '../Index.js'
import * as hocs from '../../hocs.js'
import React from 'react'
import ReactPropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'

describe('World', function() {
  it('context', function() {
    const world = { p: 10, temperature: 100 }
    const contextTypes = { world: ReactPropTypes.object }
    class Child extends React.Component {
      render() {
        return null
      }
    }
    const ChildWithContext = hocs.withContext(contextTypes)(Child)
    const view = TestUtils.renderIntoDocument(
      <World world={world}>
        <ChildWithContext />
      </World>
    )
    const childInstance = TestUtils.findRenderedComponentWithType(view, Child)
    expect(childInstance.props.world.p).toEqual(10)
    expect(childInstance.props.world.temperature).toEqual(100)
  })
})
