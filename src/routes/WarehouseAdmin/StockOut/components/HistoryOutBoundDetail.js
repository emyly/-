/**
 * Created by wangming on 2016/10/31.
 */


import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import './HistoryOutBoundDetail.scss';
import OutBoundDetail from 'components/OutBoundDetail'
import Dialog from 'material-ui/Dialog';
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '800px',
  maxHeight: 'none'
};
export default class HistoryOutBoundDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false
    }
  }

  static propTypes = {
    open: React.PropTypes.bool,
    orderId: React.PropTypes.number,
    warehouseId: React.PropTypes.string
  };
	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
		// this.setState({open : this.props.open});
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    console.log('componentWillMount');
		/**
		 * 订单类型：
		 * 0：铺货订单，
		 * 1：备货订单
		 * 2：手术订单
		 * 3: 借货订单
		 * 4: 调货订单
		 * 5: 铺货补货订单
		 * 6: 铺货销售订单
		 */
  };


  render() {
		// console.log("SelectingGoods:",this.props.location.state);
		// let orderId = this.props.location.state.GUID;
    const actions = [
      <FlatButton
        label='关闭'
        primary
        onTouchTap={this.props.handleClose}
      />
    ];
    return (
      <BusinessDialog
        title='历史拣货详情'
        actions={actions}
        modal
        open={this.props.open}
        bodyStyle={customContentStyle}
        contentStyle={{ width: '57.1rem' }}
      >
        <div className='dialogWareScoroll'>
          <OutBoundDetail orderId={Number(this.props.orderId)} warehouseId={String(this.props.warehouseId)} />
        </div>
      </BusinessDialog>
    )
  }

}
