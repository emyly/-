/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './LogisticsEditDialog.scss';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import LogisticsSelect from 'components/LogisticsSelect'
import RaisedButton from 'material-ui/RaisedButton';
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '800px',
  maxHeight: 'none'
};
const WarehouseOutDetailDialogTestData = {
  Result: {
    WLDB: {
      SFFK: '1',
      JJFY: 1,
      BJJE: 1,
      SFLXR: 0,
      DDLXRXM: null,
      CRKID: 138,
      DDLXR: 0,
      DDLXRDH: '0571-888888',
      CJJXSID: 900000000207,
      GUID: 135,
      DDSJ: null,
      WLDH: '44',
      SFLXDH: null,
      CJSJ: 1473731661471,
      WLLX: '0',
      DDID: 900000000003,
      WLFY: 1,
      SFLXRXM: null,
      WLZFY: 4,
      CJR: 9000000000003,
      MDJXSID: 900000000204,
      SFWD: 30.19493,
      SFRK: '0',
      SFJD: 120.2042,
      DJMC: '物流单',
      SFDZ: '浙江省杭州市滨江区长河路590号',
      DDXZQH: null,
      DDDD: '杭州市西湖区人民医院',
      ZTBS: 'E',
      DDLX: '2',
      SFSJ: 1473731661471,
      SFDF: '0',
      SHR: null,
      SHSJ: null,
      BFJE: 1,
      SFGD: 0,
      SFXZQH: 1526,
      WLGSID: 900000000001,
      GSMC: '申通'
    }
  }
}

