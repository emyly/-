import React, { Component, PropTypes } from 'react'
import Dialog from 'components/StandardUI/StandardBusinessDialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { Card, CardText } from 'material-ui/Card'
import _ from 'lodash'

// import { fetchSurgeryLogisticsOrderDetailList } from '../module/surgeryLogisticsOrderDetail'
import {
  fetchSingleReceivingOrderDetail,
  fetchSingleReceivingOrderDetailSuccess
} from '../module/singleReceivingOrderDetail'
import './LogisticsOrderDetail.scss';

class LogisticsOrderDetailDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderIds: [],
      expandable: true,
      // stockList: [],
      recheckedGoods: {},
      recheckedTypeNumber: 0,
      recheckedNumber: 0,
      showCheckboxes: false,
      productIcon: false,
    }
  }

  componentDidMount = () => {
    this.calculateAndSetUsage(this.props.detailList)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.detailList, nextProps.detailList)) {
      this.calculateAndSetUsage(nextProps.detailList)
    }

    if (!_.isEqual(this.props.checkedOrdersArray, nextProps.checkedOrdersArray)) {
      if (nextProps.checkedOrdersArray.length > 0) {
        this.props.fetchSingleReceivingOrderDetail(this.props.orderId, nextProps.checkedOrdersArray[0])
      } else {
        this.props.fetchSingleReceivingOrderDetailSuccess({ CRKMXB: [] }) /* clear data in store */
      }
    }
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,

    cancelCallback: PropTypes.func.isRequired,
    approveCallback: PropTypes.func.isRequired,
    rejectCallback: PropTypes.func.isRequired,
    // fetchSurgeryLogisticsOrderDetailList: PropTypes.func.isRequired,
    fetchSingleReceivingOrderDetail: PropTypes.func.isRequired,
    fetchSingleReceivingOrderDetailSuccess: PropTypes.func.isRequired,

    orderId: PropTypes.number.isRequired,
    detailList: PropTypes.array.isRequired,
    checkedOrdersArray: PropTypes.array.isRequired,
    // stockList: PropTypes.array.isRequired,
  }
  handleSingleProductRowClick = (row) => {
    const product = this.props.detailList[row]
    product.display = !product.display

    // Checked, means have been reviewed
    if (product.display) {
      /* reduce in the unrecheckedGoods, */
      if (this.state.unrecheckedGoods[product.SPID]) {
        this.state.unrecheckedGoods[product.SPID] -= parseInt(product.BCHS, 10)
      } else {
        this.state.unrecheckedGoods[product.SPID] = parseInt(product.BCHS, 10)
      }

      if (this.state.recheckedGoods[product.SPID]) {
        this.state.recheckedGoods[product.SPID] += parseInt(product.BCHS, 10)
      } else {
        this.state.recheckedGoods[product.SPID] = parseInt(product.BCHS, 10)
      }
    } else {
      this.state.unrecheckedGoods[product.SPID] += parseInt(product.BCHS, 10)
      this.state.recheckedGoods[product.SPID] -= parseInt(product.BCHS, 10)
    }

    this.setState({
      recheckedTypeNumber: Object.values(this.state.recheckedGoods).reduce((acc, number) => acc + (number > 0 ? 1 : 0), 0),
      recheckedNumber: Object.values(this.state.recheckedGoods).reduce((acc, number) => acc + number, 0),
      unrecheckedTypeNumber: Object.values(this.state.unrecheckedGoods).reduce((acc, number) => acc + (number > 0 ? 1 : 0), 0),
      unrecheckedNumber: Object.values(this.state.unrecheckedGoods).reduce((acc, number) => acc + number, 0)
    })
  }
  calculateAndSetUsage = (productList) => {
    productList.map((product) => { product.display = false })

    // Initialize a map
    const productUsageInfo = {}
    const productReceiveInfo = {}
    productList.map((product) => {
      if (product.BCHS > 0) {
        productReceiveInfo[product.SPID] = Object.prototype.hasOwnProperty.call(productReceiveInfo, product.SPID) ?
          productReceiveInfo[product.SPID] + product.BCHS : product.BCHS
      }

      if (product.BCSY > 0) {
        productUsageInfo[product.SPID] = Object.prototype.hasOwnProperty.call(productUsageInfo, product.SPID) ?
          productUsageInfo[product.SPID] + product.BCSY : product.BCSY
      }
    })
    const receiveTypes = Object.keys(productReceiveInfo).length
    const receiveNumber = Object.values(productReceiveInfo).reduce((acc, val) => (acc + val), 0)
    const usageTypes = Object.keys(productUsageInfo).length
    const usageNumber = Object.values(productUsageInfo).reduce((acc, val) => (acc + val), 0)

    this.setState({
      unrecheckedGoods: productReceiveInfo,
      usageTypes,
      usageNumber,
      receiveTypes,
      receiveNumber,
      unrecheckedTypeNumber: receiveTypes,
      unrecheckedNumber: receiveNumber
    })
  };


  singleProductRow = (detailList) => {
    const FirstTableHeaderColumnWidth = { width: '30px', minWidth: '30px', textAlign: 'center' };
    const TableHeaderColumnWidth = { width: '70px', minWidth: '70px', textAlign: 'center' };
    const TableHeaderColumnWidthRight = { width: '70px', minWidth: '70px', textAlign: 'right' };
    const TableHeaderColumnWidthCenter = { width: '70px', minWidth: '70px', textAlign: 'center' };
    const SPPHColumnWidth = { width: '100px', minWidth: '100px', textAlign: 'left' };
    const SPPHColumnWidthTH = { width: '100px', minWidth: '100px', textAlign: 'center' };
    const SPBHTColumnWidth = { width: '150px', minWidth: '150px', textRight: 'left' };
    const SPBHColumnWidthTH = { width: '150px', minWidth: '150px', textAlign: 'center' };
    return (
      <div style={{ marginBottom: '20px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }} id='singleProductRow'>
        <div>{`回收单号：${this.props.orderId}`}</div>
        {
          <Table onCellClick={this.handleSingleProductRowClick}>
            <TableHeader
              adjustForCheckbox={this.state.showCheckboxes}
              displaySelectAll={this.state.showCheckboxes} style={{ background: '#788BA7' }}
            >
              <TableRow displayBorder>
                <TableHeaderColumn style={FirstTableHeaderColumnWidth}>NO.</TableHeaderColumn>
                <TableHeaderColumn style={SPBHColumnWidthTH}>商品编号</TableHeaderColumn>
                <TableHeaderColumn style={SPPHColumnWidthTH}>批号</TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: 'center' }}>型号规格</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>出库量</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>本次回收</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>本次使用</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>未回收</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>历史使用</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidth}>历史回收</TableHeaderColumn>
                <TableHeaderColumn style={TableHeaderColumnWidthCenter}>标记</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes} stripedRows showRowHover>
              {detailList.map((product, productIndex) => (
                <TableRow key={`table_body_data_${productIndex}`} >
                  <TableRowColumn style={FirstTableHeaderColumnWidth}>{productIndex + 1}</TableRowColumn>
                  <TableRowColumn style={SPBHTColumnWidth}>{product.SPBH}</TableRowColumn>
                  <TableRowColumn style={SPPHColumnWidth}>{product.SPPH}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'left' }}>{product.SPMC}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.CKSL}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.BCHS}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.BCSY}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.WHS}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.LSSY}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthRight}>{product.LSHS}</TableRowColumn>
                  <TableRowColumn style={TableHeaderColumnWidthCenter}>
                    <img
                      src='/SurgeryRecoveryRecheck/mark.png' alt=''
                      style={{ display: product.display ? 'none' : 'inline-block' }}
                    />
                    <img
                      src='/SurgeryRecoveryRecheck/mark-1.png' alt=''
                      style={{ display: product.display ? 'inline-block' : 'none' }}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
    )
  }

  render() {
    const customContentStyle = { width: '100%', maxWidth: 'none', height: '800px', marginTop: '20px' }
    const recheckAction = [
      <FlatButton label='取消' onTouchTap={this.props.cancelCallback} style={{ float: 'left', color: '#9B9B9B' }} />,
      <span style={{ fontSize: '1.2rem' }}>{`已复核${this.state.recheckedTypeNumber}种`}</span>,
      <span style={{ fontSize: '1.2rem', marginRight: '1rem' }}>{`${this.state.recheckedNumber}件`}</span>,
      <span style={{ fontSize: '1.2rem' }}>{`未复核${this.state.unrecheckedTypeNumber}种`}</span>,
      <span style={{ fontSize: '1.2rem', marginRight: '18rem' }}>{`${this.state.unrecheckedNumber}件`}</span>,
      <FlatButton label='复核退回' secondary onTouchTap={this.props.rejectCallback} />,
      <FlatButton label='复核通过' primary onTouchTap={this.props.approveCallback} style={{ color: '#00BE9C' }} />
    ]
    return (
      <Dialog
        actions={recheckAction} modal open={this.props.open} bodyStyle={customContentStyle} contentStyle={{ width: '90%' }}
        title={
          <div>
            <span>本次回收汇总</span>
            <span
              style={{ fontSize: '16px', color: 'rgb(65, 161, 255)', fontFamily: 'SourceHanSansCN-Regular', marginLeft: '1.5rem' }}
            >本次回收{this.state.receiveTypes}种{this.state.receiveNumber}件{/* ，本次使用{this.state.usageTypes}种{this.state.usageNumber}件*/}</span>
          </div>
        }
      >
        <div>
          <Card id='cardBorderStyle' style={{ width: '100%', height: 'auto', boxShadow: 'none' }} containerStyle={{ boxShadow: 'none' }}>
            <CardText >{this.singleProductRow(this.props.detailList)}</CardText>
          </Card>
        </div>
      </Dialog>
    )
  }
}

const mapDispatchToProps = {
  // fetchSurgeryLogisticsOrderDetailList,
  fetchSingleReceivingOrderDetail,
  fetchSingleReceivingOrderDetailSuccess
}

const mapStateToProps = state => ({
  // stockList: state.SurgeryLogisticsOrderDetailListReducer.detailArray
  detailList: state.singleReceivingOrderDetailReducer.detailList
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsOrderDetailDialog)
