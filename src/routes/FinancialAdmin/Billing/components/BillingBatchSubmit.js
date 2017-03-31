/**
 * Created by NXQ on 2017/1/16.
 */

import React, { Component, PropTypes } from 'react';

import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import DataGrid from 'components/DataGrid';
import CardUI from 'components/StandardUI/StandardCard';
import TextField from 'material-ui/TextField';
import DatePicker from 'components/ChineseDatePicker';
import './BillingBatchSubmit.scss';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';

export default class BillingBatchSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOrderOptions: {
        columnOptions: [
          {
            label: '订单号',
            attr: 'GUID',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            render: row => (<div>
              <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
              {row.GUID}
            </div>)
          },
          {
            label: '未开票金额',
            attr: 'WKPJE',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
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
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: false
      },
      registerInvoiceOptions: {
        columnOptions: [
          {
            label: '发票号',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            render: row => (<div >
              <TextField
                style={{ width: '85%' }}
                errorStyle={{ display: 'flex' }}
                errorText={this.state.verify && !this.validator('invoiceNo') && <div className='warning'>请输入发票号</div>}
                type='number' hintText='请输入发票号'
                onChange={this.handleChangeInvoiceNo()}
                onFocus={this.handleFocus()}
              />
            </div>)
          },
          {
            label: '购货单位',
            attr: 'CJJXSMC',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '开票金额',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            render: row => (<div>
              <TextField
                style={{ width: '85%' }}
                errorStyle={{ display: 'flex' }}
                errorText={this.state.verify && (!this.validator('invoiceAmount') || this.validatorAmountValue().result) && <div className='warning'>{this.validatorAmountValue().result ? `金额应小于${this.validatorAmountValue().total}` : '请输入开票金额'}</div>}
                type='number' hintText='请输入开票金额'
                onChange={this.handleChangeInvoiceAmount()}
                onFocus={this.handleFocus()}
              />
            </div>)
          },
          {
            label: '开票日期',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            render: row => (
              <DatePicker
                style={{ width: '85%' }} hintText='请输入开票日期'
                errorText={this.state.verify && !this.validator('invoiceTime') && '请输入开票日期'}
                onChange={this.handleChangeInvoiceTime()}
                onFocus={this.handleFocus()}
              />)
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
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: false
      },
      verify: false,
      invoiceNo: 0,               // 发票号
      invoiceAmount: 0,           // 开票金额
      invoiceTime: 0,             // 开票时间
      invoiceAmountErrorMessage: '请输入开票金额', // 开票金额错误信息
      openMessageBar: false,
      message: '',
      submitBtnDisabled: false,
      submitBtnTitle: '提交'
    }
  }

  static defaultProps = {
  };

  static propTypes = {
    /**
     * location
     */
    location: PropTypes.object.isRequired,
    initFinancialBillingSubmitPostState: PropTypes.func.isRequired,
    postBillingBatchSubmitData: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.billingBatchSubmit.registerStatus) {
      this.setState({
        openMessageBar: true,
        message: '开票登记成功！',
      })
      this.props.initFinancialBillingSubmitPostState();
    }
  }
  /**
   * 订单类型判断
   */
  orderTypeJudge = (type) => {
    const num = parseInt(type);
    switch (num) {
      case 0:
        return {
          type: '铺货',
          backgroundColor: 'pink'
        };
      case 1:
        return {
          type: '备货',
          backgroundColor: '#00be9c'
        };
      case 2:
        return {
          type: '手术',
          backgroundColor: '#ff625b'
        };
      case 3:
        return {
          type: '借货',
          backgroundColor: '#58909c'
        };
      case 4:
        return {
          type: '调货',
          backgroundColor: '#58909c'
        };
      case 5:
        return {
          type: '铺货补货',
          backgroundColor: '#58909c'
        };
      case 6:
        return {
          type: '铺货销售',
          backgroundColor: '#58909c'
        };
      case 7:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      case 8:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      default:
        return {
          type: '无',
          backgroundColor: '#58909c'
        };
    }
  };
  /**
   * 表单验证
   */
  validator = (key = 'ALL') => {
    const verify = {
      invoiceNo: !!this.state.invoiceNo,
      invoiceAmount: !!this.state.invoiceAmount,
      invoiceTime: !!this.state.invoiceTime
    }
    return key === 'ALL' ? (() => {
      let verifyStatus = false;
      for (const va in verify) {
        if (!verify[va] || this.validatorAmountValue().result) {
          verifyStatus = true;
        }
      }
      return verifyStatus;
    })() : verify[key];
  }
  /**
   * 开票金额验证
   */
  validatorAmountValue = () => {
    if (this.props.location.state.submitDataList.length <= 0) return { total: 0, result: false };
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WKPJE));
    return {
      total: amount,
      result: Number(this.state.invoiceAmount) > Number(amount)
    }
  }
  /**
   * 发票号onchange
   */
  handleChangeInvoiceNo = () => (event) => {
    this.setState({
      invoiceNo: event.target.value
    })
  };
  /**
   * 开票金额onchange
   */
  handleChangeInvoiceAmount = () => (event) => {
    this.setState({
      invoiceAmount: event.target.value
    })
  };
  /**
   * 开票时间onchange
   */
  handleChangeInvoiceTime = () => (n, date) => {
    this.setState({
      invoiceTime: date
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
   * 批量订单开票提交
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
      const postObject = {
        FP: [{
          DDID: [],                            // 在未开票列表页面做开票时，传要开票的订单id数组
          FPHM: this.state.invoiceNo,          // 发票号码
          KPJE: this.state.invoiceAmount,      // 开票金额
          FPRQ: this.state.invoiceTime         // 发票时间
        }]
      };
      this.props.location.state.submitDataList.map((value) => {
        postObject.FP[0].DDID.push(value.GUID);
      })
      this.props.postBillingBatchSubmitData(postObject);
    }
  };
  // 提示信息框开关
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar
    });
    if (!this.state.openMessageBar) {
      this.context.router.push('/billing');
    }
  };

  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        onTouchTap={this.handleSubmit}
        label={this.state.submitBtnTitle}
        disabled={this.state.submitBtnDisabled}
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WKPJE));
    amount = amount.toFixed(2);
    return (
      <StandardDataGrid
        title='开票管理'
        actions={actions}
        label={'开票'}
        message={`您正在对<${this.props.location.state.submitDataList[0].CJJXSMC || '机构无名称'}>开票登记`}
        iconPosition={'-30px -150px'}
      >
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
          <CardUI
            expanded topStyle={{ backgroundColor: '#384357' }}
            title={'已选中的订单'} iconStyleLeft={{ marginTop: '23px', marginRight: '23px', marginLeft: '0px' }}
            avatar='/FinancialIcon/SelectedIcon.png' label={`未开票总金额:${amount}`}
            CardTextStyle={{ height: '24.4rem', padding: 0, overflow: 'hidden' }}
            CardStyle={{ width: '53.9rem', height: 'auto' }}
          >
            <DataGrid dataGridStyle={{ height: 'auto', width: '100%' }} options={this.state.selectedOrderOptions} dataSource={this.props.location.state.submitDataList || []} />
          </CardUI>
          <CardUI
            expanded topStyle={{ backgroundColor: '#384357' }}
            title={'登记发票'} iconStyleLeft={{ marginTop: '23px', marginRight: '23px', marginLeft: '0px' }}
            avatar='/FinancialIcon/RegisterInvoiceIcon.png'
            label={''}
            CardTextStyle={{ height: '24.4rem', padding: 0, overflow: 'hidden' }}
            CardStyle={{ width: '53.9rem', height: 'auto' }}
          >
            <DataGrid dataGridStyle={{ height: 'auto', width: '100%' }} options={this.state.registerInvoiceOptions} dataSource={[this.props.location.state.submitDataList[0]] || []} />
          </CardUI>
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
