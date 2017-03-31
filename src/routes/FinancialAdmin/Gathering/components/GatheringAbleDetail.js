
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

export default class GatheringAbleDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      submitDataList: []
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    /**
     * 当前组织机构id
     */
    // orgId: React.PropTypes.number,
    // orderId: React.PropTypes.number.isRequired,
    // dataInArray: React.PropTypes.array.isRequired,
    // dataInArrayByMatch: React.PropTypes.array.isRequired
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
  /**
   * 选中callback
   */
  checkCallBack = (value) => {
    console.log('checkCallBackcheckCallBack', value);
    this.setState({ submitDataList: value });
  };
  /**
   * 收款登记
   */
  gotoSubmit = () => {
    this.context.router.push({
      pathname: '/gathering/submit',
      state: {
        orderInfo: this.state.orderInfo,
        submitDataList: this.state.submitDataList
      }
    });
  };

  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        disabled={this.state.submitDataList.length <= 0}
        onTouchTap={this.gotoSubmit}
        label='收款登记'
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='收款管理'
        actions={actions}
        iconPosition={'-60px -150px'}
      >
        <FinancialOrderDetail
          submitCallback={this.checkCallBack}
          orderId={Number(this.state.orderInfo.GUID)} orderType={String(this.state.orderInfo.DDLX)}
          financialType={Constant.SAAS.financial.GATHERING} ifSubmit
        />
      </StandardDataGrid>
    )
  }

}

