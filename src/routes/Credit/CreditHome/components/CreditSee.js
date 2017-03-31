/**
 * Created by NXQ on 10/28/2016.
 */

import React, { Component, PropTypes } from 'react';

import './CreditSee.scss';

import TempCreditQueryDataGrid from 'components/TempCreditQueryDataGrid'
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'lib/moment'
import GoBackButton from 'components/GoBackButton';
import StandardForm from 'components/StandardForm';
import StandardFormCardList from 'components/StandardForm/StandardFormCardList';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import EchartsPie from 'components/EchartsPie';
import echarts from 'echarts';
import Card from 'components/StandardUI/StandardCard';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import ChineseDatePicker from 'components/ChineseDatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import _ from 'lodash';

/**
 * 使用场景：信用详情查看
 * 接口： 信用.md --> 经销商信用明细查询 --> /JXSXYMXB
 * 接口： 信用.md --> 经销商信用查询 --> /JXSXYB
 * 接口： 信用.md --> 经销商信用删除 --> /JXSXYMXB
 */
export default class CreditSee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creditMenuType: ['长期固定信用', '定期结算信用', '滚动结算信用'],
      creditSelectType: 0,      // 0长期固定信用 1定期结算信用 2滚动结算信用
      fixedCreditData: {},
      validDateData: {},
      tempCreditData: {},
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
    this.props.getFixedCreditSeeData({
      AuthorizeOrganizationId: this.props.globalStore.organizationId,
      AuthorizedOrganizationId: this.props.location.state.BSQJXSID
    });
    this.props.getTempCreditTotalSeeData({
      AuthorizeOrganizationId: this.props.globalStore.organizationId,
      AuthorizedOrganizationId: this.props.location.state.BSQJXSID
    });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      fixedCreditData: nextProps.creditSee.fixedCreditData,
      validDateData: nextProps.creditSee.fixedValidDateData,
      tempCreditData: nextProps.creditSee.tempCreditData
    });

    if (nextProps.creditSee.createStatus) {
      this.props.putChangeCreateStatus();
      this.props.getTempCreditTotalSeeData({
        AuthorizeOrganizationId: this.props.globalStore.organizationId,
        AuthorizedOrganizationId: this.props.location.state.BSQJXSID
      });
      this.props.getTempCreditQueryData({
        AuthorizeOrganizationId: this.props.globalStore.organizationId,
        AuthorizedOrganizationId: this.props.location.state.BSQJXSID
      });
      this.props.getFixedCreditSeeData({
        AuthorizeOrganizationId: this.props.globalStore.organizationId,
        AuthorizedOrganizationId: this.props.location.state.BSQJXSID
      });
    }
    if (nextProps.creditSee.isDeleteSingleTempCredit) {
      this.props.changeDeleteSingleTempCreditStatus();
      this.props.getTempCreditQueryData({
        AuthorizeOrganizationId: this.props.globalStore.organizationId,
        AuthorizedOrganizationId: this.props.location.state.BSQJXSID
      });
      this.props.getTempCreditTotalSeeData({
        AuthorizeOrganizationId: this.props.globalStore.organizationId,
        AuthorizedOrganizationId: this.props.location.state.BSQJXSID
      });
    }
  };

  /**
   * 撤销授信
   */
  handleTouchTapDeleteCredit = id => () => {
    this.props.deleteSingleFixedCreditData(id);
  };

  /**
   * 长期固定信用/定期结算信用/滚动结算信用切换
   */
  handleSelectPageType = (event, index, value) => {
    this.setState({ creditSelectType: Number(value) });
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
          ...this.state.createLongDateCreditObject,
          ...{
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
          ...this.state.createFixedDateCreditObject,
          ...{
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
          ...this.state.createRollCreditObject,
          ...{
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
          ...this.state.createTempCreditObject,
          ...{
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
    if (inputValue > 0) {
      if (inputValue > 10000000000000000) {
        event.target.value = 10000000000000000;
        inputValue = 10000000000000000;
      }
      obj.XYED = inputValue;
      obj.YXED = inputValue;
    } else {
      obj.XYED = '';
      obj.YXED = '';
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
    if (inputValue > 0) {
      if (inputValue > 10000000000000000) {
        event.target.value = 10000000000000000;
        inputValue = 10000000000000000;
      }
      obj.ZCJSTS = inputValue;
    } else {
      obj.ZCJSTS = '';
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
  /**
   * 获取当前信用card avatar
   */
  getCreditAvatar = () => {
    let avatarStr = '/fixedCreditIcon.png';
    if (_.has(this.props.creditSee.fixedCreditData, 'GUID')) {
      switch (this.props.creditSee.fixedCreditData.EDLX || 1) {
        case '1':
          avatarStr = '/fixedCreditIcon.png';
          break;
        case '2':
          avatarStr = '/rollCreditIcon.png';
          break;
        case '3':
          avatarStr = '/fixedDateCreditIcon.png';
          break;
      }
    } else {
      switch (Number(this.state.creditSelectType) || 0) {
        case 0:
          avatarStr = '/fixedCreditIcon.png';
          break;
        case 1:
          avatarStr = '/fixedDateCreditIcon.png';
          break;
        case 2:
          avatarStr = '/rollCreditIcon.png';
          break;
      }
    }
    return avatarStr;
  }
  /**
   * 获取当前信用color值
   */
  getCreditColor = () => {
    const colorObj = {
      colorBeginStr: '#00dec9',
      colorEndStr: '#00bf9e'
    }
    if (_.has(this.props.creditSee.fixedCreditData, 'GUID')) {
      switch (this.props.creditSee.fixedCreditData.EDLX || 1) {
        case '1':
          colorObj.colorBeginStr = '#00dec9';
          colorObj.colorEndStr = '#00bf9e';
          break;
        case '2':
          colorObj.colorBeginStr = '#feb68f';
          colorObj.colorEndStr = '#fc855b';
          break;
        case '3':
          colorObj.colorBeginStr = '#fde594';
          colorObj.colorEndStr = '#f7c220';
          break;
      }
    } else {
      switch (Number(this.state.creditSelectType) || 0) {
        case 0:
          colorObj.colorBeginStr = '#00dec9';
          colorObj.colorEndStr = '#00bf9e';
          break;
        case 1:
          colorObj.colorBeginStr = '#fde594';
          colorObj.colorEndStr = '#f7c220';
          break;
        case 2:
          colorObj.colorBeginStr = '#feb68f';
          colorObj.colorEndStr = '#fc855b';
          break;
      }
    }
    return colorObj;
  }
  /**
   * 获取长期信用card高度值
   */
  getFixedCreditCardHeight = () => {
    let heightStr = '34.5rem';        // 长期高度
    if (!(_.has(this.props.creditSee.fixedCreditData, 'GUID'))) {
      switch (Number(this.state.creditSelectType) || 0) {
        case 1:
          heightStr = '38.5rem';
          break;
        case 2:
          heightStr = '34.5rem';
          break;
      }
    }
    return heightStr;
  }
  render() {
    const menuStyle = {
      marginLeft: '-20px',
      position: 'relative',
      zIndex: '999'
    };
    const underlineStyle = {
      outline: 'none',
      borderTop: 'none'
    };
    const labelStyleColor = {
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '20px',
      color: 'rgb(255, 255, 255)',
      letterSpacing: '0.71px'
    };
    const filter =
      (<DropDownMenu
        style={menuStyle} underlineStyle={underlineStyle} labelStyle={labelStyleColor}
        value={Number(this.state.creditSelectType)}
        onChange={this.handleSelectPageType}
      >
        {
          this.state.creditMenuType.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
        }
      </DropDownMenu>);
    const tempEchartsData = [{
      value: (this.props.creditSee.allCreditData.LSED || 0),
      name: '临时信用总可用额度',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#00ddff' // 0% 处的颜色
          }, {
            offset: 1, color: '#00a0ff' // 100% 处的颜色
          }], false)
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#00ddff' // 0% 处的颜色
          }, {
            offset: 1, color: '#00a0ff' // 100% 处的颜色
          }], false)
        }
      }
    }];
    // 定期信用
    const fixedEchartsData = [{
      value: (this.props.creditSee.allCreditData.GDED || 0),
      name: `${this.props.creditSee.fixedCreditData.EDLXMC || '长期'}信用总可用额度`,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: this.getCreditColor().colorBeginStr // 0% 处的颜色
          }, {
            offset: 1, color: this.getCreditColor().colorEndStr // 100% 处的颜色
          }], false)
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: this.getCreditColor().colorBeginStr // 0% 处的颜色
          }, {
            offset: 1, color: this.getCreditColor().colorEndStr // 100% 处的颜色
          }], false)
        }
      }
    }];


    return (
      <div className='credit-see'>
        <StandardForm iconPosition={'-180px -60px'} title='我授予的信用'>
          <StandardFormCardList>
            <StandardFormCard
              actions={<GoBackButton />} showStep={false} expanded title=''
              message={`您当前正在查看<${this.props.location.state.JGMC}>授信详情`}
            >
              <div className='credit-see-content'>
                <div className='col-lg-6 col-md-6 col-sm-12' style={{ position: 'relative' }}>
                  <Card
                    expanded containerStyle={{ paddingBottom: '0px' }}
                    CardStyle={{ marginLeft: 0, marginBottom: 0 }}
                    title={_.has(this.props.creditSee.fixedCreditData, 'GUID') ? `${this.props.creditSee.fixedCreditData.EDLXMC || '长期'}信用` : ''}
                    dropMenuTitle={_.has(this.props.creditSee.fixedCreditData, 'GUID') ? <div style={{ width: '0px' }} /> : filter}
                    avatar={this.getCreditAvatar()}
                    topStyle={{ boxShadow: 'none' }}
                    titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '20px', color: '#fff', lineHeight: '57px' }}
                    CardTextStyle={{ width: '100%', height: this.getFixedCreditCardHeight() }}
                    iconStyleLeft={{ marginTop: '20px', marginRight: '20px', marginLeft: '0px' }}
                  >

                    <div className='credit-card-container'>
                      <EchartsPie
                        seriesData={fixedEchartsData}
                        creditObj={{ XYED: this.props.creditSee.fixedCreditData.YXED || 0 }}
                        isSimpleShow
                        label={`${this.props.creditSee.fixedCreditData.EDLXMC || '长期'}信用总可用额度`}
                      />
                      <div className='credit-container-bottom'>
                        {
                          (() => {
                            if (_.has(this.props.creditSee.fixedCreditData, 'GUID')) {
                              if (Number(this.props.creditSee.fixedCreditData.EDLX) === 2 || Number(this.props.creditSee.fixedCreditData.EDLX) === 3) {
                                return (<div className='credit-see-form-content'>
                                  <div className='form-row-div'>
                                    <div className='half-row-div col-lg-6 col-md-6 col-sm-12'>
                                      <span className='credit-input-title-font'>授信金额：</span>
                                      <span className='credit-span-result-font'>￥{this.props.creditSee.fixedCreditData.XYED}</span>
                                    </div>
                                    <div className='half-row-div col-lg-6 col-md-6 col-sm-12'>
                                      <span className='credit-input-title-font'>有效额度：</span>
                                      <span className='credit-span-result-font'>￥{this.props.creditSee.fixedCreditData.YXED}</span>
                                    </div>
                                  </div>
                                  <div className='form-row-div'>
                                    <div className='half-row-div col-lg-12 col-md-12 col-sm-12'>
                                      <span className='credit-input-title-font'>有效期：</span>
                                      <span className='credit-span-result-font'>{moment(this.state.validDateData.GD_YXQS).format('YYYY-MM-DD')}</span>
                                      <span className='credit-input-title-font'> 至 </span>
                                      <span className='credit-span-result-font'>{moment(this.state.validDateData.GD_YXQZ).format('YYYY-MM-DD')}</span>
                                    </div>
                                    <div className='half-row-div col-lg-12 col-md-12 col-sm-12'>
                                      <span className='credit-input-title-font'>结算周期：</span>
                                      <span className='credit-span-result-font'>{this.props.creditSee.fixedCreditData.ZCJSTS}</span>
                                      <span className='credit-input-title-font'>天</span>
                                    </div>
                                  </div>
                                  <div className='creditPosition' style={{ top: 435 }}>
                                    <RaisedButton
                                      label='撤销授信'
                                      style={{ boxShadow: 'none', height: 40 }}
                                      secondary
                                      onTouchTap={this.handleTouchTapDeleteCredit(this.state.fixedCreditData.GUID || -1)}
                                    />
                                  </div>


                                </div>)
                              } else {
                                return (<div className='credit-see-form-content'>
                                  <div className='form-row-div'>
                                    <div className='half-row-div col-lg-6 col-md-6 col-sm-12'>
                                      <span className='credit-input-title-font'>授信金额：</span>
                                      <span className='credit-span-result-font'>￥{this.props.creditSee.fixedCreditData.XYED}</span>
                                    </div>
                                    <div className='half-row-div col-lg-6 col-md-6 col-sm-12'>
                                      <span className='credit-input-title-font'>有效额度：</span>
                                      <span className='credit-span-result-font'>￥{this.props.creditSee.fixedCreditData.YXED}</span>
                                    </div>
                                  </div>
                                  <div className='form-row-div col-lg-12 col-md-12 col-sm-12'>
                                    <span className='credit-input-title-font'>有效期：</span>
                                    <span className='credit-span-result-font'>{moment(this.state.validDateData.GD_YXQS).format('YYYY-MM-DD')}</span>
                                    <span className='credit-input-title-font'> 至 </span>
                                    <span className='credit-span-result-font'>{moment(this.state.validDateData.GD_YXQZ).format('YYYY-MM-DD')}</span>
                                  </div>
                                  <div className='creditPosition'>
                                    <RaisedButton
                                      label='撤销授信'
                                      style={{ boxShadow: 'none', height: 40 }}
                                      secondary
                                      onTouchTap={this.handleTouchTapDeleteCredit(this.state.fixedCreditData.GUID || -1)}
                                    />
                                  </div>
                                </div>)
                              }
                            } else if (Number(this.state.creditSelectType) === 0) {
                              return (<div className='credit-see-form-content'>
                                <div className='form-row-div'>
                                  <span className='credit-input-title-font'>授信金额：</span>
                                  <TextField
                                    type='number' hintText='请输入金额' min={1} max={10000000000000000}
                                    hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                    inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000', width: '140px' }}
                                    onChange={this.handleChangeTempLine(1)} onFocus={this.handleDataPickerFocus()}
                                    className='creditTextWidth'
                                  />
                                  <span style={{ display: this.state.fixedLongDateError ? 'block' : 'none' }} className='error-span'>{this.state.fixedLongDateErrorMessage}</span>
                                </div>
                                <div className='inforFlex2'>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期始：</span>
                                    <ChineseDatePicker
                                      hintText='起始时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(1)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.fixedLongDateStartTimeError ? 'block' : 'none' }} className='error-span'>{this.state.fixedLongDateStartTimeErrorMessage}</span>
                                  </div>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期止：</span>
                                    <ChineseDatePicker
                                      hintText='终止时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(11)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.fixedLongDateEndTimeError ? 'block' : 'none' }} className='error-span'>{this.state.fixedLongDateEndTimeErrorMessage}</span>
                                  </div>
                                </div>
                                <div className='creditPosition' style={{ top: 392 }}>
                                  <RaisedButton
                                    label='确认授信'
                                    style={{ marginTop: 10, boxShadow: 'none', height: 40 }}
                                    primary
                                    onTouchTap={this.handleTouchTapSubmitCredit(1)}
                                  />
                                </div>
                              </div>)
                            } else if (Number(this.state.creditSelectType) === 1) {
                              return (<div className='credit-see-form-content'>
                                <div className='form-row-div'>
                                  <span className='credit-input-title-font'>授信金额：</span>
                                  <TextField
                                    type='number' hintText='请输入金额' min={1} max={10000000000000000}
                                    hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                    inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000' }}
                                    onChange={this.handleChangeTempLine(2)} onFocus={this.handleDataPickerFocus()}
                                    className='creditTextWidth'
                                  />
                                  <span style={{ display: this.state.fixedDateError ? 'block' : 'none' }} className='error-span'>{this.state.fixedDateErrorMessage}</span>
                                </div>
                                <div className='inforFlex2'>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>结算周期：</span>
                                    <TextField
                                      type='number' hintText='请输入结算周期' min={1} max={10000000000000000}
                                      hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000' }}
                                      onChange={this.handleChangeSettleCycle(1)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                  </div>
                                  <div className='form-row-div'>
                                    <RadioButtonGroup name='employeeRadioButtonGroup' defaultSelected='day' style={{ display: 'flex', height: 40, margin: '20px 0 0 65px' }} onChange={this.handleChangeSettleCycleUnit}>
                                      <RadioButton
                                        style={{ width: '85px' }}
                                        checkedIcon={<ToggleCheckBox />}
                                        uncheckedIcon={<ToggleCheckBoxOutlineBlank />}
                                        value='day'
                                        label='天'
                                      />
                                      <RadioButton
                                        style={{ width: '85px' }}
                                        checkedIcon={<ToggleCheckBox />}
                                        uncheckedIcon={<ToggleCheckBoxOutlineBlank />}
                                        value='month'
                                        label='月'
                                      />
                                    </RadioButtonGroup>
                                  </div>
                                  <span style={{ display: this.state.fixedDateSettleCycleError ? 'block' : 'none' }} className='error-span'>{this.state.fixedDateSettleCycleErrorMessage}</span>
                                </div>
                                <div className='inforFlex2'>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期始：</span>
                                    <ChineseDatePicker
                                      hintText='起始时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(2)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.fixedDateStartTimeError ? 'block' : 'none' }} className='error-span'>{this.state.fixedDateStartTimeErrorMessage}</span>
                                  </div>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期止：</span>
                                    <ChineseDatePicker
                                      hintText='终止时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(22)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.fixedDateEndTimeError ? 'block' : 'none' }} className='error-span'>{this.state.fixedDateEndTimeErrorMessage}</span>
                                  </div>
                                </div>

                                <div className='creditPosition' style={{ top: 435 }}>
                                  <RaisedButton
                                    label='确认授信'
                                    style={{ marginTop: 10, boxShadow: 'none', height: 40 }}
                                    primary
                                    onTouchTap={this.handleTouchTapSubmitCredit(2)}
                                  />
                                </div>
                              </div>)
                            } else if (Number(this.state.creditSelectType) === 2) {
                              return (<div className='credit-see-form-content'>
                                <div className='inforFlex2'>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信金额：</span>
                                    <TextField
                                      type='number' hintText='请输入金额' min={1} max={10000000000000000}
                                      hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000' }}
                                      onChange={this.handleChangeTempLine(3)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.rollDateError ? 'block' : 'none' }} className='error-span'>{this.state.rollDateErrorMessage}</span>
                                  </div>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>结算周期：</span>
                                    <TextField
                                      type='number' hintText='请输入结算周期' min={1} max={10000000000000000}
                                      hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000' }}
                                      onChange={this.handleChangeSettleCycle(2)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                    <span className='credit-input-title-font'>天</span>
                                    <span style={{ display: this.state.rollDateSettleCycleError ? 'block' : 'none' }} className='error-span'>{this.state.rollDateSettleCycleErrorMessage}</span>
                                  </div>
                                </div>
                                <div className='inforFlex2'>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期始：</span>
                                    <ChineseDatePicker
                                      hintText='起始时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(3)} onFocus={this.handleDataPickerFocus()}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.rollDateStartTimeError ? 'block' : 'none' }} className='error-span'>{this.state.rollDateStartTimeErrorMessage}</span>
                                  </div>
                                  <div className='form-row-div'>
                                    <span className='credit-input-title-font'>授信期止：</span>
                                    <ChineseDatePicker
                                      hintText='终止时间'
                                      style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                      textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                      onChange={this.handleDataPickerChange(33)} onFocus={this.handleDataPickerFocus()} shouldDisableDate={this.handleShouldDisableDate}
                                      className='creditTextWidth'
                                    />
                                    <span style={{ display: this.state.rollDateEndTimeError ? 'block' : 'none' }} className='error-span'>{this.state.rollDateEndTimeErrorMessage}</span>
                                  </div>
                                </div>
                                <div className='creditPosition' style={{ top: 392 }}>
                                  <RaisedButton
                                    label='确认授信'
                                    style={{ marginTop: 10, boxShadow: 'none', height: 40 }}
                                    primary
                                    onTouchTap={this.handleTouchTapSubmitCredit(3)}
                                  />
                                </div>
                              </div>)
                            }
                          })()
                        }
                      </div>
                    </div>
                  </Card>
                </div>


                <div className='col-lg-6 col-md-6 col-sm-12' style={{ position: 'relative' }}>
                  <Card
                    expanded containerStyle={{ paddingBottom: '0px' }}
                    CardStyle={{ marginLeft: 0, marginBottom: 0 }}
                    title={'临时信用'} avatar='/tempCreditIcon.png'
                    topStyle={{ boxShadow: 'none' }}
                    titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '20px', color: '#fff', lineHeight: '57px' }}
                    CardTextStyle={{ width: '100%', height: '34.5rem' }}
                    iconStyleLeft={{ marginTop: '20px', marginRight: '20px', marginLeft: '0px' }}
                  >

                    <div className='credit-card-container'>
                      <EchartsPie
                        seriesData={tempEchartsData}
                        creditObj={{ XYED: this.props.creditSee.allCreditData.LSED || 0 }} isSimpleShow
                        label='临时信用总可用额度'
                      />
                      <div className='credit-container-bottom'>
                        <div className='credit-see-form-content'>
                          <div className='form-row-div'>
                            <span className='credit-input-title-font'>授信金额：</span>
                            <TextField
                              type='number' hintText='请输入金额' min={1} max={10000000000000000}
                              hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                              inputStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#000' }}
                              onChange={this.handleChangeTempLine(4)} onFocus={this.handleDataPickerFocus()}
                              className='creditTextWidth'
                            />
                            <span style={{ display: this.state.tempAmountError ? 'block' : 'none' }} className='error-span'>{this.state.tempAmountErrorMessage}</span>
                          </div>
                          <div className='inforFlex2'>
                            <div className='form-row-div'>
                              <span className='credit-input-title-font'>授信期始：</span>
                              <ChineseDatePicker
                                hintText='起始时间' onChange={this.handleDataPickerChange(4)}
                                style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                onFocus={this.handleDataPickerFocus()}
                                className='creditTextWidth'
                              />
                              <span style={{ display: this.state.tempStartTimeError ? 'block' : 'none' }} className='error-span'>{this.state.tempStartTimeErrorMessage}</span>
                            </div>
                            <div className='form-row-div'>
                              <span className='credit-input-title-font'>授信期止：</span>
                              <ChineseDatePicker
                                hintText='终止时间' onChange={this.handleDataPickerChange(44)}
                                style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}
                                textFieldStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', width: '140px' }}
                                onFocus={this.handleDataPickerFocus()}
                                shouldDisableDate={this.handleShouldDisableDate}
                                className='creditTextWidth'
                              />
                              <span style={{ display: this.state.tempEndTimeError ? 'block' : 'none' }} className='error-span'>{this.state.tempEndTimeErrorMessage}</span>
                            </div>
                          </div>

                          <div className='creditPosition' style={{ top: 392 }}>
                            <RaisedButton
                              label='确认授信'
                              style={{ marginTop: 10, boxShadow: 'none', height: 40 }}
                              primary
                              onTouchTap={this.handleTouchTapSubmitCredit(4)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <TempCreditQueryDataGrid
                    AuthorizeOrganizationId={Number(this.props.globalStore.organizationId)}
                    AuthorizedOrganizationId={Number(this.props.location.state.BSQJXSID)}
                    dataGridStyle={{ width: 'auto' }}
                  />
                </div>
              </div>
            </StandardFormCard>
          </StandardFormCardList>
        </StandardForm>
      </div>
    )
  }
}
