/**
 * Created by niexq on 17/3/25.
 */

import React, { Component, PropTypes } from 'react';

/*
 *  场景说明：商品转移
 */
export default class GoodsTransferRouter extends Component {
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

