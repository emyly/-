/**
   * Created by NXQ on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './ContractAndAuthorization.scss';

export default class ContractAndAuthorization extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  render() {
    return (
      <div className='contract-and-authorization'>
        {this.props.children}
      </div>
    )
  }

}

