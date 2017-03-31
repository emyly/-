
/**
 * Created by wangming on 2016/1/9.
 */

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import FinancialOrderDetail from 'components/FinancialOrderDetail'
import Constant from 'lib/constant'
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import FinancialSubmitDialog from 'components/FinancialSubmitDialog';

export default class DiscountAbleDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      submitBtnDisabled: true,
      submitDialogOpen: false,
      callbackValue: -1
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
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
    console.debug('NotBaddebtsDetail:', Constant);
	 this.setState({ orderInfo: this.props.location.state.orderInfo });
  };

  static contextTypes = {
    router: React.PropTypes.object
  };
  // 提交回调
  handleSubmitCallback = (value) => {
    this.setState({
      submitBtnDisabled: (value != '' && Number(value) >= 0) ? false : true,
      callbackValue: (value != '' && Number(value) >= 0) ? Number(value) : -1
    })
  };
  // 提交Dialog切换
  handleSubmitDialogOpen = () => {
    this.setState({
      submitDialogOpen: !this.state.submitDialogOpen
    })
  }
  // 显示提交Dialog
  handleShowSubmitDialog = () => {
    this.setState({
      submitDialogOpen: true
    })
  }

  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        onTouchTap={this.handleShowSubmitDialog}
        disabled={this.state.submitBtnDisabled}
        label='折扣登记'
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='折扣管理'
        actions={actions}
        iconPosition={'-120px -150px'}
      >
        <FinancialOrderDetail
          submitCallback={this.handleSubmitCallback}
          orderId={Number(this.state.orderInfo.GUID)} orderType={String(this.state.orderInfo.DDLX)}
          financialType={Constant.SAAS.financial.DISCOUNT} ifSubmit
        />
        <FinancialSubmitDialog
          pushUrl={'/discount'}
          callbackValue={this.state.callbackValue}
          orderId={Number(this.state.orderInfo.GUID)}
          type={Constant.SAAS.financial.DISCOUNT}
          handleDialogOpen={this.handleSubmitDialogOpen}
          open={this.state.submitDialogOpen}
        />
      </StandardDataGrid>
    )
  }

}

