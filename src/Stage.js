/* @flow */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {Application, Container} from 'pixi.js'
import {contextProvider, withContext} from './hocs.js'
import {shallowCompare} from './utils.js'

/**
 * @memberof Stage
 */
type PropTypes = {
  app: Application,
  fullScreen: boolean,
  width: number,
  height: number,
  children?: React.Children,
  className?: string
}

type DefaultProps = {
  fullScreen: boolean,
  width: number,
  height: number
}
/**
 * @memberof Stage
 */
type StateTypes = {
  renderer: any,
  stage: Container,
  view: any
}

const Provider = contextProvider({ container: ReactPropTypes.object }, (props) => {
  return { container: props.container }
})

/**
 * Provides the rendering for react-pixi-game.
 * @example
 *
 * <Game>
 *  <Stage with={200} height={300}>
 *   { // graphics go here }
 *  </Stage>
 * </Game>
 */
class Stage extends React.PureComponent<DefaultProps, PropTypes, StateTypes> {
  /**
   * Default props
   * @property {boolean} fullScreen Defaults to true.
   */
  static defaultProps = {
    fullScreen: false,
    width: 800,
    height: 600
  }
  /**
   * Child context types.
   * @memberof Stage
   * @alias childContextTypes
   * @property {PIXI.Container} container The container to render to.
   */
  static childContextTypes = {
    container: ReactPropTypes.object.isRequired
  }

  state: StateTypes

  constructor(props: PropTypes) {
    super(props)
    this.state = {
      stage: this.props.app.stage,
      renderer: this.props.app.renderer,
      view: this.props.app.view
    }
  }

  /**
   * Resizes the stage
   * @memberof Stage
   * @method
   * @instance
   * @alias resize
   * @param {number} width
   * @param {number} height
   */
  resize(width: number, height: number): void {
    const {renderer, view} = this.state
    view.style.width = width + 'px'
    view.style.height = height + 'px'
    renderer.resize(width,height)
  }
  /**
   * On resize handler
   * @memberof Stage
   * @method
   * @instance
   * @alias onResize
   */
  onResize = (function(): void {
    this.resize(window.innerWidth, window.innerHeight)
  }).bind(this)

  /**
   * Life cycle hook for mounting. Sets up renderer and view.
   * @memberof Stage
   * @method
   * @instance
   * @alias componentDidMount
   */
  componentDidMount(): void {
    console.log("stage mount")
    const {fullScreen, width, height} = this.props
    const {view, stage, renderer} = this.state
    if(fullScreen) {
      this.resize(window.innerWidth, window.innerHeight)
      window.addEventListener('resize', this.onResize)
    }
    else {
      this.resize(width, height)
    }
    this.refs.container.appendChild(view)
    renderer.render(stage)
  }

  /**
   * Life cycle hook for unmounting.
   * @memberof Stage
   * @method
   * @instance
   * @alias componentWillUnmount
   */
  componentWillUnmount(): void {
    const {view} = this.state
    window.removeEventListener('resize', this.onResize)
    this.refs.container.removeChild(view)
  }

  /**
   * Renders react element.
   * @memberof Stage
   * @method
   * @instance
   * @returns {React.Element}
   */
  render(): React.Element<*> {
    const {stage} = this.state
    const {children, className} = this.props
    return (
      <div className={className} id="stage-container" ref="container">
        <Provider container={stage}>
          {children}
        </Provider>
      </div>
    )
  }
}

const contextTypes = {
  app: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(Stage)
