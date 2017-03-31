/**
 * Created by wangming on 2016/10/29.
 */

import React, { Component, PropTypes } from 'react';

'use strict';

import './OutBoundDetail.scss';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import SelectProductionRecordTable from 'components/SelectProductionRecordTable';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeaderColumn
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { basicInfo, ProductStockInfo } from './OutBoundDetailData';

export default class OutBoundDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      basicInfo: {},
      DetailArray: [],
      dataInArrayByMatch: []
    }
  }

  static propTypes = {
    orderId: React.PropTypes.number.isRequired,
    warehouseId: React.PropTypes.string.isRequired,
		/**
		 * 是否传入数据
		 */
    dataObject: React.PropTypes.object,
    dataInArrayByMatch: React.PropTypes.array,

  };


	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    // console.log('componentWillUnmount');
		// this.setState({open : this.props.open});
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    if (String(this.props.warehouseId) === '本次拣货记录') {
      this.setState({ basicInfo: this.props.dataObject.basicInfo });
      this.setState({ DetailArray: this.props.dataObject.detailArray });
      this.setState({ dataInArrayByMatch: this.props.dataInArrayByMatch });
    } else {
      this.props.getWarehouseBasicInfo(Number(this.props.warehouseId));
      this.props.getWarehouseDetail(this.props.orderId, Number(this.props.warehouseId));
    }

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
  };

  componentWillReceiveProps = (nextProps) => {
    if (String(this.props.warehouseId) !== '本次拣货记录') {
      this.setState({ basicInfo: nextProps.outBoundDetail.outBoundBasic });
      this.setState({ DetailArray: nextProps.outBoundDetail.outBoundDetail });
    }
  };

  showCurrentBasicData = () => (
    <OutBoundBasicInfo orderId={this.props.orderId} dataObject={this.state.basicInfo} />
		);

  showHistoryBasicData = () => (
    <OutBoundBasicInfo warehouseId={this.props.warehouseId} orderId={this.props.orderId} dataObject={this.state.basicInfo} />
		);

  showBasicInfo = () => {
    if (String(this.props.warehouseId) === '本次拣货记录') {
      return this.showCurrentBasicData()
    } else {
      return this.showHistoryBasicData()
    }
  };

  adapterData = (data, outDataArray) => {
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
      const storageObject = {};
      dataObject[valueArray].map((data) => {
        if (Object.prototype.toString.call(storageObject[String(data.SPBH)]) !== ['object Array']) {
          storageObject[String(data.SPBH)] = [];
        }
        storageObject[String(data.SPBH)].push(data);
      });
      dataObject[valueArray] = storageObject;
    }



    for (const i in dataObject) {
      const dataObjectByStorage = {};
      const dataObjectByMartiral = {};
      const dataArrayByMartiral = [];
      dataObjectByStorage.ProductListByMaterialID = dataArrayByMartiral;
      for (const j in dataObject[i]) {
        const dataNodeByMartiral = {};
        dataNodeByMartiral.MaterialID = dataObject[i][j][0].SPBH;
        dataNodeByMartiral.GoodsId = dataObject[i][j][0].SPID;
        dataNodeByMartiral.LastNumber = dataObject[i][j][0].SXSL;
        dataNodeByMartiral.AlreadySelect = 0;
        dataNodeByMartiral.ProductListByBatchID = dataObject[i][j];
        dataObjectByStorage.StockPositionID = dataObject[i][j][0].KWID;
        dataObjectByStorage.StockPositonName = dataObject[i][j][0].KWLJ;
        dataArrayByMartiral.push(dataNodeByMartiral);
      }
      outDataArray.push(dataObjectByStorage);
    }
  };

  adapterDataBySelected = (byOne, byTwo) => {
		// let tpObject = {};
    byOne.map((inNode) => {
      inNode.ProductListByMaterialID.map((PL) => {
        PL.ProductListByBatchID.map((PD) => {
          byTwo.map((iM) => {
            if (Number(iM.SPBH) === Number(PL.MaterialID)) {
							// tpObject.SPBH =iM.SPBH;
							// tpObject.SPMC =iM.SPMC;
							// tpObject.SPMS =iM.SPMS;
							// tpObject.DGSL =iM.DGSL;
							// tpObject.YJHSL =Number(iM.YJHSL) + Number(PL.AlreadySelect);
							// tpObject.WPHSL =Number(iM.WPHSL) - Number(PL.AlreadySelect);
							// tpObject.KWID = inNode.StockPositionID;
							// tpObject.SPPH = PD.SPPH;
							// tpObject.SL = Number(PL.AlreadySelect);
							// tpObject.WQJXSID = PD.JXSID;
							// tpObject.SPLX = PD.SPLX;
							// tpObject.SPID = PD.SPID;
							// tpObject.SPPHID = PD.SPPHID;
							// outData.push(tpObject);
              PD.SPMS = iM.SPMS;
              PD.SPMC = iM.SPMC;
            }
          });
        });
      })
    });
  };

  showTableInfo = () => {
    if (String(this.props.warehouseId) === '本次拣货记录') {
			// let outData = [];
      this.adapterDataBySelected(this.state.DetailArray, this.state.dataInArrayByMatch);
      return <OutBoundTableInfo orderId={this.props.orderId} dataObject={this.state.DetailArray} ifShowCurrent />
    } else {
      const tableArray = [];
      this.adapterData(this.state.DetailArray, tableArray);
      return <OutBoundTableInfo orderId={this.props.orderId} dataObject={tableArray} ifShowCurrent={false} />
    }
  };
  render() {
    return (
      <div>
        {
					this.showBasicInfo()
				}
        {
					this.showTableInfo()
				}
      </div>

    )
  }

}

class OutBoundBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      data: {}
    }
  }

  static propTypes = {

    orderId: React.PropTypes.number.isRequired,

		/**
		 * 是否传入数据
		 */
    dataObject: React.PropTypes.object,

    warehouseId: React.PropTypes.string

  };

	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    // console.log('componentWillUnmount');
		// this.setState({open : this.props.open});
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    if (this.props.dataObject) {
      this.setState({ data: this.props.dataObject })
    } else {
      this.setState({ data: basicInfo })
    }
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ data: nextProps.dataObject });
  };

  changeDataFormat = (date, flag) => {
    const tempDate = new Date(date);
    const yy = `${tempDate.getFullYear()}-`;
    const mm = `${tempDate.getMonth() + 1}-`;
    const dd = `${tempDate.getDate()} `;
    const hh = `${tempDate.getHours()}:`;
    const ii = `${tempDate.getMinutes()}:`;
    const ss = tempDate.getSeconds();
    if (flag) {
      return (yy + mm + dd + hh + ii + ss);
    } else {
      return (yy + mm + dd);
    }
  }

  showCurrentData = () => <div className='outBoundDetailStyle'>
    <Card id='cardBorderStyle' initiallyExpanded>
      <CardHeader
        title='基本信息'
        actAsExpander
        showExpandableButton
        titleStyle={{ color: '#00A0FF', fontSize: '20px', fontFamily: 'SourceHanSansCN-Regular' }}
      />
      <CardText expandable className='outBound'>
        <Table displaySelectAll={false} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ backgroundColor: '#EAECEE', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow>
              <TableHeaderColumn>出库仓库</TableHeaderColumn>
              <TableHeaderColumn>出库日期</TableHeaderColumn>
              <TableHeaderColumn>操作人</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover={false}>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.state.data.CKCK}</TableRowColumn>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.changeDataFormat(this.state.data.CJSJ)}</TableRowColumn>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.state.data.YHXM}</TableRowColumn>
          </TableBody>
        </Table>
      </CardText>
    </Card>
  </div>;

  showHistoryData = () => <div className='outBoundDetailStyle'>
    <Card id='cardBorderStyle' initiallyExpanded>
      <CardHeader
        title='基本信息'
        actAsExpander
        showExpandableButton
        titleStyle={{ color: '#00A0FF', fontSize: '20px', fontFamily: 'SourceHanSansCN-Regular' }}
      />
      <CardText expandable className='outBound'>
        <Table displaySelectAll={false} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ backgroundColor: '#EAECEE', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow>
              <TableHeaderColumn>出库单号</TableHeaderColumn>
              <TableHeaderColumn>出库日期</TableHeaderColumn>
              <TableHeaderColumn>操作人</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover={false}>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.props.warehouseId}</TableRowColumn>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.changeDataFormat(this.state.data.CJSJ)}</TableRowColumn>
            <TableRowColumn style={{ textAlign : 'center' }}>{this.state.data.YHXM}</TableRowColumn>
          </TableBody>
        </Table>
      </CardText>
    </Card>

  </div>;

  showFormData = () => {
    if (!this.props.warehouseId) {
			/**
			 * 表示本次拣货记录
			 */
      return this.showCurrentData();
    } else {
      return this.showHistoryData();
    }
  };

  render() {
    return (
			this.showFormData()
    )
  }

}

