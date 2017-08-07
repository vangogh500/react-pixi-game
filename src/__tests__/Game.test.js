import Game from '../Game.js'
import * as hocs from '../hocs.js'
import React from 'react'
import {Application, ticker} from 'pixi.js'
import ReactPropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'

describe('Game', function() {
  const contextTypes = {
    app: ReactPropTypes.object,
    loop: ReactPropTypes.object
  }
  it('context', function() {
    class Child extends React.Component {
      render() {
        return <div></div>
      }
    }
    const Wrapper = hocs.withContext(contextTypes)(Child)
    const view = TestUtils.renderIntoDocument(
      <Game>
        <Wrapper />
      </Game>
    )
    const childInstance = TestUtils.findRenderedComponentWithType(view, Child)
    expect(childInstance.props.app instanceof Application).toBe(true)
    expect(childInstance.props.loop instanceof ticker.Ticker).toBe(true)
  })
})
