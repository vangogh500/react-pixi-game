/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {autoDetectRenderer, Container} from 'pixi.js'
import type {WebGLRenderer, CanvasRenderer} from 'pixi.js'
import {contextProvider, withContext} from '../hocs.js'
import GameLoop from '../GameLoop.js'
import mix from '../mixins/mix.js'
import PropBasedUpdate from '../mixins/PropBasedUpdate.js'

/**
 * Provides the rendering for react-pixi-game.
 * @example
 *
 * <Stage with={200} height={300}>
 *   { // graphics go here }
 * </Stage>
 */
class Stage extends mix(React.Component).with(PropBasedUpdate) {
  /**
   * Provider for the stage.
   * @memberof Stage
   */
  static Provider = contextProvider({ container: ReactPropTypes.object }, (props) => {
    return { container: props.container }
  })
  /**
   * Prop types.
   * @memberof Stage
   */
  props: {
    width: number,
    height: number,
    resolution: number,
    className?: string,
    domcontainer: any,
    loop: GameLoop,
    children?: React.Children
  }
  /**
   * Default props.
   * @memberof Stage
   */
  static defaultProps = {
    width: 800,
    height: 600,
    resolution: 1
  }
  /**
   * State types.
   * @memberof Stage
   */
  state: {
    renderer: WebGLRenderer | CanvasRenderer,
    container: Container
  }
  constructor(props) {
    super(props)
    const renderer = new autoDetectRenderer({ width: props.width, height: props.height, resolution: props.resolution })
    const container = new Container()
    renderer.render(container)
    this.state = {
      renderer, container
    }
  }

  update = (function() {
    const {renderer, container} = this.state
    renderer.render(container)
  }).bind(this)

  /**
   * Life cycle hook for mounting.
   * @memberof Stage
   */
  componentDidMount() {
    const {domcontainer, loop} = this.props
    const { renderer, container } = this.state
    this.refs.domcontainer.appendChild(renderer.view)
    loop.add(this.update)
  }

  /**
   * Life cycle hook for unmounting.
   * @memberof Stage
   */
  componentWillUnmount() {
    const {domcontainer} = this.props
    const {renderer} = this.state
    this.refs.domcontainer.removeChild(renderer.view)
  }

  /**
   * Life cycle hook for rendering.
   * @memberof Stage
   */
  render() {
    const {container} = this.state
    const {children} = this.props
    return (
      <div ref="domcontainer">
        <Stage.Provider container={container}>
          {children}
        </Stage.Provider>
      </div>
    )
  }
}

const contextTypes = {
  loop: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(Stage)
