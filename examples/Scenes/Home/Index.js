import React from 'react'
import { Jumbotron, Button, Alert, Input, Label } from 'reactstrap'
import {FormattedMessage} from 'react-intl'

// @TODO: Left hand side non selectable

export default class Home extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1><FormattedMessage id="home.title" /></h1>
        <h5><FormattedMessage id="home.subtitle" /></h5>
        <br />
        <p><FormattedMessage id="home.subtext" /></p>
        <hr />
        <h4><FormattedMessage id="home.section_1.main_title" /></h4>
        <ul>
          <li>
            <h5><FormattedMessage id="home.section_1.title_1" /></h5>
            <p><FormattedMessage id="home.section_1.text_1" /></p>
          </li>
          <li>
            <h5><FormattedMessage id="home.section_1.title_2" /></h5>
            <p><FormattedMessage id="home.section_1.text_2" /></p>
          </li>
        </ul>
        <hr />
        <Alert color="info">
          <FormattedMessage id="home.notes.version" />
        </Alert>
        <Alert color="warning">
          <FormattedMessage id="home.notes.migration" />
        </Alert>
          <h4><FormattedMessage id="home.section_2.title" /></h4>
          <p><FormattedMessage id="home.section_2.subtext" /></p>
          <ul>
            <li>Pixi.js</li>
            <li>React.js</li>
            <li>vangogh500-physics</li>
          </ul>
        <hr />
        <h4><FormattedMessage id="home.section_3.title" /></h4>

        <Alert color="info">
          <FormattedMessage id="home.section_3.subtext_1" />
          <br/>
          <FormattedMessage id="home.section_3.subtext_2" />　<code>npm install --save react-pixi-game</code>
        </Alert>

        <hr />
        <h4><FormattedMessage id="home.section_4.title" /></h4>
        <Alert color="success">
          <FormattedMessage id="home.notes.contribution.text" /> <a href="https://github.com/vangogh500"><FormattedMessage id="home.notes.contribution.link" /></a>
        </Alert>
        <h5>v0.0.2a - Rendering</h5>
        <Label check>
          <Input checked disabled type="checkbox" /> Loop
        </Label>
        <br />
        <Label check>
          <Input checked disabled type="checkbox" /> Stage
        </Label>
        <br />
        <Label check>
          <Input checked disabled type="checkbox" /> ResourceLoader
        </Label>
        <br />
        <Label check>
          <Input checked disabled type="checkbox" /> Square
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Circle
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Animated Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Tiling Sprite
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Tick Action
        </Label>
        <br/>
        <Label check>
          <Input checked disabled type="checkbox" /> Pointer Action
        </Label>

        <h5 className="p-top-30px">v0.2.0 - Basic Physics</h5>
        <Label check>
          <Input disabled type="checkbox" /> Basic Particle Physics
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Basic Rigid Body Physics
        </Label>

        <h5 className="p-top-30px">v0.3.0 - User Interaction</h5>
        <Label check>
          <Input disabled type="checkbox" /> Expand Pointer Action
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Keyboard Action
        </Label>

        <h5 className="p-top-30px">v0.4.0 - Filters</h5>
        <Label check>
          <Input disabled type="checkbox" /> Displacement Filter
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Blur Filter
        </Label>
        <br />
        <Label check>
          <Input disabled type="checkbox" /> Color Matrix Filter
        </Label>
      </Jumbotron>
    )
  }
}
