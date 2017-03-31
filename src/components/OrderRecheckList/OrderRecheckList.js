/**
 * Created by chenming on 2016/10/21.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import PageGrid from 'components/PageGrid';
import './OrderRecheckList.scss'
import moment from 'lib/moment'
/**
* 使用场景:订单审核列表
* 接口:订单.md => 查询订单详情
 *  */
export default class OrderRecheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      requredStatus: 0,
      receiveValue: {},
    }
  }
  options = () => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button
            className='typeBtn'
            style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}
          >{this.orderTypeJudge(row.DDLX).type}</button>
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
        label: '送达时间',
        attr: 'DHRQ',
        formater: (value) => {
          if (value !== null) {
            return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm');
          }
          return <div>-</div>
        }
      },
      {
        label: '产品类型',
        attr: 'SSLXMC',
        render: row => (<div>{row.SSLXMC || '-'}</div>)
      },
      {
        label: '手术名称',
        attr: 'SSMC',
        render: row => (<div>{row.SSMC || '-'}</div>)
      },
      {
        label: '手术模板',
        attr: 'SSMBMC',
        render: row => (<div>{row.SSMBMC || '-'}</div>)
      },
      {
        label: this.props.MKID === 3 ? '供货方' : '购货方',
        attr: this.props.MKID === 3 ? 'SHJXSMC' : 'CJJXSMC',
        render: row => (<div>{ (this.props.MKID === 3 ? row.SHJXSMC : row.CJJXSMC) || '-'}</div>)
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: (value) => {
          if (value) {
            return moment(value).formatStandard('Y', 'M', 'D');
          }
          return <div>-</div>
        }
      },
      {
        label: '医院名称',
        attr: 'YYMC',
        render: row => (<div>{row.YYMC || '-'}</div>)
      },
      {
        label: '手术时间',
        attr: 'SSRQ',
        formater: (value) => {
          if (value) {
            return moment(value).formatStandard('Y', 'M', 'D');
          }
          return <div>-</div>
        }
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: (value) => {
          if (value) {
            return moment(value).formatStandard('Y', 'M', 'D');
          }
          return <div>-</div>
        }
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.orderRecheckList.orderRecheckData.DDB;
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.orderRecheckList.orderRecheckData.DDB || [],
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
    indexStyle: { width: '30px' },
    pagination: {
      currentPage: this.props.orderRecheckList.currentPage || 1,
      totalCount: this.props.orderRecheckList.orderRecheckData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page);
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
          type: '寄售',
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
  static propTypes = {
    // 列表模式 0为待审核  1为已审核 2.已退回 3.已转单
    requredStatus: PropTypes.number,
    // 组织机构ID
    organizationID: PropTypes.number,
    // 用于接收点击row的index
    rowClick: PropTypes.func,
    // 传入模块ID 0为显示全部 1.为手术订单
    MKID: PropTypes.number,
    // 传入查询条件
    dataParams: PropTypes.object,
    orderRecheckList: PropTypes.object,
    getOrderRecheckData: PropTypes.func,
    DDLX: PropTypes.array,
    globalStore: PropTypes.object
  };
  static defaultProps = {
    requredStatus: 0,
    MKID: 0,
    dataParams: '',
    DDLX: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  };
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page, dataParams) => {
    const num = Number(value);
    if (!dataParams) {
      switch (num) {
        case 0:
          dataParams = { DDB: [{ DDLX: this.props.DDLX, WBSHZT: '0', SHJXSID: `${this.props.organizationID}`, SHZT: '1' }] }
          break;
        case 1:
          dataParams = { DDB: [{ DDLX: this.props.DDLX, DDZT: `${num}`, SHJXSID: this.props.globalStore.organizationId }] }
          break;
        case 2:
          dataParams = { DDB: [{ DDLX: this.props.DDLX, DDZT: `${num}`, SHJXSID: this.props.globalStore.organizationId }] }
          break;
        case 3:
          dataParams = { DDB: [{ DDLX: this.props.DDLX, SFZD: '1', SHJXSID: this.props.globalStore.organizationId }] }
          break;
        default:
          break;
      }
    }
    const params = { page, dataParams };
    this.props.getOrderRecheckData(params)
  };
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1, this.props.dataParams);
  }
  componentWillReceiveProps(nexValue) {
    if (this.props.requredStatus !== nexValue.requredStatus) {
      this.fetchDataFromServer(nexValue.requredStatus, 1, nexValue.dataParams);
    }
    this.setState({ requredStatus: nexValue.requredStatus });
  }
  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.orderRecheckList.orderRecheckData.DDB[index];
    this.props.rowClick(resultValue);
  };

  render() {
    const options = this.options();
    switch (this.props.MKID) {
      case 0:
        break;
      case 1:
        // 手术订单创建(订单类型)
        options.columnOptions.splice(2, 1);
        break;
      case 2:
        // 订单审核(订单状态)
        options.columnOptions.splice(10, 1);
        break;
      case 3:
        // 备货
        options.columnOptions.splice(2, 4);
        options.columnOptions.splice(3, 3);
        break;
      default:
        break;
    }
    return (
      <div>
        <PageGrid options={options} dataSource={this.props.orderRecheckList.orderRecheckData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
