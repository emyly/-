/**
 * Created by wangming on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import './SelectProductionRecordTable.scss';
import CardUI from 'components/StandardUI/StandardCard';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import Checkbox from 'material-ui/Checkbox';

const SPRFSTableHeader = [
  {
    name: '出库单号'
  },
  {
    name: '出库操作人'
  },
  {
    name: '状态'
  }
];

const SPRFSCTableHeader = [
  {
    name: ''
  },
  {
    name: '出库单号'
  },
  {
    name: '出库操作人'
  },
  {
    name: '状态'
  }
];

const title = '拣货记录';
const stateType = [
  '待复核',
  '通过',
  '退回',
  '转续',
  '--'
];


export default class SelectProductionRecordTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: '0',
      tableHeader: [],
      tableData: [],
      title,
      currentSelectedRow: [],
      isCheckBoxInitStatus: true   // 为了避免多次进入初始化checkbox状态
    }
  }

  static defaultProps = {
    /**
     * 是否显示本次拣货记录
     */
    ifShowCurrentSelect: false,
    ifShowCheckBox: false,
    inOrOut: 0,
    isInitiallyExpanded: false,
    title: '拣货记录',
  };

  static propTypes = {
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired,
    /**
     * CardUI头部像是
    */
    topStyle: React.PropTypes.style,
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    // 出库入库，0：出库，1：入库
    inOrOut: React.PropTypes.number,
    /**
     * 点击行回调
     */
    rowClickCallback: React.PropTypes.func,
    /**
     * 是否显示本次拣货记录
     */
    ifShowCurrentSelect: React.PropTypes.bool,
    /**
     * 是否显示checkbox
     */
    ifShowCheckBox: React.PropTypes.bool,
    /**
     * checkbox回调函数
     */
    checkboxCallback: React.PropTypes.func,
    /**
     * 本次拣货操作人
     */
    operator: React.PropTypes.string,
    title: React.PropTypes.string,
    isInitiallyExpanded: React.PropTypes.bool, //是否默认展开

    // /********表格样式********/
    // tableHeaderStyle:React.PropTypes.object,
    // tableHeaderColumnStyle:React.PropTypes.object,``
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.props.getSelectProductionRecord(this.props.orderId, '0');
    console.debug('componentWillMount 1');
    if (this.props.ifShowCheckBox) {
      this.setState({ tableHeader: SPRFSCTableHeader });
    } else {
      this.setState({ tableHeader: SPRFSTableHeader });
    }
  };


  componentWillReceiveProps = (nextProps) => {
    console.debug('selectproductionRecordTable.js componentWillReceiveProps:', nextProps.selectProductionRecordTable.selectData);
    // this.setState(
    // 	{
    // 			tableData : nextProps.selectProductionRecordTable.selectData
    // 	});
    const propsData = nextProps.selectProductionRecordTable.selectData;
    const tempdata = {
      GUID: '本次拣货记录',
      YHXM: this.props.operator,
      SHZT: 4
    };
    if (this.props.ifShowCurrentSelect) {
      let ifInsertData = true;
      const data = propsData;
      data.map((value, index) => {
        if (value.GUID === tempdata.GUID) {
          // this.setState({tableData : data});
          ifInsertData = false;
        }
      });

      if (ifInsertData) {
        data.push(tempdata);
      }

      this.setState({ tableData: data });

      console.log('tempdata:', data);
      // this.setState({tableData : data});
      console.log('componentWillMount', data);

      // if(this.props.ifShowCheckBox){
      // 	let data = selectProductionData;
      // 	data.push(tempdata);
      // 	this.setState({tableData : data});
      // 	console.log("componentWillMount", this.state.tableData);
      // }else{
      // 	let data = selectProductionData;
      // 	data.push(tempdata);
      // 	this.setState({tableData : data});
      // 	console.log("componentWillMount", this.state.tableData);
      // }
    } else {
      console.debug('data 1:', propsData);
      const data = propsData;
      data.map((value, index) => {
        if (value.GUID === tempdata.GUID) {
          // this.setState({tableData : data});
          data.splice(index, 1);
        }
      });

      if (this.props.ifShowCheckBox) {
        if (nextProps.selectProductionRecordTable.selectData !== this.props.selectProductionRecordTable.selectData) {
          this.state.currentSelectedRow = [];
          this.setState({
            currentSelectedRow: []
          });
        }
        if ((data.length > 0 && this.state.isCheckBoxInitStatus) || nextProps.selectProductionRecordTable.selectData !== this.props.selectProductionRecordTable.selectData) {
          let count = 0;
          let curIndex = 0;
          data.map((value, index) => {
            if (value.SHZT === '0') {
              ++count;
              curIndex = index;
            }
            value.checked = false;
          })
          if (count === 1) {
            const selectRow = data[curIndex];
            selectRow.checked = true;
            this.state.currentSelectedRow.push(selectRow);
            this.props.checkboxCallback(this.state.currentSelectedRow);
          }
          this.setState({
            tableData: data,
            isCheckBoxInitStatus: false,
            currentSelectedRow: this.state.currentSelectedRow
          });
        }
      } else {
        console.debug('data 2:', propsData);
        this.setState({ tableData: data });
      }
    }
  };

  checkboxClick = (value, index) => () => {
    console.debug('checkboxClick:', value);
      // this.setState({tableData[index].checked : !this.state.tableData[index].checked});
    this.state.tableData[index].checked = !this.state.tableData[index].checked;
    this.setState({ tableData: this.state.tableData });
  }

    // console.log("checkboxClick:", object);


  /**
   * 区别点击checkbox和点击行,
   * 点击行，区别本本次拣货记录和历史拣货记录
   */
  // handleTest = (row, column) => {
  // 	console.log("handleTest:", row, column);
  // };

  handleCellClick = (row, column) => {
    if (this.state.tableData.length === 0) {
      return;
    }
    if (this.props.ifShowCheckBox) {
      if (column === 1) {
        console.log('handleCellClick:', column);
        const tableDataArray = this.state.tableData;
        tableDataArray[row].checked = !tableDataArray[row].checked;
        this.setState({ tableData: tableDataArray });
        if (!tableDataArray[row].checked) {
          /**
           * 删除行数据
           */
          // this.state.tableData[row].checked = false;

          const selectedIndex = this.state.currentSelectedRow.indexOf(this.state.tableData[row]);
          if (selectedIndex > -1) {
            this.state.currentSelectedRow.splice(selectedIndex, 1);
          }
          // let selectedRowArray = [];
          // this.state.tableData.map((value, index) => {
          // 	if(value.checked){
          // 		selectedRowArray.push(value);
          // 	}
          // });
          // this.setState({currentSelectedRow: selectedRowArray});
          if (this.props.checkboxCallback) {
            this.props.checkboxCallback(this.state.currentSelectedRow);
          } else {
            (() => {})()
          }
        } else {
          /**
           * 添加行数据
           */
          // this.state.tableData[row].checked = true;
          const seletecdRow = this.state.tableData[row];
          this.state.currentSelectedRow.push(seletecdRow);
          if (this.props.checkboxCallback) {
            this.props.checkboxCallback(this.state.currentSelectedRow);
          } else {
            (() => {})()
          }
          this.setState({
            currentSelectedRow: this.state.currentSelectedRow
          })
        }
      } else {
        console.log('handleCellClick:', column);
        const returnValue = this.state.tableData[row];
        console.debug('rowClickCallback:', returnValue);
        if (this.props.rowClickCallback) {
          this.props.rowClickCallback(returnValue)
        } else {
          (() => {})()
        }
      }
    } else {
      console.log('handleCellClick:', column);
      const returnValue = this.state.tableData[row];

      if (this.props.rowClickCallback) {
        this.props.rowClickCallback(returnValue)
      } else {
        (() => {})()
      }
    }
  };

  showTable = () => (
    <Table displaySelectAll={false} selectable={false} onCellClick={this.handleCellClick} height={220} fixedHeader>
      {
          this.showTableHeader()
        }
      {
          this.showTableBody()
        }
    </Table>
    );

  showTableHeader = () => {
    console.debug('showTableHeader');
    return (
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ background: 'rgba(53,67,87,0.10)' }}>
        <TableRow>
          {
            this.showTableHeaderColumn()
          }
        </TableRow>
      </TableHeader>
    )
  };

  showTableBody = () => <TableBody displayRowCheckbox={false} stripedRows showRowHover>
    {
        this.showTableRowList()
      }
  </TableBody>;

  showTableRowList = () => {
    console.log('showTableRowList:', this.state.tableData);
    if (this.state.tableData.length === 0) {
      return (<TableRow>
        <TableRowColumn colSpan={this.state.tableHeader.length} style={{ textAlign: 'center' }}>
                暂无数据.
        </TableRowColumn>
      </TableRow>)
    }
    if (this.props.ifShowCheckBox) {
      return this.state.tableData.map((value, index) => {
        console.debug('select table debug 1;', value);
        if (Number(value.SHZT) === 0) {
          console.debug('select table debug 2;', value);
          return (<TableRow key={index}>
            <TableRowColumn key={`${value.GUID}0`} >
              <Checkbox
                label=''
                checked={value.checked}
              /></TableRowColumn>
            <TableRowColumn key={`${value.GUID}1`} style={{ textAlign: 'center' }}>{value.GUID}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}2`} style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}3`} style={{ textAlign: 'center' }}>{stateType[Number(value.SHZT)]}</TableRowColumn>
          </TableRow>)
        } else {
          console.debug('select table debug 3;', value);
          return (<TableRow key={index}>
            <TableRowColumn key={`${value.GUID}0`} />
            <TableRowColumn key={`${value.GUID}1`} style={{ textAlign: 'center' }}>{value.GUID}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}2`} style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}3`} style={{ textAlign: 'center' }}>{stateType[Number(value.SHZT)]}</TableRowColumn>
          </TableRow>)
        }
      }
      )
    } else {
      return (
        this.state.tableData.map((value, index) => {
          console.debug('select table debug 4;', value);
          return (<TableRow key={index} >
            <TableRowColumn key={`${value.GUID}0`} style={{ textAlign: 'center' }}>{value.GUID}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}1`} style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
            <TableRowColumn key={`${value.GUID}2`} style={{ textAlign: 'center' }}>{stateType[value.SHZT]}</TableRowColumn>
          </TableRow>)
        })
      )
    }
  };

  insertRow = () => {

  };

  insertRowByCheckBox = () => {

  };

  showTableHeaderColumn = () => {
    console.log('showTableHeaderColumn:', this.state.tableHeader);
    return (
      this.state.tableHeader.map((value, index) => <TableHeaderColumn key={index} style={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 18, color: '#6D93C1', letterSpacing: 0.26, textAlign: 'center' }}>{value.name}</TableHeaderColumn>)
    )
  };

  // historyAndCurrentTablebody = () => {
  // 	console.log("haveDistributionTablebody:", this.state.tableData);
  // 	return (
  // 		this.state.tableData.map((value, index) => {
  // 			return <TableRow key={value.CRKID} >
  // 				<TableRowColumn>{value.CRKID}</TableRowColumn>
  // 				<TableRowColumn>{value.CKCZR}</TableRowColumn>
  // 				<TableRowColumn>{value.ZT}</TableRowColumn>
  // 			</TableRow>
  // 		})
  // 	)
  // };

  // historyTablebody = () => {
  // 	console.log("toBeDistributionTablebody:", this.state.tableData);
  // 	return (
  // 		this.state.tableData.map((value, index) => {
  // 			return <TableRow key={value.CRKID}>
  // 				<TableRowColumn>{value.CRKID}</TableRowColumn>
  // 				<TableRowColumn>{value.CKCZR}</TableRowColumn>
  // 				<TableRowColumn>{value.ZT}</TableRowColumn>
  // 			</TableRow>
  // 		})
  // 	)
  // };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    return (
      <CardUI expanded topStyle={this.props.topStyle || topStyle} title={this.props.title} iconStyleLeft={{ marginTop: '20px', marginRight: '23px', marginLeft: '-16px' }} avatar='/Shape.png' label='' CardTextStyle={{ height: '23.4rem', padding: 0 }} CardStyle={{ overflow: 'hidden' }}>
        {
          this.showTable()
        }
      </CardUI>
    )
  }

}
