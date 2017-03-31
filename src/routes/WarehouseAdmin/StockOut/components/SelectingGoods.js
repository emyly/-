/**
 * Created by wangming on 2016/10/31.
 */


import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import './StockOutDetailBeforeSelect.scss';
import SelectProduction from '../containers/SelectProductionContainer'
// import BarCodeTextField  from './BarCodeTextField'
import RaisedButton from 'material-ui/RaisedButton';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
// import StockOutDetailAfterSelect from './StockOutDetailAfterSelect'
import StockOutDetailAfterSelect from '../containers/StockOutDetailAfterSelectContainer'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import {
  Dialog
} from 'material-ui'
import SelectPrintTable from 'components/SelectPrintTable';
import GoBackButton from 'components/GoBackButton';
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';
export default class SelectingGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false,
      ifShowBar: false,
      barText: '',
      activeStep: 1,
      showSelectContent: true,
      showMatchContent: false,
      showSubmitContent: false,
      selectCompleted: false,
      matchCompleted: false,
      submitCompelete: false,
      currrentOrder: 0,
      selectData: [],
      selectStep: false,
      dataInArray: [],
      submitBackData: [],
      curOrderInfo: {},
      openError: false,
      errorMessage: '',
      nextSelect: false,
      stockData: [],
      printOpen: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
    // this.setState({open : this.props.open});
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    console.log('componentWillMount');
    /**
     * 订单类型：
     * 0：铺货订单，
     * 1：备货订单
     * 2：手术订单
     * 3: 借货订单
     * 4: 调货订单
     * 5: 铺货补货订单
     * 6: 铺货销售订单
     */
    console.debug('selectingGoods 12:', this.props.location.state.selectData);
    this.setState({ currrentOrder: this.props.location.state.orderId });
    this.setState({ currrentSelectData: this.props.location.state.selectData });
    this.setState({ curOrderInfo: this.props.location.state.orderInfo });
  };

  componentWillReceiveProps = (nextProps) => {
    console.debug('selectingGoods 13:', nextProps);
    if (Number(nextProps.selectingGoods.outStockData.Code) === 0) {
      this.context.router.push({
        pathname: '/stockOut'
      });
    } else {
      this.setState({ openError: true,
        errorMessage: nextProps.selectingGoods.errorData.response.Message });
    }
  };

  gotoSelectingDone = () => {
    console.log('gotoSelectingDone:');
    const step = this.state.activeStep;
    if (step === 1) {
      this.setState({ activeStep: 2 });
      this.setState({ selectCompleted: true });
      this.setState({ showSelectContent: false });
      this.setState({ showSubmitContent: true });
      console.debug('gotoSelectingDone 1:', step, this.state.selectStep);
    } else {
      console.debug('gotoSelectingDone 12:', this.props, this.state.submitBackData);
      this.setState({ submitCompelete: true });
      this.props.createOutStockData({
        CRKDB:
        {
          DDID: this.state.currrentOrder,
          CKRK: '0',
          DDLX: this.state.curOrderInfo.DDLX
        },
        CRKMXB: this.state.submitBackData
      });
    }
    // this.context.router.push({pathname: '/stockOut/stockOutDetailAfterSelect/'});
  };


  // showBarCode = () => {
  // 	if(this.state.ifShowBar){
  // 		return <BarCodeTextField hintText={this.state.barText} onChange={this.barOnChange}/>
  // 	}
  // };

  handleSelect = (value) => {
    console.debug('handleSelect:', value);
    this.setState({ barText: `${value.StockPositonName}条码输入区` });
    this.setState({ ifShowBar: true });
  };

  print = () => {
    console.debug('print');
    this.Printpart('selectArea');
  };

  Printpart = (id_str) =>// id-str 内容中的id
  {
    const el = document.getElementById(id_str);
    console.debug(el);
    const iframe = document.createElement('iframe');
    let doc = null;
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    doc.write(`<div>${el.innerHTML}</div>`);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    // if (navigator.userAgent.indexOf("MSIE") > 0)
    // {
    // 	document.body.removeChild(iframe);
    // }
    document.body.removeChild(iframe);
  };

  getSelectData = (array) => {
    this.setState({ selectData: array });
    console.debug('getSelectData:', array);
  };

  submitCallback = (dataArray) => {
    console.debug('submitCallback:', dataArray);
    this.setState({ submitBackData: dataArray });
  };


  errorCallBack = (errorMessage) => {
    this.setState({ activeStep: 0 });
    this.setState({ selectCompleted: false });
    this.setState({ showSelectContent: false });
    this.setState({ showSubmitContent: false });
    this.setState({ openError: true,
      errorMessage });
  };

  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };


  setStockData = (stockData) => {
    this.setState({ stockData });
  };

  nextCallBack = () => {
    this.setState({ nextSelect: true });
  };

  handlePrintClose = () => {
    this.setState({ printOpen: false });
  };

  handlePrintOpen = () => {
    console.debug('handlePrintOpen');
    this.setState({ printOpen: true });
  };

  handlePrint = () => {
    console.debug('print');
    this.Printpart('selectArea');
    // this.handlePrintClose();
  };

  // Printpart = (id_str) =>//id-str 内容中的id
  // {
  //   /*替换后的打印代码*/
  //   let body = window.document.body.innerHTML;
  //   let printContent = document.querySelector('#selectArea').innerHTML;
  //   window.document.body.innerHTML = printContent;
  //   window.print();
  //   window.document.body.innerHTML = body;
  //   location.reload()
  //   /*之前打印的代码*/
  //   /*var el = document.getElementById(id_str);
  //   console.debug(el);
  //   var div = document.createElement('IFRAME');
  //   var doc = null;
  //   // iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
  //   document.body.appendChild(div);
  //   doc = div.contentWindow.document;
  //   doc.write('<div>' + el.innerHTML + '</div>');
  //   doc.close();
  //   div.contentWindow.focus();
  //   div.contentWindow.print();
  //   if (navigator.userAgent.indexOf("MSIE") > 0)
  //   {
  //     document.body.removeChild(div);
  //   }*/


  //   // let body = window.document.body.innerHTML;
  //   // let printContent = document.getElementById(id_str).innerHTML;
  //   // window.document.body.innerHTML = printContent;
  //   // window.print();
  //   // window.document.body.innerHTML = body;
  //   // location.reload()
  // };

  showPrintDialog = () => {
    const actions = [
      <FlatButton
        label='关闭'
        primary
        onTouchTap={this.handlePrintClose}
      />,
      <FlatButton
        label='打印'
        primary
        onTouchTap={this.handlePrint}
      />
    ];

    return (
      <BusinessDialog
        modal={false}
        actions={actions}
        open={this.state.printOpen}
        autoScollBodyContent
      >
        <div className='dialogWareScoroll'>
          <SelectPrintTable stockData={this.state.stockData} />
        </div>
      </BusinessDialog>
    )
  };

  render() {
    // console.log("SelectingGoods:",this.props.location.state);
    // let orderId = this.props.location.state.GUID;
    // const actionsSelect = [
    // 	<RaisedButton key="save" label="完成" onTouchTap={this.gotoSelectingDone}/>,
    // 	<RaisedButton key="print" label="打印" onTouchTap={this.print}/>
    // ];

    const printButton = (<FlatButton
      label='打印' onTouchTap={this.handlePrintOpen} key='stockOutSelectingGoods_2'
      labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '18px', color: '#F5A959', letterSpacing: '0.64px' }}
      icon={<img style={{ marginLeft: '0' }} src='/WarehouseAdmin/DistributionOperation/print.png' />}
    />);

    // const printButton = <FlatButton key="print" label="打印" onTouchTap={this.print}
    // labelStyle={{fontFamily: 'SourceHanSansCN-Medium', fontSize: '18px', color: '#F5A959', letterSpacing: '0.64px'}}
    // icon={<img src='/WarehouseAdmin/DistributionOperation/print.png'></img>}/>;

    const RButtonLabelStyle = { fontFamily: 'PingFangSC-Medium', fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.5px', lineHeight: '14px' };

    let actionsSelect = [
      <GoBackButton key='stockOutSelectingGoods_1' />,
      printButton,
      <RaisedButton key='save' label='下一步' primary disabled labelStyle={RButtonLabelStyle} onTouchTap={this.gotoSelectingDone} />
    ];

    if (this.state.nextSelect) {
      actionsSelect = [
        <GoBackButton key='stockOutSelectingGoods_1' />,
        printButton,
        <RaisedButton key='save' label='下一步' disabled={false} labelStyle={RButtonLabelStyle} backgroundColor={'#00A0FF'} onTouchTap={this.gotoSelectingDone} />
      ];
    }
    // const actionsSelect = [
    // 	<FlatButton key="print" label="打印" onTouchTap={this.print}/>,
    // 	<RaisedButton key="save" label="下一步" onTouchTap={this.gotoSelectingDone}/>
    // ];

    const actionsMatch = [
      <GoBackButton key='stockOutSelectingGoods_1' />,
      <RaisedButton key='save' label='下一步' onTouchTap={this.gotoSelectingDone} />
    ];

    const actionsSubmit = [
      <GoBackButton key='stockOutSelectingGoods_1' />,
      <RaisedButton key='save' label='提交' onTouchTap={this.gotoSelectingDone} />
    ];

    console.debug('step 1:', this.state.selectStep);
    return (

      <div style={{ height: '100%' }}>
        <StandardForm iconPosition={'-30px -60px'} title='备货出库' message='...'>
          <StandardFormCardList activeStep={this.state.activeStep}>
            <StandardFormCard
              title='拣货详情' message='请选择库位拣货' stepName='查看拣货详情' actions={actionsMatch} completed
              showContent={false} expanded={false}
            >
              <div />
            </StandardFormCard>
            <StandardFormCard title='拣货提示单' message='请选择库位拣货' stepName='拣货' actions={actionsSelect} completed={this.state.selectCompleted} showContent={this.state.showSelectContent} expanded>
              <SelectProduction
                orderInfo={this.state.curOrderInfo} ifShowSelect ifShowBarText
                step={this.state.selectStep} orderId={this.state.currrentOrder} callback={this.getSelectData}
                errorCallBack={this.errorCallBack} nextCallBack={this.nextCallBack} printCallBack={this.setStockData}
              />
            </StandardFormCard>
            <StandardFormCard title='拣货提交' message='提交拣货记录或点击记录查看详情' stepName='拣货提交' completed={this.state.submitCompelete} actions={actionsSubmit} avatar='../fg-128.jpg' showContent={this.state.showSubmitContent} expanded>
              <StockOutDetailAfterSelect orderInfo={this.state.curOrderInfo} orderId={this.state.currrentOrder} submitCallback={this.submitCallback} dataInArray={this.state.selectData} dataInArrayByMatch={this.state.currrentSelectData} />
            </StandardFormCard>
          </StandardFormCardList>
        </StandardForm>
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />

        {this.showPrintDialog()}
      </div>
    )
  }

}
