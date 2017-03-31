/**
 * Created by qyf on 2016/10/21.
 */
import React, { Component } from 'react';

export default class OrderChidren extends Component {

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
