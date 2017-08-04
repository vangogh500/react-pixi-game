/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {loaders} from 'pixi.js'
import {contextProvider} from './hocs.js'
import {deepCompareArray} from './utils.js'

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
  loader: loaders.Loader
}

const Provider = contextProvider({ resources: ReactPropTypes.object.isRequired }, (props) => {
  return {
    resources: props.resources
  }
})

/**
 * Provides resources for the game.
 * @example
 *
 * <ResourceProvider resources={['bunny', './bunny.png', 'octopus', './octopus.png']}>
 *  { // resource consumers go here }
 * </ResourceProvider>
 */
export default class ResourceProvider extends React.PureComponent<DefaultPropTypes,PropTypes,*>  {
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
      loaded: false
    }
  }

  /**
   * Life cycle hook for mounting. Loads the resources.
   * @memberof ResourceProvider
   * @method
   * @instance
   */
  componentDidMount(): void {
    console.log("Resource mount")
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
    if(!deepCompareArray(this.props.resources, nextProps.resources)) {
      this.setState({ loaded: false })
      // load resources not loaded already
      const currentResourceStrings = this.props.resources.map(resource => resource.toString())
      const resources = nextProps.resources.filter(resource => !currentResourceStrings.includes(resource.toString()))
      const loader = ResourceProvider.createLoaderFromResources(resources)
      loader.load(() => this.setState({ loader, loaded: true }))
    }
  }

  /**
   * Renders react element.
   * @memberof ResourceProvider
   * @method
   * @instance
   * @alias render
   */
  render(): ?React.Element<*> {
    const {children} = this.props
    const {loaded, loader} = this.state
    if(loaded) {
      return (
        <Provider resources={loader.resources}>
          {children}
        </Provider>
      )
    }
    return null
  }
}
