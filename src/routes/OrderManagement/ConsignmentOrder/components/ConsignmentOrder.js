/**
 * Created by sjf on 2017/3/17.
 */
import React, { Component, PropTypes } from 'react';

export default class ConsignmentOrder extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    )
  }
}
