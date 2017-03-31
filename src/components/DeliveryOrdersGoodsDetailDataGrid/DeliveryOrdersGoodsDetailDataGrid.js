/**
 * Created by liuyali on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import './deliveryOrdersGoodsDetailDataGrid.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class DeliveryOrdersGoodsDetail extends Component {
  state = {
    showCheckboxes: false
  }
  constructor(props) {
    super(props);
  }

  static propTypes = {
    GUID: React.PropTypes.number.isRequired,
    CKRK: React.PropTypes.string.isRequired,
    DDLX: React.PropTypes.string.isRequired
  }
  componentWillMount() {
    this.props.getDlryOrdersGoodsData(this.props.GUID, this.props.CKRK, this.props.DDLX);
  }

  render() {
    return (
      <div className='OrderDetailsList' >
        <strong>获取订单的出库商品详情汇总</strong>
        {
             this.props.getDlryOrdersGoods.OrdersGoodsData.map((tabledata, index) => <div style={{ marginBottom: 50 }} key={index + 1}>
               <Table>
                 <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
                   <TableRow >
                     <TableHeaderColumn className='dcolH'>物料</TableHeaderColumn>
                     <TableHeaderColumn className='dcolH'>品名</TableHeaderColumn>
                     <TableHeaderColumn className='dcolH'>描述</TableHeaderColumn>
                     <TableHeaderColumn colSpan='4' className='dcolH'>数量</TableHeaderColumn>
                   </TableRow>
                 </TableHeader>
                 <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={false}>
                   <TableRow >
                     <TableRowColumn className='dcol' rowSpan='2'>
                       {tabledata.stuffId}
                     </TableRowColumn>
                     <TableRowColumn className='dcol' rowSpan='2'>
                       {tabledata.goodName}
                     </TableRowColumn>
                     <TableRowColumn className='dcol' rowSpan='2'>
                       {tabledata.goodDes}
                     </TableRowColumn>
                     <TableRowColumn className='dcol' rowSpan='2'>
                       <div>订购总数</div>
                       <div>{tabledata.totalAmount}</div>
                     </TableRowColumn>
                     <TableRowColumn className='dcol'>
                       <div>已复核</div>
                       <div>{tabledata.alreadyChecked}</div>
                     </TableRowColumn>
                     <TableRowColumn className='dcol'>
                       <div>待复核</div>
                       <div>{tabledata.waitingChecked}</div>
                     </TableRowColumn>
                     <TableRowColumn className='dcol' rowSpan='2'>
                       <div>未拣货</div>
                       <div>{tabledata.waitingSelectingGoods}</div>
                     </TableRowColumn>
                   </TableRow>
                   <TableRow >
                     <TableRowColumn className='dcol' colSpan='2'>
                       <div className='row'><div className='col-xs-6'>已拣货</div><div className='col-xs-6'>{tabledata.selectedGoods}</div></div>
                     </TableRowColumn>
                   </TableRow>
                 </TableBody>
               </Table>
             </div>)
           }

      </div>
    )
  }
}
