/**
 * Created by qyf on 2016/10/22.
 */
import OrderGoodsDetailDateGrid from './OrderGoodsDetailDateGrid';

import {
  connect
} from 'react-redux'
import {
  getOrderGoodsDetailDate
} from './modules/orderGoodsDetailDateGrid'
const mapDispatchToProps = {
  getOrderGoodsDetailDate: id => getOrderGoodsDetailDate(id)
}

const mapStateToProps = state => ({
  orderGoodsDetailDateGrid: state.orderGoodsDetailDateGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderGoodsDetailDateGrid)
