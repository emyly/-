

import React, { Component } from 'react';


import './LogisticsDelivery.scss';

export default class LogisticsDelivery extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }


  render() {
    return (
      <div className='logistics-delivery' >
        {this.props.children}
      </div>
    )
  }

}
