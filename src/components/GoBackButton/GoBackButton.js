/**
 * Created by NXQ on 12/21/2016.
 */

import React, { Component, PropTypes } from 'react';

import './GoBackButton.scss'

import FlatButton from 'material-ui/FlatButton';

/**
 * 回退按钮
 */
export default class GoBackButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps ={
    label: '返回',
    style: {},
    labelStyle: {}
  };
  static propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    labelStyle: PropTypes.object
  };

  handleTouchGoBack = () => {
    this.context.router.goBack();
  };
  render() {
    return (
      <FlatButton
        label={this.props.label} onTouchTap={this.handleTouchGoBack}
        labelStyle={{ fontSize: '14px', fontFamily: 'SourceHanSansCN-Regular', color: '#666', ...this.props.labelStyle }}
        style={{ width: '88px', height: '36px', marginRight: '20px', ...this.props.style }}
      />
    );
  }
}
