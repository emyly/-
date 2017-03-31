/**
 * Created by wangming on 2017/1/13.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import Checkbox from 'material-ui/Checkbox';
import {
    FinancialType,
    BillingType,
    VerificationType
} from 'components/FinancialDataGrid/FinancialDataData';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeaderColumn
} from 'material-ui/Table';
import { grey500 } from 'material-ui/styles/colors';
import _ from 'lodash';

export default class GatheringBatchSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openMessageBar: false,
      message: '',
      submitBtnDisabled: false,
      submitBtnTitle: '提交',
      gatheringAmount: 0,         // 本次收款总金额
      verify: false,              // 表单验证标识位
      gatheringBatchOrderData: []

    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    /**
     * location
     */
    location: PropTypes.object.isRequired,
    initFinancialgatheringSubmitPostState: PropTypes.func.isRequired,
    postGatheringSubmitData: PropTypes.func.isRequired,
    getGatheringOneDepositData: PropTypes.func.isRequired,
    getGatheringBatchSalesOrderData: PropTypes.func.isRequired,
    globalStore: PropTypes.object,
    gatheringSubmit: PropTypes.object,
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.props.getGatheringOneDepositData({
      JXSYJB: {
        SJXSID: Number(this.props.globalStore.organizationId),   // 收经销商ID（组织机构ID）
        ZJXSID: Number(this.props.location.state.submitDataList[0].CJJXSID || 0),   // 支经销商ID（组织机构ID）
        YJLX: '0'       // 押金类型 1表示押金,0表示预售金
      }
    })
    this.props.getGatheringBatchSalesOrderData(this.props.location.state.submitDataList);
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
      if (event.target.name === 'stopPropagationTextField') {  // TextField禁止事件透传
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gatheringSubmit.gatheringBatchOrderData.length && !nextProps.gatheringSubmit.registerStatus) {
      this.setState({
        gatheringBatchOrderData: nextProps.gatheringSubmit.gatheringBatchOrderData
      })
    }
    if (nextProps.gatheringSubmit.registerStatus) {
      this.setState({
        openMessageBar: true,
        message: '收款登记成功！',
      })
      this.props.initFinancialgatheringSubmitPostState();
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  /**
   * 批量订单收款提交
   */
  handleSubmit = () => {
    this.setState({
      verify: this.validator()
    })
    if (!this.validator()) {
      this.setState({
        submitBtnDisabled: true,
        submitBtnTitle: '提交中...'
      })
      const postObject = {};
      const paramArray = [];
      this.state.gatheringBatchOrderData.map((value) => {
        const obj = {
          CRKDID: []
        };
        if (value.isSelected) {
          value.XSDB.map((val) => {
            if (val.isSelected) obj.CRKDID.push(val.CRKDID);
          })
          obj.DDID = value.GUID;
          obj.ZSZJE = Number(value.gatheringAmount);
          obj.SZRQ = new Date()
          paramArray.push(obj);
        }
      })
      postObject.XSSZMXB = paramArray;
      postObject.XSSZB = {
        FZJXSID: Number(this.state.gatheringBatchOrderData[0].CJJXSID || 0),
        SZLX: '0'
      }
      this.props.postGatheringSubmitData(postObject);
    }
  };
  // 提示信息框开关
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar
    });
    if (!this.state.openMessageBar) {
      this.context.router.push('/gathering');
    }
  };
  /**
   * 获取焦点事件
   */
  handleFocus = () => () => {
    this.setState({
      verify: false
    })
  }
  /**
   * 本次收款总金额onchange
   */
  handleChangeGatheringAmount = value => (event) => {
    value.gatheringAmount = event.target.value;
    this.setState({
      gatheringBatchOrderData: this.state.gatheringBatchOrderData
    })
  };
  /**
   * 表单验证
   */
  validator = (index = 0, key = 'ALL') => {
    const verify = {
      gatheringAmount: !!this.state.gatheringBatchOrderData[index].gatheringAmount
    }
    return key === 'ALL' ? (() => {
      let verifyStatus = false;
      this.state.gatheringBatchOrderData.map((value) => {
        if (value.isSelected) {
          let amount = 0;
          value.XSDB.map((val) => {
            if (val.isSelected) amount += Number(val.WSZJE);
          });
          if (Number(value.gatheringAmount) > Number(amount) || !value.gatheringAmount) {
            verifyStatus = true;
          }
        }
      })
      return verifyStatus;
    })() : verify[key];
  }
  /**
   * 收款金额验证
   */
  validatorGatheringAmountValue = (value) => {
    if (this.props.location.state.submitDataList.length <= 0) return { total: 0, result: false };
    let amount = 0;
    value.XSDB.map((val) => {
      if (val.isSelected) amount += Number(val.WSZJE)
    });
    amount = amount.toFixed(2);
    return {
      total: Number(value.gatheringAmount) > Number(amount) ? amount : Number(this.props.gatheringSubmit.depositTotal),
      result: Number(value.gatheringAmount) > Number(amount) || Number(this.state.gatheringAmount) > Number(this.props.gatheringSubmit.depositTotal)
    }
  }
  /**
   * 通过cellclick传入的row找到数组对应的index
   */
  findTableRowIndex = (row) => {
    let index = 0;
    let returnIndex = 0;
    this.state.gatheringBatchOrderData.map((value, valueIndex) => {
      if (row === index) returnIndex = valueIndex;
      if (value.isClicked) {
        index += (value.XSDB.length + 1)
      } else {
        ++index;
      }
    })
    return returnIndex;
  }
  /**
   * table cell click
   */
  handleTableCellClick = (row, col) => {
    if (col === 1) {
      this.state.gatheringBatchOrderData[this.findTableRowIndex(row)].isClicked = !this.state.gatheringBatchOrderData[this.findTableRowIndex(row)].isClicked;
      this.setState({
        gatheringBatchOrderData: this.state.gatheringBatchOrderData
      })
    }
  };
  /**
   * 禁止div onclick事件透传
   */
  handleClickStopPropagation = () => (event) => {
    event.preventDefault();
    event.stopPropagation();
  }
  /**
   * checkbox div onclick事件
   */
  handleCheckBoxClick = (value, val = {}, type = true) => (event) => {
    if (type) {
      value.isSelected = !value.isSelected;
      value.checkboxIconStyle = {};
      value.XSDB = value.XSDB.map(obj => ({ ...obj, isSelected: value.isSelected }));
      value.gatheringAmount = value.isSelected ? value.WSZJE : 0;
    } else {
      val.isSelected = !val.isSelected;
      value.checkboxIconStyle = {};
      if (val.isSelected) {      // 如果入库单被选中
        let amount = 0;
        value.XSDB.map((obj) => {
          if (!obj.isSelected) {
            value.checkboxIconStyle = { fill: grey500 };
          } else {
            amount += Number(obj.WSZJE);
          }
        })
        value.isSelected = true;
        value.gatheringAmount = amount;
      } else {    // 如果入库单没选中
        let amount = 0;
        value.XSDB.map((obj) => {
          if (obj.isSelected) {
            value.checkboxIconStyle = { fill: grey500 };
            value.isSelected = true;
            amount += Number(obj.WSZJE)
          }
        })
        value.gatheringAmount = amount;
        if (!_.has(value.checkboxIconStyle, 'fill')) value.isSelected = false;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      gatheringBatchOrderData: this.state.gatheringBatchOrderData
    });
  }
  /**
   * 渲染table row
   */
  renderTableRow = () => {
    const renderRows = [];
    this.state.gatheringBatchOrderData.map((value, index) => {
      const rowSpan = (value.XSDB.length > 0 && value.isClicked) ? value.XSDB.length : 1;
      renderRows.push(<TableRow key={`_gatheringBatchOrderData${index}`} style={{ height: '55px' }}>
        <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', alignItems: 'center', height: '48px', lineHeight: '48px' }}>
            <div onClick={this.handleCheckBoxClick(value)} style={{ width: '18px', height: '18px' }}>
              <Checkbox
                style={{ width: '100%', height: '100%', textAlign: 'start', marginLeft: '12px' }}
                disabled={false}
                iconStyle={{ ...value.checkboxIconStyle }}
                checked={value.isSelected}
              />
            </div>
            <span>{value.GUID || '-'}</span>
            <img src={value.isClicked ? '/nextpage.png' : '/expandmore.png'} alt='' />
          </div>
        </TableRowColumn>

        <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
          <div style={{ height: '55px', lineHeight: '55px' }}>{value.WSZJE || '-'}</div>
        </TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
          <div style={{ height: '55px', lineHeight: '55px' }}>
            <TextField
              name={'stopPropagationTextField'}
              errorStyle={{ display: 'flex' }}
              style={{ height: '40px' }}
              inputStyle={{ paddingBottom: '8px' }}
              value={Number(value.gatheringAmount) === 0 ? '' : value.gatheringAmount}
              errorText={value.isSelected && this.state.verify && (!this.validator(index, 'gatheringAmount') || this.validatorGatheringAmountValue(value).result) && <div className='warning'>{this.validatorGatheringAmountValue(value).result ? `金额应小于${this.validatorGatheringAmountValue(value).total}` : '请输入收款金额'}</div>}
              type='number' hintText={'请输入收款总金额'}
              onChange={this.handleChangeGatheringAmount(value)}
              onFocus={this.handleFocus()}
            />
          </div>
        </TableRowColumn>
      </TableRow>);
      if (value.isClicked) {
        value.XSDB.map((val, valIndex) => {
          renderRows.push(<TableRow key={`_XSDB${index}${valIndex}`} >
            <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
              <div onClick={this.handleClickStopPropagation()} style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1f0f1', height: '48px' }}>
                <div onClick={this.handleCheckBoxClick(value, val, false)}>
                  <Checkbox
                    style={{ width: '100%', height: '100%', textAlign: 'start', marginLeft: '12px' }}
                    disabled={false}
                    checked={val.isSelected}
                  />
                </div>
                <span>{val.CRKDID || '-'}</span>
              </div>
            </TableRowColumn>
            <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
              <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1f0f1', height: '48px' }}>
                <span>{val.WSZJE || '-'}</span>
              </div>
            </TableRowColumn>
            <TableRowColumn style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
              <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1f0f1', height: '48px' }} />
            </TableRowColumn>
          </TableRow>)
        });
      }
    })
    return renderRows;
  }
  render() {
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WSZJE));
    amount = amount.toFixed(2);
    let gatheringAmountTotal = 0;
    let disabledButton = true;
    this.state.gatheringBatchOrderData.map((value) => {
      gatheringAmountTotal += Number(value.gatheringAmount);
      if (value.isSelected) disabledButton = false;
    });
    gatheringAmountTotal = gatheringAmountTotal.toFixed(2);
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        onTouchTap={this.handleSubmit}
        label={this.state.submitBtnTitle}
        disabled={this.props.gatheringSubmit.depositTotal === -1 || disabledButton ? true : this.state.submitBtnDisabled}
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='收款管理'
        actions={actions}
        label={'收款'}
        message={`您正在对<${this.props.location.state.submitDataList[0].CJJXSMC || '机构无名称'}>收款登记`}
        iconPosition={'-60px -150px'}
        childrenStyle={{ overflow: 'hidden' }}
      >
        <div className='gathering-submit'>
          <div style={{ height: 'calc(100% - 85px)', overflow: 'auto' }}>
            <Table onCellClick={this.handleTableCellClick} selectable={false}>
              <TableHeader displaySelectAll={false} enableSelectAll={false}>
                <TableRow style={{ background: '#364357', paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#5B83B4', letterSpacing: '0.26px', textAlign: 'center' }}>
                  <TableHeaderColumn style={{ fontSize: '16px', color: 'RGB(91, 131, 180)' }}>订单号/出入库单号</TableHeaderColumn>
                  <TableHeaderColumn style={{ fontSize: '16px', color: 'RGB(91, 131, 180)' }}>未收款金额</TableHeaderColumn>
                  <TableHeaderColumn style={{ fontSize: '16px', color: 'RGB(91, 131, 180)' }}>本次收款金额</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody style={{ overflow: 'hidden' }} displayRowCheckbox={false} stripedRows showRowHover deselectOnClickaway={false}>
                {
                  this.renderTableRow()
                }
              </TableBody>
            </Table>
          </div>
          <AppBar iconElementLeft={<div />} style={{ width: '100%', height: '80px', backgroundColor: '#fc8359' }}>
            <div className='gathering-submit-content'>
              <div className='submit-content-div'>
                <span className='submit-title'>可用余额</span>
                <span className='submit-number'>{this.props.gatheringSubmit.depositTotal === -1 ? '暂无数据' : `￥${this.props.gatheringSubmit.depositTotal}`}</span>
              </div>
              <div className='submit-content-div'>
                <span className='submit-title'>未收款总金额</span>
                <span className='submit-number'>{`￥${amount}`}</span>
              </div>
              <div className='submit-content-div'>
                <span className='submit-title'>本次收款总金额</span>
                <span className='submit-number'>{`￥${gatheringAmountTotal}`}</span>
              </div>
            </div>
          </AppBar>
        </div>
        <InformationSnackBar
          message={this.state.message || ''}
          autoHideDuration={1200}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>
    )
  }

}

