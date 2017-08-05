import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'


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
        <p className="text-uppercase">Basics</p>
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to='/examples/boilerplate' className="text-grey lighten-1">Boilerplate</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/geometry' className="text-grey lighten-1">Drawing Geometry</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/sprite' className="text-grey lighten-1">Sprites</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/animations' className="text-grey lighten-1">Animations</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/examples/animatedsprite' className="text-grey lighten-1">Animated Sprite</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link}  to='/examples/tilingsprite' className="text-grey lighten-1">Tiling Sprites</NavLink>
          </NavItem>
        </Nav>
        <p className="p-top-30px text-uppercase">Filters</p>
        <Nav vertical>
          <NavItem>
            <NavLink className="text-grey lighten-1" href="#">Blur</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1" href="#">Displacement</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1" href="#">Animating Filters</NavLink>
          </NavItem>
        </Nav>
        <p className="p-top-30px text-uppercase">User Interaction</p>
        <Nav vertical>
          <NavItem>
            <NavLink className="text-grey lighten-1" href="#">Mouse Event</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-grey lighten-1" href="#">Keyboard Event</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}
