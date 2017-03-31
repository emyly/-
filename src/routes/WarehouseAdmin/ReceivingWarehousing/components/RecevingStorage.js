/**
 * Created by qyf on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  // TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import DepotSelectDialog from 'components/DepotSelectDialog';
import RaisedButton from 'material-ui/RaisedButton';
import PickProductionDialog from 'components/PickProductionDialog'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import DepotSelectDialogByText from 'components/DepotSelectDialogByText';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import StandardDataGrid from 'components/StandardDataGrid';
import StandardForm from 'components/StandardForm';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import WarehousingForm from 'components/WarehousingForm'
import CardUI from 'components/StandardUI/StandardCard';
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import './ReceivingWarehousing.scss';
import _ from 'lodash';
import GoBackButton from 'components/GoBackButton';

export default class RecevingStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickObj: {},
      barText: '',
      textValue: '',
      RecevingOpen: false,
      showCheckboxes: false,
      buttonTitle: '122122',
      warehouseInOpen: false,
      Index: 0,
      dialogOpen: false,
      title: '',
      text: this.setState.text,
      barCodeTextFieldOpen: false,
      Rcevingsubmit: false,
      WarehouseInputChecking: '',
      openError: false,
      atSlectPerson: [],
      atMessage: '',
      WarehouseInGoodsSelect: '',
      WaregoodsOpenError: false


    }
  }

  static propTypes = {
    logisticsDetail: React.PropTypes.Object,
    updateReceivingGoods: React.PropTypes.func,
    clearData: React.PropTypes.func,
    clearGoods: React.PropTypes.func,
    location: React.PropTypes.Object,
  };
  static defaultProps = {
    tableData: []
  };

  barOnChange = (event) => {
  }
  handleChange = (event, index, value) => {
    this.setState({ value });
  };
  handleButtonClick1 = (retValue) => {
    const index = _.findIndex(this.state.tableData, this.state.clickObj);
    if (index >= 0) {
      this.state.tableData[index].pos = retValue.name;
    }
    this.setState({
      RecevingOpen: !this.state.RecevingOpen,
      tableData: this.state.tableData
    });
    this.setState({ barText: `${retValue.name}条码输入区` });
    // this.props.callback(retValue);
  };
  handleButtonClickTaggle = obj => () => {
    this.setState({
      clickObj: obj,
      RecevingOpen: !this.state.RecevingOpen
    });
  }
  /* 点击消失*/
  textShow = () => {
    this.setState({ clickProps: { display: 'block' } })
  }
// @谁
  selectPerson =(user) => {
    this.setState({
      atSlectPerson: user
    })
  }
  /* 留言*/
  aTMessage = (message) => {
    this.setState({
      atMessage: message
    })
  }
  getKWData = () => {
    if (this.props.logisticsDetail.currentKWID && this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID]) {
      return this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID];
    }
    return [];
  }

  /* 扫描后确认入库*/
  warehoseSubmit=() => {
    console.log('this.props.logisticsDetail.subData', this.props.logisticsDetail.subData, this.state.atSlectPerson, this.state.atMessage)
    const arr = Object.keys(this.props.logisticsDetail.subData);
    if (arr.length <= 0) {
      this.setState({
        openError: true,
        WarehouseInputChecking: '请先根据物流单号选择商品进行入库扫描'
      })
    }
    this.props.updateReceivingGoods(this.props.logisticsDetail.subData, this.state.atSlectPerson, this.state.atMessage);
  };
  handleChangeInputChecking = () => () => {
    this.setState({
      openError: false,
      WarehouseInputChecking: ''
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text
    });
    /* 提交后跳转列表页面*/
    if (nextProps.receivingGoods.goodsReceive) {
      this.props.clearData();
      this.props.clearGoods()
      this.context.router.push('/receivingWarehousing');
    }
   /* else if(Object.prototype.toString.call(nextProps.logisticsDetail.error) !== '[object Undefined]'){
      this.setState({
        WarehouseInGoodsSelect: '当前没有可提交的商品',
        WaregoodsOpenError: true
      });

    }*/
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleRequestClose = () => {
    this.setState({
      openError: false,
      WarehouseInputChecking: '',
      WaregoodsOpenError: false,
      WarehouseInGoodsSelect: ''

    });
  };
  /* 返回按钮*/
  RecevingCancel = () => {
    this.context.router.push({ pathname: `/receivingWarehousing/RecevingWareDetail/${this.props.location.state.guid}`, state: { e: { DDLX: this.props.location.state.ddlx } } });
  }
  /* 入库表单*/
  handleButtonClick2 = (returnValue) => {
    this.setState({
      dialogOpen: true
    });
  };
  handleCallback = (retValue) => {
    this.setState({ textValue: retValue.name });
    this.callback(retValue);
  };

  /* 侧边栏出现内容宽度改变*/
  render() {
    const actions = [
      // <FlatButton label="返回" onTouchTap={this.RecevingCancel}/>,
      <GoBackButton key='storage_1' />,
      <RaisedButton key='storage_2' label='确定入库' primary onTouchTap={this.warehoseSubmit} buttonStyle={{ background: '#FDA95B', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: '2px' }} />
    ];
    return (
      <div className='Receving-storage'>
        <div className='Receving-wapper'>
          <StandardForm iconPosition={'-90px -60px'} title='收货入库提交保存' message={`您当前正在处理订单号为<${this.props.location.state.guid}>的订单`}>
            <StandardFormCardList activeStep={1}>
              <StandardFormCard title='收货入库操作' stepName='收货入库' completed showStep showContent={false} expanded={false} />
              <StandardFormCard title='提交保存' message='请根据物流单号选择商品扫描入库' stepName='提交保存' actions={actions} showContent showStep expanded>
                <ErrorSnackBar
                  message={this.state.WarehouseInputChecking} open={this.state.openError}
                  onRequestClose={this.handleRequestClose}
                />
                <div className='WrapContentFlex'>
                  <WarehousingForm ddlx={this.props.location.state.ddlx} ckmc={this.props.location.state.ckmc} ckid={this.props.location.state.ckid} selectPerson={this.selectPerson} aTMessage={this.aTMessage} guid={this.props.location.state.guid} handleChangeInputChecking={this.handleChangeInputChecking()} show={this.state.inputChecking} showFalse={this.state.WarehouseInputChecking} />
                </div>
              </StandardFormCard>
            </StandardFormCardList>
          </StandardForm>
        </div>
      </div>
    )
  }
}