/*
* 场景:出库单详情
* 接口:1.出库明细接口：出入库.md => 1.订单对应的出入库单列表查询
*      2.出入库但信息：出入库.md => 2.获取单个出入库单详情
* */
export default class LogisticsEditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      totalCost: 0,
      orderInfo: ['31323', '杭州仓库', '2016/09/11', 'haha', ' ', '', ''],
      storageNameArray: [],
      table_production_data: {

      }
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
     // 异步调用接口，成功后关闭dialog
    const promise = new Promise((resolve, reject) => {
      // 异步调用接口

      resolve();
    });

    promise.then(() => {
      console.log('关闭对话窗');
      this.setState({ open: false });
    });
  };
  onExpandChange = (event) => {
    console.log(event);
  }

  componentWillMount = () => {
    this.setState({ otalCost: 0 });
  }
  logisticsCompanyClick = () => {

  }
  static PropTypes = {
    // 传入入库单ID
    CKDID: PropTypes.string.isRequired,
    // 传入订单ID
    DDID: PropTypes.string.isRequired
  }
  componentWillReceiveProps(nexValue) {
    console.log(nexValue.open);
    this.setState({ open: nexValue.open });
  }
  checkBoxOnChange = () => {
    console.log('点击按钮');
  }
  /*
  * 输入框发生改变
  * */
  textFieldChanged = (e) => {
    // 判断是否为数字，设置默认值为0
    const BJJE = parseFloat(this.refs.BJJEtextField.getValue() === '' ? '0' : isNaN(this.refs.BJJEtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) : this.refs.BJJEtextField.getValue());
    const BFJE = parseFloat(this.refs.BFJEtextField.getValue() === '' ? '0' : isNaN(this.refs.BFJEtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) : this.refs.BFJEtextField.getValue());
    const JJFY = parseFloat(this.refs.JJFYtextField.getValue() === '' ? '0' : isNaN(this.refs.JJFYtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) : this.refs.JJFYtextField.getValue());
    const WLFY = parseFloat(this.refs.WLFYtextField.getValue() === '' ? '0' : isNaN(this.refs.WLFYtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) : this.refs.WLFYtextField.getValue());
    const ZFY = BJJE + BFJE + JJFY + WLFY;
    if (!isNaN(ZFY)) {
      this.setState({ totalCost: ZFY.toFixed(2) });
    } else {
      this.setState({ totalCost: '请输入正确的数字' });
    }
  }

  check = (e) => {


  }
  render() {
    const actions = [
      <FlatButton
        label='确认'
        primary
        onTouchTap={this.handleClose}
      />,

    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal
          open={this.state.open}
          bodyStyle={customContentStyle}
          autoDetectWindowHeight
          autoScrollBodyContent
        >
          <div className='LogisticsEditDialog_title'><h2>物流单详情</h2></div>
          <div className='LogisticsEditDialog_leftContainer'>
            <div className='LogisticsEditDialog_leftContainer_basic'>
              <h4 className='LogisticsEditDialog_leftContent' >出库单号</h4>
              <h4 className='LogisticsEditDialog_leftContent' >出库日期</h4>
            </div>
            <div className='LogisticsEditDialog_leftContainer_cost'>
              <h4 className='LogisticsEditDialog_leftContent' >物流公司</h4>
              <h4 className='LogisticsEditDialog_leftContent' >物流单号</h4>
              <h4 className='LogisticsEditDialog_leftContent' >保价金额</h4>
              <h4 className='LogisticsEditDialog_leftContent' >保险金额</h4>
              <h4 className='LogisticsEditDialog_leftContent' >加急费用</h4>
              <h4 className='LogisticsEditDialog_leftContent' >物流费用</h4>
              <Checkbox className='LogisticsEditDialog_leftContent' style={{ height: '40px' }} label='到付' onCheck={this.checkBoxOnChange} />
            </div>
            <div className='LogisticsEditDialog_leftContainer_adress'>
              <h4 className='LogisticsEditDialog_leftContent' >收货人</h4>
              <h4 className='LogisticsEditDialog_leftContent' >收货人联系方式</h4>
              <h4 className='LogisticsEditDialog_leftContent' >收货人地址</h4>
              <h4 className='LogisticsEditDialog_leftContent_totalPrice' >金额总计</h4>
              <h4 className='LogisticsEditDialog_leftContent_totalPrice' >@谁</h4>
              <h4 className='LogisticsEditDialog_leftContent_totalPrice' >留言 公共组件</h4>
            </div>
          </div>
          <div className='LogisticsEditDialog_rightContainer'>
            <div className='LogisticsEditDialog_rightContainer_basic'>
              <h4 className='LogisticsEditDialog_rightContent'>出库单号</h4>
              <h4 className='LogisticsEditDialog_rightContent'>出库日期</h4>
            </div>
            <div className='LogisticsEditDialog_rightContainer_cost'>
              <LogisticsSelect />
              <TextField onChange={this.textFieldChanged} className='LogisticsEditDialog_rightContent' hintText='物流单号' style={{ width: '100%', height: '40px', display: 'block' }} />
              <TextField ref='BJJEtextField' onChange={this.textFieldChanged} className='LogisticsEditDialog_rightContent' hintText='保价金额' style={{ width: '100%', height: '40px', display: 'block' }} />
              <TextField ref='BFJEtextField' onChange={this.textFieldChanged} className='LogisticsEditDialog_rightContent' hintText='保险金额' style={{ width: '100%', height: '40px', display: 'block' }} />
              <TextField ref='JJFYtextField' onChange={this.textFieldChanged} className='LogisticsEditDialog_rightContent' hintText='加急费用' style={{ width: '100%', height: '40px', display: 'block' }} />
              <TextField ref='WLFYtextField' onChange={this.textFieldChanged} className='LogisticsEditDialog_rightContent' hintText='物流费用' style={{ width: '100%', height: '40px', display: 'block' }} />
              <h4 className='LogisticsEditDialog_rightContent'>{this.state.totalCost}</h4>
            </div>
            <div className='LogisticsEditDialog_rightContainer_adress'>
              <h4 className='LogisticsEditDialog_rightContent'>收货人</h4>
              <h4 className='LogisticsEditDialog_rightContent'>收货人联系方式</h4>
              <h4 className='LogisticsEditDialog_rightContent'>收货人地址</h4>
              <h4 className='LogisticsEditDialog_rightContent'>金额总计</h4>
              <AtSelect className='LogisticsEditDialog_rightContent' />
              <AtMessage />
            </div>

          </div>
        </Dialog>
      </div>

    );
  }

}
