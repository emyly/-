/**
 * Created by wmt on 2016/12/12.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import PageGrid from 'components/PageGrid';
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
        style: { minWidth: '180px' },
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
        label: '供货方',
        attr: 'SHJXSMC',
      },
      {
        label: '下单时间',
        attr: 'CJSJ',
        formater: (value) => {
          if (value !== null) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          }
        }
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.reviewList.reviewListData.DDB;
        const row = data[rowId];
        this.props.rowClick(row);
      }
    },
    dataSource: this.props.reviewList.reviewListData.DDB || [],
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
      currentPage: this.props.reviewList.currentPage,
      totalCount: this.props.reviewList.reviewListData.Total || 0,
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
  static PropTypes = {
    // 列表模式 0为待审核  1为已审核 2.已退回 3.已转单
    requredStatus: PropTypes.number.isRequired,
    // 组织机构ID
    organizationID: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired,
    // 传入模块ID 0为显示全部 1.为手术订单
    MKID: PropTypes.number
  };
  static defaultProps = {
    requredStatus: 0,
    MKID: 0,
    DDLX: ['0', '1', '2', '3']
  };
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page) => {
    const num = Number(value);
    let dataParams;
    switch (num) {
      case 0:
        dataParams = { DDB: [{ DDLX: this.props.DDLX, CJJXSID: `${this.props.organizationID}`, SHZT: '0' }] }
        break;
      case 1:
        dataParams = { DDB: [{ DDLX: this.props.DDLX, DDZT: `${1}`, CJJXSID: this.props.globalStore.organizationId },
                                { DDLX: this.props.DDLX, DDZT: '0', CJJXSID: this.props.globalStore.organizationId, SHZT: '1' }] }
        break;
      case 2:
        dataParams = { DDB: [{ DDLX: this.props.DDLX, DDZT: `${num}`, CJJXSID: this.props.globalStore.organizationId }] }
        break;
    }
    const params = { page, dataParams };
    this.props.getReviewList(params)
  };
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
    const resultValue = this.props.reviewList.reviewListData.DDB[index];
    this.props.rowClick(resultValue);
  };
  render() {
    const options = this.options();
    return (
      <div>
        <PageGrid options={options} dataSource={this.props.reviewList.reviewListData.DDB} pagination={this.options().pagination} />
      </div>
    )
  }
}
