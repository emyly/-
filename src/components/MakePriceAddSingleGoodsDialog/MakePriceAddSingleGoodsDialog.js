/**
 * Created by 123 on 11/28/2016.
 */

import React, { Component, PropTypes } from 'react';

import './MakePriceAddSingleGoodsDialog.scss';
import ChineseDatePicker from 'components/ChineseDatePicker';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import CurrencySelect from 'components/CurrencySelect';

/**
 * 使用场景：单个商品定价Dialog
 */
export default class MakePriceAddSingleGoodsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      makePriceGoodsObject: {
        SPID: -1,                     // 商品ID
        DDLX: '-1',                   // 订单类型
        DJJXSID: -1,                  // 定价经销商ID
        MRJXSID: -1,                  // 买入经销商ID
        MCJXSID: -1,                  // 卖出经销商ID
        JG: -1,                       // 单价
        HBDM: 'CNY',                  // 货币代码
        SL: -1,                        // 税率
        SE: -1,                       // 税额
        HSJG: '',                     // 含税价格
        SXRQ: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days')) // 生效日期
      },
      taxPriceError: false,
      taxPriceErrorMessage: ''
    };
  }
  static propTypes = {
    /**
     * 当前Dailog开关状态
     */
    open: PropTypes.bool.isRequired
  };

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      makePriceGoodsObject: {
        SPID: nextProps.goodsData.id, 							// 商品ID
        DDLX: nextProps.contractType, 							// 订单类型
        DJJXSID: nextProps.authorizeOrganizationId, // 定价经销商ID
        MRJXSID: nextProps.authorizedOrganizationId, // 买入经销商ID
        MCJXSID: nextProps.authorizeOrganizationId, // 卖出经销商ID
        JG: -1,                                     // 单价
        HBDM: nextProps.goodsData.money_type,       // 货币代码
        SL: 17,                        							// 税率
        SE: -1,                       							// 税额
        HSJG: '',                     							// 含税价格
        SXRQ: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days')) // 生效日期
      },
      taxPriceError: false,
      taxPriceErrorMessage: ''
    });
    if (nextProps.makePriceAddSingleGoodsDialog.status === '1') {
      this.props.initMakePriceAddSingleGoodsData();
      let type = '';
      switch (Number(nextProps.pageType)) {
        case 0:
          type = 'now';
          break;
        case 1:
          type = 'future';
          break;
        case 2:
          type = 'past';
          break;
        default:
          break;
      }
      this.props.getMakePriceSingleGoodsDialogData({
        id: nextProps.goodsData.id,
        MCJXSID: nextProps.authorizeOrganizationId,
        MRJXSID: nextProps.authorizedOrganizationId,
        JGZT: type
      });
      this.props.getMakePriceSingleGoodsLineChartData({
        id: nextProps.goodsData.id,
        MCJXSID: nextProps.authorizeOrganizationId,
        MRJXSID: nextProps.authorizedOrganizationId,
        JGZT: type
      });
      this.props.handleMakePriceAddDailog();
    }
  };
  /**
   * DataPickerDisableDate
   */
  handleShouldDisableDate = date => date < moment();
  /**
   * DataPickerOnChange
   */
  handleDataPickerChange = () => (n, date) => {
    this.state.makePriceGoodsObject.SXRQ = date;       // 商品生效日期
    this.setState({ makePriceGoodsObject: this.state.makePriceGoodsObject });
  }
   /**
   * DataGrid中货币选择器公共组件callback
   */
  handleCurrencySelectDataGridCallBack = () => (currencyValue) =>　{
    this.state.makePriceGoodsObject.HBDM = currencyValue;
    this.setState({ makePriceGoodsObject: this.state.makePriceGoodsObject });
  }
   /**
   * 税率%OnChange
   */
  handleTaxRateChange = () => (event) => {
    this.state.makePriceGoodsObject.SL = Number(event.target.value);
    this.setState({ makePriceGoodsObject: this.state.makePriceGoodsObject });
  }
  /**
   * 含税价OnChange
   */
  handleTaxPriceChange = () => (event) => {
    this.state.makePriceGoodsObject.HSJG = Number(event.target.value);
    this.setState({
      makePriceGoodsObject: this.state.makePriceGoodsObject
    });
  }
  /**
   * 确认定价
   */
  handleTouchTapSubmitMakePrice = () => () => {
    if (Number(this.state.makePriceGoodsObject.HSJG) > 0) {
      this.state.makePriceGoodsObject.JG = this.state.makePriceGoodsObject.HSJG / (1 + (this.state.makePriceGoodsObject.SL / 100));
      this.state.makePriceGoodsObject.SE = this.state.makePriceGoodsObject.HSJG - this.state.makePriceGoodsObject.JG;
      this.state.makePriceGoodsObject.SXRQ = new Date(this.state.makePriceGoodsObject.SXRQ).getTime();
      this.props.putMakePriceAddSingleGoodsData([this.state.makePriceGoodsObject])
    } else {
      this.setState({
        taxPriceError: true,
        taxPriceErrorMessage: '请重新输入含税价'
      });
    }
  };
  /**
   * 含税价TextField获取焦点
   */
  handletaxPriceTextFieldFocus = () => () => {
    this.setState({
      taxPriceError: false,
      taxPriceErrorMessage: ''
    });
  }
  render() {
    const actions = [
      <FlatButton
        label='关闭'
        style={{ margin: 10 }}
        primary
        onTouchTap={this.props.handleMakePriceAddDailog}
      />,
      <RaisedButton
        label='确认定价'
        style={{ margin: 10 }}
        primary
        onTouchTap={this.handleTouchTapSubmitMakePrice()}
      />
    ];
    return (
      <div className='make-price-single-goods-dialog'>
        <Dialog
          title={`添加${this.props.goodsData ? this.props.goodsData.name : '单个商品'}定价`}
          actions={actions}
          modal
          open={this.props.open}
        >
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
            <div style={{ paddingRight: '8px', height: '45px', lineHeight: '45px', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
              <span>生效期：</span>
              <ChineseDatePicker
                style={{ width: 120, overflow: 'hidden' }} hintText='生效日期'
                value={this.state.makePriceGoodsObject.SXRQ}
                onChange={this.handleDataPickerChange()}
                shouldDisableDate={this.handleShouldDisableDate}
              />
            </div>
            <div style={{ paddingRight: '8px', height: '45px', lineHeight: '45px', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
              <span>币种：</span>
              <CurrencySelect
                style={{ width: 100, height: 50 }}
                callback={this.handleCurrencySelectDataGridCallBack()}
              />
            </div>
            <div style={{ paddingRight: '8px', height: '45px', lineHeight: '45px', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
              <span>税率：</span>
              <TextField
                type='number' value={this.state.makePriceGoodsObject.SL} max={100} min={0} style={{ overflow: 'hidden', width: 60 }}
                hintText='税率' onChange={this.handleTaxRateChange()}
              />
            </div>
            <div style={{ paddingRight: '8px', height: '45px', lineHeight: '45px', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
              <span>含税价：</span>
              <TextField
                type='number' value={this.state.makePriceGoodsObject.HSJG} style={{ overflow: 'hidden', width: 80 }} max={10000000000000000} min={0}
                hintText='含税价' onChange={this.handleTaxPriceChange()} onFocus={this.handletaxPriceTextFieldFocus()}
              />
              <span style={{ color: 'red', fontSize: 12, display: this.state.taxPriceError ? 'block' : 'none' }}>{this.state.taxPriceErrorMessage}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'red' }} />
        </Dialog>
      </div>
    )
  }
}

