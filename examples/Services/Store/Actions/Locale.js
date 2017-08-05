/**
 * @file Actions for the localization service.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

import * as StoreTypes from '../flowtypes.js'
import { push } from 'react-router-redux'

/** @module Actions */

/**
 * Action type to change locale
 * @const
 * @type {string}
 */
export const CHANGE_LOCALE = 'CHANGE_LOCALE'

function setLocale(locale: string): StoreTypes.ActionType {
  return {
    type: CHANGE_LOCALE,
    locale
  }
}

/**
 * Thunk action that changes the app's locale
 * @param {string} locale The locale to change to.
 */
export function changeLocale(locale: string): StoreTypes.ThunkActionType {
  return (dispatch, getState) => {
    const accepted_languages = ['en', 'ja']
    dispatch(setLocale(locale))
    dispatch(push(getState().router.location.pathname + '?lang=' + locale))
  }
}
