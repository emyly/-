/**
 * Created by wangming on 2016/10/26.
 */

import React, { Component, PropTypes } from 'react';
import './OrderBasicInfoForm.scss';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { orderType, orderState, orderOperationData, orderStockData, orderTypeObject } from './OrderBasicInfoData'
import CardUI from 'components/StandardUI/StandardCard';
import moment from 'components/Moment';

/**
 * 使用场景：订单详情，订单基本信息
 * API接口: 订单->查询订单详情
 *          GET /DDB/:ddid
 *          成功返回值：
 *{
	*"Code":0,
	*"Message":"查询成功",
	*"Result":{
	*	"DDB": {
	*		...
	*		"GUID": "订单编号",
	*		"YWXZFL": "业务线ID",
	*		"YWXMC": "业务线名称",
	*		"PPID": "品牌ID",
	*		"PPMC": "品牌名称",
	*		"SSLXID": "手术类型ID",
	*		"SSLXMC": "手术类型",
	*		"SSMC": "手术名称",
	*		"SSMBID":"手术模板ID",
	*		"SSMBMC": "手术模板",
	*		"CJJXSMC": "创建经销商名称",
	*		"SHJXSMC": "审核经销商名称",
	*		"DDZT": "订单状态",
	*		"SHZT": "审核状态",
	*		"WBSHZT": "外部审核状态",
	*		"CJSJ": "创建时间",
	*		"XSDB": "销售代表",
	*		"XSDBMC": "销售代表名称",
	*		"XSZL": "销售助理",
	*		"XSZLMC": "销售助理名称",
	*		"ZXFX": "直销分销",
	*		"YYMC": "医院名称",
	*		"SHLXR": "收货人",
	*		"SHLXRDH": "收货人电话",
	*		"SHDZ": "收货地址",
	*		"DHRQ": "送货时间",
	*		"DDBZ": "订单备注",
	*		"SSRQ": "手术日期",
	*		"RL": "入路",
	*		"RLMC": "入路名称",
	*		"BW": "部位",
	*		"BWMC": "部位名称",
	*		"YSID": "医生ID",
	*		"YSMC": "医生名称",
	*		"FSYSBH1": "附属医生编号1",
	*		"FSYSMC1": "附属医生名称1",
	*		"FSYSBH2": "附属医生编号2",
	*		"FSYSMC2": "附属医生名称2",
	*		"FSYSBH3": "附属医生编号3",
	*		"FSYSMC3": "附属医生名称3",
	*		"BRXM": "病人姓名",
	*		"BRXB": "病人性别",
	*		"ZYH": "住院号",
	*		"CWH": "床位号",
	*	}
	*}
*}
 */
