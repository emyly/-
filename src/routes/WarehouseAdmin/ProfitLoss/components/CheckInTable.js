/* 表格组件*/
import React, { Component, PropTypes } from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  // TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class CheckInTable extends Component {
  static propTypes = {
    tableData: React.PropTypes.object.isRequired,
    KWMC: React.PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
  }

  state = {
    showCheckboxes: false,
  };

  getRows =(data) => {
    const rows = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        rows.push(<TableRow selectable={this.state.showCheckboxes}>
          <TableRowColumn className='colRow' colSpan='5'>&#62;&#62;{this.props.KWMC[key]}</TableRowColumn>
        </TableRow>)
        const details = data[key].map((row, index2) => {
          const cols = [];
          cols.push(<TableRowColumn className='col' key={index2 + 1}>{row.SPBH}</TableRowColumn>);
          cols.push(<TableRowColumn className='col' key={index2 + 1}>{row.SPMC}</TableRowColumn>);
          cols.push(<TableRowColumn className='col' key={index2 + 1}>{row.SPPH}</TableRowColumn>);
          cols.push(<TableRowColumn className='col' key={index2 + 1}>{row.SL}</TableRowColumn>);
          cols.push(<TableRowColumn className='col' key={index2 + 1}>
            <input value={row.XZSL} onChange={this.props.callback(key, index2)} name={index2 + 1} style={{ textAlign: 'center' }} type='text' />
          </TableRowColumn>);

          return <TableRow>{cols}</TableRow>;
        });
        rows.push(details);
      }
    }
    if (rows.length > 0) {
      return rows;
    }
    return <TableRow selectable={this.state.showCheckboxes}><TableRowColumn className='col' colSpan='5'>暂无数据.</TableRowColumn></TableRow>
  }

  componentWillReceiveProps(nextProp) {
  }

  render() {
    return (
      <Table selectable={false} className='tableContent'>
        <TableHeader adjustForCheckbox={this.state.showCheckboxes} displaySelectAll={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn className='colH'>物料编号</TableHeaderColumn>
            <TableHeaderColumn className='colH'>商品名称</TableHeaderColumn>
            <TableHeaderColumn className='colH'>商品批号</TableHeaderColumn>
            <TableHeaderColumn className='colH'>库存数量</TableHeaderColumn>
            <TableHeaderColumn className='colH'>损溢后数量</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
          {
            this.getRows(this.props.tableData)
          }
        </TableBody>

      </Table>
    );
  }
}
