/**
 * Created by liuyali on 2016/11/17.
 */
import {
  connect
} from 'react-redux'

import {
  checkInProfitLoss, getEndInventoryRecords, clearStore
} from '../modules/checkInProfitLoss'

import CheckInProfitLost from '../components/CheckInProfitLost';

const mapDispatchToProps = {
  checkInProfitLoss: params => checkInProfitLoss(params),
  clearStore: () => clearStore(),
  getEndInventoryRecords: () =>　getEndInventoryRecords()
}

const mapStateToProps = state => ({
  checkInProfitLossData: state.CheckInProfitLost,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInProfitLost)
