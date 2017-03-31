/**
 * Created by wangming on 2016/10/28.
 */


import React, { Component } from 'react';

import './DistributionOperation.scss';

export default class DistributionOperation extends Component {
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
