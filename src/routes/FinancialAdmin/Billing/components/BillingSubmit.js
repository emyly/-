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
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'components/ChineseDatePicker';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import moment from 'components/Moment';

export default class BillingSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOrderOptions: {
        columnOptions: [
          {
            label: '出入库单号',
            attr: 'CRKDID',
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
              fontWeight: 'bold',
              paddingLeft: '5px'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            render: (row) => {
              if (row.isSaveClick) {
                return <div>{row.invoiceNo === 0 ? '-' : row.invoiceNo}</div>
              } else {
                const value = row.invoiceNo === 0 ? {} : { value: row.invoiceNo };
                return (<TextField
                  style={{ width: '60%' }} id={`invoiceNoTextField${row.index}`}
                  errorStyle={{ display: 'flex' }}
                  errorText={this.state.verify && !this.validator(row.index, 'invoiceNo') && <div className='warning'>请输入发票号</div>}
                  type='number' hintText='请输入发票号'
                  {...value}
                  onChange={this.handleChangeInvoiceNo(row)}
                  onFocus={this.handleFocus()}
                />)
              }
            }
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
            render: (row) => {
              if (row.isSaveClick) {
                return <div>{row.invoiceAmount === 0 ? '-' : row.invoiceAmount}</div>
              } else {
                const value = row.invoiceAmount === 0 ? {} : { value: row.invoiceAmount };
                return (<TextField
                  style={{ width: '85%' }}
                  errorStyle={{ display: 'flex' }}
                  errorText={this.state.verify && (!this.validator(row.index, 'invoiceAmount') || this.validatorAmountValue(row).result) && <div className='warning'>{this.validatorAmountValue(row).result ? `金额应小于${this.validatorAmountValue(row).total}` : '请输入开票金额'}</div>}
                  type='number' hintText='请输入开票金额'
                  {...value}
                  onChange={this.handleChangeInvoiceAmount(row)}
                  onFocus={this.handleFocus()}
                />)
              }
            }
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
            render: (row) => {
              if (row.isSaveClick) {
                return <div>{row.invoiceTime === 0 ? '-' : moment(row.invoiceTime).format('YYYY-MM-DD')}</div>
              } else {
                const value = row.invoiceTime === 0 ? {} : { value: row.invoiceTime };
                return (<DatePicker
                  style={{ width: '85%' }} hintText='请输入开票日期'
                  errorText={this.state.verify && !this.validator(row.index, 'invoiceTime') && '请输入开票日期'}
                  onChange={this.handleChangeInvoiceTime(row)}
                  {...value}
                  onFocus={this.handleFocus()}
                />)
              }
            }

          },
          {
            label: '操作',
            render: row => (
              <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                <FlatButton
                  label={row.isSaveClick ? '编辑' : '保存'}
                  primary
                  backgroundColor='#01bd9c'
                  style={{ marginTop: '5px', height: '30px', lineHeight: '30px', minWidth: '60px' }}
                  hoverColor={'#01ad9c'}
                  labelStyle={{ color: '#ffffff', fontSize: '14px', fontFamily: 'SourceHanSansCN-Medium' }}
                  onTouchTap={row.isSaveClick ? this.handleInvoiceEdit(row) : this.handleInvoiceSave(row)}
                />
                <FlatButton
                  label='删除'
                  secondary
                  backgroundColor='#ff4081'
                  style={{ marginLeft: '5px', height: '30px', lineHeight: '30px', marginTop: '5px', minWidth: '60px' }}
                  hoverColor={'#ff8bd4'}
                  labelStyle={{ color: '#ffffff', fontSize: '14px', fontFamily: 'SourceHanSansCN-Medium' }}
                  onTouchTap={this.handleInvoiceDeleteRow(row)}
                />
              </div>
            ),
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px'
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
        showIndex: true,
        indexStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '16px',
          color: '#5B83B4',
          background: '#eaecee',
          height: '3.1rem',
          fontWeight: 'bold',
          width: '25px',
        }
      },
      verify: false,
      invoiceNo: 0,               // 发票号
      invoiceAmount: 0,           // 开票金额
      invoiceTime: 0,             // 开票时间
      invoiceAmountErrorMessage: '请输入开票金额', // 开票金额错误信息
      openMessageBar: false,
      message: '',
      submitBtnDisabled: false,
      submitBtnTitle: '提交',
      submitArray: []
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.billingBatchSubmit.registerStatus) {
      this.setState({
        openMessageBar: true,
        message: '开票登记成功！',
      })
      this.props.initFinancialBillingSubmitPostState();
    }
  }
  componentWillMount = () => {
    this.state.submitArray.push({
      index: 0,
      CJJXSMC: this.props.location.state.orderInfo.CJJXSMC || '机构无名称',
      invoiceNo: 0,               // 发票号
      invoiceAmount: 0,           // 开票金额
      invoiceTime: 0,             // 开票时间
      invoiceAmountErrorMessage: '请输入开票金额', // 开票金额错误信息
      isSaveClick: false
    })
    this.setState({
      submitArray: this.state.submitArray
    })
  };
  /**
   * 表单验证
   */
  validator = (index = 0, key = 'ALL') => {
    const verify = {
      invoiceNo: !!this.state.submitArray[index].invoiceNo,
      invoiceAmount: !!this.state.submitArray[index].invoiceAmount,
      invoiceTime: !!this.state.submitArray[index].invoiceTime
    }
    return key === 'ALL' ? (() => {
      let verifyStatus = false;
      this.state.submitArray.map((value) => {
        if (!value.invoiceNo || !value.invoiceAmount || !value.invoiceTime || this.validatorAmountValue(value).result) {
          verifyStatus = true;
        }
      })
      return verifyStatus;
    })() : verify[key];
  }
  /**
   * 开票金额验证
   */
  validatorAmountValue = (row) => {
    if (this.props.location.state.submitDataList.length <= 0) return { total: 0, result: false };
    let amount = 0;
    this.props.location.state.submitDataList.map(value => (amount += value.WKPJE));
    return {
      total: amount,
      result: Number(this.state.submitArray[row.index].invoiceAmount) > Number(amount)
    }
  }
  /**
   * 发票号onchange
   */
  handleChangeInvoiceNo = row => (event) => {
    this.state.submitArray[row.index].invoiceNo = event.target.value;
    this.setState({
      submitArray: this.state.submitArray
    })
  };
  /**
   * 开票金额onchange
   */
  handleChangeInvoiceAmount = row => (event) => {
    this.state.submitArray[row.index].invoiceAmount = event.target.value;
    this.setState({
      submitArray: this.state.submitArray
    })
  };
  /**
   * 开票时间onchange
   */
  handleChangeInvoiceTime = row => (n, date) => {
    this.state.submitArray[row.index].invoiceTime = date;
    this.setState({
      submitArray: this.state.submitArray
    })
  };
  /**
   * 当行点击编辑
   */
  handleInvoiceEdit = row => () => {
    this.state.submitArray[row.index].isSaveClick = false;
    this.setState({
      submitArray: this.state.submitArray
    })
  }
  /**
   * 当行点击保存
   */
  handleInvoiceSave = row => () => {
    if (!this.validator(row.index, 'invoiceAmount') ||
        !this.validator(row.index, 'invoiceNo') ||
        !this.validator(row.index, 'invoiceTime') ||
        this.validatorAmountValue(row).result) {
      this.setState({ verify: true });
      return;
    }
    this.state.submitArray[row.index].isSaveClick = true;
    this.setState({
      submitArray: this.state.submitArray
    })
  }
  /**
   * 获取焦点事件
   */
  handleFocus = () => () => {
    this.setState({
      verify: false
    })
  }
  /**
   * 删除一行
   */
  handleInvoiceDeleteRow = row => () => {
    this.state.submitArray.map((value) => {
      if (value.index > row.index) {        // 如果大于移除的index,减一
        --value.index;
      }
    })
    this.state.submitArray.splice(row.index, 1);
    this.setState({
      submitArray: this.state.submitArray,
      submitBtnDisabled: this.state.submitArray.length === 0
    })
  }
  /**
   * 增加一行
   */
  handleSubmitAddRow = () => () => {
    this.state.submitArray.push({
      index: this.state.submitArray.length,
      CJJXSMC: this.props.location.state.orderInfo.CJJXSMC || '机构无名称',
      invoiceNo: 0,               // 发票号
      invoiceAmount: 0,           // 开票金额
      invoiceTime: 0,             // 开票时间
      invoiceAmountErrorMessage: '请输入开票金额', // 开票金额错误信息
      isSaveClick: false     // 是否点击保存
    })
    this.setState({
      submitArray: this.state.submitArray,
      submitBtnDisabled: false
    })
  }
  /**
   * 单个订单开票提交
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
      const crkidArray = [];
      this.props.location.state.submitDataList.map((value) => {
        crkidArray.push(value.CRKDID);
      });
      const postObject = {
        FP: []
      };
      this.state.submitArray.map((value) => {
        postObject.FP.push({
          CRKDID: crkidArray,             // 在订单详情页做开票时，传要开票的出入库单id数组
          FPHM: value.invoiceNo,          // 发票号码
          KPJE: value.invoiceAmount,      // 开票金额
          FPRQ: value.invoiceTime         // 发票时间
        });
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
        message={`您正在对<${this.props.location.state.orderInfo.CJJXSMC || '机构无名称'}>开票登记`}
        iconPosition={'-30px -150px'}
      >
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
          <CardUI
            expanded topStyle={{ backgroundColor: '#384357' }}
            title={'已选中的出入库单'} iconStyleLeft={{ marginTop: '23px', marginRight: '23px', marginLeft: '0px' }}
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
            label={'添加一行'}
            disabled={false}
            onElementRightTouchTap={this.handleSubmitAddRow()}
            CardTextStyle={{ height: '24.4rem', padding: 0, overflow: 'auto' }}
            CardStyle={{ width: '53.9rem', height: 'auto' }}
          >
            <DataGrid dataGridStyle={{ height: 'auto', width: '100%' }} options={this.state.registerInvoiceOptions} dataSource={this.state.submitArray} />
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
