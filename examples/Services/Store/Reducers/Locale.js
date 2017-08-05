/**
 * @file Reducer for the localization service.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

import * as StoreTypes from '../flowtypes.js'
import {CHANGE_LOCALE} from '../Actions/Locale.js'
import {parseQuery, getClientLang} from '../../util.js'

function getInitialState(): string {
  const queries = parseQuery(window.location.search)
  if(!queries.lang) {
    const clientLang = getClientLang()
    return clientLang
  }
  else {
    return queries.lang
  }
}

/**
 * Locale reducer
 * @method
 * @param {string} state The current app locale.
 * @param {ActionType} action The action emitted.
 */
export default function LocaleReducer(state:string = getInitialState(), action: StoreTypes.ActionType) {
  switch(action.type) {
    case CHANGE_LOCALE:
      return action.locale
    default:
      return state
  }
}
