

import React, { Component } from 'react';

import './WareHouseInventory.scss';


export default class WareHouseInventory extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  }
  render() {
    return (
      <div className='warehouse-inventory'>
        {this.props.children}
      </div>
    );
  }
}
