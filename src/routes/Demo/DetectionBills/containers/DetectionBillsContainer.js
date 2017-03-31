/**
 * Created by liuyali on 2017/1/4.
 */
import {
  connect
} from 'react-redux'

import DetectionBills from '../components/DetectionBills'
import {
  getOrderGoodsDetailAndBills
} from '../modules/detectionBills'

const mapDispatchToProps = {
  getOrderGoodsDetailAndBills: (ddid, type, params) => getOrderGoodsDetailAndBills(ddid, type, params)
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  DetectionBillsData: state.DetectionBillsReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(DetectionBills)
