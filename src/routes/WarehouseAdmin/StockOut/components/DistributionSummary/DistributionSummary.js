/**
 * Created by wangming on 2016/10/28.
 */
import React, { Component, PropTypes } from 'react';
import './DistributionSummary.scss';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import DataGrid from 'components/DataGrid';
import { TableData } from './DistributionSummaryData';

/**
 * 表头
 */
const tableHeader = [
  {
    name: '物料号'
  },
  {
    name: '品名'
  },
  {
    name: '商品描述'
  },
  {
    name: '订购总数量'
  },
  {
    name: '已拣货数量'
  },
  {
    name: '未配货数量'
  },
  {
    name: '已复核数量'
  },
  {
    name: '待复核数量'
  }
];


export default class DistributionSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: '0',
      tableHeader: [],
      tableData: [],
      title: '配货商品汇总'
    }
  }

  static propTypes = {
		/**
		 * 当前组织机构id
		 */
    orgId: React.PropTypes.number.isRequired,
		/**
		 * 订单id
		 */
    orderId: React.PropTypes.number.isRequired,
		/**
		 * 回调,返回未配货数量
		 */
    callback: React.PropTypes.func,
		/**
		 * 回调,提交
		 */
    submitCallback: React.PropTypes.func,
		/**
		 * 传入数据
		 */
    dataArray: React.PropTypes.array,
    dataInArrayByMatch: React.PropTypes.array,
    orderType: React.PropTypes.string
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
    console.debug('distributionSummary 1 componentWillMount 1');
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
    console.debug('distributionSummary 4:', this.props.dataArray);
    console.debug('distributionSummary 5:', this.props.dataInArrayByMatch);
    this.setState({ tableHeader });
    if (this.props.dataArray && this.props.dataInArrayByMatch) {
      console.debug('distributionSummary 2:', this.props.dataArray);
      const sendData = [];
      const outData = [];
      this.adraptDataArray(this.props.dataArray, this.props.dataInArrayByMatch, sendData, outData);
      this.setState({ tableData: outData });
      if (this.props.submitCallback) {
        this.props.submitCallback(sendData);
      }
    } else {
      console.debug('distributionSummary 3');
      this.props.getWarehouseInOutGoodsSummary(this.props.orderId, this.props.orderType);
			// let data = TableData;
			// this.setState({tableData : data});
			// if(this.props.callback){
			// 	let num = 0;
			// 	data.map((value, index)=>{
			// 		num += value.WPHSL;
			// 	});
			// 	this.props.callback(num);
			// }else{
			// 	(() => {})()
			// }
    }
  };

// {
// 	"CRKDB": {
// 		"DDID": 10001, //订单ID
// 		"CKRK": "0", //出库入库
// 		"DDLX": "0"//订单类型
// 		},
// 	"CRKMXB": [
// 	{
// 		"KWID": 20000, //库位ID
// 		"SPBH": "2131231",//商品编号，即物料号
// 		"SPPH": "30000", //商品批号
// 		"SL": 20, //数量
// 		"WQJXSID": 1000, //物权经销商ID（拣货推荐单返回的数据中包含了这一字段）
// 		"SPLX": "0",// 商品类型，"0" 商品， "1"工具
// 		"SPID": 1, //商品ID
// 		"SPPHID": 1 //商品批号ID
// 	}
// 		/*......*/
// 		]
// }

