/**
 * Created by NXQ on 2016/10/20.
 */

import React, { Component, PropTypes } from 'react';
import './ChildRoutesLayoutDemo.scss';

/**
 * 使用场景：当出现'内容层'还要继续分层childRoutes的Demo
 */
export default class ChildRoutesLayoutDemo extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  render() {
    return (
      <div className='child-routes-layout-demo'>
        <div style={{ width: '100%', height: '50px', backgroundColor: 'lightblue' }}>
          <div>头部区域</div>
        </div>
        <div style={{ marginTop: 50 }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
