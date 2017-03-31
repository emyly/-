/**
 * Created by wangming on 2016/10/31.
 */


import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './StockOutDetailBeforeSelect.scss';
import SelectProduction from '../containers/SelectProductionContainer'
// import BarCodeTextField  from './BarCodeTextField'
import RaisedButton from 'material-ui/RaisedButton';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import DepotSelectDialog from 'components/DepotSelectDialog'
// import StockOutDetailAfterSelect from './StockOutDetailAfterSelect'
import StockOutDetailAfterSelect from '../containers/StockOutDetailAfterSelectContainer'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
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
      selectStyle: 0,
      diaglogOpen: true,
      depotDialogFlag: false,
      storageId: [],
      depotSelectDialog: false,
      addStorage: [],
      errorMsg: '',
      openErr: false,
      nextSelect: false,
      // stockData: [],
      printOpen: false,
      ifShowSelect: false, // false 系统推荐， true 自选库位
      storageData: [],
    }
  }

  static propTypes = {
    location: React.PropTypes.object,
    createOutStockData: React.PropTypes.func,
    params: React.PropTypes.object,
    selectingGoodsNew: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
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
    this.setState({ currrentOrder: this.props.location.state.orderId });
    this.setState({ currrentSelectData: this.props.location.state.selectData });
    this.setState({ curOrderInfo: this.props.location.state.orderInfo });
    this.setState({ storageData: this.props.location.state.storageData });
    // 系统推荐
    if (this.props.location.state.type === '0') {
      this.setState({ selectStyle: 1, ifShowSelect: false });
    } else if (this.props.location.state.type === '1') { // 自选
      this.setState({ depotSelectDialog: true, ifShowSelect: true });
    } else if (this.props.location.state.type === '2') { // 暂存
      this.setState({ selectStyle: 3, ifShowSelect: true });
    }
  };

  depotCallBack = (returnValue) => {
    const dataArray = this.state.addStorage;
    let flag = false;
    dataArray.map((value) => {
      if (Number(value.id === returnValue.id)) {
        flag = true;
      }
    });

    if (flag) {
      this.setState({ errorMsg: '该库位已选过，请选择其他库位', openErr: true });
    } else {
      dataArray.push(returnValue);
      this.setState({ addStorage: dataArray });
    }
  };

  handleButtonClick = () => {
    this.setState({ depotDialogFlag: false });
  };

  addStorage = () => {
    this.setState({ depotDialogFlag: true });
  };

  depotSelectDialogSubmit = () => {
    this.setState({ depotSelectDialog: false });
    this.setState({ selectStyle: 2 });
    this.setState({ storageId: this.state.addStorage.map(value => value.id) });
  };

  showSelectTable = () => {
    const tableHeader = [
      {
        name: '仓库'
      },
      {
        name: '库位'
      }
    ];
    const style = {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '16px',
      color: '#53504F',
      textAlign: 'center'
    }
    return (

      <Table allRowsSelected={false} selectable={false} multiSelectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow style={{ background: '#364356', color: '#6D93C1', fontFamily: 'SourceHanSansCN-Bold', fontSize: 18 }}>{
            tableHeader.map((value, index) => (
              <TableHeaderColumn
                key={index}
                style={{ textAlign: 'center', color: '#6D93C1', fontFamily: 'SourceHanSansCN-Bold', fontSize: 18 }}
              >
                {value.name}
              </TableHeaderColumn>))
          }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.state.addStorage.map((value, index) => <TableRow key={index}>
              <TableRowColumn style={style}>{value.curDepot.name}</TableRowColumn>
              <TableRowColumn style={style}>{value.name}</TableRowColumn>
            </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  };

  handleDepotSelectClose = () => {
    this.setState({ openErr: false, errorMsg: '' });
  };

  showDepotSelectDialog = () => {
    const actions = [
      <FlatButton
        label='添加库位'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 16, color: '#00BE9C' }}
        onTouchTap={this.addStorage}
      />,
      <FlatButton
        label='确定'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 16, color: '#00A0FF' }}
        onTouchTap={this.depotSelectDialogSubmit}
      />,
    ];
    return (<div>
      <BusinessDialog
        title='请选择库位'
        modal
        actions={actions}
        open={this.state.depotSelectDialog}
        titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 20, color: 'rgba(0,0,0,0.87)' }}
        autoScollBodyContent
        bodyStyle={{ height: '200px' }}
      >
        <div style={{ height: '250px', overflow: 'auto' }}>
          {
            this.showSelectTable()
          }
          <ErrorSnackBar
            message={this.state.errorMsg} open={this.state.openErr}
            onRequestClose={this.handleDepotSelectClose}
          />
        </div>
      </BusinessDialog>

      <DepotSelectDialog
        ifShowOutStockTips ifChildDepotId ifStorage ifShowOrder orderId={this.state.currrentOrder}
        callback={this.depotCallBack} open={this.state.depotDialogFlag} handleButtonClick={this.handleButtonClick}
      />
    </div>)
  };


  componentWillReceiveProps = (nextProps) => {
    if (Number(nextProps.selectingGoodsNew.outStockData.Code) === 0) {
      this.context.router.push({
        pathname: '/distributionOperation'
      });
    } else {
      this.setState({ openError: true,
        errorMessage: nextProps.selectingGoodsNew.errorData.response.Message });
    }
  };

  gotoSelectingDone = () => {
    const step = this.state.activeStep;
    if (step === 1) {
      this.setState({ activeStep: 2 });
      this.setState({ selectCompleted: true });
      this.setState({ showSelectContent: false });
      this.setState({ showSubmitContent: true });
    } else {
      this.setState({ submitCompelete: true });
      this.props.createOutStockData({
        CRKDB:
        {
          DDID: this.state.currrentOrder,
          CKRK: '0',
          DDLX: '2'
        },
        CRKMXB: this.state.submitBackData,
        YZ: false,
      });
    }
  };

  handleSelect = (value) => {
    this.setState({ barText: `${value.StockPositonName}条码输入区` });
    this.setState({ ifShowBar: true });
  };

  print = () => {
    this.Printpart('selectArea');
  };

  Printpart = (id_str) => { // id-str 内容中的id
    const el = document.getElementById(id_str);
    const iframe = document.createElement('IFRAME');
    let doc = null;
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    doc.write(`<div>${el.innerHTML}</div>`);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      document.body.removeChild(iframe);
    }
  };

  getSelectData = (array) => {
    this.setState({ selectData: array });
  };

  submitCallback = (dataArray) => {
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

  nextCallBack = (value) => {
    this.setState({ nextSelect: value });
  };

  handleRequestClose = () => {
    this.setState({
      openError: false,
      errorMessage: ''
    });
  };

  // setStockData = (stockData) => {
  //   this.setState({ stockData });
  // };

  handlePrintClose = () => {
    this.setState({ printOpen: false });
  };

  handlePrintOpen = () => {
    this.setState({ printOpen: true });
  };

  handlePrint = () => {
    this.Printpart('selectArea');
  };

  /* 获取一条商品的内容 */
  getSPPHcontent = (sp, index) => {
    const styleTd = {
      padding: '6px 0',
      border: '1px solid black',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '8px',
      color: '#4D4D4D',
      letterSpacing: '0.11px',
    };

    const len = sp.ProductListByBatchID.length;
    const rowArr = [];
    sp.ProductListByBatchID.map((ph, idx) => {
      if (idx === 0) {
        rowArr.push(<tr>
          <td rowSpan={len} style={styleTd} >{sp.MaterialID}</td>
          <td rowSpan={len} style={styleTd} >{ph.SPMC}</td>
          <td rowSpan={len} style={styleTd} >{ph.SPMS}</td>
          <td style={styleTd} >{ph.SPPH}</td>
          <td style={styleTd} >{ph.KCSL}</td>
          <td rowSpan={len} style={styleTd} >{sp.LastNumber}</td>
          <td rowSpan={len} style={styleTd} />
        </tr>);
      } else {
        rowArr.push(<tr>
          <td style={styleTd} >{ph.SPPH}</td>
          <td style={styleTd} >{ph.KCSL}</td>
        </tr>);
      }
    });
    return rowArr;
  }

  getPrintContentHidden = () => {
    let total = 0;
    const styleTable = {
      marginBottom: '1rem',
      width: '100%',
      borderCollapse: 'collapse',
    };
    const styleFirstTh = {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '10px',
      color: '#000000',
      letterSpacing: '0.35px',
      textAlign: 'left',
      border: '1px solid black',
      padding: '6px 0',
    };
    const styleTh = {
      textAlign: 'center',
      padding: '6px 0',
      border: '1px solid black',
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '8px',
      color: '#4D4D4D',
      letterSpacing: '0.11px',
    };
    const styleSelectAsign = {
      flex: '1',
      textAlign: 'center',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '8px',
      color: '#4D4D4D',
      letterSpacing: '0.11px',
    };

    this.state.selectData.map((tableC, index) => {
      tableC.ProductListByMaterialID.map((sp, index) => {
        total += sp.LastNumber;
      })
    });
    return (<div id='printContent' style={{ display: 'none' }}>
      <div className='printContent'>
        <p
          style={{ fontFamily: 'SourceHanSansCN-Normal',
            fontSize: '12px',
            color: '#555251',
            letterSpacing: '0.42px', }}
        >
          订单：{this.props.params.id}
        </p>
        <h2
          style={{ fontFamily: 'PingFangSC-Medium',
            fontSize: '14px',
            color: '#000000',
            letterSpacing: '0.5px',
            textAlign: 'center',
            marginTop: '1rem',
            marginBottom: '2rem', }}
        >
          拣货单
        </h2>
        {
          this.state.selectData.map((tableC, index) => (
            <table style={styleTable}>
              <thead>
                <tr>
                  <th style={styleFirstTh} colSpan='7' key={index + 1}>{tableC.StockPositonName}</th>
                </tr>
                <tr>
                  <th style={styleTh}>物料号</th>
                  <th style={styleTh}>商品名称</th>
                  <th style={styleTh}>商品描述</th>
                  <th style={styleTh}>批号</th>
                  <th style={styleTh}>库存</th>
                  <th style={styleTh}>订购</th>
                  <th style={styleTh}>备注</th>
                </tr>
              </thead>
              <tbody>
                {
                  tableC.ProductListByMaterialID.map((sp, index) => (
                    this.getSPPHcontent(sp, index)
                  ))
                }
              </tbody>
            </table>

          ))
        }
        <p style={{ marginBottom: '3rem' }}>合计：{total}件</p>
        <div className='selectSign' style={{ display: 'flex' }}>
          <div style={styleSelectAsign}>配货：</div>
          <div style={styleSelectAsign}>配货检查：</div>
        </div>
      </div>
    </div>)
  }

  printWindowsOpen = () => {
    const printWindow = window.open('', '医捷云', '', false);
    printWindow.document.title = '医捷云综合医疗供应链管理平台';
    const printContent = document.getElementById('printContent').innerHTML;
    printWindow.document.body.innerHTML = printContent;
    printWindow.print();
    printWindow.close();
    window.focus();
    this.setState({ printOpen: false });
  }

  printSelectTable = () => {
    const body = window.document.body.innerHTML;
    const printContent = document.getElementById('printContent').innerHTML;
    window.document.body.innerHTML = printContent;
    window.print();
    window.document.body.innerHTML = body;
    location.reload();
  }

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
        onTouchTap={this.printWindowsOpen}
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
          <SelectPrintTable stockData={this.state.selectData} />
        </div>
      </BusinessDialog>
    )
  };

  gotoBackStep = () => {
    this.setState({ activeStep: 1 });
    this.setState({ selectCompleted: false });
    this.setState({ showSelectContent: true });
    this.setState({ showSubmitContent: false });
  };

  showStandardStep = () => {
    const printButton = (<FlatButton
      label='打印' onTouchTap={this.handlePrintOpen} key='selectingGoods_2'
      labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '18px', color: '#F5A959' }}
      icon={<img style={{ marginLeft: '0' }} src='/WarehouseAdmin/DistributionOperation/print.png' alt={'打印'} />}
    />);


    const RButtonLabelStyle = { fontFamily: 'PingFangSC-Medium', fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.5px', lineHeight: '14px' };

    if (this.state.selectStyle > 0) {
      let actionsSelect = [
        <GoBackButton key='selectingGoods_1' />,
        printButton,
        <RaisedButton key='save' label='下一步' primary disabled labelStyle={RButtonLabelStyle} onTouchTap={this.gotoSelectingDone} />
      ];
      if (this.state.nextSelect) {
        actionsSelect = [
          <GoBackButton key='selectingGoods_1' />,
          printButton,
          <RaisedButton
            key='save'
            label='下一步'
            disabled={false}
            labelStyle={RButtonLabelStyle}
            backgroundColor={'#00A0FF'}
            onTouchTap={this.gotoSelectingDone}
          />
        ];
      }

      const actionsMatch = [
        <GoBackButton key='selectingGoods_1' />,
        <RaisedButton key='save' label='下一步' onTouchTap={this.gotoSelectingDone} />
      ];

      const actionsSubmit = [
        <FlatButton key='goBack' label='返回' onTouchTap={this.gotoBackStep} />,
        <RaisedButton key='save' label='提交' onTouchTap={this.gotoSelectingDone} />
      ];

      return (
        <div style={{ height: '100%' }}>
          <StandardForm iconPosition='-30px -90px' title='手术配货' message='...'>
            <StandardFormCardList activeStep={this.state.activeStep}>
              <StandardFormCard
                title='拣货详情' message='请选择库位拣货' stepName='查看拣货详情' actions={actionsMatch} completed
                showContent={false} expanded={false}
              >
                <div />
              </StandardFormCard>
              <StandardFormCard
                title='拣货提示单' message='请选择库位拣货' stepName='拣货' actions={actionsSelect} completed={this.state.selectCompleted}
                showContent={this.state.showSelectContent} expanded style={{ overflow: 'hidden' }}
              >
                <SelectProduction
                  orderInfo={this.state.curOrderInfo}
                  ifShowSelect={this.state.ifShowSelect}
                  ifShowBarText
                  step={this.state.selectStep}
                  orderId={this.state.currrentOrder}
                  storageId={this.state.storageId}
                  callback={this.getSelectData}
                  errorCallBack={this.errorCallBack}
                  nextCallBack={this.nextCallBack}
                  ifTemporary={this.state.selectStyle === 3}
                  materialList={this.state.currrentSelectData}
                  storageData={this.state.storageData}
                />
              </StandardFormCard>
              <StandardFormCard
                title='拣货提交'
                message='提交拣货记录或点击记录查看详情'
                stepName='拣货提交'
                completed={this.state.submitCompelete}
                actions={actionsSubmit}
                avatar='../fg-128.jpg'
                showContent={this.state.showSubmitContent}
                expanded
              >
                <StockOutDetailAfterSelect
                  orderInfo={this.state.curOrderInfo}
                  orderId={this.state.currrentOrder}
                  submitCallback={this.submitCallback}
                  dataInArray={this.state.selectData}
                  dataInArrayByMatch={this.state.currrentSelectData}
                />
              </StandardFormCard>
            </StandardFormCardList>
          </StandardForm>
          <ErrorSnackBar
            message={this.state.errorMessage} open={this.state.openError}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      )
    } else {
      return <div />
    }
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        { this.showDepotSelectDialog() }
        { this.showStandardStep() }
        { this.showPrintDialog() }
        {this.getPrintContentHidden()}
      </div>
    )
  }

}
