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
* 使用场景:备货出库列表
* 接口:出入库.md => 4.出库汇总界面（备货、铺货、借货等出库，手术配货）
 *  */
export default class PickingProductionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      requredStatus: '0'
    }
  }

  options = () => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'GUIDBH',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '订单号',
        attr: 'GUID'
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '医院',
        attr: 'YYMC'
      },
      {
        label: '手术类型',
        attr: 'SSLXMC'
      },
      {
        label: '送货时间',
        attr: 'DHRQ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      {
        label: '购货方',
        attr: 'CJJXSMC'
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.pickingProductionList.pickingProductionData.DDB
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.pickingProductionList.pickingProductionData.DDB || [],
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
      currentPage: this.props.pickingProductionList.currentPage || 1,
      totalCount: this.props.pickingProductionList.pickingProductionData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        console.debug(`page=${page}`);
        this.fetchDataFromServer(this.props.requredStatus, page);
      }
    }
  });
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
      case 8:
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
  static PropTypes = {
    // 列表模式 0为待拣货  1为已拣货
    requredStatus: PropTypes.number.isRequired,
    // 组织机构ID
    organizationID: PropTypes.number.isRequired,
    // 当前第几页
    currentPageCount: PropTypes.number.isRequired,
    // 每页显示多少条
    pageCountPerPage: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired,
    // 订单类型
    orderType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    requredStatus: 0,
    MKID: 0
  }

  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page) => {
    let DDLX;
    switch (Number(this.props.orderType)) {
      case 1:
        break;
      case 2:
        DDLX = 2;
        break;
    }
    const dataParams = { DDLX, SFPH: Number(value) };
    const params = { page, dataParams };
    this.props.getPickingProductionData(params);
  }
  componentWillMount() {
    this.fetchDataFromServer(this.props.requredStatus, 1);
  }
  componentWillReceiveProps(nextValue) {
    if (nextValue.requredStatus !== this.props.requredStatus) {
      this.fetchDataFromServer(nextValue.requredStatus, 1);
    }
    this.setState({ requredStatus: nextValue.requredStatus });
  }

  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.pickingProductionList.pickingProductionData.DDB[index];
    this.props.rowClick(resultValue);
  }
  render() {
    const options = [];
    switch (Number(this.props.orderType)) {
      case 1:
      // 备货订单
        const BHDD = ['GUIDBH', 'PPMC', 'CJJXSMC', 'CJSJ'];
        BHDD.map((value, index) => {
          this.options().columnOptions.map((sub_value, sub_index) => {
            if (sub_value === 'GUIDBH') {
              sub_value.attr = 'GUID'
            }
            if (value === sub_value.attr) {
              options.push(sub_value);
            }
          })
        })
        break;
      case 2:
        // 手术订单
        const SSDD = ['GUID', 'PPMC', 'YYMC', 'SSLXMC', 'DHRQ', 'CJSJ'];
        SSDD.map((value, index) => {
          this.options().columnOptions.map((sub_value, sub_index) => {
            if (value === sub_value.attr) {
              options.push(sub_value);
            }
          })
        })
        break;
    }
    const params = this.options();
    params.columnOptions = options;
    return (
      <div>
        <PageGrid options={params} dataSource={this.props.pickingProductionList.pickingProductionData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
