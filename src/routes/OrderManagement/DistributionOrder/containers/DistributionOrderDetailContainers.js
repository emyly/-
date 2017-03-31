
import {
  connect
} from 'react-redux'

import DistributionOrderDetail from '../components/DistributionOrderDetail.js'

const mapDispatchToProps = {
  // updateReceivingGoodsStatusFalse,
  // getStorageData: (id, type) => getStorageData(id, type),
  // updateReceivingGoods: (receivingGoods, atPerson, message) => updateReceivingGoods(receivingGoods, atPerson, message),
  // clearData: () => clearData(),
  // clearGoods: () => clearGoods()

}


const mapStateToProps = state => ({
  globalStore: state.globalStore,
})

export default connect(mapStateToProps, mapDispatchToProps)(DistributionOrderDetail)
