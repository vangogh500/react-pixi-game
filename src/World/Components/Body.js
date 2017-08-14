/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {App as PhysicsApp, Component as BodyComponent} from 'vangogh500-physics'
import {contextProvider, withContext} from '../../hocs.js'
import mix from '../../mixins/mix.js'
import PropBasedUpdate from '../../mixins/PropBasedUpdate.js'

/**
 * @memberof Body
 */
type PropTypes = {
  id: string,
  initialState: BodyComponent,
  middleware: (state: BodyComponent) => {},
  environment: PhysicsApp,
  children?: React.Children
}

/**
 * @memberof Body
 */
type StateTypes = {
  loaded: boolean,
  state: BodyComponent
}

/**
 * Physics body provider.
 * @example
 *
 * <World world={}>
 *  { \\bodies go here }
 * </World>
 */
class Body extends React.PureComponent {
  static Provider = contextProvider({ body: ReactPropTypes.object }, (props) => {
    return { body: props.body }
  })

  state: StateTypes
  props: PropTypes

  constructor(props) {
    super(props)
    this.state = {
      state: props.initialState,
      loaded: false
    }
  }

  /**
   * Life cycle hook for mounting. Initializes body.
   */
  componentDidMount(): void {
    const {environment, id, initialState} = this.props
    environment.addBody(id, initialState, (state) => {
      this.setState({ state })
    }, () => {
      this.setState({ loaded: true })
    })
  }

  /**
   * Life cycle hook for unmounting.
   */
  componentWillUnmount(): void {
    const {environment, id} = this.props
    environment.removeBody(id)
  }

  /**
   * Renders react element.
   * @returns {React.Element}
   */
  render(): React.Element<*> {
    const {loaded, state} = this.state
    const {children, middleware} = this.props
    if(loaded) {
      return (
        <Body.Provider body={state}>
          {React.cloneElement(this.props.children, middleware(state))}
        </Body.Provider>
      )
    }
    return null
  }
}

const contextTypes = {
  environment: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(Body)
