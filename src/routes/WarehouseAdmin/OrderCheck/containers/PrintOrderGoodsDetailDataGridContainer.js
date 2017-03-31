/**
 * Created by liuyali on 2017/2/28.
 */
import PrintOrderGoodsDetailDataGrid from '../components/PrintOrderGoodsDetailDataGrid';

import {
  connect
} from 'react-redux'

// import {
//   getOrderGoodsDetailDate
// } from '../../../../components/OrderGoodsDetailDateGrid/modules/orderGoodsDetailDateGrid'
//
// const mapDispatchToProps = {
//   getOrderGoodsDetailDate: id => getOrderGoodsDetailDate(id)
// }

const mapStateToProps = state => ({
  PrintOrderGoodsDetailData: state.orderGoodsDetailDateGrid
})

export default connect(mapStateToProps)(PrintOrderGoodsDetailDataGrid)
