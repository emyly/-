/**
* Created by SJF on 2016/11/7.
* 物流回收记录列表
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CardUI from 'components/StandardUI/StandardCard';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import InventoryList from './InventoryList'
import Constant from 'lib/constant'
import { fetchSingleReceivingOrderDetail } from '../module/singleReceivingOrderDetail'
// import _ from 'lodash'

/* action dispatcher */
import { setSelectedReturnOrderLogistics } from '../module/selectedReturnOrderLogistics'

class ReceivingLogisticsHistory extends Component {
  constructor(props) {
    super(props)
    // 出入库：术后回收——商品的回收汇总
    this.state = {
      hasInit: false,
      logisticsCheckOpen: false,
      selectedLogisticsOrderId: null,
      name: '',
      isDetailClick: false,
      checkedOrdersArray: [],
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    orderId: PropTypes.number.isRequired,
    setSelectedReturnOrderLogistics: PropTypes.func.isRequired,
    fetchSingleReceivingOrderDetail: PropTypes.func.isRequired,
    receivingList: PropTypes.array.isRequired,
  }

  clickConfirm = () => {
    this.setState({
      logisticsCheckOpen: false,
    })
  }

  checkStateJudge = (e) => {
    const num = JSON.stringify(e)
    switch (num) {
      case Constant.SAAS.CRK.ORDER_NOT_CHECK:
        return '待审核'
      case Constant.SAAS.CRK.ORDER_APPROVE:
        return '通过'
      case Constant.SAAS.CRK.ORDER_REJECT:
        return '退回'
      case Constant.SAAS.CRK.ORDER_TRANSFER:
        return '转续'
      default:
        return ''
    }
  }

  handleClickLogisticsOrder = value => () => {
    this.setState({
      logisticsCheckOpen: true,
      name: value.YHXM,
      selectedLogisticsOrderId: value.GUID,
      isDetailClick: true   /* NOTE: flag to disable RowSelection */
    })
    this.props.fetchSingleReceivingOrderDetail(this.props.orderId, value.GUID)
  }

  closeDialog = () => {
    this.setState({
      isDetailClick: false,
      logisticsCheckOpen: false
    })
  }

  onRowCheck = (event, isInputChecked) => {
    /* update checkedOrdersArray */
    let checkedOrdersArray
    if (isInputChecked) {
      checkedOrdersArray = [Number(event.target.id)]
    } else {
      checkedOrdersArray = []
    }

    // /* update state both locally and global */
    this.setState({ checkedOrdersArray })
    this.props.setSelectedReturnOrderLogistics(checkedOrdersArray)
  }

  componentWillReceiveProps(nextProps) {
    /* only need to call this once, with hasInit flag */
    if (nextProps.receivingList.length === 1 && !this.state.hasInit) {
      const checkedOrdersArray = this.state.checkedOrdersArray;
      checkedOrdersArray.push(nextProps.receivingList[0].GUID);
      this.setState({ checkedOrdersArray, hasInit: true });
      this.props.setSelectedReturnOrderLogistics(checkedOrdersArray);
    } else {
      this.props.setSelectedReturnOrderLogistics([])  /* clear previous possible  selection */
    }
  }

  logisticsOrderList = () => {
    const TableHeaderColumnStyle = {
      paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center', backgroundColor: '#EAECEE'
    }

    return (
      <Table onRowSelection={this.handleRowSelection} >
        <TableHeader displaySelectAll={false} style={{ backgroundColor: '#EAECEE', fontFamily: 'SourceHanSansCN-Bold' }} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: '0', ...TableHeaderColumnStyle }} />
            <TableHeaderColumn style={TableHeaderColumnStyle}>回收历史</TableHeaderColumn>
            <TableHeaderColumn style={TableHeaderColumnStyle}>操作人</TableHeaderColumn>
            <TableHeaderColumn style={TableHeaderColumnStyle}>状态</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
          {
            this.props.receivingList.map((value, index) =>
              <TableRow key={value.GUID} selectable={value.SHZT === Constant.SAAS.CRK.WAIT_RECHECK}>
                {
                  value.SHZT === Constant.SAAS.CRK.WAIT_RECHECK ? (
                    <TableRowColumn style={{ width: '0' }}>
                      <Checkbox checked={(this.state.checkedOrdersArray.indexOf(value.GUID) !== -1)} id={value.GUID} onCheck={this.onRowCheck} />
                    </TableRowColumn>
                  ) : <TableRowColumn style={{ width: '0' }} />
                }
                <TableRowColumn style={{ textAlign: 'center' }}>
                  <a
                    onClick={this.handleClickLogisticsOrder(value)}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {value.GUID}
                  </a>
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{this.checkStateJudge(value.SHZT)}</TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }

  render() {
    const topStyle = {
      backgroundColor: '#00A0FF'
    };

    return (
      <div>
        <CardUI
          topStyle={topStyle} title='回收记录' iconStyleLeft={{ marginTop: '20px', marginRight: '23px', marginLeft: '-16px' }}
          avatar='/Shape.png' label='' CardTextStyle={{ height: '23rem' }} CardStyle={{ overflow: 'hidden' }}
        >
          {this.logisticsOrderList()}
        </CardUI>
        <InventoryList
          logisticsOrderId={this.state.selectedLogisticsOrderId} orderId={this.props.orderId}
          open={this.state.logisticsCheckOpen} name={this.state.name}
          confirmCallBack={this.clickConfirm} closeDialog={this.closeDialog}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  receivingList: state.surgeryOrderReturnListReducer.receivingList,
})

const mapDispatchToProps = {
  setSelectedReturnOrderLogistics,
  fetchSingleReceivingOrderDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingLogisticsHistory)
