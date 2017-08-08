/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {loaders} from 'pixi.js'
import {contextProvider} from '../hocs.js'
import {deepCompareArray} from '../utils.js'

/**
 * Prop Types
 * @memberof ResourceLoader
 * @prop {Array.<[string,string]>} resources Array of resources in tuple form: [name, path]. Defaults to an empty array.
 * @prop {?React.Children} children JSX children. Resources once loaded will be passed to them via context.
 */
type PropTypes = {
  resources: Array<[string,string]>,
  children: ?React.Children
}

type DefaultPropTypes = {
  resources: Array<[string,string]>
}

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
 * <ResourceLoader resources={['bunny', './bunny.png', 'octopus', './octopus.png']}>
 *  { // resource consumers go here }
 * </ResourceLoader>
 */
export default class ResourceLoader extends React.PureComponent<DefaultPropTypes,PropTypes,*>  {
  state: StateTypes

  static defaultProps = {
    resources: []
  }
  /**
   * Creates an instance of loader configured with the resources.
   * @memberof ResourceLoader
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
      loader: ResourceLoader.createLoaderFromResources(this.props.resources),
      loaded: false
    }
  }

  /**
   * Life cycle hook for mounting. Loads resources before children are rendered.
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
   * Handles props. If resources are different, the loader will load again.
   */
  componentWillReceiveProps(nextProps: PropTypes): void {
    if(!deepCompareArray(this.props.resources, nextProps.resources)) {
      this.setState({ loaded: false })
      const loader = ResourceLoader.createLoaderFromResources(nextProps.resources)
      loader.load(() => this.setState({ loader, loaded: true }))
    }
  }

  /**
   * Renders react element. Will render null until resources are loaded.
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
