import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, NavLink, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import LocaleButton from './LocaleButton.js'

type PropTypes = {
  locale: string
}

type State = {
  isOpen: boolean,
  localeDropDownIsOpen: boolean
}

/**
 * @class
 * @extends {React.Component}
 * Main navbar for Honghue
 */
class MainNav extends React.Component<void,PropTypes,State> {
  state = {
    isOpen: false,
    localeDropDownIsOpen: false
  }

  /**
   * Toggle to collapse navbar for small screens.
   * @method
   * @memberof MainNav
   */
  toggleCollapse() {
    this.setState({isOpen: !this.state.isOpen})
  }

  /**
   * Toggles the locale dropdown
   * @method
   * @memberof MainNav
   */
  toggleLocaleDropDown() {
    this.setState({localeDropDownIsOpen: !this.state.localeDropDownIsOpen})
  }

  render() {
    const {isOpen, localeDropDownIsOpen} = this.state
    const {locale} = this.props
    return (
      <Navbar id="mainnav" light toggleable>
        <NavbarToggler right onClick={() => this.toggleCollapse()} />
        <NavbarBrand tag={Link} className="font-quicksand font-size-lg" to="/">React Pixi Game</NavbarBrand>
        <Collapse id="mainnav-right" isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto line-height-lg" navbar>
            <NavItem>
              <Dropdown isOpen={localeDropDownIsOpen} toggle={() => this.toggleLocaleDropDown()}>
                <DropdownToggle nav>
                  <span className={"flag-icon flag-icon-" + (locale === 'ja' ? 'jp' : 'gb')} ></span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right">
                  <DropdownItem>
                    <NavLink tag={LocaleButton} to='ja'><span className="flag-icon flag-icon-jp"></span></NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink tag={LocaleButton} to="en"><span className="flag-icon flag-icon-gb"></span></NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

export default connect(mapStateToProps, null)(MainNav)
