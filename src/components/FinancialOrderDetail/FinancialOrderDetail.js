/**
 * Created by wangming on 2016/1/9.
 */

import React, { Component, PropTypes } from 'react';
import './FinancialOrderDetail.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import CardUI from 'components/StandardUI/StandardCard';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Constant from 'lib/constant';
import FinancialBillingDetail from 'components/FinancialBillingDetail';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import OperationPersonnelInfoForm from 'components/OperationPersonnelInfoForm';
import FinancialOrderGoodsDetailsDateGrid from 'components/FinancialOrderGoodsDetailsDateGrid';
import FinancialBillSummaryDataGrid from 'components/FinancialBillSummaryDataGrid';

/**
 * 使用场景：订单，查询订单的已收账明细
 *  api接口 ：
 *  已收款
 *  GET /DDB/:ddid/SKMX/YSK
 *  成功返回值示例：
 *  {
  *     "Code":0,
  *     "Message":"查询成功",
  *     "Result":{
  *     	"YSKMX": [{
 *              "CRKDID": "出库单号",
 *              "YSKJE": "已收账金额"
 *          }]
*	}
*}
 *  未收款
 *  GET /DDB/:ddid/SKMX/WSK
 *  成功返回值示例：
 *  {
  *     "Code":0,
  *     "Message":"查询成功",
  *     "Result":{
  *     	"YSKMX": [{
 *              "CRKDID": "出库单号",
 *              "WSKJE": "未收账金额"
 *          }]
*	}
*}
 *
 */
export default class FinancialOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    orderType: React.PropTypes.string.isRequired,
    financialType: React.PropTypes.string.isRequired,
    ifSubmit: React.PropTypes.bool.isRequired,
    submitCallback: React.PropTypes.func,
    // /**
    //  * 当前组织机构id
    //  */
    // orgId: React.PropTypes.number.isRequired,
    // /**
    //  * true: 显示已收款，flase: 显示未收款
    //  */
    // ifGatheringed: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    ifSubmit: false

  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {

  };

  componentWillReceiveProps = (nextProps) => {

  };

  showBasicInfo = () => (
    <div className='col-lg-6 col-md-6 col-sm-12'>
      <OrderBasicInfoForm orgId={0} orderId={this.props.orderId} />
    </div>
  );


  showPersonalInfo = () => {
    if (this.props.orderType === Constant.SAAS.CRK.SURGICAL_ORDER) {
      return (<div className='col-lg-6 col-md-6 col-sm-12'>
        <OperationPersonnelInfoForm orgId={0} orderId={this.props.orderId} />
      </div>)
    }
  };

  showOrderbasicInfo = () => <div>
    { this.showBasicInfo() }
    { this.showPersonalInfo() }
  </div>;

  handleSubmitCallback = (value) => {
    console.debug('FinancialOrderDetail:', value);
    if (this.props.submitCallback) {
      this.props.submitCallback(value);
    }
  };

  showOrderBillingDetail = () => {
    if (this.props.ifSubmit
      && (this.props.financialType === Constant.SAAS.financial.BILLING
      || this.props.financialType === Constant.SAAS.financial.GATHERING)) {
      return (<div className='col-lg-12 col-md-12 col-sm-12'>
        <FinancialBillingDetail orderId={this.props.orderId} ifCheckBox checkRowBack={this.handleSubmitCallback} />
      </div>)
    } else if (this.props.ifSubmit
      && this.props.financialType === Constant.SAAS.financial.BADDEBTS) {
      return (<div className='col-lg-12 col-md-12 col-sm-12'>
        <FinancialBillingDetail orderId={this.props.orderId} ifCheckBox ifBaddebtsSubmit checkRowBack={this.handleSubmitCallback} />
      </div>)
    } else {
      return (<div className='col-lg-12 col-md-12 col-sm-12'>
        <FinancialBillingDetail orderId={this.props.orderId} ifCheckBox={false} />
      </div>)
    }
  };
  // 账单汇总
  showFinancialBillSummaryDataGrid = () => {
    // 列表模式 '0'表示只显示 '1'表示物流费登记 '2'表示折扣登记 '3'表示加急费登记
    let tableType = '0';
    switch (this.props.financialType) {
      case Constant.SAAS.financial.LOGISTICS:
        tableType = '1';
        break;
      case Constant.SAAS.financial.DISCOUNT:
        tableType = '2';
        break;
      case Constant.SAAS.financial.URGENT:
        tableType = '3';
        break;
      default:
        break;
    }
    if (!this.props.ifSubmit) tableType = '0';
    return (<div className='col-lg-12 col-md-12 col-sm-12'>
      <FinancialBillSummaryDataGrid type={tableType} orderId={this.props.orderId} callback={this.handleSubmitCallback} />
    </div>)
  }


  render() {
    return (
      <div style={{ margin: '0px -15px' }}>
        { this.showOrderbasicInfo() }
        { this.showFinancialBillSummaryDataGrid() }
        { this.showOrderBillingDetail() }
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <FinancialOrderGoodsDetailsDateGrid orderId={this.props.orderId} />
        </div>
      </div>
    )
  }

}
