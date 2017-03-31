
/**
 * Created by NXQ on 2017/1/9.
 */

import React, { Component, PropTypes } from 'react';
import DataGrid from 'components/DataGrid';
import './FinancialOrderGoodsDetailsDateGrid.scss';
import CardUI from 'components/StandardUI/StandardCard';

/**
 * 使用场景:财务中订单详情的商品清单
 */
export default class FinancialOrderGoodsDetailsDateGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [
          {
            label: '物料编号',
            attr: 'SPBH',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.SPBH ? row.SPBH : '-' } </div>
            ),
          },
          {
            label: '商品名称',
            attr: 'SPMC',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.SPMC ? row.SPMC : '-' } </div>
            ),
          },
          {
            label: '商品描述',
            attr: 'SPMS',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.SPMS ? row.SPMS : '-' } </div>
            ),
          },
          {
            label: '商品批号',
            attr: 'SPPH',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.SPPH ? row.SPPH : '-' } </div>
            ),
          },
          {
            label: '含税单价',
            attr: 'JSDJ',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.JSDJ ? row.JSDJ : '-' } </div>
            ),
          },
          {
            label: '订购数量',
            attr: 'SL',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.SL ? row.SL : '-' } </div>
            ),
          },
          {
            label: '已发货数量',
            attr: 'JSZSL',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            render: row => (
              <div> { row.JSZSL ? row.JSZSL : '-' } </div>
            ),
          }
        ],
        dataSource: [],
        showIndex: true,
        indexStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '16px',
          color: '#5B83B4',
          background: '#eaecee',
          height: '3.1rem',
          fontWeight: 'bold'
        },
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          enableSelectAll: false,
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
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
    // 列表模式 '0'为订单下所有商品清单 '1'为已开票商品清单  '2'为未开票商品清单
    type: PropTypes.string.isRequired,
    // 当前订单ID
    orderId: PropTypes.number.isRequired
  };
  static defaultProps = {
    // 当前订单下所有商品清单
    type: '0'
  };
  componentWillMount = () => {
    this.props.getFinancialOrderGoodsDetailDate({
      id: this.props.orderId,
      type: this.props.type
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.state.options.dataSource = nextProps.financialOrderGoodsDetailsDateGrid.orderGoodsDetailData;
    this.setState({
      options: this.state.options
    });
  }

  render() {
    return (
      <CardUI
        CardStyle={{ height: 'auto' }}
        expanded title={'商品清单'}
        iconStyleLeft={{ paddingTop: '13px', paddingLeft: '8px', paddingRight: '8px' }}
        avatar={'/FinancialIcon/OrderGoodsDetailsIcon.png'}
        expanded topStyle={{ backgroundColor: '#384357' }}
        CardTextStyle={{ padding: 0, overflow: 'hidden', height: 'auto' }}
      >
        <DataGrid
          options={this.state.options}
          dataGridStyle={{ margin: '0 auto', boxShadow: 'none' }}
        />
      </CardUI>
    )
  }

}
