/**
 * Created by liuyali on 2016/12/14.
 */


import './OrderTrack.scss'

import React, { Component } from 'react';
import moment from 'moment'

/* 公共组件*/
import StandardDataGrid from 'components/StandardDataGrid';
// import PageGrid from '../../../../components/PageGrid';
// import OrderSearch from 'components/OrderSearch'

export default class OrderTrack extends Component {
  state = {
    params: {}
  }
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static propTypes = {
    getFilterOrderListData: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.getFilterOrderListData()
  }
  getTableData =() => ({
    columnOptions: [
      {
        label: '订单号',
        attr: 'DDID',
        style: { textAlign: 'center' }
      },
      {
        label: '购货方',
        attr: 'GHF',
        style: { textAlign: 'center', }
      }, {
        label: '下单时间',
        attr: 'XDSJ',
        style: { textAlign: 'center' },
        formater: (time) => {
          const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
          return date;
        },
      },
      {
        label: '医院名称',
        attr: 'YYMC',
        style: { textAlign: 'center' }
      }, {
        label: '送货时间',
        attr: 'SHSJ',
        style: { textAlign: 'center' },
        formater: (time) => {
          const date = moment(time).format('MM/DD HH:mm') === 'Invalid date' ? '--' : moment(time).format('MM/DD HH:mm');
          return date;
        },
      }, {
        label: '手术时间',
        attr: 'YXQZ',
        formater: (time) => {
          const date = moment(time).format('MM/DD HH:mm') === 'Invalid date' ? '--' : moment(time).format('MM/DD HH:mm');
          return date;
        },
        style: { textAlign: 'center' }
      }, {
        label: '手术类型',
        attr: 'SHLX',
        style: { textAlign: 'center' }
      }
    ],
    dataSource: [],
    tableAttrs: {
      onCellClick: this.getGoodDetail
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false,
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    showIndex: true,
    pagination: {
      currentPage: 1,
      totalCount: 0,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.getFilterOrderListData(page, this.state.params)
      }
    }
  })
  getFilterResult = (params) => {

  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <StandardDataGrid
          iconPosition='-210px -90px' title='订单追踪' message='...
' filterTitle=''
        >
          {/* <OrderSearch callback = {this.getFilterResult} filters = {['property','pack','expireDate']} />*/}
          {/* <PageGrid options={this.getTableData()}/>*/}
          内容正在开发中.....
        </StandardDataGrid>
      </div>
    );
  }
}
