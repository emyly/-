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
* 使用场景:物流发货列表
* 接口：物流.md => 6.物流发货入口订单列表查询
* */
export default class ProductionDeliverList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      add_employee_dialog_open: false,
      edit_employee_dialog_open: false,
      requredStatus: 0
    }
  }
  /**
   * 发货状态
   * */
  sendTypeJudge = (num) => {
    const value = Number(num);
    switch (value) {
      case 0:
        return '待发货';
      case 1:
        return '部分发货';
      case 2:
        return '已发货';
    }
  }
  options = () => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '180px' },
        style: { width: '180px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
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
        label: '购货方',
        attr: 'CJJXSMC'
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      {
        label: '医院名称',
        attr: 'YYMC'
      },
      {
        label: '送货时间',
        attr: 'DHRQ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      {
        label: '发货状态',
        attr: 'FHZT',
        formater: value => this.sendTypeJudge(value)
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.productionDeliverList.productionDeliverData.DDB
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.productionDeliverList.productionDeliverData.DDB || [],
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
      currentPage: this.props.productionDeliverList.currentPage || 1,
      totalCount: this.props.productionDeliverList.productionDeliverData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page);
      }
    }
  });
  static PropTypes = {
    // 列表模式 0为待发货  1为已发货
    requredStatus: PropTypes.number.isRequired,
    // 组织机构ID
    organizationID: PropTypes.number.isRequired,
    // 当前第几页
    currentPageCount: PropTypes.number.isRequired,
    // 每页显示多少条
    pageCountPerPage: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired
  };
  static defaultProps = {
    requredStatus: 0
  };
  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.productionDeliverList.productionDeliverData.DDB[index];
    this.props.rowClick(resultValue);
  };
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
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1);
  }
  componentWillReceiveProps(nextValue) {
    if (this.props.requredStatus !== nextValue.requredStatus) {
      this.fetchDataFromServer(nextValue.requredStatus, 1);
    }
    this.setState({ requredStatus: nextValue.requredStatus });
  }
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page) => {
    const dataParams = { DDB: { FHZT: `${value === 0 ? ['0', '1'] : ['2']}` } };
    const params = { page, dataParams };
    this.props.getProductionDeliverData(params)
  }
  render() {
    return (
      <div>
        <PageGrid options={this.options()} dataSource={this.props.productionDeliverList.productionDeliverData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
