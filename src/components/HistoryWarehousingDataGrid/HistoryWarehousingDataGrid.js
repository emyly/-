/**
 * Created by qyf on 2016/10/30.
 */

import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import WarehouseInDetailDialog from 'components/WarehouseInDetailDialog'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CardUI from 'components/StandardUI/StandardCard';
import moment from 'lib/moment'

export default class HistoryWarehousingDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTitle: '',
      warehouseInOpen: true,
      crkdid: null,
      dialogContent: ''
    };
  }
  static PropTypes = {
    // 0.出库，1：入库
    CGRK: PropTypes.string.isRequired,
    /* 当前订单id*/
    orderId: PropTypes.string.isRequired

  }
  handleClose = () => {
    warehouseInOpen: false
  }
  changeDataFormat = (date, flag) => {
    const tempDate = new Date(date);
    const yy = `${tempDate.getFullYear()}-`;
    const mm = `${tempDate.getMonth() + 1}-`;
    const dd = `${tempDate.getDate()} `;
    const hh = `${tempDate.getHours()}:`;
    const ii = `${tempDate.getMinutes()}:`;
    const ss = tempDate.getSeconds();
    if (flag) {
      return (yy + mm + dd + hh + ii + ss);
    } else {
      return (yy + mm + dd);
    }
  };
  static defaultProps = {

  };
  componentWillUnmount = () => {
  };
  warehouseInHandleopen = e => () => {
    this.setState({
      dialogContent: <WarehouseInDetailDialog paramsObj={[{ DDID: this.props.orderId, CRKDID: e }]} open={this.state.warehouseInOpen} confirmCallBack={this.handleClose} />,
      warehouseInOpen: true
    });
  };
  componentWillMount() {
    this.props.getHistoryWarehousing(this.props.orderId, '1');
  }
  render() {
    // const cardHeaderStyle = {
    //   borderBottomWidth:'1px',
    //   borderBottomStyle: 'solid',
    //   borderBottomColor:'rgb(239, 235, 233)'
    // };
    const TableHeaderColumnStyle = {
      paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center', backgroundColor: '#EAECEE'
    };
    return (
      <CardUI expanded title='历次入库记录' iconStyleLeft={{ marginTop: '20px', marginRight: '23px', marginLeft: '-16px' }} avatar='/Shape.png' label='' CardTextStyle={{ padding: 0 }}>
        {
        this.state.dialogContent
      }
        <Table displaySelectAll={false} selectable={false} fixedHeader={true} height={220}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ backgroundColor: '#EAECEE', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow>
              <TableHeaderColumn style={TableHeaderColumnStyle}>入库日期</TableHeaderColumn>
              <TableHeaderColumn style={TableHeaderColumnStyle}>操作人</TableHeaderColumn>
              <TableHeaderColumn style={TableHeaderColumnStyle}>入库单号</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover={false}>
            {
            (() => {
              if (this.props.historyWarehousingDataGrid.historyWarehousingDate.length > 0) {
                return (
                  this.props.historyWarehousingDataGrid.historyWarehousingDate.map((value, index) => (
                    <TableRow key={`table_body_data_${index}`} >
                      <TableRowColumn style={{ textAlign: 'center' }}>{moment(value.CJSJ).format('YYYY-MM-DD HH:mm')}</TableRowColumn>
                      <TableRowColumn style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
                      <TableRowColumn style={{ textAlign: 'center' }}>
                        <span onClick={this.warehouseInHandleopen(value.GUID)} style={{ cursor: 'pointer', color: '#00A0FF' }}>{value.GUID}</span>
                      </TableRowColumn>
                    </TableRow>
                    ))
                )
              } else {
                return (
                  <TableRow selectable={this.state.showCheckboxes}>
                    <TableRowColumn style={{ textAlign: 'center' }} colSpan='3'>暂无数据.</TableRowColumn>
                  </TableRow>
                )
              }
            })()
          }
          </TableBody>
        </Table>
      </CardUI>
    );
  }
}
