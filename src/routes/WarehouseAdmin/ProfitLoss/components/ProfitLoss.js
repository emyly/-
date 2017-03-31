

import React, { Component } from 'react';

import './ProfitLoss.scss';


export default class ProfitLoss extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  }
  render() {
    return (
      <div className='profit-loss' >
        {this.props.children}
      </div>
    )
  }

}

