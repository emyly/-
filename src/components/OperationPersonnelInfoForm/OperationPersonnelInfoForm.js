/**
 * Created by wangming on 2016/10/27.
 */

import React, { Component, PropTypes } from 'react';
import './OperationPersonnelInfoForm.scss';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { orderOperationData, XB } from './OperationPersonnelInfoData'
import CardUI from 'components/StandardUI/StandardCard';
import moment from 'lib/moment';

/**
 * 使用场景：订单详情，订单手术及人员信息
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
const cardHeaderStyle = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'rgb(239, 235, 233)'
};
export default class OperationPersonnelInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {}
    }
  }

  static defaultProps = {
    cardContent: {
      lineHeight: '38px',
      color: '#252221',
      fontFamily: 'SourceHanSansCN-Regular',
      paddingTop: '20px'
    },
    orderTop: {
      borderTop: '1px solid #333',
      marginLeft: '15px'
    },
    remarks: {}

  };
  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired,
    CardStyle: React.PropTypes.object
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
    this.props.getOrderDetail(this.props.orderId);

    this.setState(
      {
        orderData: this.props.operationPersonnelInfoForm.orderData
      });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        orderData: nextProps.operationPersonnelInfoForm.orderData
      });
  };

  // showOperationInfo = () => {
  //   return (


  //   )
  // };

  showPersonnelInfo = () => (
    <div>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>收货人：</span>
          <span className='ContentColorTow'>{this.state.orderData.SHLXR || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>联系电话：</span>
          <span className='ContentColorTow fontNowrap'>{this.state.orderData.SHLXRDH || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>收货地址：</span>
          <span className='ContentColorTow inforWidth'>{this.state.orderData.SHDZ || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>送货时间：</span>
          <span className='ContentColorTow fontNowrap'>{this.state.orderData.DHRQ ? moment(this.state.orderData.DHRQ).format('YYYY-MM-DD HH:mm') : '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>主治医生：</span>
          <span className='ContentColorTow'>{this.state.orderData.YSMC || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>手术医生1：</span>
          <span className='ContentColorTow'>{this.state.orderData.FSYSMC1 || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>手术医生2：</span>
          <span className='ContentColorTow'>{this.state.orderData.FSYSMC2 || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>手术医生3：</span>
          <span className='ContentColorTow'>{this.state.orderData.FSYSMC3 || '-'}</span>
        </div>
      </div>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>手术时间：</span>
          <span className='ContentColorTow fontNowrap' >{this.state.orderData.SSRQ ? moment(this.state.orderData.SSRQ).format('YYYY-MM-DD') : '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>手术部位：</span>
          <span className='inforWidth'>{this.state.orderData.BWMC || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>入路：</span>
          <span className='ContentColorTow inforWidth'>{this.state.orderData.RLMC || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>订单备注：</span>
          <span className='ContentColorTow inforWidth'>{this.state.orderData.DDMS || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>病人名字：</span>
          <span className='ContentColorTow'>{this.state.orderData.BRXM || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>性别：</span>
          <span className='ContentColorTow'>{XB[this.state.orderData.BRXB] || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>住院号：</span>
          <span className='ContentColorTow'>{this.state.orderData.ZYH || '-'}</span>
        </div>
        <div className='inforFlex'>
          <span className='ContentColorOne fontNowrap'>床位号：</span>
          <span className='ContentColorTow'>{this.state.orderData.CWH || '-'}</span>
        </div>
      </div>
    </div>
    );

  render() {
    return (
      <div style={this.props.style}>
        <CardUI expanded title='手术及人员信息' avatar='/orderCheckIcon/icon-10.png' label='' CardStyle={this.props.CardStyle}>
          <div style={this.props.cardContent}>
            { this.showPersonnelInfo() }
          </div>
        </CardUI>
      </div>
    )
  }
}
