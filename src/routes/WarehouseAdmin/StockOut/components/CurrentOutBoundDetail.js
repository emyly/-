/**
 * Created by wangming on 2016/11/1.
 */


import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import './CurrentOutBoundDetail.scss';
import OutBoundDetail from 'components/OutBoundDetail'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';

export default class CurrentOutBoundDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false,
      objectInDetail: {}
    }
  }

  static propTypes = {
		/**
		 * 当前组织机构id
		 */
    warehouseId: React.PropTypes.string.isRequired,
    orderId: React.PropTypes.number.isRequired,
    orderInfo: React.PropTypes.object.isRequired,
    oprator: React.PropTypes.string.isRequired,
    dataInArray: React.PropTypes.array.isRequired,
    dataInArrayByMatch: React.PropTypes.array.isRequired
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
    console.debug('currentOutBoundDetail 1:', this.props);

    const basicInfo = {
      CKCK: this.props.orderInfo.CKCKMC,
      CJSJ: (new Date()).valueOf(),
      YHXM: this.props.oprator
    };

    const detail = this.props.dataInArray;

    const objectInDetail = {
      basicInfo,
      detailArray: detail
    };

    this.setState({ objectInDetail });

    console.debug('currentOutBoundDetail 2:', objectInDetail);
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

  componentWillReceiveProps = (nextProps) => {
    const basicInfo = {
      CKCK: this.props.orderInfo.CKCKMC,
      CJSJ: (new Date()).valueOf(),
      YHXM: nextProps.oprator
    };

    const detail = this.props.dataInArray;

    const objectInDetail = {
      basicInfo,
      detailArray: detail
    };

    this.setState({ objectInDetail });
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
        title='本次拣货详情'
        actions={actions}
        modal
        open={this.props.open}
        repositionOnUpdate
      >
        <div style={{ height: '500px'}}>
          <OutBoundDetail
            orderId={Number(this.props.orderId)} warehouseId={String(this.props.warehouseId)}
            dataObject={this.state.objectInDetail} dataInArrayByMatch={this.props.dataInArrayByMatch}
          />
        </div>
      </BusinessDialog>
    )
  }

}