const hisHeaderInfo = [
  {
    title: '物料号',
    dataIndex: 'WLH'
  },
  {
    title: '批号',
    dataIndex: 'HWPH'
  },
  {
    title: '品名',
    dataIndex: 'SCRQ'
  },
  {
    title: '商品描述',
    dataIndex: 'SPSL'
  },
  {
    title: '出库数量',
    dataIndex: 'SPSL'
  }
];


class OutBoundTableInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      data: [],
    };
    this.dataObject = [];
  }

  static propTypes = {

    orderId: React.PropTypes.number.isRequired,
		/**
		 * 是否传入数据
		 */
    dataObject: React.PropTypes.array

  };

	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    // console.log('componentWillUnmount');

		// this.setState({open : this.props.open});
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    let dataObject = Object.assign([], this.props.dataObject);
    if (dataObject) {
        dataObject.map((KWLJS,index)=>{
          KWLJS.ProductListByMaterialID.map((WLBHS,WLBHSlIndex)=>{
            _.remove(WLBHS.ProductListByBatchID, n => {
                return !n.AlreadySelect
            })
            
          })
        });
        dataObject.map((KWLJS,index)=>{
            _.remove( KWLJS.ProductListByMaterialID,n => {
                return n.ProductListByBatchID.length<1
              })
        })
        _.remove( dataObject,function(n) {
          return n.ProductListByMaterialID.length<1
        })
        this.setState({ data: dataObject })
     }else {
        this.setState({ data: ProductStockInfo })
    }
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ data: nextProps.dataObject });
  };
  showTableData = () => {
    let HeaderInfo = [];
    if (this.props.ifShowCurrent) {
      HeaderInfo = [
        {
          title: '物料号',
          dataIndex: 'WLH'
        },
        {
          title: '批号',
          dataIndex: 'HWPH'
        },
        {
          title: '品名',
          dataIndex: 'SCRQ'
        },
        {
          title: '商品描述',
          dataIndex: 'SPSL'
        },
        {
          title: '拣货数量',
          dataIndex: 'SPSL'
        }
      ];
    } else {
      HeaderInfo = [
        {
          title: '物料号',
          dataIndex: 'WLH'
        },
        {
          title: '批号',
          dataIndex: 'HWPH'
        },
        {
          title: '品名',
          dataIndex: 'SCRQ'
        },
        {
          title: '商品描述',
          dataIndex: 'SPSL'
        },
        {
          title: '出库数量',
          dataIndex: 'SPSL'
        }
      ];
    }

    if (Object.prototype.toString.call(this.state.data) === '[object Array]') {
      return (<div>
        {
						this.state.data.map(
							(stock, index) => {
  stock.displayTable=true;    
  return <DetailTable
    key={index}
    stockData={stock}
    tableConfig={{ selectable: false }}
    tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
    tableBodyConfig={{ displayRowCheckbox: false }}
    handleOpenDialog={this.handleOpen}
    headerTitles={HeaderInfo}
    ifShowCurrent={this.props.ifShowCurrent}
    displayTable={this.handleDisplayTable}
  />
							},
							this)
					}
      </div>)
    } else {
      return <div />
    }
  };

  render() {
    return (
			this.showTableData()
    )
  }
}

class DetailTable extends React.Component {
  constructor(props) {
    super(props)
  }

