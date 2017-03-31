/**
 * Created by liuyali on 2016/10/28.
 */
/**
 * Created by liuyali on 2016/10/24.
 */


import React, { Component, PropTypes } from 'react';
import './PutGoodsDetailDataGrid.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


export default class PutGoodsDetailDataGrid extends Component {
  state = {
    showCheckboxes: false
  }
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    GUID: 123,
    CKRK: 123,
    DDLX: 123,
  }
  static propTypes = {
    GUID: React.PropTypes.number.isRequired,
    CKRK: React.PropTypes.number.isRequired,
    DDLX: React.PropTypes.number.isRequired
  }
  componentWillMount() {
    //  根据orderid和orgid异步获取tableData
    const tabledata = {
      stuffId: 71336450,
      goodName: '髋关节系统',
      goodDes: '单半径髋臼杯 50MM',
      orderAmount: 60,
      notDeliveryAmount: 40,
      deliveriedAmount: 20,
      putAmount: 10,
      notPutAmount: 30
    };
    this.setState({
      tabledata
    });
  }

  render() {
    const { tabledata } = this.state;
    return (
      <div className='OrderDetailsList' >
        <strong>入库单中商品明细表格</strong>
        <Table>
          <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false}>
            <TableRow >
              <TableHeaderColumn colSpan='4' className='IdcolH'>物料编号：{tabledata.stuffId}</TableHeaderColumn>
            </TableRow>
            <TableRow >
              <TableHeaderColumn colSpan='4' className='IdcolH'>
                <h3>{tabledata.goodName}</h3>
                <p>{tabledata.goodDes}</p>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={false}>
            <TableRow >
              <TableRowColumn className='dcol' rowSpan='2'>
                <div>订购总数</div>
                <div>{tabledata.orderAmount}</div>
              </TableRowColumn>
              <TableRowColumn colSpan='2' className='dcol'>
                <div>发货数量</div>
                <div>{tabledata.deliveriedAmount}</div>
              </TableRowColumn>
              <TableRowColumn className='dcol' rowSpan='2'>
                <div>未发货</div>
                <div>{tabledata.notDeliveryAmount}</div>
              </TableRowColumn>
            </TableRow>
            <TableRow >
              <TableRowColumn className='dcol'>
                <div>已入库</div>
                <div>{tabledata.putAmount}</div>
              </TableRowColumn>
              <TableRowColumn className='dcol'>
                <div>未入库</div>
                <div>{tabledata.notPutAmount}</div>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}
