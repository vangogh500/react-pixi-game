/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {loaders} from 'pixi.js'
import {ContextProvider} from './hocs.js'
import {shallowCompare} from './utils.js'

/**
 * @memberof ResourceProvider
 * @prop {Array<[string,string]>} res Resources in tuple form [name, path].
 */
type PropTypes = {
  resources: Array<[string,string]>,
  children: ?React.Children
}

type DefaultPropTypes = {
  resources: Array<[string,string]>
}

/**
 * State Types
 * @memberof ResourceProvider
 */
type StateTypes = {
  loaded: boolean,
  loader: loaders.Loader,
  Provider: Class<React.Component<*,*,*>>
}

/**
 * Provides resources for the game.
 * @example
 *
 * <ResourceProvider resources={['bunny', './bunny.png', 'octopus', './octopus.png']}>
 *  { // resource consumers go here }
 * </ResourceProvider>
 */
export default class ResourceProvider extends React.Component<DefaultPropTypes,PropTypes,*>  {

  state: StateTypes
  /**
   * Default props.
   * @memberof ResourceProvider
   * @prop {Array<[string,string]>} defaultProps Defaults to an empty array.
   */
  static defaultProps = {
    resources: []
  }
  /**
   * Child context types.
   * @memberof ResourceProvider
   * @alias childContextTypes
   */
  static childContextTypes = {
    resources: ReactPropTypes.object.isRequired
  }
  /**
   * Creates a loader configured by the resources.
   * @memberof ResourceProvider
   * @method
   * @static
   * @alias createLoaderFromResources
   * @param {Array<[string,string]>} resources
   * @returns {PIXI.loaders.Loader}
   */
  static createLoaderFromResources(resources: Array<[string,string]>): loaders.Loader {
    const loader = new loaders.Loader()
    resources.forEach((resource) => {
      loader.add(resource[0], resource[1])
    })
    return loader
  }

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      loader: ResourceProvider.createLoaderFromResources(this.props.resources),
      loaded: false,
      Provider: ContextProvider(ResourceProvider.childContextTypes, this.getChildContext)
    }
  }

  /**
   * Gets the child context.
   * @memberof ResourceProvider
   * @method
   * @instance
   * @returns {object} Child context.
   */
  getChildContext = (function() {
    return {
      resources: this.state.loader.resources
    }
  }).bind(this)

  /**
   * Life cycle hook for mounting. Loads the resources.
   * @memberof ResourceProvider
   * @method
   * @instance
   */
  componentDidMount(): void {
    const {loader} = this.state
    loader.load((loader) => {
      this.setState({
        loaded: true,
        loader: loader
      })
    })
  }

  /**
   * Life cycle hook for mounting. Loads the resources.
   * @memberof ResourceProvider
   * @method
   * @instance
   * @prop {PropTypes} nextProps
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    // work is done with props have been changed
    if(!shallowCompare(this.props, nextProps)) {
      this.setState({ loaded: false })
      // load resources not loaded already
      const currentResourceStrings = this.props.resources.map(resource => resource.toString())
      const resources = nextProps.resources.filter(resource => !currentResourceStrings.includes(resource.toString()))
      const loader = ResourceProvider.createLoaderFromResources(resources)
      loader.load(() => this.setState({ loader, loaded: true }))
    }
  }

  /**
   * Optimization for life cycle hooks.
   * @memberof ResourceProvider
   * @instance
   * @method
   * @alias shouldComponentUpdate
   * @param {PropTypes} nextProps
   * @returns {boolean} If component should update.
   */
  shouldComponentUpdate(nextProps: PropTypes, nextState: StateTypes): boolean {
    // should only update on state change since componentWillReceiveProps delegates prop changes to state change
    return !shallowCompare(this.state, nextState)
  }

  /**
   * Renders react element.
   * @memberof ResourceProvider
   * @method
   * @instance
   * @alias render
   */
  render(): ?React.Element<*> {
    console.log("Resource provider render")
    const {children} = this.props
    const {loaded, Provider} = this.state
    if(loaded) {
      return (
        <Provider>
          {children}
        </Provider>
      )
    }
    return null
  }
}
