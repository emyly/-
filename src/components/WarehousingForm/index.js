/**
 * Created by qyf on 2016/11/11.
 */
import WarehousingForm from './WarehousingForm';

import {
  connect
} from 'react-redux'
import {
  addOrSubtract,
  modCurrentKWID,
  fetchSingleLogisticsDetail,
  dealCurrentWLDSuccess,
  clearData
} from './moudles/logisticsDetail'
import {
  fetchOrderLogisticsInfo
} from './moudles/orderLogisticsInfo'
import {
  updateReceivingGoods,
  clearGoods
} from './moudles/receivingGoods'

const mapDispatchToProps = {
  fetchSingleLogisticsDetail: (ddid, wldh) => fetchSingleLogisticsDetail(ddid, wldh),
  fetchOrderLogisticsInfo: guid => fetchOrderLogisticsInfo(guid),
  updateReceivingGoods: (receivingGoods, atPerson, message) => updateReceivingGoods(receivingGoods, atPerson, message),
  dealCurrentWLD: id => dealCurrentWLDSuccess(id),
  addOrSubtract: (kwid, wldh, ddid, ddlx, spph, spbh, mount, data) => addOrSubtract(kwid, wldh, ddid, ddlx, spph, spbh, mount, data),
  modCurrentKWID,
  clearData: () => clearData(),
  clearGoods: () => clearGoods()
}
const mapStateToProps = state => ({
  logisticsDetail: state.logisticsDetail,
  orderLogisticsInfo: state.orderLogisticsInfo,
  receivingGoods: state.receivingGoods,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(WarehousingForm)
