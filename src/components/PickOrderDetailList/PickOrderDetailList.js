/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './PickOrderDetailList.scss'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const dataSource = [{
  productionId: 1,
  productionName: '名字',
  productionSpec: 3,
  orderNum: 4,
  checkEd: 5,
  waitCheck: 6,
  pickEd: 7,
  waitPick: 8
}, {
  productionId: 1,
  productionName: '名字',
  productionSpec: 3,
  orderNum: 4,
  checkEd: 5,
  waitCheck: 6,
  pickEd: 7,
  waitPick: 8
}]


/**
 * 使用场景：拣货单详情
 */
export default class PickOrderDetailList extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    // 数据
    dataSource: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        配货商品汇总：
        {dataSource.map((data, index) => (
          <Table key={`PickOrderDetailListTable${index}`}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{ color: '#e0e0e0' }}>物料编号：{data.productionId}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>{data.productionName}<br />{data.productionSpec}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{ border: '1px solid #e0e0e0' }} rowSpan='2' >订购总数<br />{data.orderNum}</TableRowColumn>
                <TableRowColumn style={{ border: '1px solid #e0e0e0' }} >已复核<br />{data.checkEd}</TableRowColumn>
                <TableRowColumn style={{ border: '1px solid #e0e0e0' }} >待复核<br />{data.waitCheck}</TableRowColumn>
                <TableRowColumn style={{ border: '1px solid #e0e0e0' }} rowSpan='2'>未拣货<br />{data.waitPick}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{ border: '1px solid #e0e0e0' }} colSpan='2'>已拣货&nbsp;&nbsp;&nbsp;&nbsp;{data.pickEd}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>))}
      </div>
    )
  }
}
