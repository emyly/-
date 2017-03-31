/**
 * Created by qyf on 2016/11/10.
 */
import {
  connect
} from 'react-redux'
import {
  getStorageData
} from '../modules/recevingStorage'
import {
  updateReceivingGoods, updateReceivingGoodsStatusFalse, clearGoods
} from '../../../../components/WarehousingForm/moudles/receivingGoods'
import {
  clearData
} from '../../../../components/WarehousingForm/moudles/logisticsDetail'
import RecevingStorage from '../components/RecevingStorage'

const mapDispatchToProps = {
  updateReceivingGoodsStatusFalse,
  getStorageData: (id, type) => getStorageData(id, type),
  updateReceivingGoods: (receivingGoods, atPerson, message) => updateReceivingGoods(receivingGoods, atPerson, message),
  clearData: () => clearData(),
  clearGoods: () => clearGoods()

}

const mapStateToProps = state => ({
  recevingStorage: state.recevingStorage,
  globalStore: state.globalStore,
  receivingGoods: state.receivingGoods,
  logisticsDetail: state.logisticsDetail
})

export default connect(mapStateToProps, mapDispatchToProps)(RecevingStorage)
