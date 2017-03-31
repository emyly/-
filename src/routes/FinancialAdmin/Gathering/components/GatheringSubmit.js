/**
 * Created by wangming on 2017/1/13.
 */

import React, { Component, PropTypes } from 'react';

import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import {
    FinancialType,
    BillingType,
    VerificationType
} from 'components/FinancialDataGrid/FinancialDataData';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import DataGrid from 'components/DataGrid';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import './GatheringSubmit.scss';

export default class GatheringSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOrderOptions: {
        columnOptions: [
          {
            label: '出库单号',
            attr: 'CRKDID',
            style: {
              cursor: 'pointer'
            }
          },
          {
            label: '未收款金额',
            attr: 'WSZJE',
            style: {
              cursor: 'pointer'
            }
          }
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false
        },
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: false
      },
      openMessageBar: false,
      message: '',
      submitBtnDisabled: false,
      submitBtnTitle: '提交',
      gatheringAmount: 0,         // 本次收款总金额
      verify: false,              // 表单验证标识位

    }
  }

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.props.getGatheringOneDepositData({
      JXSYJB: {
        SJXSID: Number(this.props.globalStore.organizationId),   // 收经销商ID（组织机构ID）
        ZJXSID: Number(this.props.location.state.orderInfo.CJJXSID || 0),   // 支经销商ID（组织机构ID）
        YJLX: '0'       // 押金类型 1表示押金,0表示预售金
      }
    })
  };

  componentWillReceiveProps(nextProps) {
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
  static propTypes = {
    /**
     * location
     */
    location: PropTypes.object.isRequired,
    initFinancialgatheringSubmitPostState: PropTypes.func.isRequired,
    postGatheringSubmitData: PropTypes.func.isRequired,
    getGatheringOneDepositData: PropTypes.func.isRequired,
    globalStore: PropTypes.object,
    gatheringSubmit: PropTypes.object
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
   * 本次收款总金额onchange
   */
  handleChangeGatheringAmount = () => (event) => {
    this.setState({
      gatheringAmount: event.target.value
    })
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
   * 表单验证
   */
  validator = (key = 'ALL') => {
    const verify = {
      gatheringAmount: !!this.state.gatheringAmount
    }
    return key === 'ALL' ? (() => {
      let verifyStatus = false;
      for (const va in verify) {
        if (!verify[va] || this.validatorGatheringAmountValue().result) {
          verifyStatus = true;
        }
      }
      return verifyStatus;
    })() : verify[key];
  }
  /**
   * 收款金额验证
   */
  validatorGatheringAmountValue = () => {
    if (this.props.location.state.submitDataList.length <= 0) return { total: 0, result: false };
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WSZJE));
    return {
      total: Number(this.state.gatheringAmount) > Number(amount) ? amount : Number(this.props.gatheringSubmit.depositTotal),
      result: Number(this.state.gatheringAmount) > Number(amount) || Number(this.state.gatheringAmount) > Number(this.props.gatheringSubmit.depositTotal)
    }
  }
  /**
   * 单个订单收款提交
   */
  handleSubmit = () => {
    this.setState({
      verify: this.validator('ALL')
    })
    if (!this.validator('ALL')) {
      this.setState({
        submitBtnDisabled: true,
        submitBtnTitle: '提交中...'
      })
      const crkidArray = [];
      this.props.location.state.submitDataList.map((value) => {
        crkidArray.push(value.CRKDID);
      });
      const postObject = {
        XSSZMXB: [{
          CRKDID: crkidArray,
          DDID: this.props.location.state.orderInfo.GUID,
          ZSZJE: Number(this.state.gatheringAmount),
          SZRQ: new Date()
        }],
        XSSZB: {
          FZJXSID: Number(this.props.location.state.orderInfo.CJJXSID || 0),
          SZLX: '0'
        }
      };
      this.props.postGatheringSubmitData(postObject);
    }
  };
  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        onTouchTap={this.handleSubmit}
        label={this.state.submitBtnTitle}
        disabled={this.props.gatheringSubmit.depositTotal === -1 ? true : this.state.submitBtnDisabled}
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WSZJE));
    amount = amount.toFixed(2);
    return (
      <StandardDataGrid
        title='收款管理'
        actions={actions}
        label={'收款'}
        message={`您正在对<${this.props.location.state.orderInfo.CJJXSMC || '机构无名称'}>收款登记`}
        iconPosition={'-60px -150px'}
        childrenStyle={{ overflow: 'hidden' }}
      >
        <div className='gathering-submit'>
          <DataGrid
            dataGridStyle={{ height: 'calc(100% - 85px)', overflow: 'auto' }}
            options={this.state.selectedOrderOptions}
            dataSource={this.props.location.state.submitDataList || []}
          />
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
                <TextField
                  style={{ width: '45%', marginLeft: '12px', color: '#fff' }}
                  hintStyle={{ color: '#fff' }}
                  inputStyle={{ color: '#fff' }}
                  errorStyle={{ display: 'flex' }}
                  errorText={this.state.verify && (!this.validator('gatheringAmount') || this.validatorGatheringAmountValue().result) && <div className='warning'>{this.validatorGatheringAmountValue().result ? `金额应小于${this.validatorGatheringAmountValue().total}` : '请输入收款金额'}</div>}
                  type='number' hintText='请输入收款总金额'
                  onChange={this.handleChangeGatheringAmount()}
                  onFocus={this.handleFocus()}
                />
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
