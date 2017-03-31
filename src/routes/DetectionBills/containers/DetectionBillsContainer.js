/**
 * Created by liuyali on 2017/1/4.
 */
import {
  connect
} from 'react-redux'
import DetectionBills from '../components/DetectionBills'
import {
  getOrderGoodsDetailAndBills, resetOrderGoodsDetailAndBills
} from '../modules/detectionBills'

const mapDispatchToProps = {
  getOrderGoodsDetailAndBills: (SHJXSID,ddid, type, params) => getOrderGoodsDetailAndBills(SHJXSID,ddid, type, params),
  resetOrderGoodsDetailAndBills: () => resetOrderGoodsDetailAndBills()
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  DetectionBillsData: state.DetectionBill.DetectionBillsReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(DetectionBills)
