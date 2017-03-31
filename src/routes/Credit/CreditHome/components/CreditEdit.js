/**
 * Created by NXQ on 10/28/2016.
 */

import React, { Component, PropTypes } from 'react';

import './CreditEdit.scss';

import TempCreditQueryDataGrid from 'components/TempCreditQueryDataGrid'

import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ChineseDatePicker from 'components/ChineseDatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import StandardDataGrid from 'components/StandardDataGrid';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ActionGavel from 'material-ui/svg-icons/action/gavel';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import moment from 'moment';
import FilterTabs from 'components/FilterTabs';

/**
 * 使用场景：信用编辑
 * 接口： 信用.md --> 经销商信用明细查询 --> /JXSXYMXB
 * 接口： 信用.md --> 经销商信用查询 --> /JXSXYB
 * 接口： 信用.md --> 经销商信用创建 --> /JXSXYMXB
 * 接口： 信用.md --> 经销商信用删除 --> /JXSXYMXB
 */


export default class CreditEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creditMenuType: ['长期信用', '临时信用'],
      creditSelectType: 0,                  // 0显示长期信用 1显示临时信用(如果只有临时就是0表示临时)
      fixedType: 1,
      createTempCreditObject: {},
      createLongDateCreditObject: {},
      createFixedDateCreditObject: {},
      createRollCreditObject: {},
      fixedSettleCycleUnit: '0',             // 0表示天,1表示月
      isShowTempAdd: false,                  // 显示临时信用添加页面
      tempEndTimeError: false,               // 临时结束时间验证信息
      tempEndTimeErrorMessage: '',           // 临时结束时间Message
      tempStartTimeError: false,             // 临时开始时间验证信息
      tempStartTimeErrorMessage: '',         // 临时开始时间Message
      tempAmountError: false,                // 临时金额验证信息
      tempAmountErrorMessage: '',            // 临时金额验证Message
      fixedLongDateError: false,             // 长期固定金额验证信息
      fixedLongDateErrorMessage: '',         // 长期固定金额验证Message
      fixedLongDateStartTimeError: false,    // 长期固定开始时间验证信息
      fixedLongDateStartTimeErrorMessage: '', // 长期固定开始时间验证Message
      fixedLongDateEndTimeError: false,      // 长期固定结束时间验证信息
      fixedLongDateEndTimeErrorMessage: '',  // 长期固定结束时间验证Message
      fixedDateError: false,                 // 定结金额验证信息
      fixedDateErrorMessage: '',             // 定结金额验证Message
      fixedDateStartTimeError: false,        // 定结开始时间验证信息
      fixedDateStartTimeErrorMessage: '',    // 定结开始时间验证Message
      fixedDateEndTimeError: false,          // 定结结束时间验证信息
      fixedDateEndTimeErrorMessage: '',      // 定结结束时间验证Message
      fixedDateSettleCycleError: false,      // 定结结算周期验证信息
      fixedDateSettleCycleErrorMessage: '',  // 定结结算周期验证Message
      rollDateError: false,                  // 滚动金额验证信息
      rollDateErrorMessage: '',              // 滚动金额验证Message
      rollDateStartTimeError: false,         // 滚动开始时间验证信息
      rollDateStartTimeErrorMessage: '',     // 滚动开始时间验证Message
      rollDateEndTimeError: false,           // 滚动结束时间验证信息
      rollDateEndTimeErrorMessage: '',       // 滚动结束时间验证Message
      rollDateSettleCycleError: false,       // 滚动结算周期验证信息
      rollDateSettleCycleErrorMessage: ''    // 滚动结算周期验证Message

    };
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillMount = () => {
    this.setState({
      creditSelectType: this.props.location.state.isShowFixedCredit ? this.props.location.state.creditSelectType : 0,
      creditMenuType: (this.props.location.state.isShowFixedCredit ? ['长期信用', '临时信用'] : ['临时信用']),
      isShowTempAdd: this.props.location.state.creditSelectType
    });
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.creditEdit.createStatus) {
      this.props.putChangeCreateStatus();
      if (nextProps.creditEdit.isFixedCreateSuccess) {
        this.context.router.goBack();
      } else {
        this.props.getTempCreditQueryData({ AuthorizeOrganizationId: this.props.globalStore.organizationId, AuthorizedOrganizationId: this.props.location.state.BSQJXSID });
      }
    }
  };
  /**
   * 长期信用类型选择
   */
  handleChangeSelectFixedCredit = (event, index, value) => {
    this.setState({ fixedType: value });
  };
  /**
   *  确认创建
   */
  handleTouchTapSubmitCredit = type => () => {
    switch (type) {
      case 1:                 // 长期固定额度
        if ((this.state.createLongDateCreditObject.XYED || 0) <= 0) {
          this.setState({
            fixedLongDateError: true,
            fixedLongDateErrorMessage: '请重新输入授信金额!'
          });
          break;
        } else if ((this.state.createLongDateCreditObject.YXQS || 0) <= 0) {
          this.setState({
            fixedLongDateStartTimeError: true,
            fixedLongDateStartTimeErrorMessage: '请重新输入授信期始!'
          });
          break;
        } else if ((this.state.createLongDateCreditObject.YXQZ || 0) <= 0) {
          this.setState({
            fixedLongDateEndTimeError: true,
            fixedLongDateEndTimeErrorMessage: '请重新输入授信期止!'
          });
          break;
        }
        this.props.createCredit({
          ...this.state.createLongDateCreditObject, ...{
            SQJXSID: this.props.globalStore.organizationId,
            BSQJXSID: this.props.location.state.BSQJXSID,
            EDLX: '1',
          }
        });
        break;
      case 2:                 // 定期授信额度
        if ((this.state.createFixedDateCreditObject.XYED || 0) <= 0) {
          this.setState({
            fixedDateError: true,
            fixedDateErrorMessage: '请重新输入授信金额!'
          });
          break;
        } else if ((this.state.createFixedDateCreditObject.ZCJSTS || 0) <= 0) {
          this.setState({
            fixedDateSettleCycleError: true,
            fixedDateSettleCycleErrorMessage: '请重新输入结算周期!'
          });
          break;
        } else if ((this.state.createFixedDateCreditObject.YXQS || 0) <= 0) {
          this.setState({
            fixedDateStartTimeError: true,
            fixedDateStartTimeErrorMessage: '请重新输入授信期始!'
          });
          break;
        } else if ((this.state.createFixedDateCreditObject.YXQZ || 0) <= 0) {
          this.setState({
            fixedDateEndTimeError: true,
            fixedDateEndTimeErrorMessage: '请重新输入授信期止!'
          });
          break;
        }
        const numberOfDays = this.state.createFixedDateCreditObject.ZCJSTS;
        this.state.createFixedDateCreditObject.ZCJSTS = this.state.fixedSettleCycleUnit === '1' ? numberOfDays * 30 : numberOfDays;
        this.props.createCredit({
          ...this.state.createFixedDateCreditObject, ...{
            SQJXSID: this.props.globalStore.organizationId,
            BSQJXSID: this.props.location.state.BSQJXSID,
            EDLX: '3'
          }
        });
        break;
      case 3:                 // 滚动授信额度
        if ((this.state.createRollCreditObject.XYED || 0) <= 0) {
          this.setState({
            rollDateError: true,
            rollDateErrorMessage: '请重新输入授信金额!'
          });
          break;
        } else if ((this.state.createRollCreditObject.ZCJSTS || 0) <= 0) {
          this.setState({
            rollDateSettleCycleError: true,
            rollDateSettleCycleErrorMessage: '请重新输入结算周期!'
          });
          break;
        } else if ((this.state.createRollCreditObject.YXQS || 0) <= 0) {
          this.setState({
            rollDateStartTimeError: true,
            rollDateStartTimeErrorMessage: '请重新输入授信期始!'
          });
          break;
        } else if ((this.state.createRollCreditObject.YXQZ || 0) <= 0) {
          this.setState({
            rollDateEndTimeError: true,
            rollDateEndTimeErrorMessage: '请重新输入授信期止!'
          });
          break;
        }
        this.props.createCredit({
          ...this.state.createRollCreditObject, ...{
            SQJXSID: this.props.globalStore.organizationId,
            BSQJXSID: this.props.location.state.BSQJXSID,
            EDLX: '2'
          }
        });
        break;
      case 4:                 // 临时信用额度
        if ((this.state.createTempCreditObject.XYED || 0) <= 0) {
          this.setState({
            tempAmountError: true,
            tempAmountErrorMessage: '请重新输入授信金额!'
          });
          break;
        } else if ((this.state.createTempCreditObject.YXQS || 0) <= 0) {
          this.setState({
            tempStartTimeError: true,
            tempStartTimeErrorMessage: '请重新输入授信期始!'
          });
          break;
        } else if ((this.state.createTempCreditObject.YXQZ || 0) <= 0) {
          this.setState({
            tempEndTimeError: true,
            tempEndTimeErrorMessage: '请重新输入授信期止!'
          });
          break;
        }
        this.props.createCredit({
          ...this.state.createTempCreditObject, ...{
            SQJXSID: this.props.globalStore.organizationId,
            BSQJXSID: this.props.location.state.BSQJXSID,
            EDLX: '0'
          }
        });
        break;
      default:
        break;
    }
  };
  /**
   * 长期信用/临时信用切换
   */
  handleSelectCreditType = (value) => {
    creditMenuType: (this.props.location.state.isShowFixedCredit ? ['长期信用', '临时信用'] : ['临时信用']),
      this.setState({
        creditSelectType: Number(value),
        isShowTempAdd: this.props.location.state.isShowFixedCredit ? (Number(value) === 1) : true
      });
  };
  /**
   * 信用金额输入框事件
   */
  handleChangeTempLine = type => (event) => {
    let obj = {};
    switch (type) {
      case 1:                 // 长期固定额度
        obj = this.state.createLongDateCreditObject;
        break;
      case 2:                 // 定期授信额度
        obj = this.state.createFixedDateCreditObject;
        break;
      case 3:                 // 滚动授信额度
        obj = this.state.createRollCreditObject;
        break;
      case 4:                 // 临时信用额度
        obj = this.state.createTempCreditObject;
        break;
    }
    let inputValue = Number(event.target.value);
    if (inputValue > 1) {
      if (inputValue > 10000000000000000) {
        event.target.value = 10000000000000000;
        inputValue = 10000000000000000;
      }
      obj.XYED = inputValue;
      obj.YXED = inputValue;
    } else {
      obj.XYED = 1;
      obj.YXED = 1;
    }
    event.target.value = obj.XYED;
    this.setState({
      createLongDateCreditObject: this.state.createLongDateCreditObject,
      createFixedDateCreditObject: this.state.createFixedDateCreditObject,
      createRollCreditObject: this.state.createRollCreditObject,
      createTempCreditObject: this.state.createTempCreditObject
    });
  };
  /**
   * DataPicker事件
   */
  handleDataPickerChange = type => (n, date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    switch (type) {
      case 1:                 // 长期固定起始时间
        if ((this.state.createLongDateCreditObject.YXQZ || 0)) {
          if (date >= this.state.createLongDateCreditObject.YXQZ) {
            this.setState({
              fixedLongDateStartTimeError: true,
              fixedLongDateStartTimeErrorMessage: '授信期始必须小于授信期止,请重新输入!'
            });
            this.state.createLongDateCreditObject.YXQS = 0;
          } else {
            this.state.createLongDateCreditObject.YXQS = Number(date);
          }
        } else {
          this.state.createLongDateCreditObject.YXQS = Number(date);
        }
        break;
      case 11:                 // 长期固定终止时间
        if (date > (this.state.createLongDateCreditObject.YXQS || 0)) {
          this.state.createLongDateCreditObject.YXQZ = Number(date);
        } else {
          this.setState({
            fixedLongDateEndTimeError: true,
            fixedLongDateEndTimeErrorMessage: '授信期止必须大于授信期始,请重新输入!'
          });
          this.state.createLongDateCreditObject.YXQZ = 0;
        }
        break;
      case 2:                 // 定期授信起始时间
        if ((this.state.createFixedDateCreditObject.YXQZ || 0)) {
          if (date >= this.state.createFixedDateCreditObject.YXQZ) {
            this.setState({
              fixedDateStartTimeError: true,
              fixedDateStartTimeErrorMessage: '授信期始必须小于授信期止,请重新输入!'
            });
            this.state.createFixedDateCreditObject.YXQS = 0;
          } else {
            this.state.createFixedDateCreditObject.YXQS = Number(date);
          }
        } else {
          this.state.createFixedDateCreditObject.YXQS = Number(date);
        }
        break;
      case 22:                 // 定期授信终止时间
        if (date > (this.state.createFixedDateCreditObject.YXQS || 0)) {
          this.state.createFixedDateCreditObject.YXQZ = Number(date);
        } else {
          this.setState({
            fixedDateEndTimeError: true,
            fixedDateEndTimeErrorMessage: '授信期止必须大于授信期始,请重新输入!'
          });
          this.state.createFixedDateCreditObject.YXQZ = 0;
        }
        break;
      case 3:                 // 滚动授信起始时间
        if ((this.state.createRollCreditObject.YXQZ || 0)) {
          if (date >= this.state.createRollCreditObject.YXQZ) {
            this.setState({
              rollDateStartTimeError: true,
              rollDateStartTimeErrorMessage: '授信期始必须小于授信期止,请重新输入!'
            });
            this.state.createRollCreditObject.YXQS = 0;
          } else {
            this.state.createRollCreditObject.YXQS = Number(date);
          }
        } else {
          this.state.createRollCreditObject.YXQS = Number(date);
        }
        break;
      case 33:                 // 滚动授信终止时间
        if (date > (this.state.createRollCreditObject.YXQS || 0)) {
          this.state.createRollCreditObject.YXQZ = Number(date);
        } else {
          this.setState({
            rollDateEndTimeError: true,
            rollDateEndTimeErrorMessage: '授信期止必须大于授信期始,请重新输入!'
          });
          this.state.createRollCreditObject.YXQZ = 0;
        }
        break;
      case 4:                 // 临时信用起始时间
        if ((this.state.createTempCreditObject.YXQZ || 0)) {
          if (date >= this.state.createTempCreditObject.YXQZ) {
            this.setState({
              tempStartTimeError: true,
              tempStartTimeErrorMessage: '授信期始必须小于授信期止,请重新输入!'
            });
            this.state.createTempCreditObject.YXQS = 0;
          } else {
            this.state.createTempCreditObject.YXQS = Number(date);
          }
        } else {
          this.state.createTempCreditObject.YXQS = Number(date);
        }
        break;
      case 44:                 // 临时信用终止时间
        if (date > (this.state.createTempCreditObject.YXQS || 0)) {
          this.state.createTempCreditObject.YXQZ = Number(date);
        } else {
          this.setState({
            tempEndTimeError: true,
            tempEndTimeErrorMessage: '授信期止必须大于授信期始,请重新输入!'
          });
          this.state.createTempCreditObject.YXQZ = 0;
        }
        break;
      default:
        break;
    }
    this.setState({
      createLongDateCreditObject: this.state.createLongDateCreditObject,
      createFixedDateCreditObject: this.state.createFixedDateCreditObject,
      createRollCreditObject: this.state.createRollCreditObject,
      createTempCreditObject: this.state.createTempCreditObject
    })
  };
  /**
   * 结算周期
   */
  handleChangeSettleCycle = type => (event) => {
    let obj = {};
    switch (type) {
      case 1:         // 定期结算周期（天或月）
        obj = this.state.createFixedDateCreditObject;
        break;
      case 2:          // 滚动结算周期（天）
        obj = this.state.createRollCreditObject;
        break;
      default:
        break;
    }
    let inputValue = Number(event.target.value);
    if (inputValue > 1) {
      if (inputValue > 10000000000000000) {
        event.target.value = 10000000000000000;
        inputValue = 10000000000000000;
      }
      obj.ZCJSTS = inputValue;
    } else {
      obj.ZCJSTS = 1;
    }
    event.target.value = obj.ZCJSTS;
    this.setState({
      createLongDateCreditObject: this.state.createLongDateCreditObject,
      createFixedDateCreditObject: this.state.createFixedDateCreditObject,
      createRollCreditObject: this.state.createRollCreditObject,
      createTempCreditObject: this.state.createTempCreditObject
    });
  };
  /**
   * 结算周期单位onChang
   */
  handleChangeSettleCycleUnit = (event, value) => {
    this.setState({ fixedSettleCycleUnit: value === 'day' ? '0' : '1' });
  };
  /**
   * DataPicker获取焦点
   */
  handleDataPickerFocus = () => () => {
    this.setState({
      tempEndTimeError: false,               // 临时结束时间验证信息
      tempEndTimeErrorMessage: '',           // 临时结束时间Message
      tempStartTimeError: false,             // 临时开始时间验证信息
      tempStartTimeErrorMessage: '',         // 临时开始时间Message
      tempAmountError: false,                // 临时金额验证信息
      tempAmountErrorMessage: '',            // 临时金额验证Message
      fixedLongDateError: false,             // 长期固定金额验证信息
      fixedLongDateErrorMessage: '',         // 长期固定金额验证Message
      fixedLongDateStartTimeError: false,    // 长期固定开始时间验证信息
      fixedLongDateStartTimeErrorMessage: '', // 长期固定开始时间验证Message
      fixedLongDateEndTimeError: false,      // 长期固定结束时间验证信息
      fixedLongDateEndTimeErrorMessage: '',  // 长期固定结束时间验证Message
      fixedDateError: false,                 // 定结金额验证信息
      fixedDateErrorMessage: '',             // 定结金额验证Message
      fixedDateStartTimeError: false,        // 定结开始时间验证信息
      fixedDateStartTimeErrorMessage: '',    // 定结开始时间验证Message
      fixedDateEndTimeError: false,          // 定结结束时间验证信息
      fixedDateEndTimeErrorMessage: '',      // 定结结束时间验证Message
      fixedDateSettleCycleError: false,      // 定结结算周期验证信息
      fixedDateSettleCycleErrorMessage: '',  // 定结结算周期验证Message
      rollDateError: false,                  // 滚动金额验证信息
      rollDateErrorMessage: '',              // 滚动金额验证Message
      rollDateStartTimeError: false,         // 滚动开始时间验证信息
      rollDateStartTimeErrorMessage: '',     // 滚动开始时间验证Message
      rollDateEndTimeError: false,           // 滚动结束时间验证信息
      rollDateEndTimeErrorMessage: '',       // 滚动结束时间验证Message
      rollDateSettleCycleError: false,       // 滚动结算周期验证信息
      rollDateSettleCycleErrorMessage: ''    // 滚动结算周期验证Message
    });
  };
  /**
   * DataPickerDisableDate
   */
  handleShouldDisableDate = date => date < moment().subtract(1, 'days');
  render() {
    const filter = <FilterTabs tabs={this.state.creditMenuType} callback={this.handleSelectCreditType} />;
    return (
      <div className='credit-edit'>
        <StandardDataGrid
          iconPosition={'-180px -60px'}
          title='我授予的信用'
          message={`您正在对:  ${this.props.location.state.JGMC}  授信`}
          filterTitle='按信用类型筛选：'
          filter={filter}
        >
          <div style={{ display: this.state.isShowTempAdd ? 'none' : 'flex', padding: 20, height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #bbb' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%', lineHeight: '45px', fontSize: 18, color: '#333', flexDirection: 'column' }}>
              <div style={{ display: 'flex', height: 45 }}>
                <span>信用类型：</span>
                <SelectField
                  style={{ marginLeft: 35, color: '#333' }}
                  value={this.state.fixedType}
                  hintText='信用类型选择'
                  onChange={this.handleChangeSelectFixedCredit}
                  maxHeight={200}
                >
                  <MenuItem value={1} primaryText='长期固定信用' />
                  <MenuItem value={2} primaryText='定期结算信用' />
                  <MenuItem value={3} primaryText='滚动结算信用' />
                </SelectField>
              </div>
              {
                (() => {
                  if (this.state.fixedType === 1) {
                    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', height: 45 }}>
                        <span>长期固定额度：</span>
                        <TextField type='number' hintText='请输入金额' min={1} max={10000000000000000} onChange={this.handleChangeTempLine(1)} onFocus={this.handleDataPickerFocus()} />
                        <span style={{ color: 'red', fontSize: 12, display: this.state.fixedLongDateError ? 'block' : 'none' }}>{this.state.fixedLongDateErrorMessage}</span>
                      </div>
                      <div style={{ display: 'flex', height: 'auto', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期始：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='起始时间' onChange={this.handleDataPickerChange(1)} onFocus={this.handleDataPickerFocus()} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.fixedLongDateStartTimeError ? 'block' : 'none' }}>{this.state.fixedLongDateStartTimeErrorMessage}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期止：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='终止时间' onChange={this.handleDataPickerChange(11)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.fixedLongDateEndTimeError ? 'block' : 'none' }}>{this.state.fixedLongDateEndTimeErrorMessage}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 145 }}>
                        <FlatButton
                          label='回退上一页'
                          style={{ margin: 10, height: 40, marginTop: 12 }}
                          primary
                          icon={<NavigationArrowBack />}
                          onTouchTap={() => this.context.router.goBack()}
                        />
                        <RaisedButton
                          label='确认授信'
                          style={{ margin: 10, boxShadow: 'none', height: 40 }}
                          primary
                          icon={<ActionGavel />}
                          onTouchTap={this.handleTouchTapSubmitCredit(1)}
                        />
                      </div>

                    </div>)
                  } else if (this.state.fixedType === 2) {
                    return (<div style={{ display: 'flex', flexDirection: 'column' }}>

                      <div style={{ display: 'flex', height: 45 }}>
                        <span>定期授信额度：</span>
                        <TextField type='number' hintText='请输入金额' min={1} max={10000000000000000} onChange={this.handleChangeTempLine(2)} onFocus={this.handleDataPickerFocus()} />
                        <span style={{ color: 'red', fontSize: 12, display: this.state.fixedDateError ? 'block' : 'none' }}>{this.state.fixedDateErrorMessage}</span>
                      </div>
                      <div style={{ display: 'flex', height: 45 }}>
                        <span>结算周期：</span>
                        <TextField type='number' style={{ marginLeft: 35 }} hintText='请输入结算周期' min={1} max={10000000000000000} onChange={this.handleChangeSettleCycle(1)} onFocus={this.handleDataPickerFocus()} />
                        <RadioButtonGroup name='employeeRadioButtonGroup' defaultSelected='day' style={{ display: 'flex', height: 40 }} onChange={this.handleChangeSettleCycleUnit}>
                          <RadioButton
                            style={{ paddingTop: 10, width: 100 }}
                            value='day'
                            label='天'
                          />
                          <RadioButton
                            style={{ paddingTop: 10, width: 100 }}
                            value='month'
                            label='月'
                          />
                        </RadioButtonGroup>
                        <span style={{ color: 'red', fontSize: 12, display: this.state.fixedDateSettleCycleError ? 'block' : 'none' }}>{this.state.fixedDateSettleCycleErrorMessage}</span>
                      </div>
                      <div style={{ display: 'flex', height: 'auto', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期始：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='起始时间' onChange={this.handleDataPickerChange(2)} onFocus={this.handleDataPickerFocus()} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.fixedDateStartTimeError ? 'block' : 'none' }}>{this.state.fixedDateStartTimeErrorMessage}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期止：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='终止时间' onChange={this.handleDataPickerChange(22)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.fixedDateEndTimeError ? 'block' : 'none' }}>{this.state.fixedDateEndTimeErrorMessage}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 100 }}>
                        <FlatButton
                          label='回退上一页'
                          style={{ margin: 10, height: 40, marginTop: 12 }}
                          primary
                          icon={<NavigationArrowBack />}
                          onTouchTap={() => this.context.router.goBack()}
                        />
                        <RaisedButton
                          label='确认授信'
                          style={{ margin: 10, boxShadow: 'none', height: 40 }}
                          primary
                          icon={<ActionGavel />}
                          onTouchTap={this.handleTouchTapSubmitCredit(2)}
                        />
                      </div>

                    </div>)
                  } else if (this.state.fixedType === 3) {
                    return (<div style={{ display: 'flex', flexDirection: 'column' }}>

                      <div style={{ display: 'flex', height: 45 }}>
                        <span>滚动授信额度：</span>
                        <TextField type='number' hintText='请输入金额' min={1} max={10000000000000000} onChange={this.handleChangeTempLine(3)} onFocus={this.handleDataPickerFocus()} />
                        <span style={{ color: 'red', fontSize: 12, display: this.state.rollDateError ? 'block' : 'none' }}>{this.state.rollDateErrorMessage}</span>
                      </div>
                      <div style={{ display: 'flex', height: 45 }}>
                        <span>结算周期：</span>
                        <TextField type='number' style={{ marginLeft: 35 }} hintText='请输入结算周期' min={1} max={10000000000000000} onChange={this.handleChangeSettleCycle(2)} onFocus={this.handleDataPickerFocus()} />
                        <RadioButton
                          style={{ width: 100, height: '100%', alignTtems: 'center', paddingTop: 10 }}
                          checked
                          value='Enable'
                          label='天'
                        />
                        <span style={{ color: 'red', fontSize: 12, display: this.state.rollDateSettleCycleError ? 'block' : 'none' }}>{this.state.rollDateSettleCycleErrorMessage}</span>
                      </div>

                      <div style={{ display: 'flex', height: 'auto', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期始：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='起始时间' onChange={this.handleDataPickerChange(3)} onFocus={this.handleDataPickerFocus()} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.rollDateStartTimeError ? 'block' : 'none' }}>{this.state.rollDateStartTimeErrorMessage}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span>授信期止：</span>
                          <ChineseDatePicker style={{ marginLeft: 35 }} hintText='终止时间' onChange={this.handleDataPickerChange(33)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate} />
                          <span style={{ color: 'red', fontSize: 12, display: this.state.rollDateEndTimeError ? 'block' : 'none' }}>{this.state.rollDateEndTimeErrorMessage}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 100 }}>
                        <FlatButton
                          label='回退上一页'
                          style={{ margin: 10, height: 40, marginTop: 12 }}
                          primary
                          icon={<NavigationArrowBack />}
                          onTouchTap={() => this.context.router.goBack()}
                        />
                        <RaisedButton
                          label='确认授信'
                          style={{ margin: 10, boxShadow: 'none', height: 40 }}
                          primary
                          icon={<ActionGavel />}
                          onTouchTap={this.handleTouchTapSubmitCredit(3)}
                        />
                      </div>
                    </div>)
                  }
                })()
              }

            </div>
          </div>
          <div style={{ display: this.state.isShowTempAdd ? 'flex' : 'none', padding: 20, height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #bbb' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', lineHeight: '45px', fontSize: 18, color: '#333' }}>
              <div style={{ display: 'flex', height: 45 }}>
                <span>临时信用额度：</span>
                <TextField type='number' hintText='请输入金额' min={1} max={10000000000000000} onChange={this.handleChangeTempLine(4)} onFocus={this.handleDataPickerFocus()} />
                <span style={{ color: 'red', fontSize: 12, display: this.state.tempAmountError ? 'block' : 'none' }}>{this.state.tempAmountErrorMessage}</span>
              </div>
              <div style={{ display: 'flex', height: 'auto', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span>授信期始：</span>
                  <ChineseDatePicker style={{ marginLeft: 35 }} hintText='起始时间' onChange={this.handleDataPickerChange(4)} onFocus={this.handleDataPickerFocus()} />
                  <span style={{ color: 'red', fontSize: 12, display: this.state.tempStartTimeError ? 'block' : 'none' }}>{this.state.tempStartTimeErrorMessage}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span>授信期止：</span>
                  <ChineseDatePicker style={{ marginLeft: 35 }} hintText='终止时间' onChange={this.handleDataPickerChange(44)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate} />
                  <span style={{ color: 'red', fontSize: 12, display: this.state.tempEndTimeError ? 'block' : 'none' }}>{this.state.tempEndTimeErrorMessage}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 50 }}>
                <FlatButton
                  label='回退上一页'
                  style={{ margin: 10, height: 40, marginTop: 12 }}
                  primary
                  icon={<NavigationArrowBack />}
                  onTouchTap={() => this.context.router.goBack()}
                />
                <RaisedButton
                  label='确认授信'
                  style={{ margin: 10, boxShadow: 'none', height: 40 }}
                  primary
                  icon={<ActionGavel />}
                  onTouchTap={this.handleTouchTapSubmitCredit(4)}
                />
              </div>
            </div>
            <div style={{ height: 50, width: '100%', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #bbb', lineHeight: '50px', alignItems: 'flex-end', fontSize: 20, color: '#333' }}>
              临时信用已授信列表:
            </div>
            <TempCreditQueryDataGrid AuthorizeOrganizationId={this.props.globalStore.organizationId} AuthorizedOrganizationId={this.props.location.state.BSQJXSID} />
          </div>
        </StandardDataGrid>
      </div>
    )
  }

}

