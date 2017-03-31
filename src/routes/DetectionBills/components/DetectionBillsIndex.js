/**
 * Created by liuyali on 2017/1/18.
 */

import React, { Component, PropTypes } from 'react';

export default class DetectionBillsIndex extends Component {
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
