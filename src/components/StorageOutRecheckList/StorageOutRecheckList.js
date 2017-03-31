/**
 * Created by chenming on 2016/10/21.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import PageGrid from 'components/PageGrid';
import moment from 'lib/moment'
/**
* 使用场景:出库复核列表
* 接口参照：出入库.md -> 12.出库复核、术后回收复核入口查询相应状态订单列表
* */
export default class StorageOutRecheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      requredStatus: '0',
      currentPage: null
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
          {row.PPMC  ||  '-'}
        </div>)
      },
      {
        label: '送达时间',
        attr: 'DHRQ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
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
        label: '手术模板',
        attr: 'SSMBMC'
      },
      {
        label: '医院名称',
        attr: 'YYMC'
      },
      {
        label: '采货方',
        attr: 'CJJXSMC'
      },

      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: value => moment(value).formatStandard('Y', 'M', 'D', 'h', 'm')
      },
      {
        label: '出库状态',
        attr: 'CRKSHZT',
        formater: (type) => {
          const num = Number(type);
          switch (num) {
            case 0:
              return '待复核';
            case 1:
              return '复核通过';
            case 2:
              return '退回';
            case 3:
              return '部分复核通过';
            default:
              break;
          }
        }
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.storageOutRecheckList.storageOutRecheckData.DDB
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.storageOutRecheckList.storageOutRecheckData.DDB || [],
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
      currentPage: this.props.storageOutRecheckList.currentPage || 1,
      totalCount: this.props.storageOutRecheckList.storageOutRecheckData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page);
      }
    }
  });
  static propTypes = {
    // 调用组件所需参数
    // 列表模式 0为待复核  1为已复核
    requredStatus: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired,

    // 引用外部props
    storageOutRecheckList: PropTypes.object,
    getStorageOutRecheckData: PropTypes.func
  }
  static defaultProps = {
    requredType: 0
  }
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1);
  }
  componentWillReceiveProps(nextValue) {
    if (this.props.requredStatus !== nextValue.requredStatus) {
      this.fetchDataFromServer(nextValue.requredStatus, 1);
    }
    this.setState({ requredStatus: nextValue.requredStatus });
  }
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
   * */
  fetchDataFromServer = (value, page) => {
    const dataParams = { CRKDB: { DDLX: [], SHZT: [`${value}`], CKRK: '0' } }
    const params = { page, dataParams };
    this.props.getStorageOutRecheckData(params);
  }
  /**
  * 点击row
  * */
  handleClick = (e) => {
    const index = parseInt(e);
    const resultValue = this.props.storageOutRecheckList.storageOutRecheckData.DDB[index];
    this.props.rowClick(resultValue);
  }
  render() {
    return (
      <div>
        <PageGrid options={this.options()} dataSource={this.props.storageOutRecheckList.storageOutRecheckData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
