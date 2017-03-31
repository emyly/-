/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import './OrderCheckList.scss';

/*
*   外审模块
* */
export default class OrderCheckList extends Component {
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
