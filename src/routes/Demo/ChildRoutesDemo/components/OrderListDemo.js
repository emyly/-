/**
 * Created by NXQ on 2016/10/20.
 */

import React, { Component, PropTypes } from 'react';

import './OrderListDemo.scss';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class OrderListDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      table_data: {
        table_header_title: ['订单id', '订单名称', '订单状态'],
        table_body_data: [
          {
            data: [1001, '订单1', '外审中...']
          },
          {
            data: [1002, '订单2', '内审中...']
          },
          {
            data: [1003, '订单3', '外审中...']
          },
          {
            data: [1004, '订单4', '内审中...']
          },
          {
            data: [1005, '订单5', '外审中...']
          },
          {
            data: [1006, '订单6', '内审中...']
          },
          {
            data: [1007, '订单7', '外审中...']
          }
        ]
      }
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  handleCellClick = (e) => {
    console.log(e);
    const id = this.state.table_data.table_body_data[e].data[0];
    this.context.router.push(`/childRoutesDemo/orderdetail/${id}`);
  };
  render() {
    return (
      <div className='order-list-demo'>
        <Table displaySelectAll={false} selectable onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {
                this.state.table_data.table_header_title.map((value, index) => <TableHeaderColumn key={`table_header_title_${index}`}>{value}</TableHeaderColumn>)
              }
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover={false}>
            {
              this.state.table_data.table_body_data.map((value, index) => <TableRow key={`table_body_data_${index}`}>
                {
                    value.data.map((sub_value, sub_index) => <TableRowColumn key={`table_body_sub_data_${sub_index}`}>{sub_value}</TableRowColumn>)
                  }
              </TableRow>)
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}
