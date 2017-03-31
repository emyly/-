/**
 * Created by liuyali on 2016/10/26.
 */
import React, { Component, PropTypes } from 'react';
import './BillSummaryDataGrid.scss';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CardUI from 'components/StandardUI/StandardCard';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
const cardHeaderStyle = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'rgb(239, 235, 233)',
}
/*
*场景：账单汇总
* 接口：订单.md => 查询订单的账单汇总信息
* GET:/DDB/:ddid/ZDHZ
* */
export default class BillSummaryDataGrid extends Component {
  state = {
    tableData: {}
  }
  static propTypes = {
    ddid: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getBillSmmryData(this.props.ddid);
  }
  plusYuan = num => (`￥${num}.00`);

  render() {
    const tabledata = this.props.BillSmmryData.data;

    return (
      <CardUI CardStyle={this.props.style} expanded title={this.props.title} avatar={this.props.avatar} label={this.props.label}>
        <Table className='summaryTable'>
          <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn className='bigTd' rowSpan='3'>
                <div className='bigFont'>应收金额</div>
                <div className='bigFont' style={{ color: 'red' }}> {this.plusYuan(tabledata.ysje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' rowSpan='3'>
                =
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>订单金额</div>
                <div className='lh'> {this.plusYuan(tabledata.ddje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                -
              </TableRowColumn>
              <TableRowColumn>
                <div className='lh'>折扣金额</div>
                <div className='lh'> {this.plusYuan(tabledata.zkje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>加急金额</div>
                <div className='lh'> {this.plusYuan(tabledata.jjje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>物流金额</div>
                <div className='lh'> {this.plusYuan(tabledata.wlfy)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                -
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>坏账金额</div>
                <div className='lh'> {this.plusYuan(tabledata.hzje)}</div>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn >
                <div className='lh'>已收款金额</div>
                <div className='lh'> {this.plusYuan(tabledata.yskje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>未收款金额</div>
                <div className='lh'> {this.plusYuan(tabledata.wskje)}</div>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn >
                <div className='lh'>已开票金额</div>
                <div className='lh'> {this.plusYuan(tabledata.ykpje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>未开票金额</div>
                <div className='lh'> {this.plusYuan(tabledata.wkpje)}</div>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardUI>
    );
  }
}
