/**
 * @file Flow types for the router.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

 /**
 * @module Router.flowTypes
 */

/**
 * An object that defines the app location.
 * @typedef {object} LocationType
 * @property {string} pathname The path of the URL
 */
export type LocationType = {
  pathname: string
}

/**
 * An object that defines the app history.
 * @typedef {object} HistoryType
 * @property {number} length The number of entries in the history stack
 * @property {string} action The current action.
 * @property {LocationType} location THe current location.
 */
export type HistoryType = {
  length: number,
  action: string,
  location: LocationType
}
