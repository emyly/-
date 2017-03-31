/**
 * Created by qyf on 2016/10/22.
 */


import React, { Component, PropTypes } from 'react';

import './OrderGoodsDetailSetDateGrid.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import DataGrid from 'components/DataGrid';
// 适用场景：订单详情的商品结算清单
// 对应接口 查看订单关联的商品清单
export default class OrderGoodsDetailSetDateGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [

          {
            label: '物料编号',
            attr: 'SPBH'
          },
          {
            label: '商品名称',
            attr: 'SPMC'
          },
          {
            label: '商品描述',
            attr: 'SPMS'
          },
          {
            label: '商品总数量',
            attr: 'SL'
          }

        ],
        dataSource: [],
        showIndex: true,
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          enableSelectAll: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        }
      }

    };
  }
  static propTypes = {
    // 当前订单ID
    orderId: PropTypes.number,
    getOrderSetData: []

  };
  static defaultProps = {
  };

  // 数据初始化
  componentWillMount = () => {
    this.props.getOrderSetData(this.props.orderId);
  }
  // 退出组件前，数据清理
  componentWillUnmount = () => {
    // this.setState({open : this.props.open});
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        options: Object.assign({}, this.state.options, { dataSource: nextProps.orderGoodsDetailSetDateGrid.orderGoodsSetData }),
      });
  }

  render() {
    return (
      <div className='Order-Detail' >
        <DataGrid options={this.state.options} />
      </div>
    )
  }

}
