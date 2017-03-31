/**
 * Created by wangming on 2016/10/26.
 */

import React, { Component, PropTypes } from 'react';
import './DiscountDetailTable.scss';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CardUI from 'components/StandardUI/StandardCard';

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

export default class OrderBasicInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountData: {}
    }
  }

  // static defaultProps = {
  //   tableData: ''
  // };
  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired

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

    this.props.getDiscountDetail(this.props.orderId);

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

    // console.log("componentWillMount orderData:",this.props.discountDetailTable.discountData);
    // this.setState(
    //   {
    //     discountData : this.props.discountDetailTable.discountData
    //   });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        discountData: nextProps.discountDetailTable.discountData
      });
  };


  showDiscountInfo = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around', height: '150px', backgroundColor: 'rgba(127, 221, 233, 0.4)' }}>
        <div>
          <span>折扣金额：</span>
          <span>{this.state.discountData.CZJE}</span>
        </div>
        <div>
          <span>操作时间：</span>
          <span>{this.state.discountData.CZSJ}</span>
        </div>
        <div>
          <span>操作备注：</span>
          <span>{this.state.discountData.CZBZ}</span>
        </div>
      </div>


    )
  };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };

    return (
      <CardUI CardStyle={this.props.style} expanded title='折扣基本信息' avatar={this.props.avatar} label=''>
        { this.showDiscountInfo() }
      </CardUI>
    )
  }

}
