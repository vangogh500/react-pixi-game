/**
 * @file Flow types for the Store.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

import * as RouterTypes from '../Router/flowtypes.js'
/**
 * @module Store.flowtypes
 */

/**
 * @typedef {object} StateType
 * @property {string} locale App locale.
 * @property {LocationType} location App location.
 */
export type StateType = {
}

/**
 * @typedef {object} StoreType
 * @property {function} getState Gets current state.
 * @property {function} dispatch Dispatches an action to the store.
 * @property {function} subscribe Subscribe a listener to the store.
 * @property {function} replaceReducer Replace the reducer for the store.
 */
export type StoreType = {
  getState: () => mixed,
  dispatch: () => mixed,
  subscribe: () => mixed,
  replaceReducer: () => mixed
}

/**
 * @typedef {object} ActionType
 * @property {string} type The type of action.
 */
export type ActionType = {
  +type: string
}

/**
 * @typedef {function} ThunkActionType
 * @param {function} dispatch Store dispatch.
 * @param {function} getState Get store state.
 */
export type ThunkActionType = (dispatch: (action: any) => mixed, getState: () => mixed) => void
