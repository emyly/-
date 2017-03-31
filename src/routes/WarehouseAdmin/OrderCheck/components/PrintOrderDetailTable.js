/**
 * Created by liuyali on 2017/2/28.
 */
import React, { Component, PropTypes } from 'react';
import './PrintOrderGoodsDetailDataGrid.scss';
import moment from 'components/Moment';

export default class PrintOrderDetailTable extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    orderData: {},
    turnOrderData: {},
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      orderData: nextProps.orderBasicInfoForm.orderData,
      turnOrderData: nextProps.orderBasicInfoForm.turnOrderData
    });
  }

  render() {
    return (
      <div style={{ marginBottom: '30px' }} className='col-lg-12 col-md-12 col-sm-12 printTableWrapper'>
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>配货单</h1>
        <table className='printTable'>
          <thead />
          <tbody>
            <tr>
              <td colSpan='4' rowSpan='2'> 订单编号 {this.props.orderId}({this.state.orderData.PPMC})</td>
              <td>经销商</td>
              <td colSpan='3'>{this.state.orderData.ZXFX === '0' ? this.state.turnOrderData.SHJXSMC || '-' : this.state.orderData.SHJXSMC || '-'}</td>
            </tr>
            <tr>
              <td>医院</td>
              <td colSpan='3'>{this.state.orderData.YYMC}</td>
            </tr>
            <tr>
              <td style={{ width: '60px' }}>手术名称</td>
              <td>{this.state.orderData.SSMC}</td>
              <td style={{ width: '60px' }}>销售代表</td>
              <td >{this.state.orderData.ZXFX === '0' ? this.state.turnOrderData.XSDBMC || '-' : this.state.orderData.XSDBMC || '-'}</td>
              <td style={{ width: '60px' }}>医生</td>
              <td>{this.state.orderData.YSMC}</td>
              <td style={{ width: '60px' }}>医生2</td>
              <td>{this.state.orderData.FSYSMC}</td>
            </tr>
            <tr>
              <td>手术日期</td>
              <td>{Number(this.state.orderData.SSRQ) === 0 ? '' : moment(this.state.orderData.SSRQ).format('YYYY/MM/DD')}</td>
              <td>订货日期</td>
              <td>{Number(this.state.orderData.CJSJ) === 0 ? '' : moment(this.state.orderData.CJSJ).format('YYYY/MM/DD')}</td>
              <td>送货日期</td>
              <td>{Number(this.state.orderData.DHRQ) === 0 ? '' : moment(this.state.orderData.DHRQ).format('YYYY/MM/DD')}</td>
              <td>住院号</td>
              <td>{this.state.orderData.ZYH}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td colSpan='3'>{this.state.orderData.DDMS}</td>
              <td>病人</td>
              <td>{this.state.orderData.BRXM}</td>
              <td>床位号</td>
              <td>{this.state.orderData.CWH}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}
