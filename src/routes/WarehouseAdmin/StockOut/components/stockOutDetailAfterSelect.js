/**
 * Created by wangming on 2016/10/29.
 */


import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import './StockOutDetailAfterSelect.scss';
import StockOutDetail from './StockOutDetail';
import HistoryOutBoundDetail from './HistoryOutBoundDetail';
import CurrentOutBoundDetail from './CurrentOutBoundDetail';

export default class StockOutDetailAfterSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false,
      curWarehouseId: 0,
      historyDialogOpen: false,
      curDialogOpen: false,
      oprator: ''

    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
		/**
		 * 当前组织机构id
		 */
    orgId: React.PropTypes.number,
    orderId: React.PropTypes.number.isRequired,
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
    console.debug('after selecting 1:', this.props);
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

  goNextDetail = (returnValue) => {
    console.debug('goNextDetail:', returnValue);
    if (returnValue.GUID === '本次拣货记录') {
      console.log('goNextDetail:', returnValue);
      this.setState({ curDialogOpen: true });
      this.setState({ curWarehouseId: returnValue.GUID });
      this.setState({ oprator: returnValue.YHXM });
    } else {
      console.log('goNextDetail:', returnValue);
      this.setState({ historyDialogOpen: true });
      this.setState({ curWarehouseId: returnValue.GUID });
    }
  };

  historyDialoghandleClose = () => {
    this.setState({ historyDialogOpen: false });
  };

  curDialoghandleClose = () => {
    this.setState({ curDialogOpen: false });
  };

  getUndistributionNum = (num) => {
    console.log('getUndistributionNum:', num);
    if (num > 0) {
      this.setState({ ifShowButton: true });
    } else {
      this.setState({ ifShowButton: false });
    }
  };

	// gotoSelectingGoods = () => {
	// 	console.log("gotoSelectingGoods");
	// 	this.context.router.push({pathname: '/stockOut/selectingGoods'});
	// };

	// showButton = () => {
	// 	if(this.state.ifShowButton){
	// 		console.log("showButton true");
	// 		return <div style={{textAlign : 'right'}}>
	// 			<FlatButton hoverColor = 'white' rippleColor = "white"
	// 			            label="拣货"
	// 			            onTouchTap={this.gotoSelectingGoods}
	// 			            icon={<AddCircle   color = {blue400} />}
	// 			/>
	// 		</div>
	// 	}else{
	// 		console.log("showButton false");
	// 	}
	// };

	// submitCallback = (dataArray) => {
	// 	console.debug("submitCallback:", dataArray);
	// };

  render() {
		// console.log("OrderBasicInfoForm:",this.props.location.state);
		// let orderId = this.props.location.state.GUID;
    return (
      <div>
        <StockOutDetail orderId={this.props.orderId} submitCallback={this.props.submitCallback} dataInArray={this.props.dataInArray} dataInArrayByMatch={this.props.dataInArrayByMatch} orgId={0} rowClickCallback={this.goNextDetail} ifShowCurrentSelect operator={this.props.stockOutDetailAfter.YHXM} selectCallback={this.getUndistributionNum} />
        <HistoryOutBoundDetail
          orderId={this.props.orderId} warehouseId={String(this.state.curWarehouseId)} open={this.state.historyDialogOpen}
          handleClose={this.historyDialoghandleClose}
        />
        <CurrentOutBoundDetail
          orderInfo={this.props.orderInfo} orderId={this.props.orderId} warehouseId={String(this.state.curWarehouseId)} open={this.state.curDialogOpen}
          handleClose={this.curDialoghandleClose} oprator={this.state.oprator} dataInArray={this.props.dataInArray} dataInArrayByMatch={this.props.dataInArrayByMatch}
        />
      </div>
    )
  }

}