const cardContent = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  lineHeight: '40px',
  color: '#252221',
  fontFamily: 'SourceHanSansCN-Regular',
}
export default class OrderBasicInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {},
      turnOrderData: {},
      showBasicInfoexpanded: true
    }
  }

  static defaultProps = {
    OrdercardContent: {
      lineHeight: '40px',
      color: '#252221',
      fontFamily: 'SourceHanSansCN-Regular',
      paddingTop: '20px'
    },
    OrderBasicInfoTop: {
      borderTop: '1px solid #333',
      marginLeft: '15px'
    }
  };
  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    OrderCardStyle: React.PropTypes.object

  };


  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
    // this.setState({open : this.props.open});
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.props.getOrderDetail(this.props.orderId);

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
    this.setState(
      {
        orderData: this.props.orderBasicInfoForm.orderData
      });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.orderBasicInfoForm.orderData.ZXFX === '0' && nextProps.orderBasicInfoForm.orderData.ZDDDID !== this.props.orderBasicInfoForm.orderData.ZDDDID) {
      this.props.getTurnOrderDetail(nextProps.orderBasicInfoForm.orderData.ZDDDID);
    }
    this.setState({
      orderData: nextProps.orderBasicInfoForm.orderData,
      turnOrderData: nextProps.orderBasicInfoForm.turnOrderData
    });
  };


  showBasicInfo = () => {
    if (this.state.orderData.DDLX === orderTypeObject.operator) {
      /**
       * 手术订单
       */
      return this.showOperationInfo();
    } else if (this.state.orderData.DDLX === orderTypeObject.stockout || this.state.orderData.DDLX === orderTypeObject.consignment || this.state.orderData.DDLX === orderTypeObject.distribution) {
      /**
       * 备货订单
       */
      return this.showStockInfo();
    } else if (this.state.orderData.DDLX === orderTypeObject.transfer || this.state.orderData.DDLX === orderTypeObject.transferAdmin) {
      /**
       * 调拨订单
       */
      return this.showTransfersInfo();
    }
  };
  showTransfersInfo = () => (
    <div style={this.props.OrdercardContent}>
      <div >
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单类型：</span>
            <span className='ContentColorTow inforWidth'>{orderType[Number(this.state.orderData.DDLX)] || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单状态：</span>
            <span className='ContentColorTow inforWidth'>{orderState[Number(this.state.orderData.DDZT)] || '-'}</span>

          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单编号：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.GUID || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap' style={{ whiteSpace: 'nowrap' }}>下单日期：</span>
            <span className='ContentColorTow inforWidth' style={{ whiteSpace: 'nowrap' }}>{moment(this.state.orderData.CJSJ).format('YYYY-MM-DD')}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>发货仓库：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.SHJXSMC || '-'}</span>
          </div>
        </div>
      </div>
    </div>
    );

  showStockInfo = () => (
    <div style={this.props.OrdercardContent}>
      <div >
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单类型：</span>
            <span className='ContentColorTow inforWidth'>{orderType[Number(this.state.orderData.DDLX)] || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单状态：</span>
            <span className='ContentColorTow inforWidth'>{orderState[Number(this.state.orderData.DDZT)] || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单编号：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.GUID || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>下单日期：</span>
            <span className='ContentColorTow inforWidth' style={{ whiteSpace: 'nowrap' }}>{moment(this.state.orderData.CJSJ).format('YYYY-MM-DD')}</span>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>收货人：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.SHLXR || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap' style={{ whiteSpace: 'nowrap' }}>联系电话：</span>
            <span className='ContentColorTow inforWidth' style={{ whiteSpace: 'nowrap' }}>{this.state.orderData.SHLXRDH || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap' style={{ whiteSpace: 'nowrap' }}>收货地址：</span>
            <span className='inforWidth'>{this.state.orderData.SHDZ || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap' style={{ whiteSpace: 'nowrap' }}>送货时间：</span>
            <span className='ContentColorTow inforWidth' style={{ whiteSpace: 'nowrap' }}>{moment(this.state.orderData.DHRQ).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div>
            <div className='inforFlex'>
              <span className='ContentColorOne fontNowrap'>供货商：</span>
              <span className='ContentColorTow inforWidth'>{this.state.orderData.SHJXSMC || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  showOperationInfo = () => (
    <div style={this.props.OrdercardContent}>
      <div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单类型：</span>
            <span className='ContentColorTow inforWidth'>{orderType[this.state.orderData.DDLX] || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>订单状态：</span>
            <span className='ContentColorTow inforWidth'>{orderState[this.state.orderData.DDZT] || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap' style={{ whiteSpace: 'nowrap' }}>下单日期：</span>
            <span className='ContentColorTow inforWidth' style={{ whiteSpace: 'nowrap' }}>{moment(this.state.orderData.CJSJ).format('YYYY-MM-DD')}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>经销商：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.SHJXSMC || '-'}</span>
          </div>
          {
            (() => {
              if (this.state.orderData.ZXFX === '0') {
                return (<div className='inforFlex'>
                  <span className='ContentColorOne fontNowrap'>分销商：</span>
                  <span className='ContentColorTow inforWidth'>{this.state.orderData.JSJXSMC || '-'}</span>
                </div>)
              }
            })()
          }
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>医院：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.YYMC || '-'}</span>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 ' >
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>手术类型：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.SSLXMC || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>业务线：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.YWXMC || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>品牌：</span>
            <span className='inforWidth inforWidth'>{this.state.orderData.PPMC || '-'}</span>
          </div>
          <div className='inforFlex'>
            <span className='ContentColorOne fontNowrap'>手术模板：</span>
            <span className='ContentColorTow inforWidth'>{this.state.orderData.SSMBMC || '-'}</span>
          </div>
          {
            (() => {
              if (this.state.orderData.ZXFX === '0') {
                return (<div className='inforFlex'>
                  <span className='ContentColorOne fontNowrap'>销售代表：</span>
                  <span className='ContentColorTow inforWidth'>{this.state.turnOrderData.XSDBMC || '-'}</span>
                </div>)
              } else {
                return (<div className='inforFlex'>
                  <span className='ContentColorOne fontNowrap'>销售代表：</span>
                  <span className='ContentColorTow inforWidth'>{this.state.orderData.XSDBMC || '-'}</span>
                </div>)
              }
            })()
          }
          {
            (() => {
              if (this.state.orderData.ZXFX === '0') {
                return (<div className='inforFlex'>
                  <span className='ContentColorOne fontNowrap'>销售助理：</span>
                  <span className='ContentColorTow inforWidth'>{this.state.turnOrderData.XSZLMC || '-'}</span>
                </div>)
              } else {
                return (<div className='inforFlex'>
                  <span className='ContentColorOne fontNowrap'>销售助理：</span>
                  <span className='ContentColorTow inforWidth'>{this.state.orderData.XSZLMC || '-'}</span>
                </div>)
              }
            })()
          }
        </div>
      </div>
    </div>
    );
  handleSelectDialogOnExpandChange = (expanded) => {
    this.setState({
      showBasicInfoexpanded: expanded
    })
  };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };
    return (
      <CardUI expanded title='订单基本信息' CardStyle={this.props.OrderCardStyle} avatar='/orderCheckIcon/icon-08.png' label={`订单编号:${this.props.orderId}`}>
        { this.showBasicInfo()}
      </CardUI>
    )
  }
}
