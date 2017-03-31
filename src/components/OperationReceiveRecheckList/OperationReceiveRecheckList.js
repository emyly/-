/**
 * Created by chenming on 2016/10/21.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import moment from 'lib/moment'
import PageGrid from 'components/PageGrid'

/**
* 使用场景:术后回收复核列表
* 接口:出入库.md => 出库复核、术后回收复核入口查询相应状态订单列表
* */
export default class OperationReceiveRecheckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DDBArray: [],
      requredStatus: 0
    }
  }
  /**
  * 时间格式转换 true为需要时分秒
  * */
  changeDataFormat = (date, flag) => {
    if (flag) {
      return moment(date).formatStandard('Y', 'M', 'D', 'h', 'm')
    }
    return moment(date).formatStandard('Y', 'M', 'D')
  }
/**
* 入库审核状态
* */
  ReceiveStatusJudge = (type) => {
    const num = Number(type)
    switch (num) {
      case 0:
        return '待审'
      case 1:
        return '通过'
      case 2:
        return '退回'
      case 3:
        return '转续'
      default:
        return '没有这个订单类型'
    }
  }
  options = () => ({
    columnOptions: [
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
        label: '医院名称',
        attr: 'YYMC',
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
        formater: type => this.changeDataFormat(type, true)
      },
      {
        label: '回收复核状态',
        attr: 'CRKSHZT',
        formater: type => this.ReceiveStatusJudge(type)
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId) => {
        const data = this.props.operationReceiveRecheckList.operationReceiveRecheckData.DDB
        const row = data[rowId]
        this.props.rowClick(row)
      }
    },
    dataSource: this.props.operationReceiveRecheckList.operationReceiveRecheckData.DDB || [],
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
      currentPage: this.props.operationReceiveRecheckList.currentPage || 1,
      totalCount: this.props.operationReceiveRecheckList.operationReceiveRecheckData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.fetchDataFromServer(this.state.requredStatus, page)
      }
    }
  })
  static propTypes = {
    // 列表模式 0为待审核  1为已审核
    requredStatus: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired,

    operationReceiveRecheckList: PropTypes.object.isRequired,
    getOperationReceiveRecheckData: PropTypes.func.isRequired,
  }
  static defaultProps = {
    requredStatus: 0
  }
  handleClick = (e) => {
    const index = parseInt(e, 10)
    const resultValue = this.props.operationReceiveRecheckList.operationReceiveRecheckData.DDB[index]
    this.props.rowClick(resultValue)
  }
  componentWillMount() {
    this.fetchDataFromServer(this.state.requredStatus, 1)
  }
  componentWillReceiveProps(nextValue) {
    if (nextValue.requredStatus !== this.props.requredStatus) {
      this.fetchDataFromServer(nextValue.requredStatus, 1)
    }
    this.setState({ requredStatus: nextValue.requredStatus })
  }
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value, page) => {
    let checkStatus
    if (value === 0) {
      checkStatus = ['0']
    } else {
      checkStatus = ['1', '2', '3']
    }
    const dataParams = { CRKDB: { DDLX: ['2'], SHZT: checkStatus, CKRK: '1' } }
    const params = { page, dataParams }
    this.props.getOperationReceiveRecheckData(params)
  }
  render() {
    return (
      <PageGrid
        options={this.options()} dataSource={this.props.operationReceiveRecheckList.operationReceiveRecheckData.DDB}
        pagination={this.options().pagination}
      />
    )
  }
}
