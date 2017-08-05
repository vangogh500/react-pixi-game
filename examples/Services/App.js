/**
 * @file Entry point for boilerplate's services (including store, router, and localization).
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import StoreProvider from './Store/Index.js'
import Router from './Router/Index.js'
import {createHashHistory} from 'history'
/**
 * @class
 * @extends {React.Component}
 * App entry point.
 */
export default class App extends React.Component {
  /**
  * Renders the react element.
   * @memberof App
   * @method render
   * @returns {ReactElement}
   */
  render() {
    const history = createHashHistory()
    return (
      <StoreProvider history={history}>
        <Router history={history} />
      </StoreProvider>
    )
  }
}
