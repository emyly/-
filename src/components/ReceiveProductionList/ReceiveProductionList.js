/**
 * Created by chenming on 2016/10/21.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import PageGrid from 'components/PageGrid';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import moment from 'lib/moment'
/**
* 使用场景:备货入库列表
* 接口：物流.md => 备货、铺货等入库——获取相应状态的物流单—订单列表
* */
export default class ReceiveProductionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requredStatus: 0,
      WLDBArray: [],
      errorMessage: '',
      openError: false
    }
  }
  options = () => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'DDID',
        tableHeaderColumnStyle: { width: '180px' },
        style: { width: '180px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.DDID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '物流单号',
        attr: 'WLDH'
      },
      {
        label: '发货时间',
        attr: 'SFSJ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      {
        label: '发货方',
        attr: 'FHJXSMC',
      },
      // {
      //   label: '订单类型',
      //   attr: 'DDLX',
      //   formater:(value)=>{
      //     return this.orderTypeJudge(value)
      //   }
      // }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.receiveProductionList.receiveProductionData.WLDB
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.receiveProductionList.receiveProductionData.WLDB || [],
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
      currentPage: this.props.receiveProductionList.currentPage || 1,
      totalCount: this.props.receiveProductionList.receiveProductionData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page);
      }
    }
  });
  static PropTypes = {
    // 列表模式 0为待入库  1为已入库
    requredStatus: PropTypes.number.isRequired,
    // 组织机构ID
    organizationID: PropTypes.number.isRequired,
    // 当前第几页
    currentPageCount: PropTypes.number.isRequired,
    // 每页显示多少条
    pageCountPerPage: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired
  }
  static defaultProps = {
    requredType: 0
  }
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1);
  }
  componentWillReceiveProps(nexValue) {
    if (this.props.requredStatus !== nexValue.requredStatus) {
      this.fetchDataFromServer(nexValue.requredStatus, 1);
    }
    this.setState({ requredStatus: nexValue.requredStatus });
    if (nexValue.receiveProductionList.error) {
      this.setState({ errorMessage: nexValue.receiveProductionList.error.response, openError: true });
    }
  }
  /**
   * 订单类型判断
   * */
  orderTypeJudge = (type) => {
    const num = parseInt(type);
    switch (num) {
      case 0:
        return {
          type: '铺货',
          backgroundColor: 'pink'
        };
      case 1:
        return {
          type: '备货',
          backgroundColor: '#00be9c'
        };
      case 2:
        return {
          type: '手术',
          backgroundColor: '#ff625b'
        };
      case 3:
        return {
          type: '借货',
          backgroundColor: '#58909c'
        };
      case 4:
        return {
          type: '调货',
          backgroundColor: '#58909c'
        };
      case 5:
        return {
          type: '铺货补货',
          backgroundColor: '#58909c'
        };
      case 6:
        return {
          type: '铺货销售',
          backgroundColor: '#58909c'
        };
      case 7:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      default:
        return {
          type: '无',
          backgroundColor: '#58909c'
        };
    }
  };
  /**
   * 获取数据  在这里调用api
   * DDLX不传，后台默认返回备货订单和调拨订单,具体需要什么类型传入DDLX
   * */
  fetchDataFromServer = (value, page) => {
    const params = { page, dataParams: { WLDB: { SFRK: value } } };
    this.props.getReceiveProductionData(params)
  }

  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.receiveProductionList.receiveProductionData.WLDB[index];
    this.props.rowClick(resultValue);
  }
  render() {
    return (
      <div>
        <PageGrid options={this.options()} dataSource={this.props.receiveProductionList.receiveProductionData.WLDB} pagination={this.options().pagination} />
        <ErrorSnackBar message={this.state.errorMessage} open={this.state.openError} onRequestClose={this.handleRequestClose} />
      </div>
    )
  }
}
