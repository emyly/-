/**
 * Created by qyf on 2016/10/26.
 */


/**/
import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import CardUI from 'components/StandardUI/StandardCard';
import './LogisticsRecordDateGrid.scss';

const cardHeaderStyle = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'rgb(239, 235, 233)',
}
// 使用场景:物流发货记录详情列表
// 接口:物流发货，订单对应的出库和物流记录查询
/**
 *这个组件已经不用了
 * */
export default class LogisticsRecordDateGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    organizationId: PropTypes.number.isRequired,
    // 显示已发货记录//发货状态 0:已发货记录&待发货记录 1:已发货记录2:代表待发货状态
    FHZT: PropTypes.number.isRequired
  };
  static defaultProps = {
    // 1:已发货记录
    FHZT: 1

  };
  /* 发货状态*/
  storageOutTypeJudge = (value) => {
    if (value === null) {
      return '未发货'
    } else {
      return '已发货';
    }
  };
  componentWillMount() {
    this.props.getLogisticsRecordDate(this.props.orderId, [1]);
  }
  // componentWillReceiveProps(nextProps) {
  //  if (nextProps.orderId !== this.props.orderId || nextProps.FHZT !== this.props.FHZT) {
  //    this.props.getLogisticsRecordDate(nextProps.orderId, nextProps.FHZT)
  //  }
  // }

  render() {
    const style = {
      paddingLeft: 3,
      paddingRight: 3,
      fontSize: '16px',
      color: '#5B83B4',
      letterSpacing: '0.26px',
      textAlign: 'center',
      backgroundColor: '#364357'
    };
    return (
      <div className='LogicticsRecord'>
        <Table displaySelectAll={false} selectable={false} style={this.props.style}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ backgroundColor: '#364357', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow style={{ paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#5B83B4', letterSpacing: '0.26px', textAlign: 'center' }}>
              <TableHeaderColumn style={style}>出库单号</TableHeaderColumn>
              <TableHeaderColumn style={style} >物流单号</TableHeaderColumn>
              <TableHeaderColumn style={style}>出库仓库</TableHeaderColumn>
              <TableHeaderColumn style={style}>发货日期</TableHeaderColumn>
              <TableHeaderColumn style={style}>发货状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover>
            {
              this.props.logisticsRecordDateGrid.logisticsRecordDate.map((value, index) => (
                <TableRow key={`table_body_data_${index}`}>
                  <TableRowColumn style={{ textAlign: 'center' }}>{value.CRKID}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>{value.WLDH}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>{value.CKMC}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>{this.changeDataFormat(value.SFSJ, true)}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>{this.storageOutTypeJudge(value.WLDH)}</TableRowColumn>
                </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}
