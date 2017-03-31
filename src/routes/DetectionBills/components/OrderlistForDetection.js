/**
 * Created by liuyali on 2017/1/16.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'components/ChineseDatePicker'
import moment from 'moment'
import TextField from 'material-ui/TextField';
/* 公共组件*/
import StandardDataGrid from 'components/StandardDataGrid';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import PageGrid from 'components/PageGrid';
import Dialog from 'components/StandardUI/StandardDialog'
import './DetectionBills.scss';

export default class OrderlistForDetection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      SHJXSID: null,
      GUID: [],
      openError: false,
      message: '',
      DHRQJS: null,
      DHRQQS: null,
      KSSJ: null,
      JSSJ: null,
    };
  }
  static propTypes = {
    globalStore: PropTypes.object.isRequired,
    orderlistForDetection: PropTypes.func.isRequired,
    orderlistForDetectionData: PropTypes.object.isRequired,
    getOrderGoodsDetailAndBills: PropTypes.func.isRequired,
    getRelatedOrgNoPage: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleChange = (event, index, payload) => {
    this.setState({
      SHJXSID: payload
    });
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    })
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      DHRQQS: date,
      KSSJ: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      DHRQJS: date,
      JSSJ: date
    });
  };
  handleClickDetecBtn = (SHJXSID,ddid) => () => {
    this.props.getOrderGoodsDetailAndBills(SHJXSID,ddid, 1);
  }
  componentWillMount() {
    this.props.getRelatedOrgNoPage(this.props.globalStore.organizationId, { ZZJGB: {
      JGLX: 'J'// 机构类型:J->经销商,Y->医院,获取经销商还是医院,通过这个参数来决定,入参不传的话默认是所有(即不区分医院还是经销商)
    } })
    this.props.orderlistForDetection(1, { DDB: [{
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '1'
    }, {
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '2'
    }] });
  }
  componentWillReceiveProps(nextProps) {
    /* 查询了发票，并且确定有发票*/
    if (nextProps.DetectionBillsData.status && nextProps.DetectionBillsData.hasFPStatus) {
      this.context.router.push({ pathname: 'orderlistForDetection/detectionBills', state: { ddid: nextProps.DetectionBillsData.ddid,SHJXSID: nextProps.DetectionBillsData.SHJXSID} });
    } else if (nextProps.DetectionBillsData.status && !nextProps.DetectionBillsData.hasFPStatus) {
      /* 查询了发票，并且确定无发票*/
      this.setState({ dialogOpen: true })
    }
    /* 查看订单是否有关联发票报错处理*/
    if (!nextProps.DetectionBillsData.status && nextProps.DetectionBillsData.error) {
      this.setState({ message: nextProps.DetectionBillsData.error.response.Message, openError: true })
    }
    /* 查看所有医院订单报错处理*/
    if (!nextProps.orderlistForDetectionData.status && nextProps.orderlistForDetectionData.error) { this.setState({ message: nextProps.orderlistForDetectionData.error.response.Message, openError: true }) }
  }

  getTableData =() => {
    const tabledata = this.props.orderlistForDetectionData.data || [];
    tabledata.map((DD, index) => {
      DD.operator = <RaisedButton onTouchTap={this.handleClickDetecBtn(DD.SHJXSID,DD.GUID)} labelColor='white' backgroundColor='#00A0FF' label='验票' />
    })
    return {
      columnOptions: [
        {
          label: '订单号',
          attr: 'GUID',
          style: { textAlign: 'center' }
        }, {
          label: '供应商',
          attr: 'SHJXSMC',
          style: { textAlign: 'center' }
        },
        {
          label: '下单时间',
          attr: 'CJSJ',
          formater: (value) => {
            if (!value || value === 0) {
              return '-';
            }
            return moment(value).format('YYYY/MM/DD')
          },
          style: { textAlign: 'center' }
        },
        {
          label: '送货时间',
          attr: 'DHRQ',
          formater: (value) => {
            if (!value || value === 0) {
              return '-';
            }
            return moment(value).format('MM/DD  HH:mm')
          },
          style: { textAlign: 'center' }
        }, {
          label: '手术时间',
          attr: 'SSRQ',
          formater: (value) => {
            if (!value || value === 0) {
              return '-';
            }
            return moment(value).format('MM/DD  HH:mm')
          },
          style: { textAlign: 'center' }
        },
        {
          label: '手术类型',
          attr: 'SSLXMC',
          style: { textAlign: 'center' }
        }, {
          label: '操作',
          attr: 'operator',
          style: { textAlign: 'center' },
          tableHeaderColumnStyle: { textAlign: 'center' }
        }
      ],
      dataSource: tabledata,
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },
      showIndex: true,
      pagination: {
        currentPage: this.props.orderlistForDetectionData.currentPage || 1,
        totalCount: this.props.orderlistForDetectionData.total || 0,
        prePageCount: 10,
        pageLength: 4,
        pageFunc: (page) => {
          this.props.orderlistForDetection(page, { DDB: [{
            CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '1'
          }, {
            CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '2'
          }] })
        }
      }
    }
  }
  handleDDID = () => (event, newValue) => {
    this.setState({ GUID: ['like', `%${newValue}%`] })
  }
  handleFilter = () => {
    const params = [{
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '1'
    }, {
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '2'
    }];
    params.map((param, index) => {
      if (this.state.DHRQQS) {
        param.DHRQQS = this.state.DHRQQS.getTime();
      }
      if (this.state.DHRQJS) {
        param.DHRQJS = this.state.DHRQJS.getTime();
      }
      if (this.state.SHJXSID) {
        param.SHJXSID = this.state.SHJXSID;
      }
      if (this.state.GUID.length > 0) {
        param.GUID = this.state.GUID;
      }
    })
    this.props.orderlistForDetection(1, { DDB: params });
  }
  handleReset = () => {
    this.setState({
      SHJXSID: null,
      GUID: [],
      DHRQJS: null,
      DHRQQS: null,
      KSSJ: null,
      JSSJ: null,
    });
    /* 清空输入框值 */
    const inputArr = document.querySelectorAll('input');
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].value = '';
    }
    this.props.orderlistForDetection(1, { DDB: [{
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '1'
    }, {
      CJJXSID: Number(this.props.globalStore.organizationId), DDLX: ['2'], FHZT: '2'
    }] });
  }
  closeDialog = () => {
    this.setState({ dialogOpen: false });
    this.props.resetOrderGoodsDetailAndBills();
  }
  render() {
    const dialogActions = [
      <FlatButton
        label='关闭'
        onTouchTap={this.closeDialog}
      />
    ];
    return (<StandardDataGrid iconPosition='-30px -180px' title='验票' message='...'>
      <div className='filterField'>
        <div className='filterWrapper'>
          <img className='inputIcon' src='topNavSearchNormal.png' alt='' />
          <TextField
            onChange={this.handleDDID()}
            hintText='搜索订单号'
          />
        </div>

        <div className='filterWrapper'>
          <SelectField
            labelStyle={{ lineHeight: '40px' }}
            value={this.state.SHJXSID} hintText={'选择经销商'} maxHeight={200}
            onChange={this.handleChange} style={{ marginTop: 8, marginRight: 15, height: 40, overflow: 'hidden', width: '16rem' }}
          >{
            this.props.orderlistForDetectionData.orgData.map((JG, index) => <MenuItem value={JG.GLJXSID} primaryText={JG.ZZJGB.JGMC} />)
          }
          </SelectField>
        </div>
        <div className='filterWrapper'>
          <div style={{ display: 'flex' }} className='datePicker'>
            <span style={{ lineHeight: '46px', verticalAlign: 'middle' }}> 到货时间</span>
            <DatePicker
              value={this.state.KSSJ}
              onChange={this.handleChangeMinDate}
              maxDate={this.state.DHRQJS}
              textFieldStyle={{ width: '7rem' }} style={{ display: 'inline-block', margin: '0 .5rem', width: '7rem' }}
            />
            <span style={{ lineHeight: '46px', verticalAlign: 'middle' }}> 至</span>
            <DatePicker
              value={this.state.JSSJ}
              onChange={this.handleChangeMaxDate}
              minDate={this.state.DHRQQS}
              textFieldStyle={{ width: '7rem' }} style={{ display: 'inline-block', margin: '0 .5rem', width: '7rem' }}
            />
          </div>
        </div>
        <div className='filterWrapper'>
          <FlatButton onTouchTap={this.handleReset} style={{ marginRight: '1rem', marginTop: 5 }} labelStyle={{ color: '#E64C4C', }} label='重置' />
          <RaisedButton onTouchTap={this.handleFilter} labelColor='white' backgroundColor='#00BE9C' label='查找' />
        </div>
      </div>
      <PageGrid options={this.getTableData()} />
      <Dialog
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.closeDialog}
        title='提示'
        actions={dialogActions}
      >
        <div style={{ paddingTop: '3rem' }}>
          当前订单暂无发票信息供查验
        </div>
      </Dialog>
      <ErrorSnackBar
        message={this.state.message} open={this.state.openError}
        onRequestClose={this.handleRequestClose}
      />
    </StandardDataGrid>)
  }
}
