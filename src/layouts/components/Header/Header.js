

import React, { Component, PropTypes } from 'react';

import classes from './Header.scss';
import AppBar from 'material-ui/AppBar';
import PersonalBasicInformationDialog from 'components/PersonalBasicInformationDialog'


export default class MenuBar extends Component {
  state = {};
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    handleToggleDrawer: React.PropTypes.func.isRequired,
    handleTitleTouch: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar
        title={this.props.title}
        iconElementRight={<PersonalBasicInformationDialog />}
        onLeftIconButtonTouchTap={this.props.handleToggleDrawer}
        onTitleTouchTap={this.props.handleTitleTouch}
        onRightIconButtonTouchTap={this.handleRightIconButtonTouchTap}
        style={{ backgroundColor: '#00a0ff', display: 'none' }}
      />

    )
  }
}
