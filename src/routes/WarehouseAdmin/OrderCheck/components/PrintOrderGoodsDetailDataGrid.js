/**
 * Created by liuyali on 2017/2/28.
 */
import React, { Component, PropTypes } from 'react';
import './PrintOrderGoodsDetailDataGrid.scss';
/*
 * 使用场景:订单详情的商品清单
 * 接口:查看订单关联的商品清单* */
export default class PrintOrderGoodsDetailDataGrid extends Component {
  state = {
    tableData: [],
    total: 0,
    category: 0

  }
  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        tableData: nextProps.PrintOrderGoodsDetailData.orderGoodsDetailData,
        category: nextProps.PrintOrderGoodsDetailData.orderGoodsDetailData.length,
        total: nextProps.PrintOrderGoodsDetailData.orderGoodsDetailData.reduce((prev, cur, arr) => prev + cur.SL, 0)
      });
  }

  render() {
    return (
      <div className='col-lg-12 col-md-12 col-sm-12 printTableWrapper'>
        <table className='printTable'>
          <thead>
            <tr>
              <td style={{ width: '20%' }}>产品编号</td>
              <td style={{ width: '45%' }}>产品描述</td>
              <td style={{ width: '5%' }}>数量</td>
              <td style={{ width: '30%' }}>备注</td>
            </tr>
          </thead>
          <tbody>
            {
            this.state.tableData.map((element, index) => <tr key={index + 1}>
              <td style={{ width: '20%' }}>{element.SPBH}</td>
              <td style={{ width: '45%', fontSize: Number((element.SPMS || '').length) > 20 ? '10px' : '12px' }}>{element.SPMS}</td>
              <td s style={{ width: '5%', textAlign: 'right' }}>{element.SL}</td>
              <td style={{ minWidth: '30%' }} />
            </tr>)
          }
          </tbody>
        </table>
        <p style={{ marginBottom: '3rem', fontSize: '12px' }}>合计：{this.state.category}种{this.state.total}件</p>
        <div className='selectSign'>
          <div>配货：</div>
          <div>配货检查：</div>
          <div>工具配货：</div>
          <div>工具检查：</div>
        </div>
        <div className='selectSign'>
          <div>送货：</div>
          <div>回收：</div>
          <div>回收检查：</div>
          <div />
        </div>
      </div>
    )
  }

}
