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
import moment from 'lib/moment'
/**
* 使用场景:手术回收列表
*接口:出入库.md => 11.术后回收入口查询相应状态订单列表
* */
export default class OperationReceive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      requredStatus: 0
    }
  }
  options = () => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'GUID',
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '医院名称',
        attr: 'YYMC'
      },
      {
        label: '产品类型',
        attr: 'SSLXMC'
      },
      {
        label: '手术名称',
        attr: 'SSMC'
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: type => moment(type).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      // 已回收CRKSHZT 待回收HSRKZT
      {
        label: '回收状态',
        attr: Number(this.props.requredStatus) === 0 ? 'HSRKZT' : 'CRKSHZT',
        formater: (value) => {
          if (Number(this.props.requredStatus) === 0) {
            return this.storageInRecheckTypeJudge(value);
          }
          return this.storageInRecheckTypeJudgeReceived(value);
        }
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.operationReceiveList.operationReceiveData.DDB
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.operationReceiveList.operationReceiveData.DDB || [],
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
      currentPage: this.props.operationReceiveList.currentPage,
      totalCount: this.props.operationReceiveList.operationReceiveData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page);
      }
    }
  });
  static PropTypes = {
    // 列表模式 0为待  1为已入库
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
    requredStatus: 0
  }
  /*
  * 手术回收复核状态(已回收)
  * */
  storageInRecheckTypeJudgeReceived = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return '待复核';
      case 1:
        return '通过';
      case 2:
        return '退回';
      case 3:
        return '退回';
      default:
        return '未知订单状态';
    }
  }
  /**
   * 手术回收复核状态(待回收)
   * */
  storageInRecheckTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return '待回收';
      case 1:
        return '部分回收';
      case 2:
        return '已回收';
      default:
        return '待回收';
    }
  }
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page) => {
    const params = { page, dataParams: { SFHS: Number(value) } };
    this.props.getOperationReceiveData(params)
  }
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1);
  }
  componentWillReceiveProps(nexValue) {
    if (this.props.requredStatus !== nexValue.requredStatus) {
      this.fetchDataFromServer(nexValue.requredStatus, 1);
    }
    this.setState({ requredStatus: nexValue.requredStatus });
  }
  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.operationReceiveList.operationReceiveData.DDB[index];
    this.props.rowClick(resultValue);
  }

  render() {
    return (
      <div>
        <PageGrid options={this.options()} dataSource={this.props.operationReceiveList.operationReceiveData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
