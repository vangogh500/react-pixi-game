/**
 * @file Router for the boilerplate.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import * as RouterTypes from './flowtypes.js'
import LocaleProvider from '../Locale/Index.js'
import UIContainer from '../../Scenes/UIContainer.js'
import Home from '../../Scenes/Home/Index.js'
import BoilerPlate from '../../Scenes/Examples/Boilerplate.js'
import GeometryExample from '../../Scenes/Examples/Geometry.js'
import SpriteExample from '../../Scenes/Examples/Sprite.js'
import AnimationExample from '../../Scenes/Examples/Animations.js'

type PropTypes = {
  history: RouterTypes.HistoryType
}

/**
 * @class
 * @extends {React.Component}
 * The app router.
 */
export default class Router extends React.Component<void,PropTypes,void> {
  /**
   * Renders the react elements.
   * @memberof Router
   * @method
   * @returns {ReactElement}
   */
  render() {
    const {history} = this.props
    return (
      <ConnectedRouter history={history}>
        <div>
          <LocaleProvider>
            <UIContainer>
              <Route exact path="/" component={Home} />
              <Route exact path="/examples/boilerplate" component={BoilerPlate} />
              <Route exact path="/examples/geometry" component={GeometryExample} />
              <Route exact path="/examples/sprite" component={SpriteExample} />
              <Route exact path="/examples/animations" component={AnimationExample} />
            </UIContainer>
          </LocaleProvider>
        </div>
      </ConnectedRouter>
    )
  }
}
