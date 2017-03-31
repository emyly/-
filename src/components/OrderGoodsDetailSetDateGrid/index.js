/**
 * Created by qyf on 2016/10/22.
 */
import OrderGoodsDetailSetDateGrid from './OrderGoodsDetailSetDateGrid';


import {
  connect
} from 'react-redux'
import { getOrderSetData } from './modules/orderGoodsDetailSetDateGrid'
const mapDispatchToProps = {
  getOrderSetData: id => getOrderSetData(id)
}

const mapStateToProps = state => ({
  orderGoodsDetailSetDateGrid: state.orderGoodsDetailSetDateGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderGoodsDetailSetDateGrid)
