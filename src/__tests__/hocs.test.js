import * as hocs from '../hocs.js'
import Game from '../Game.js'
import React from 'react'
import {ticker} from 'pixi.js'
import ReactPropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'

describe('hocs', function() {
  const contextTypes = { name: ReactPropTypes.string }
  const getChildContext = () => { return { name: 'hello' }}
  it('provideContext', function() {
    const Provider = hocs.ContextProvider(contextTypes, getChildContext)
    const Child = (props, context) => { return <div className="content" id="content">{context.name}</div>}
    Child.contextTypes = contextTypes
    const view = TestUtils.renderIntoDocument(
      <Provider>
        <Child />
      </Provider>
      )
    expect(TestUtils.findRenderedDOMComponentWithClass(view, 'content').innerHTML).toBe('hello')
  })
  it('withContext', function() {
    const Provider = hocs.ContextProvider(contextTypes, getChildContext)
    class Child extends React.Component {
      render() {
        return <div className='content' id={this.props.id}>{this.props.name}</div>
      }
    }
    const Wrapper = hocs.withContext(contextTypes)(Child)
    const view = TestUtils.renderIntoDocument(
      <Provider>
        <Wrapper id="content" />
      </Provider>
    )
    expect(TestUtils.findRenderedDOMComponentWithClass(view, 'content').innerHTML).toBe('hello')
  })
  it('withLoop', function() {
    class Child extends React.Component {
      render() { return null }
    }
    const WithLoop = hocs.withLoop(Child)
    const view = TestUtils.renderIntoDocument(
      <Game>
        <WithLoop />
      </Game>
    )
    const instance = TestUtils.findRenderedComponentWithType(view, Child)
    expect(instance.props.loop instanceof ticker.Ticker).toBe(true)
  })
})