  constructOptionalColumn = () => {
    if (this.props.operationColumn) {
      this.buttonHeaderColumn =
        <TableHeaderColumn>{ this.props.operationColumn.name }</TableHeaderColumn>

      this.buttonRowColumn =
				(<TableRowColumn style={{ textAlign : 'center' }}>
  <RaisedButton label='其他可选库位' onTouchTap={this.props.handleOpenDialog} />
				</TableRowColumn>)
    }
  }

  constructHeader = () => (
    <TableHeader {...this.props.tableHeaderConfig}>
      {/* <TableRow>
       <TableHeaderColumn>{ this.props.stockData.StockPositonName }</TableHeaderColumn>
       </TableRow>*/}
      <TableRow className='outBoundDetailHeadderStyle'>
        { this.props.headerTitles.map((column, index) =>
          <TableHeaderColumn key={index}>{column.title}</TableHeaderColumn>
				)}
      </TableRow>
    </TableHeader>
	)

  constructRow = (item, index, productObject, listLength) => {
		/* Has to stay here since it check index of the row */
    let itemIDColumn,
      itemNumColumn,
      itemAlreadyNum;
    if (index === 0) {
      itemIDColumn = (
        <TableRowColumn style={{ textAlign : 'center' }} rowSpan={listLength} >{ productObject.MaterialID }</TableRowColumn>
			)
    }


		// if(this.props.ifShowCurrent){
		// 	itemNumColumn = (
		// 		<TableRowColumn style={{ textAlign : 'center' }} rowSpan={listLength} >{ String(productObject.AlreadySelect) }/{String(productObject.LastNumber)}</TableRowColumn>
		// 	)
		// }
    if (!this.props.ifShowCurrent) {
      if (Object.prototype.toString.call(item.SL) === '[object Undefined]') {
        item.SL = 0;
      }
      if (index === 0) {
        itemAlreadyNum = <TableRowColumn style={{ textAlign : 'center' }} rowSpan={listLength}>{ item.SL }</TableRowColumn>
      }
    } else {
      if (Object.prototype.toString.call(item.AlreadySelect) === '[object Undefined]') {
        item.AlreadySelect = 0;
      }
      itemAlreadyNum = <TableRowColumn style={{ textAlign : 'center' }}>{ item.AlreadySelect }</TableRowColumn>
      
    }

    return (
      <TableRow key={index} >
        { itemIDColumn }
        <TableRowColumn style={{ textAlign : 'center' }}>{ item.SPPH }</TableRowColumn>
        <TableRowColumn style={{ textAlign : 'center' }}>{ item.SPMC }</TableRowColumn>
        <TableRowColumn style={{ textAlign : 'center' }}>{ item.SPMS }</TableRowColumn>
        { itemAlreadyNum }
      </TableRow>
    )
  };

  constructBody = () => (
    <TableBody {...this.props.tableBodyConfig}>
      {
				/* first map material by ID */
				this.props.stockData.ProductListByMaterialID.map(
					/* Second map material list by BatchID */
					(product, index) => product.ProductListByBatchID.map(
						/* construct each row */
						(item, index, array) => this.constructRow(item, index, { MaterialID: product.MaterialID, LastNumber: product.LastNumber, AlreadySelect: product.AlreadySelect }, array.length)
					)
				)
			}
    </TableBody>
	);

  render() {
    this.constructOptionalColumn();

    return (
      <div className='outBoundDetailStyle'>
        <Card id='cardBorderStyle' initiallyExpanded >
          <CardHeader
            title={this.props.stockData.StockPositonName}
            actAsExpander
            showExpandableButton
            titleStyle={{ color: '#00A0FF', fontSize: '20px', fontFamily: 'SourceHanSansCN-Regular' }}
          />
          <CardText expandable className='outBound'>
            <Table {...this.props.tableConfig} >
              { this.constructHeader() }
              { this.constructBody() }
            </Table>
          </CardText>
        </Card>
      </div>
    )
  }
}

DetailTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object.isRequired,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
  operationColumn: React.PropTypes.object,
  displayTable: React.PropTypes.object,
  handleOpenDialog: React.PropTypes.func,
  ifShowCurrent: React.PropTypes.bool,
};
