import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../Styles/index.scss'
import MainNav from './MainNav/Index.js'
import SideNav from './SideNav/Index.js'
import {Nav, NavbarToggler, NavItem, NavLink, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

type PropTypes = {
  children?: React.Children
}

export default class UIContainer extends React.Component<void, PropTypes, void> {
  render() {
    const {children} = this.props
    return (
      <div className="m-h-vh100">
        <MainNav />
          <div className="container-fluid">
          <div className="row">
            <SideNav className="col-sm-3 col-2" />
            <div className="col-sm-9 col-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
