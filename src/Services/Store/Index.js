/**
 * @file StoreProvider for the boilerplate.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {logger} from 'redux-logger'
import {routerMiddleware, routerReducer, replace} from 'react-router-redux'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import * as RouterTypes from '../Router/flowtypes.js'
import * as StoreTypes from './flowtypes.js'
import localeReducer from './Reducers/Locale.js'

type PropTypes = {
  history: RouterTypes.HistoryType
}

/**
 * @class
 * @extends {React.Component}
 * The app store provider.
 */
export default class StoreProvider extends React.Component<void,PropTypes,void> {
  /**
   * Initializes redux store.
   * @memberof StoreProvider
   * @method initializeStore
   * @return {HistoryType} History to hook to the store.
   */
  initializeStore(): StoreTypes.StoreType {
    return createStore(
      combineReducers({
        router: routerReducer,
        locale: localeReducer
      }),
      applyMiddleware(logger, thunk, routerMiddleware(this.props.history))
    )
  }
  /**
   * Renders react element.
   * @memberof StoreProvider
   * @method render
   * @return {ReactElement}
   */
  render() {
    return (
      <Provider store={this.initializeStore()}>
        {this.props.children}
      </Provider>
    )
  }
}
