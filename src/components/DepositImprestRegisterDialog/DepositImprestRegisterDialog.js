/**
 * Created by NXQ on 17/1/7.
 */

import React, { Component, PropTypes } from 'react';

import './DepositImprestRegisterDialog.scss';

import Dialog from 'components/StandardUI/StandardBusinessDialog';

import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

import AtMessage from 'components/AtMessage'

import SelectField from 'material-ui/SelectField';

import MenuItem from 'material-ui/MenuItem';

import _ from 'lodash';
/**
 * 使用场景：押金/预付款收款退款登记
 */
export default class DepositImprestRegisterDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitObj: {},       // 提交Object
      PartnerArray: [],    // 合作方数组
      SelectTypeValue: '',
      partnerError: '',
      moneyError: ''
    }
  }

  static defaultProps = {
    partnerObj: {}
  };

  static propTypes = {
    /**
     * 当前Dailog开关状态
     */
    open: PropTypes.bool.isRequired,
    /**
     * 区分押金/预付款 '0'表示押金收款 '1'表示押金退款 '2'表示预付款收款
     */
    type: PropTypes.string.isRequired
  };
  componentWillReceiveProps = (nextProps) => {
    if (_.has(this.props.partnerObj, 'id')) {       // 是否直接从指定的合作商开始添加
      this.state.submitObj.partnerId = this.props.partnerObj.id
      this.state.PartnerArray.push(this.props.partnerObj);
      this.setState({
        submitObj: this.state.submitObj,
        SelectTypeValue: 0,
        PartnerArray: this.state.PartnerArray
      })
    } else {
      this.setState({
        PartnerArray: nextProps.depositImprestRegisterDialog.partnerData
      })
    }
    if (nextProps.open === false) {
      this.setState({
        submitObj: {},       // 提交Object
        PartnerArray: [],    // 合作方数组
        SelectTypeValue: '',
        partnerError: '',
        moneyError: ''
      })
    }
    if (nextProps.open != this.props.open && !_.has(this.props.partnerObj, 'id')) {
      this.props.getDepositImprestPartnerData(this.props.globalStore.organizationId);
    }
  };
  componentWillMount = () => {
    this.props.getDepositImprestPartnerData(this.props.globalStore.organizationId);
  };

  /**
   * 获取Dialog标题 '0'表示押金收款 '1'表示押金退款 '2'表示预付款收款
   */
  getDialogTitle = () => {
    let title = '';
    switch (this.props.type) {
      case '0':
        title = '押金收款登记';
        break;
      case '1':
        title = '押金退款登记';
        break;
      case '2':
        title = '预付款收款登记';
        break;
    }
    return title;
  };

  /**
   * 收据编号onchange
   */
  handleChangeReceiptNo = () => (event) => {
    this.state.submitObj.receiptNo = event.target.value;
    this.setState({
      submitObj: this.state.submitObj
    })
  };
  /**
   * 合作方选择
   */
  handleChangeSelectType = (event, index, value) => {
    this.state.submitObj.partnerId = this.state.PartnerArray[Number(value)].id;
    this.setState({
      SelectTypeValue: value,
      submitObj: this.state.submitObj
    });
  };
  /**
   * 金额onchange
   */
  handleChangeMoney = () => (event) => {
    this.state.submitObj.money = event.target.value;
    this.setState({
      submitObj: this.state.submitObj
    })
  };
  /**
   * 留言onchange
   */
  handleMessageChange = (event) => {
    this.state.submitObj.atMessage = event.target.value;
    this.setState({
      submitObj: this.state.submitObj
    });
  };
  /**
   * 登记提交
   */
  handleTouchRegister = () => {
    // this.props.type 区分押金/预付款 '0'表示押金收款 '1'表示押金退款 '2'表示预付款收款
    if (!_.has(this.state.submitObj, 'partnerId')) {
      this.setState({
        partnerError: `${this.props.type === '1' ? '收款方' : '付款方'}不能为空`
      })
      return;
    }
    if (!_.has(this.state.submitObj, 'money')) {
      this.setState({
        moneyError: '金额不能为空'
      });
      return;
    } else if (this.state.submitObj.money < 0) {
      this.setState({
        moneyError: '金额不能小于0'
      })
      return;
    }
    let paramsObj = {};
    let isListQuery = false;
    if (_.has(this.props.partnerObj, 'id')) {
      isListQuery = false,
      paramsObj = {
        Page: 1,
        body: {
          YJMXB: {
            SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
            ZJXSID: this.props.partnerObj.id,                   // 支经销商ID（组织机构ID）
            YJLX: this.props.type === '2' ? '0' : '1'           // 押金类型 1表示押金,0表示预售金
          }
        }
      }
    } else {
      isListQuery = true,
      paramsObj = {
        Page: 1,
        body: {
          JXSYJB: {
            SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
            YJLX: this.props.type === '2' ? '0' : '1'           // 押金类型 1表示押金,0表示预售金
          }
        }
      };
    }
    this.props.postDepositImprestData({
      body: {
        YJMXB: {
          SJXSID: Number(this.props.globalStore.organizationId),
          ZJXSID: Number(this.state.submitObj.partnerId),
          YJLX: this.props.type === '2' ? '0' : '1', // 押金类型 1表示押金,0表示预售金
          SZLX: this.props.type === '1' ? '0' : '1', // 收支类型 1表示收,0表示支
          JE: Number(this.state.submitObj.money),            // 金额
          SJBH: Number(this.state.submitObj.receiptNo),      // 收据编号
          MS: this.state.submitObj.atMessage         // 描述
        }
      },
      params: paramsObj,
      isListQuery
    });
    this.props.handleTouchTapDialog();
  };
  /**
   * MenuItem onFocus
   */
  handleChangeSelectFocus = () => () => {
    this.setState({
      partnerError: ''
    })
  }
  /**
   * money onFocus
   */
  handleMoneyFocus = () => () => {
    this.setState({
      moneyError: ''
    })
  }
  render() {
    const actions = [
      <FlatButton
        label='取消'
        style={{ marginRight: 10, color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        onTouchTap={this.props.handleTouchTapDialog}
      />,
      <FlatButton
        label='提交'
        primary
        style={{ marginRight: 10, color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        onTouchTap={this.handleTouchRegister}
      />
    ];
    return (
      <Dialog
        title={this.getDialogTitle()}
        actions={actions}
        modal
        open={this.props.open}
      >
        <div className='deposit-imprest-register-dialog'>
          <div className='register-content'>
            <img src='/FinancialIcon/ReceiptNoIcon.png' className='img-content' />
            <span className='title-content'>收据编号</span>
            <TextField className='text-field-content' style={{ width: 'calc(100% - 11rem)' }} type='number' hintText='请输入收据编号' onChange={this.handleChangeReceiptNo()} />
          </div>
          <div className='register-content'>
            <img src='/FinancialIcon/PartnerIcon.png' className='img-content' />
            <span className='title-content'>{this.props.type === '1' ? '收款方' : '付款方'}</span>
            <SelectField
              value={this.state.SelectTypeValue}
              errorText={this.state.partnerError}
              style={{ width: 'calc(100% - 11rem)' }}
              hintText={`请选择${this.props.type === '1' ? '收款方' : '付款方'}`}
              onChange={this.handleChangeSelectType}
              maxHeight={200}
            >
              {
                this.state.PartnerArray.map((value, index) => <MenuItem key={index} value={index} primaryText={value.name} onFocus={this.handleChangeSelectFocus()} />)
              }
            </SelectField>
          </div>
          <div className='register-content'>
            <img src='/FinancialIcon/MoneyIcon.png' className='img-content' />
            <span className='title-content'>金额</span>
            <TextField className='text-field-content' onFocus={this.handleMoneyFocus()} errorText={this.state.moneyError} style={{ width: 'calc(100% - 11rem)' }} type='number' hintText='请输入金额' onChange={this.handleChangeMoney()} />
          </div>
          <div className='register-content'>
            <img src='/FinancialIcon/LeavingMessageIcon.png' className='img-content' />
            <span className='title-content'>留言</span>
            <TextField
              onChange={this.handleMessageChange}
              multiLine
              rows={1}
              rowsMax={2}
              style={{ width: 'calc(100% - 11rem)', fontFamily: 'SourceHanSansCN-Regular' }}
              hintText='请填写留言'
            />
          </div>
        </div>

      </Dialog>
    )
  }
}
