/**
 * Created by NXQ on 10/28/2016.
 */

import React, { Component, PropTypes } from 'react';

import './Credit.scss';

export default class Credit extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='credit'>
        {this.props.children}
      </div>
    )
  }

}
