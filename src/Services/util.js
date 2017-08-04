/**
 * @file Utility functions for the boilerplate
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

/** @module util */

/**
 * Parses query into an object with keys.
 * @param {string} queryString The query string to parse.
 * @returns {object} Object with query params as keys.
 */
export function parseQuery(queryString: string) {
  const queries = queryString.substring(1).split('&')
  return queries.reduce(function(acc, query) {
    const pairs = query.split('=')
    acc[pairs[0]] = pairs[1]
    return acc
  }, {})
}

/**
 * Get client language
 * @return {string} The client language (defaults to en)
 */
export function getClientLang(): string {
  const locale:string = navigator.userLanguage || navigator.language
  const localeWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0]
  return localeWithoutRegionCode || 'en'
}

/**
 * Flattens a object's properties to a tree of depth 1
 * @param {object} object
 */
export function flattenObject(obj: {}) {
  if(typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('Param must be an object.')
  }
  return Object.keys(obj).reduce((acc, prop) => {
    if(typeof obj[prop] !== 'object') {
      acc[prop] = obj[prop]
      return acc
    }
    const flattened = flattenObject(obj[prop])
    Object.keys(flattened).forEach((flattened_prop) => {
      acc[prop + '.' + flattened_prop] = flattened[flattened_prop]
    })
    return acc
  }, {})
}
