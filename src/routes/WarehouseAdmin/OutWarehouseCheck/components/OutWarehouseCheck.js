

import React, { Component, PropTypes } from 'react';
import './OutWarehouseCheck.scss';

export default class OutWarehouseCheck extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }
  render() {
    return (
      <div className='outWarehouse-check' style={{ width: '100%', height: '100%' }}>
        {this.props.children}
      </div>
    )
  }

}

