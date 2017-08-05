/* @flow */
import React from 'react'
import {IntlProvider, addLocaleData} from 'react-intl'
import { withRouter, Redirect } from 'react-router'
import {connect} from 'react-redux'
import en from 'react-intl/locale-data/en'
import ja from 'react-intl/locale-data/ja'
import enData from './data/en.json'
import jaData from './data/ja.json'
import * as RouterTypes from '../Router/flowtypes.js'
import * as StoreTypes from '../Store/flowtypes.js'
import {parseQuery, flattenObject} from '../util.js'

addLocaleData([...en, ...ja])

type PropTypes = {
  locale: string,
  location: RouterTypes.LocationType,
  children?: React.Children
}

type State = {
  localeData: {
    en: {},
    ja: {}
  }
}

/**
 * @class
 * @extends {React.Component}
 * Locale provider for the app.
 */
class LocaleProvider extends React.Component<void,PropTypes,State> {
  state = {
    localeData: {
      en: flattenObject(enData),
      ja: flattenObject(jaData)
    }
  }
  /**
   * Renders react elements.
   * @method
   * @memberof LocaleProvider
   * @emits Redirect If app lang does not match route.
   * @returns {ReactElement}
   */
  render() {
    const accepted_languages = ['en', 'ja']
    const {locale, location} = this.props
    const lang = parseQuery(location.search).lang
    if(!lang || locale !== lang) {
      return <Redirect to={location.pathname + '?lang=' + locale} />
    }
    return (
      <IntlProvider locale={locale} messages={this.state.localeData[locale]}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state: StoreTypes.StateType) => {
  return {
    locale: state.locale
  }
}

export default withRouter(connect(mapStateToProps, null)(LocaleProvider))
