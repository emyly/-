/**
 * Created by wangming on 2016/10/28.
 */


import React, { Component, PropTypes } from 'react';

import './StockOut.scss';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
export default class StockOut extends Component {

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
