/**
 * Created by SJF on 2016/11/7.
 */
import React, { Component } from 'react';

export default class SurgeryRecoveryRecheck extends Component {
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
