/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {App as PhysicsApp, Mutator} from 'vangogh500-physics'
import {contextProvider, withContext} from '../../hocs.js'
import GameLoop from '../../GameLoop.js'

/**
 * @memberof World
 */
type PropTypes = {
  pre: Array<Mutator>,
  post: Array<Mutator>,
  children?: React.Children
}

type DefaultPropTypes = {
  pre: Array<Mutator>,
  post: Array<Mutator>
}

/**
 * @memberof World
 */
type StateTypes = {
  app: PhysicsApp,
  loop: GameLoop,
  loaded: boolean
}

/**
 * Physics environment provider.
 * @example
 *
 * <World world={}>
 *  { \\bodies go here }
 * </World>
 */
class World extends React.PureComponent<DefaultPropTypes, PropTypes, StateTypes> {
  static defaultProps = {
    pre: [],
    post: []
  }
  static Provider = contextProvider({ environment: ReactPropTypes.object }, (props) => {
    return { environment: props.environment }
  })

  state: StateTypes
  props: PropTypes

  constructor(props) {
    super(props)
    this.state = {
      app: new PhysicsApp(props.pre, props.post),
      loaded: false
    }
  }

  handleTick = (function(dt: number) {
    this.state.app.timeReduce(dt)
  }).bind(this)

  /**
   * Life cycle hook for mounting. Initializes physics app.
   */
  componentDidMount(): void {
    const {app} = this.state
    const {loop} = this.props
    app.init(() => {
      this.setState({ loaded: true })
      loop.add(this.handleTick)
    })
  }

  /**
   * Renders react element.
   * @returns {React.Element}
   */
  render(): React.Element<*> {
    const {loaded, app} = this.state
    const {children} = this.props
    if(loaded) {
      return (
        <World.Provider environment={app}>
          {children}
        </World.Provider>
      )
    }
    return null
  }
}

const contextTypes = {
  loop: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(World)
