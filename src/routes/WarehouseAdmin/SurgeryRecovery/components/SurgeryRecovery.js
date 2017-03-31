/**
 * Created by sjf on 2016/11/7.
 */
import React, { PropTypes } from 'react';

export default class SurgeryRecovery extends React.PureComponent {
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