// <TableRowColumn>{value.SPBH}</TableRowColumn>
// <TableRowColumn>{value.SPMC}</TableRowColumn>
// <TableRowColumn>{value.SPMS}</TableRowColumn>
// <TableRowColumn>{value.DGSL}</TableRowColumn>
// <TableRowColumn>{value.YFHSL}</TableRowColumn>
// <TableRowColumn>{value.WPHSL}</TableRowColumn>


  adraptDataArray = (inData, inDataMatch, sendData, outData) => {
    inDataMatch.map((iM) => {
      const sendObject = Object.assign({}, iM);
      inData.map((inNode) => {
        inNode.ProductListByMaterialID.map((PL) => {
					// if(Number(iM.SPBH) === Number(PL.MaterialID)){
          if (Number(iM.SPID) === Number(PL.GoodsId)) {
            console.debug('distributionSummary :7', iM, PL, sendObject);
            console.debug('distributionSummary 10', Number(iM.YJHSL) + Number(PL.AlreadySelect));
						// sendObject.SPBH =iM.SPBH;
						// sendObject.SPMC =iM.SPMC;
						// sendObject.SPMS =iM.SPMS;
						// sendObject.DGSL =iM.DGSL;
            sendObject.YJHSL = Number(sendObject.YJHSL) + Number(PL.AlreadySelect);
            console.debug('distributionSummary :9', sendObject);
            sendObject.WPHSL = Number(sendObject.WPHSL) - Number(PL.AlreadySelect);
						// sendObject.YFHSL = Number(iM.YFHSL);
						// sendObject.DFHSL = Number(iM.DFHSL);
            PL.ProductListByBatchID.map((PD) => {
              console.debug('distributionSummary :8', PD);
              if (Number(PD.AlreadySelect) > 0) {
                const tpObject = {};
                tpObject.SPBH = iM.SPBH;
                tpObject.SPMC = iM.SPMC;
                tpObject.SPMS = iM.SPMS;
                tpObject.DGSL = iM.DGSL;
                tpObject.YJHSL = Number(iM.YJHSL) + Number(PL.AlreadySelect);
                tpObject.WPHSL = Number(iM.WPHSL) - Number(PL.AlreadySelect);
                tpObject.YFHSL = Number(iM.YFHSL);
                tpObject.DFHSL = Number(iM.DFHSL);
                tpObject.KWID = inNode.StockPositionID;
                tpObject.SPPH = PD.SPPH;
                tpObject.SL = Number(PD.AlreadySelect) || 0;
                tpObject.WQJXSID = PD.JXSID || PD.WQJXSID;
                tpObject.SPLX = PD.SPLX || 0;
                tpObject.SPID = PD.SPID;
                tpObject.SPPHID = PD.SPPHID;
                sendData.push(tpObject);
              }
            });
          }
        })
      })
      outData.push(sendObject);
    });
  }


	// adraptDataArray = (inData, inDataMatch, sendData, outData) => {
	// 	inData.map(inNode=>{
	// 		inNode.ProductListByMaterialID.map(PL=>{
	// 			let sendObject = {};
	// 			PL.ProductListByBatchID.map(PD=>{
	// 				inDataMatch.map(iM=>{
	// 					if(Number(iM.SPBH) === Number(PL.MaterialID)){
	// 						console.debug("adraptDataArray 1:", iM, PL);
	// 						let tpObject = {};
	// 						sendObject.SPBH =iM.SPBH;
	// 						sendObject.SPMC =iM.SPMC;
	// 						sendObject.SPMS =iM.SPMS;
	// 						sendObject.DGSL =iM.DGSL;
	// 						sendObject.YJHSL =Number(iM.YJHSL) + Number(PL.AlreadySelect);
	// 						sendObject.WPHSL =Number(iM.WPHSL) - Number(PL.AlreadySelect);
	// 						sendObject.YFHSL = Number(iM.YFHSL);
	// 						sendObject.DFHSL = Number(iM.DFHSL);
	// 						tpObject.SPBH =iM.SPBH;
	// 						tpObject.SPMC =iM.SPMC;
	// 						tpObject.SPMS =iM.SPMS;
	// 						tpObject.DGSL =iM.DGSL;
	// 						tpObject.YJHSL =Number(iM.YJHSL) + Number(PL.AlreadySelect);
	// 						tpObject.WPHSL =Number(iM.WPHSL) - Number(PL.AlreadySelect);
	// 						tpObject.YFHSL = Number(iM.YFHSL);
	// 						tpObject.DFHSL = Number(iM.DFHSL);
	// 						tpObject.KWID = inNode.StockPositionID;
	// 						tpObject.SPPH = PD.SPPH;
	// 						tpObject.SL = Number(PD.AlreadySelect) || 0;
	// 						console.debug("adraptDataArray 2:", tpObject.SL);
	// 						tpObject.WQJXSID = PD.JXSID || PD.WQJXSID;
	// 						tpObject.SPLX = PD.SPLX || 0;
	// 						tpObject.SPID = PD.SPID;
	// 						tpObject.SPPHID = PD.SPPHID;
	// 						sendData.push(tpObject);
	// 					}
	// 				});
	// 			});
	// 			outData.push(sendObject);
	// 		})
	// 	});

	// 	console.debug("adraptDataArray 2:", sendData);
	// };

  componentWillReceiveProps = (nextProps) => {
    console.debug('distribution componentWillReceiveProps:', nextProps);
    this.setState({ tableData: nextProps.distributionSummary.summaryData });
    this.props.callback(nextProps.distributionSummary.summaryData);
  };

  handleCellClick = (index) => {
    console.log('handleRowClick:', index);
    if (this.props.rowClickCallback) {
      const returnValue = this.state.tableData[index];
      this.props.rowClickCallback(returnValue)
    } else {
      (() => {})();
    }
  };

  showTable = () => (
			// <Table displaySelectAll={false} selectable={false} >
			// 	{
			// 		this.showTableHeader()
			// 	}
			// 	{
			// 		this.showTableBody()
			// 	}
			// </Table>
    <DataGrid options={this.options()} dataSource={this.state.tableData} dataGridStyle={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }} />
		);

  showTableHeader = () => (
    <TableHeader displaySelectAll={false} style={{ backgroundColor: '#364357', fontFamily: 'SourceHanSansCN-Bold' }} adjustForCheckbox={false}>
      <TableRow>
        {
						this.showTableHeaderColumn()
					}
      </TableRow>
    </TableHeader>
		);

  showTableBody = () => <TableBody displayRowCheckbox={false} stripedRows showRowHover>
    {
				this.showTableRowList()
			}
  </TableBody>;

  showTableRowList = () => {
    console.log('showTableRowList:', this.state.tableData);
		// if(this.state.tableData.length === 0){
		// 	return <TableRow>
		// 				<TableRowColumn colSpan={this.state.tableHeader.length} style={{textAlign: 'center'}}>
		// 					暂无数据.
		// 				</TableRowColumn>
		// 			</TableRow>
		// }
    return (
			this.state.tableData.map((value, index) => <TableRow key={index} >
  <TableRowColumn>{value.SPBH}</TableRowColumn>
  <TableRowColumn>{value.SPMC}</TableRowColumn>
  <TableRowColumn>{value.SPMS}</TableRowColumn>
  <TableRowColumn>{value.DGSL}</TableRowColumn>
  <TableRowColumn>{value.YJHSL}</TableRowColumn>
  <TableRowColumn>{value.WPHSL}</TableRowColumn>
  <TableRowColumn>{value.YFHSL}</TableRowColumn>
  <TableRowColumn>{value.DFHSL}</TableRowColumn>
				</TableRow>)
    )
  };

  showTableHeaderColumn = () => {
    console.log('showTableHeaderColumn:', this.state.tableHeader);
    return (
			this.state.tableHeader.map((value, index) => <TableHeaderColumn style={{ paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#5B83B4', letterSpacing: '0.26px', textAlign: 'center' }} key={index}>{value.name}</TableHeaderColumn>)
    )
  };


  options = () => ({
    columnOptions: [
      {
        label: '物料号',
        attr: 'SPBH',
      },
      {
        label: '品名',
        attr: 'SPMC',
      },
      {
        label: '商品描述',
        attr: 'SPMS',
      },
      {
        label: '订购总数量',
        attr: 'DGSL',
      },
      {
        label: '已拣货数量',
        attr: 'YJHSL',
      },
      {
        label: '未配货数量',
        attr: 'WPHSL',
      },
      {
        label: '已复核数量',
        attr: 'YFHSL',
      },
      {
        label: '待复核数量',
        attr: 'DFHSL',
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    dataSource: this.state.tableData || [],
    showIndex: true,
  });

	// haveDistributionTablebody = () => {
	// 	console.log("haveDistributionTablebody:", this.state.tableData);
	// 	return (
	// 		this.state.tableData.map((value, index) => {
	// 			return <TableRow key={value.GUID} >
	// 				<TableRowColumn>{value.GUID}</TableRowColumn>
	// 				<TableRowColumn>{value.CJJXSMC}</TableRowColumn>
	// 				<TableRowColumn>{value.CJSJ}</TableRowColumn>
	// 				<TableRowColumn>{value.CRKSHZT}</TableRowColumn>
	// 			</TableRow>
	// 		})
	// 	)
	// };
	//
	// toBeDistributionTablebody = () => {
	// 	console.log("toBeDistributionTablebody:", this.state.tableData);
	// 	return (
	// 		this.state.tableData.map((value, index) => {
	// 			return <TableRow key={value.GUID}>
	// 				<TableRowColumn>{value.GUID}</TableRowColumn>
	// 				<TableRowColumn>{value.CJJXSMC}</TableRowColumn>
	// 				<TableRowColumn>{value.CJSJ}</TableRowColumn>
	// 				<TableRowColumn>{value.CKZT}</TableRowColumn>
	// 			</TableRow>
	// 		})
	// 	)
	// };

  render() {
    return (
      <div className='OrderDetailsList' >
        {
					this.showTable()
				}
      </div>
    )
  }

}
