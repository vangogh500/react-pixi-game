/**
 * @file Button for changing locale
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {changeLocale} from '../../Services/Store/Actions/Locale.js'

type PropTypes = {
  className?: string,
  to: string,
  onClick: (string) => void,
  children?: React.Children
}

type DefaultProps = {
  className: string
}


/**
 * @class
 * @extends {React.Component}
 * Button for changing locale
 */
class LocaleButton extends React.Component<DefaultProps,PropTypes,void> {
  static defaultProps = {
    className: ""
  }

  /**
   * Handles synthetic event and calls "onClick" with "to" as the parameter
   * @method
   * @memberof LocaleButton
   * @param {SyntheticEvent} e
   */
  handleClick(e): void {
    e.preventDefault()
    this.props.onClick(this.props.to)
  }

  /**
   * Renders the react element
   * @method
   * @memberof LocaleButton
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.props.className} onClick={(e) => this.handleClick(e)}>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (locale:string) => dispatch(changeLocale(locale))
  }
}

export default connect(null, mapDispatchToProps)(LocaleButton)
