/**
 * Created by liuyali on 2017/1/16.
 */
import {
  connect
} from 'react-redux'

import OrderlistForDetection from '../components/OrderlistForDetection'
import { orderlistForDetection, getRelatedOrgNoPage } from '../modules/orderlistForDetection'
import {
  getOrderGoodsDetailAndBills,resetOrderGoodsDetailAndBills
} from '../modules/detectionBills'

const mapDispatchToProps = {
  orderlistForDetection: (page, params) => orderlistForDetection(page, params),
  getRelatedOrgNoPage: (id, params) => getRelatedOrgNoPage(id, params),
  getOrderGoodsDetailAndBills: (SHJXSID,ddid, type, params) => getOrderGoodsDetailAndBills(SHJXSID,ddid, type, params),
  resetOrderGoodsDetailAndBills: () => resetOrderGoodsDetailAndBills()
}
const mapStateToProps = state => ({
  globalStore: state.globalStore,
  orderlistForDetectionData: state.DetectionBill.orderlistForDetectionReducer,
  DetectionBillsData: state.DetectionBill.DetectionBillsReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderlistForDetection)
