/**
 * Component: ProductSelection
 * Description: ProductSelection holds a table list the recommanded
 * Product Selection List, and Provide a dialog to selecct more product
 * positions
 *
 * Structure:
 * {[ ProductSelectionTable ]}
 * { Dialog }
 *
 * Author: Yechen Huang huangyc@firstgrid.cn
 * modify by wangming for DistributionOperation
 */

import React from 'react'
import {
 	Dialog,
	RaisedButton,
	FlatButton
} from 'material-ui'
import SelectProductionCss from './SelectProduction.scss'
import SelectProductionTable from './SelectProductionTable'
import { ProductStockInfo, HeaderInfo, HeaderInfoCheckBox } from './SelectProductionData'
import BarCodeTextField from 'components/BarCodeTextField'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import CopyRowDialog from 'components/CopyRowDialog';

export default class SelectProduction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diaglogOpen: false,
      ifShowBar: false,
      barText: '条码输入区',
      tableData: [],
      StorageId: 0,
      ifShowBarText: false,
      otherData: [],
      otherFlag: false,
      goodsNum: 0,
      openError: false,
      CopyRowDialogTable: [],
      CopyRowDialogOpen: false,
      curCopyRow: {},
      curActiveIndex: 0,
      selectData: [],
      errorMessage: ''
    }
  }

  static defaultProps = {
    storageId: []
  };

  static propTypes = {
    handleSelect: React.PropTypes.func,
    ifShowSelect: React.PropTypes.bool,
    ifShowBarText: React.PropTypes.bool,
    orderId: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func,
    step: React.PropTypes.bool.isRequired,
    orderInfo: React.PropTypes.object,
    errorCallBack: React.PropTypes.func,
    storageId: React.PropTypes.array,
    nextCallBack: React.PropTypes.func,
    printCallBack: React.PropTypes.func,
  };

  componentWillMount = () => {
    console.debug('select 446:', this.props.orderId);
    this.props.getSelectAdvice(this.props.orderId, { KWID: this.props.storageId });
    this.setState({ ifShowBarText: false });
  };

  adapterData = (data, outDataArray) => {
		// console.debug("adapterData 1:", data);
    const outData = [];
    const dataObject = {};
    const tpId = 0;
    data.map((value) => {
      if (Object.prototype.toString.call(dataObject[String(value.KWID)]) !== '[object Array]') {
        dataObject[String(value.KWID)] = [];
      }
      dataObject[String(value.KWID)].push(value);
    });

    for (const valueArray in dataObject) {
			// console.debug("adapterData 2:", valueArray);
      const storageObject = {};
      dataObject[valueArray].map((data) => {
        if (Object.prototype.toString.call(storageObject[String(data.SPBH)]) !== '[object Array]') {
          storageObject[String(data.SPBH)] = [];
        }
        storageObject[String(data.SPBH)].push(data);
      });
      dataObject[valueArray] = storageObject;
			// console.debug("adapterData 3:", dataObject[valueArray]);
    }

		// console.debug("adapterData 4:", dataObject);


		// let tpOutDataArray = [];
    let index = 0;
    for (const i in dataObject) {
      const dataObjectByStorage = {};
      console.debug('adapterData 6:', i, dataObject[i]);
      const dataObjectByMartiral = {};
      const dataArrayByMartiral = [];
			// if(index===0){
			// 	dataObjectByStorage.ifActive = true;
			// }
      dataObjectByStorage.ProductListByMaterialID = dataArrayByMartiral;
      for (const j in dataObject[i]) {
        const dataNodeByMartiral = {};
        dataNodeByMartiral.MaterialID = dataObject[i][j][0].SPBH;
        dataNodeByMartiral.GoodsId = dataObject[i][j][0].SPID;
        dataNodeByMartiral.LastNumber = dataObject[i][j][0].SXSL;
        dataNodeByMartiral.UnselectNum = dataObject[i][j][0].SXSL;
        dataNodeByMartiral.AlreadySelect = 0;
        dataNodeByMartiral.ProductListByBatchID = dataObject[i][j];
        dataObjectByStorage.StockPositionID = dataObject[i][j][0].KWID;
        dataObjectByStorage.StockPositonName = dataObject[i][j][0].KWLJ;
        dataArrayByMartiral.push(dataNodeByMartiral);
				// console.debug("adapterData 7:",dataNodeByMartiral);
      }
      console.debug('adapterData 8:', dataObjectByStorage);
      outDataArray.push(dataObjectByStorage);
      console.debug('adapterData 9:', outDataArray);
      index++;
    }
    console.debug('adapterData 5:', outDataArray);
  };

  componentWillReceiveProps = (nextProps) => {
    console.debug('selectProduction componentWillReceiveProps:', nextProps);
		// if(nextProps.selectProduction.flagBack){
		// 	console.debug("selectProduction 2", nextProps, this.state.tableData);
		// 	this.props.getTableData(this.state.tableData);
		// }else{

    if (!this.state.diaglogOpen && !this.state.CopyRowDialogOpen) {
      console.debug('selectProduction 331:', nextProps);
      if (Object.prototype.toString.call(nextProps.selectProduction.errorData.response) !== '[object Undefined]') {
        this.props.errorCallBack(nextProps.selectProduction.errorData.response.Message);
      }
      const outData = [];
      this.setState({ selectData: nextProps.selectProduction.selectData });
      this.adapterData(nextProps.selectProduction.selectData, outData);
      console.debug('selectProduction 3:', outData, nextProps.selectProduction.selectData);
      this.setState({ tableData: outData });
      if (this.props.printCallBack) {
        this.props.printCallBack(outData);
      }

      console.log('handleSelect 1:', outData);
      const data = outData[0].StockPositonName;
      outData[0].ifActive = true;
      const tp = data.split('-');
      this.setState({ barText: tp[tp.length - 1] });
      this.setState({ StorageId: `${outData[0].StockPositionID}` });
      this.setState({ ifShowBar: true });
      this.setState({ ifShowBarText: true });
    }
		// }
    console.debug('componentWillReceiveProps selectProduction end:', nextProps.selectProduction.tableData);
    const outdataArray = [];

    this.adapterData(nextProps.selectProduction.storageData, outdataArray);
		// this.wrapOtherData(outdataArray, this.state.tableData);
		// let potherData = this.state.otherData;
		// potherData.concat(outdataArray);
		// console.debug("selectProduction 22:", potherData);
    this.setState({ otherData: outdataArray });
    if (Object.prototype.toString.call(nextProps.selectProduction.rowListData) === '[object Array]') {
      this.setState({ CopyRowDialogTable: nextProps.selectProduction.rowListData });
    } else {
      this.setState({ CopyRowDialogTable: [] });
    }
  };

	// getTableData = () => {
	// 	return this.state.tableData;
	// };

  handleOpen = item => () => {
    console.debug('select 2:', item);
    this.setState({ diaglogOpen: true });
    this.setState({ goodsNum: item.SXSL });
    this.props.getOtherStorage({ CKCK: this.props.orderInfo.CKCK, KWID: item.KWID, SPID: item.SPID });
  }
		// this.props.getOtherStorage({CKCK:this.props.orderInfo.CKCK, KWID});
	;

  handleClose = () => {
    this.setState({ diaglogOpen: false });
    this.setState({ otherData: [] });
  };

  insertNewIntoStorage = (toData, fromData) =>
		// fromData.map(node=>{
		// 	toData.concat(node);
		// })
		 toData.concat(fromData);


  insertOtherDataIntoStorage = () => {
    const tpOther = this.state.otherData;
    console.debug('select 33:', tpOther);
    const oneLevelData = [];
    const tpTableData = this.state.tableData;
    tpOther.map((SP) => {
      SP.ProductListByMaterialID.map((PD) => {
        PD.ProductListByBatchID.map((PB) => {
          if (PB.checked) {
            console.debug('select 31:', PB);
						// 对比原有表格插入元素
            let ret = false;
            ret = tpTableData.some((SSP) => {
              if (Number(PB.KWID) === Number(SSP.StockPositionID)) {
                return SSP.ProductListByMaterialID.some((PPD) => {
                  if (Number(PB.SPID) === Number(PPD.GoodsId)) {
                    return PPD.ProductListByBatchID.some((PPB) => {
                      if (Number(PB.SPPHID) === Number(PPB.SPPHID)) {
                        return true;
                      }
                    })
										// 插入商品批号
										// if(!PPDret){
										// 	console.debug("select 333:",this.state.goodsNum);
										// 	PB.SXSL = this.state.goodsNum;
										// 	PPD.push(Object.assign({}, PB));
										// }
										// return PPDret;
                  }
                })

								// if(!SSPret){
								// 	console.debug("select 333:",this.state.goodsNum);
								// 	PB.SXSL = this.state.goodsNum;
								// 	SSP.push(Object.assign({}, PD));
								// }
              }
            });

            console.log('select 334:', ret);
            if (!ret) {
              console.debug('select 333:', this.state.goodsNum);
              PB.SXSL = this.state.goodsNum;
							// PD.push(Object.assign({}, PPB));
              oneLevelData.push(Object.assign({}, PB));
            }
          }
        })
      })
    });

    console.debug('select 39:', oneLevelData);
    const outLevelTwo = [];
    let totalArray = [];
    totalArray = this.state.selectData.concat(oneLevelData);
    this.setState({ selectData: totalArray });
    this.adapterData(totalArray, outLevelTwo);
    console.debug('select 38:', outLevelTwo);

		// let outDataArray = this.insertNewIntoStorage(tpTableData, outLevelTwo);

		// console.debug("select 330:", tpTableData, outLevelTwo, outDataArray);
    this.setState({ tableData: outLevelTwo });
    if (this.props.printCallBack) {
      this.props.printCallBack(outLevelTwo);
    }
  };

	// 添加库位
  handleAddStorage = () => {
    this.setState({ diaglogOpen: false });
    console.debug('select 37:', this.state.otherData);
    this.insertOtherDataIntoStorage();
    this.setState({ otherData: [] });
  };

  cellClick = (outData) => {
    console.debug('cellClick:', outData);
  };

  stockDialog = () => {
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='添加库位'
        primary
        onTouchTap={this.handleAddStorage}
      />
    ];

    return (
      <Dialog
        title='其他库位'
        modal={false}
        actions={actions}
        open={this.state.diaglogOpen}
        onRequestClose={this.handleClose}
        autoScollBodyContent
      >
        <div className={SelectProductionCss.content} style={{ height: '600px' }}>
          {
						console.debug('select 440:', this.state.otherData)
					}
          {
						this.state.otherData.map(
							(stock, index) => (
  <SelectProductionTable
    key={index}
    stockData={stock}
									// tableConfig={ {onCellClick: this.cellClick} }
    rowClickCallBack={this.cellClick}
    tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
    tableBodyConfig={{ displayRowCheckbox: false }}
    headerTitles={HeaderInfoCheckBox}
    handleSelectProduction={this.handleSelect(stock, index)}
    ifSelectble
  />
							)
						)
					}
        </div>
      </Dialog>
    )
  };

  handleSelect = (value, index) => (() => {
    console.log('handleSelect 1:', value);
    const data = value.StockPositonName;
    const tp = data.split('-');
    this.setState({ barText: tp[tp.length - 1] });
    this.setState({ StorageId: `${value.StockPositionID}` });
    this.setState({ ifShowBar: true });
    this.setState({ ifShowBarText: true });
    const tableData = this.state.tableData;
    console.log('handleSelect 3:', tableData[this.state.curActiveIndex], this.state.curActiveIndex, index);
    tableData[this.state.curActiveIndex].ifActive = false;
    value.ifActive = true;
    this.setState({ curActiveIndex: index, tableData });
    console.debug('handleSelect 2:', value, tableData);
    document.getElementById('barCodeTextField').focus();
  });

  showStockName = (value) => {
    const data = value.split('-');
    return data[data.length - 1];
  };

  showBarCode = () => {
		// if(this.state.ifShowBarText){
		// 	return <BarCodeTextField hintText={this.state.barText} StorageId={Number(this.state.StorageId)} inOut={true} onChange={this.barOnChange}/>
		// }else{
		// 	return <div style={{height: '48px'}}></div>
		// }

    const unActiveStyle = { marginLeft: '10px',
      marginRight: '10px',
      width: '8rem',
      height: '2.5rem',
      lineHeight: '2.5rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#4A4A4A',
      letterSpacing: '0px',
      textAlign: 'center',
      cursor: 'pointer' };

    const activeStyle = { marginLeft: '10px',
      marginRight: '10px',
      width: '8rem',
      height: '2.5rem',
      lineHeight: '2.5rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#00A0FF',
      letterSpacing: '0px',
      textAlign: 'center',
      cursor: 'pointer',
      borderBottom: '2px solid #00A0FF' };

    return (<div
      style={{ background: '#EEEEEE',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.30)',
				 marginLeft: '0',
        marginRight: '0' }} className={'row'}
    >
      <div className={'col-xs-8'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
        <img src='/WarehouseAdmin/DistributionOperation/kuwei_left.png' />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
          {
			this.state.tableData.map((value, index) => {
  let divStyle = unActiveStyle;
  if (value.ifActive) {
    divStyle = activeStyle;
  } else {
    divStyle = unActiveStyle;
  }

  return (<div
    key={index} style={divStyle}
    onClick={this.handleSelect(value, index)}
  >
    {this.showStockName(value.StockPositonName)}
  </div>)
})
		  }
        </div>
        <img src='/WarehouseAdmin/DistributionOperation/kuwei_right.png' />
      </div>
      <div className={'col-xs-4'} style={{ paddingTop: '12px' }}>
        <BarCodeTextField hintText={this.state.barText} StorageId={Number(this.state.StorageId)} inOut onChange={this.barOnChange} />
      </div>
    </div>)
  };

  modifyGlobalStockLastNum = (tableArray, lastNum, SPID, num) => {
    console.debug('modifyGlobalStockLastNum:', SPID, num);
    const modifyUnselectNum = [];
    const tpLastNum = Number(lastNum);
    let curNum = Number(tpLastNum);
		// let flag = false;
    tableArray.map((data) => {
      data.ProductListByMaterialID.some((PD) => {
        if (Number(PD.GoodsId) === Number(SPID)) {
          modifyUnselectNum.push(PD);
          curNum -= Number(PD.AlreadySelect);
					// if(curNum < 0){
					// 	this.setState({
					// 		openError: true,
					// 		errorMessage: "商品数量已足够"
					// 	});
					// // 	// flag = true;
					// }
					// PD.UnselectNum = PD.UnselectNum-num;
          return true;
        }
      })
    })

    if (curNum >= 0) {
      modifyUnselectNum.map((data) => {
        data.UnselectNum = curNum;
      })
      return true;
    } else {
      this.setState({
        openError: true,
        errorMessage: '商品数量已足够'
      });
      return false;
    }
  };

  modifyNumberOfTable = (tableArray, value) => {
    const selectNum = Number(value.SL);
    if (!selectNum) {
      this.setState({
        openError: true,
        errorMessage: '返回拣货数量异常'
      });
      return;
    }

    let flag = false;
    tableArray.map((data) => {
      console.debug('modifyNumberOfTable 3:', data, this.state.StorageId);
      if (Number(data.StockPositionID) === Number(this.state.StorageId)) {
        data.ProductListByMaterialID.map((dt) => {
          if (Number(dt.GoodsId) === Number(value.SPID)) {
            return dt.ProductListByBatchID.map((pb) => {
              if (Number(pb.SPPHID) === Number(value.SPPHID)) {
                flag = true;
								// if(Number(dt.AlreadySelect) === Number(dt.LastNumber)){
                if (Number(dt.UnselectNum) - selectNum < 0) {
                  console.debug('modifyNumberOfTable 4:', dt, pb);
								// if(Number(dt.UnselectNum) <= 0){
									// 提示信息
									// alert("商品数量已足够");
                  this.setState({
                    openError: true,
                    errorMessage: '商品数量已足够'
                  });
                } else {
                  if (Object.prototype.toString.call(pb.AlreadySelect) === '[object Undefined]') {
                    pb.AlreadySelect = 0;
                  }
                  if (Number(pb.KCSL) - Number(pb.AlreadySelect) - selectNum < 0) {
                    this.setState({
                      openError: true,
                      errorMessage: '商品库存数量不足'
                    });
                    return;
                  }
                  pb.AlreadySelect += selectNum;
                  dt.AlreadySelect += selectNum;
									// 修改全局仓库数量
                  this.modifyGlobalStockLastNum(tableArray, dt.LastNumber, value.SPID, dt.AlreadySelect);
                  console.debug('modifyNumberOfTable 1:', dt);
                  this.props.nextCallBack();
                }
              }
            })
          }
        })
      }
    });

    if(!flag) {
      this.setState({
        openError: true,
        errorMessage: '未在本库位找到相关批号商品'
      });
    }
    console.debug('modifyNumberOfTable 2:', tableArray);
  };

  barOnChange = (value) => {
    console.debug('barOnChange:', value);
    const dataArray = this.state.tableData;
    this.modifyNumberOfTable(dataArray, value);
    this.setState({ tableData: dataArray });
    this.props.callback(dataArray);
  };

	// handleRequestClose = () => {
	// 	this.setState({
	// 		openError: false
	// 	});
	// };

  handleErrorClose = () => {
    this.setState({
      openError: false,
      errorMessage: ''
    });
  };

  handleCopyRow = item => () => {
    console.debug('handleCopyRow 2', item);
    this.props.getSelectTableRowList({ KWID: item.KWID, SPID: item.SPID, SPPH: item.SPPH });
    this.setState({ curCopyRow: item });
    this.setState({ CopyRowDialogOpen: true });
  };

  CopyRowDialogClose = () => {
    this.setState({ CopyRowDialogOpen: false });
  };

  InsertSingleRowToTable = (value) => {
    const tpOther = this.state.tableData;
    const oneLevelData = [];
    tpOther.some((SP) => {
      if (Number(SP.StockPositionID) === Number(this.state.curCopyRow.KWID)) {
        SP.ProductListByMaterialID.some((PD) => {
          if (Number(PD.MaterialID) === Number(this.state.curCopyRow.SPBH)) {
						// PD.ProductListByBatchID.some(PB=>{
						// 	if(PB.checked){
						// 		console.debug("select 333:",this.state.goodsNum);
						// 		PB.SXSL = this.state.goodsNum;
						// 		oneLevelData.push(PB);
						// 	}
						// });
            if (!PD.ProductListByBatchID.some((PB) => {
              if (PB.SPPHID === value.SPPHID) {
                PB.KCSL = value.KCSL;
                PB.SCRQ = value.SCRQ;
                return true;
              }
              return false;
            })) {
              const newValue = [];
              value.KWID = SP.StockPositionID;
              newValue.push(value);
              const oldValue = PD.ProductListByBatchID.concat(newValue);
              console.debug('InsertSingleRowToTable:', oldValue);
              PD.ProductListByBatchID = oldValue;
            }
            return true;
          }
          return false;
        });
        return true;
      }
      return false;
    });

    this.setState({ tableData: tpOther });
    console.debug('InsertSingleRowToTable 1:', tpOther);
  };

  isEmptyObject = (ob) => {
    console.debug('isEmptyObject:', ob, Object.prototype.toString.call(ob));
    if (Object.prototype.toString.call(ob) !== '[object Object]') {
      return true;
    } else {
      for (const prop in ob) {
        return false
        break;
      }
      return true;
    }
  };

  CopyRowDialogAdd = (value) => {
    console.debug('CopyRowDialogAdd:', value);
    this.setState({ CopyRowDialogOpen: false });
    if (!this.isEmptyObject(value)) {
      console.debug('CopyRowDialogAdd:', this.isEmptyObject(value));
      this.InsertSingleRowToTable(value);
    }
  };

	// initTableData = () => {
	// 	this.state.tableData.map(
	// 		(stock, index) => (
	// 			if(index === 0){
	// 				stock.ifActive = true;
	// 			}else{
	// 				stock.ifActive = false;
	// 			}
	// 		)
	// 	)
	// };
	// activeCallback = (index) =>{
	// 	return ()=> {
	// 		let data = this.state.tableData;
	// 		data[this.state.curActiveIndex].ifActive = false;
	// 		data[index].ifActive = true;
	// 		this.setState({curActiveIndex: index, tableData: data});
	// 	}
	// }

  render() {
    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        {
					this.showBarCode()
				}
        <div style={{ height: '100%', overflow: 'auto', width: '100%' }}>
          {
					(() => {
  if (this.props.ifShowSelect) {
    return this.state.tableData.map(
								(stock, index) => (
  <SelectProductionTable
    key={index}
    stockData={stock}
    tableConfig={{ selectable: false }}
    tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
    tableBodyConfig={{ displayRowCheckbox: false, stripedRows: false }}
    operationColumn={{ name: '操作' }}
    operationSelect={{ name: '点击拣货' }}
    handleOpenDialog={this.handleOpen}
    handleSelectProduction={this.handleSelect(stock, index)}
    headerTitles={HeaderInfo}
    handleCopyRow={this.handleCopyRow}
    ifActive={stock.ifActive}
  />
								),
								this)
  } else {
    return this.state.tableData.map(
								(stock, index) => (
  <SelectProductionTable
    key={index}
    stockData={stock}
    tableConfig={{ selectable: false }}
    tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
    tableBodyConfig={{ displayRowCheckbox: false }}
    operationColumn={{ name: '操作' }}
    handleOpenDialog={this.handleOpen}
    handleSelectProduction={this.handleSelect(stock, index)}
    headerTitles={HeaderInfo}
    ifActive={stock.ifActive}
  />
								),
								this)
  }
})()
				}
        </div>
        { this.stockDialog() }
        <CopyRowDialog
          open={this.state.CopyRowDialogOpen} tableData={this.state.CopyRowDialogTable}
          closeCallBack={this.CopyRowDialogClose} addCallBack={this.CopyRowDialogAdd}
        />
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleErrorClose}
        />
      </div>
    )
  }
}

