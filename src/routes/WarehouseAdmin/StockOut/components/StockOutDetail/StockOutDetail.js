/**
 * Created by wangming on 2016/10/29.
 */

import React, { Component, PropTypes } from 'react';

'use strict';

import './StockOutDetail.scss';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import SelectProductionRecordTable from 'components/SelectProductionRecordTable';
import DistributionSummary from '../../containers/DistributionSummaryContainer';

export default class StockOutDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false
    }
  }

  static propTypes = {
		/**
		 * 当前组织机构id
		 */
    orgId: React.PropTypes.number,

    orderId: React.PropTypes.number.isRequired,
		/**
		 * 获取是否需要拣货回调
		 */
    selectCallback: React.PropTypes.func,
		/**
		 * 点击行回调
		 */
    rowClickCallback: React.PropTypes.func,
    ifShowCurrentSelect: React.PropTypes.bool,
    operator: React.PropTypes.string,
    dataInArray: React.PropTypes.array,
    dataInArrayByMatch: React.PropTypes.array,
    submitCallback: React.PropTypes.func,
    orderType: React.PropTypes.string
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
    console.debug('outdetail 1:', this.props);

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
    return (
      <div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <OrderBasicInfoForm orgId={this.props.orgId} orderId={this.props.orderId} />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <SelectProductionRecordTable
            orgId={this.props.orgId} orderId={this.props.orderId} ifShowCurrentSelect={this.props.ifShowCurrentSelect}
            operator={this.props.operator} rowClickCallback={this.props.rowClickCallback}
          />
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <DistributionSummary
            submitCallback={this.props.submitCallback} dataArray={this.props.dataInArray}
            dataInArrayByMatch={this.props.dataInArrayByMatch} orgId={this.props.orgId}
            orderId={this.props.orderId} callback={this.props.selectCallback} orderType={this.props.orderType}
          />
        </div>
      </div>
    )
  }

}
