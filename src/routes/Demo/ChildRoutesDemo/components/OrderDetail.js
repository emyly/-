/**
 * Created by NXQ on 2016/10/20.
 */

import React, { Component, PropTypes } from 'react';

import './OrderDetail.scss';

import RaisedButton from 'material-ui/RaisedButton';

export default class OrderDetail extends Component {

  constructor(props) {
    super(props);
  }
  static contextTypes = {
    router: React.PropTypes.object
  };

  handleCancle = () => {
    this.context.router.push('/childRoutesDemo');
  };
  render() {
    return (
      <div className='order-detail'>
        <div>订单详情测试</div>
        <RaisedButton label='返回' style={{ margin: 10 }} primary onTouchTap={this.handleCancle} />
        <div style={{ padding: 50, width: '100%', height: 200, backgroundColor: 'lightcoral' }}>
          这是订单{this.props.params.id}的订单详情
        </div>
      </div>
    )
  }

}

