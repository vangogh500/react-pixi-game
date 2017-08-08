import Game from '../Game.js'
import Stage from '../Stage.js'
import * as hocs from '../hocs.js'
import React from 'react'
import {Container} from 'pixi.js'
import ReactPropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'

describe('Stage', function() {
  it('context', function() {
    class Child extends React.Component {
      render() {
        return <div></div>
      }
    }
    const contextTypes = { container: ReactPropTypes.object }
    const Wrapper = hocs.withContext(contextTypes)(Child)
    const view = TestUtils.renderIntoDocument(
      <Game>
        <Stage>
          <Wrapper />
        </Stage>
      </Game>
    )
    const childInstance = TestUtils.findRenderedComponentWithType(view, Child)
    expect(childInstance.props.container instanceof Container).toBe(true)
  })
})
