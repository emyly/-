/**
 * Created by wrq on 2016/10/21.
 */
import React, { Component, PropTypes } from 'react';
export default class ReceivingChildRouter extends Component {
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
