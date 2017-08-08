import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'


type PropTypes = {
  className: string
}
type DefaultPropTypes = {
  className: string
}

export default class SideNav extends React.Component<DefaultPropTypes, PropTypes, void> {
  static defaultProps = {
    className: ""
  }
  render() {
    const {className} = this.props
    return (
      <div className={"grey darken-4 text-white p-top-30px font-weight-500 " + className}>
        <p className="text-uppercase text-no-select"><FormattedMessage id="sidenav.section_1.title" /></p>
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to='/examples/boilerplate' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.boilerplate" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/geometry' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.geometry" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/sprite' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.sprites" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/animations' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.animations" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/animatedsprite' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.animatedsprite" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link}  to='/examples/tilingsprite' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_1.tilingsprite" /></NavLink>
          </NavItem>
        </Nav>
        <p className="p-top-30px text-uppercase text-no-select"><FormattedMessage id="sidenav.section_3.title" /></p>
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to='/examples/pointerevent' className="text-grey lighten-1 text-no-select"><FormattedMessage id="sidenav.section_3.pointer" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1 text-no-select" href="#"><FormattedMessage id="sidenav.section_3.keyboard" /></NavLink>
          </NavItem>
        </Nav>
        <p className="p-top-30px text-uppercase text-no-select"><FormattedMessage id="sidenav.section_2.title" /></p>
        <Nav vertical>
          <NavItem>
            <NavLink className="text-grey lighten-1 text-no-select" href="#"><FormattedMessage id="sidenav.section_2.blur" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1 text-no-select" href="#"><FormattedMessage id="sidenav.section_2.displacement" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1 text-no-select" href="#"><FormattedMessage id="sidenav.section_2.animating" /></NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}
