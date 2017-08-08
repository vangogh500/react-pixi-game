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
 * Prop types.
 * @memberof Stage
 * @prop {number} width Width of renderer and stage. Defaults to 800.
 * @prop {number} height Height of renderer and stage. Defaults to 600.
 * @prop {number} resolution Resolution of the renderer. Defaults to 1.
 * @prop {string} className CSS classes to be applied to the dom container.
 * @prop {React.Children} children JSX children. Reference to the stage will be passed down via context.
 */
type PropTypes = {
  width: number,
  height: number,
  resolution: number,
  className?: string,
  loop?: GameLoop,
  children?: React.Children
}

/**
 * Provides the rendering engine and view for react-pixi-game.
 * @example
 *
 * <Stage with={200} height={300} resolution={1}>
 *   { // graphics go here }
 * </Stage>
 */
class Stage extends mix(React.Component).with(PropBasedUpdate) {
  static Provider = contextProvider({ container: ReactPropTypes.object }, (props) => {
    return { container: props.container }
  })

  props: PropTypes

  static defaultProps = {
    width: 800,
    height: 600,
    resolution: 1
  }

  state: {
    renderer: WebGLRenderer | CanvasRenderer,
    container: Container
  }
  constructor(props: PropTypes) {
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
   * Life cycle hook for mounting. Hooks up the rendering engine to the game loop and mounts to DOM.
   */
  componentDidMount() {
    const {loop} = this.props
    const { renderer, container } = this.state
    this.refs.domcontainer.appendChild(renderer.view)
    if(loop) { loop.add(this.update) }
  }

  /**
   * Life cycle hook for unmounting. Unhooks the rendering engine from the game loop and DOM.
   */
  componentWillUnmount() {
    const {loop} = this.props
    const {renderer} = this.state
    if(loop) { loop.remove(this.update) }
    this.refs.domcontainer.removeChild(renderer.view)
  }

  /**
   * Life cycle hook for rendering.
   */
  render() {
    const {container} = this.state
    const {children, className} = this.props
    return (
      <div ref="domcontainer" className={className}>
        <Stage.Provider container={container}>
          {children}
        </Stage.Provider>
      </div>
    )
  }
}

const contextTypes = {
  loop: ReactPropTypes.object
}
export default withContext(contextTypes)(Stage)
