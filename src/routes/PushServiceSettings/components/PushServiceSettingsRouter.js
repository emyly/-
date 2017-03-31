/**
 * Created by NXQ on 2/23/2017.
 */
import React, { Component, PropTypes } from 'react';

/**
 * 场景说明：推送服务设置
 */
export default class PushServiceSettingsRouter extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    )
  }
}
