/**
 * Created by qyf on 2016/10/26.
 */


import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './PickingRecordDateGrid.scss';
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
import moment from 'lib/moment'
import DataGrid from 'components/DataGrid'
/* 适用场景：物流详情的拣货记录，显示已发货和未发货
 接口:物流发货，订单对应的出库和物流记录查询* */
export default class pickingRecordDateGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxSelectedArray: [],
      checkBoxSelectedIndexArray: [],
      choosedOptions: {
        columnOptions: [
          { label: '',
            attr: '',
            style: { width: Number(this.props.orderStatus) === 0 ? '2rem' : '0rem' },
            tableHeaderColumnStyle: { backgroundColor: '#EAECEE', width: Number(this.props.orderStatus) === 0 ? '2rem' : '0rem' },
            render: (value, index) => {
              if (value.WLDH === null) {
                return (
                  <Checkbox label='' checked={this.state.checkBoxSelectedIndexArray[this.props.pickingRecordDateGrid.pickingRecordDate.indexOf(value)] || false} style={{ textAlign: 'center' }} />
                );
              }
            } },
          {
            label: '出库单号',
            attr: 'CRKID',
            tableHeaderColumnStyle: { backgroundColor: '#EAECEE' }
          },
          {
            label: '物流单号',
            attr: 'WLDH',
            tableHeaderColumnStyle: { backgroundColor: '#EAECEE' },
            style: { textDecoration: 'underLine', cursor: 'pointer', }
          },
          { label: '出库仓库', attr: 'CKMC', tableHeaderColumnStyle: { backgroundColor: '#EAECEE' } },
          { label: '发货日期', attr: 'SFSJ', tableHeaderColumnStyle: { backgroundColor: '#EAECEE' }, formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm') },
          { label: '发货状态', attr: 'WLDH', tableHeaderColumnStyle: { backgroundColor: '#EAECEE' }, formater: value => this.storageOutTypeJudge(value) }
        ],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,

        },
        tableAttrs: {
          onCellClick: (rowId, columnId) => {
            this.handleClick(rowId, columnId)
          }
        },
        tableBodyAttrs: { displayRowCheckbox: false, stripedRows: true, showRowHover: true },
        showIndex: false,
      }
    }
  }

  static propTypes = {
    // 发货状态 0:待发货记录 1:已发货记录,2:待发货界面进入
    // FHZT:PropTypes.string.isRequired,
    // 住址机构id
    // organizationId:PropTypes.number.isRequired,
    // 当前订单ID
    // orderId:PropTypes.number.isRequired,
    GUID: PropTypes.number.isRequired,
    // 点击每行的回调
    rowClick: PropTypes.func.isRequired,
    // checkbox回调函数
    checkboxCallback: React.PropTypes.func,
    // 点击有CheckBox那行非ChackBox处
    clickCheckBoxRow: PropTypes.func.isRequired,
    // 判断入口: 0为代发货 1为已发货
    orderStatus: PropTypes.bool

  };
  static defaultProps = {
    // 显示全部
    FHZT: '2',
  };

  /* 发货状态*/
  storageOutTypeJudge = (value) => {
    if (value === null) {
      return '未发货'
    }
    return '已发货';
  };
  // 点击每个订单
  handleClick = (row, column) => {
    const index = Number(row);
    if (column === 2 && this.props.pickingRecordDateGrid.pickingRecordDate[index].WLDH === null) {
      // 点击checkBox
      // 选中下标数组
      const selectedIndexArray = this.state.checkBoxSelectedIndexArray;
      // 选中内容数组
      const selectedContentArray = this.state.checkBoxSelectedArray;
      if (selectedIndexArray[row] === true) {
        selectedContentArray.map((value, sub_index) => {
          if (value.CRKID === this.props.pickingRecordDateGrid.pickingRecordDate[index].CRKID) {
            selectedContentArray.splice(sub_index, 1);
          }
        })
      } else {
        selectedContentArray.push(this.props.pickingRecordDateGrid.pickingRecordDate[index]);
      }
      selectedIndexArray[row] = !selectedIndexArray[row];
      this.setState({ checkBoxSelectedIndexArray: selectedIndexArray, checkBoxSelectedArray: selectedContentArray });
      console.debug('handleClick', selectedIndexArray, selectedContentArray);
      this.props.checkboxCallback(selectedContentArray);
    } else if (this.props.pickingRecordDateGrid.pickingRecordDate[index].WLDH !== null) {
      // 点击行
      this.props.rowClick(this.props.pickingRecordDateGrid.pickingRecordDate[index]);
    } else {
      // 点击不是CheckBox那行的空白处
      this.props.clickCheckBoxRow(this.props.pickingRecordDateGrid.pickingRecordDate[index]);
    }
  };
  fetchDataFromServer = () => {
    // let requreType = ;
    this.props.getPickingRecordDate(this.props.GUID, this.props.orderStatus === 0 ? [0, 1] : [1]);
  }
  componentWillMount() {
    this.fetchDataFromServer();
  }
  componentWillReceiveProps(nextProps) {
    console.debug('componentWillReceiveProps', nextProps);
    let unSendCount = 0;
    let unSendIndex = null;
    const selectedIndexArray = [];
    const selectedContentArray = [];
    nextProps.pickingRecordDateGrid.pickingRecordDate.map((value, index) => {
      if (value.WLDH === null) {
        unSendCount++;
        unSendIndex = index;
        selectedIndexArray.push(true);
        selectedContentArray.push(value)
      } else {
        selectedIndexArray.push(false);
      }
    });
    if (unSendCount === 1) {
      this.setState({ checkBoxSelectedIndexArray: selectedIndexArray, checkBoxSelectedArray: selectedContentArray });
      this.props.checkboxCallback(selectedContentArray);
    }
    // this.setState({ checkBoxSelectedArray: [], checkBoxSelectedIndexArray: [] });
  }
  render() {
    const options = this.state.choosedOptions;
    if (Number(this.props.orderStatus) === 0) {
      options.columnOptions.forEach((value, index) => {
        if (value.label === '物流单号' || value.attr === 'SFSJ') {
          options.columnOptions.splice(index, 1);
        }
      })
    }
    const TableHeaderColumnStyle = {
      paddingLeft: 3,
      paddingRight: 3,
      fontSize: '16px',
      color: '#5B83B4',
      letterSpacing: '0.26px',
      textAlign: 'center',
      backgroundColor: '#EAECEE',
      fontFamily: 'SourceHanSansCN-Bold'
    };
    console.debug('render', this.state.checkBoxSelectedArray, this.state.checkBoxSelectedIndexArray);
    return (
      <div className='picking' style={{ overflowX: 'hidden' }}>
        <DataGrid options={options} dataSource={this.props.pickingRecordDateGrid.pickingRecordDate} />
      </div>
    )
  }
}

