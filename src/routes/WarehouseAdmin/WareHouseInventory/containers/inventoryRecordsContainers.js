/**
 * Created by liuyali on 2016/11/8.
 */
import {
  connect
} from 'react-redux'

import {
  getInventoryRecordsData,
} from '../modules/getInventoryRecords'

import {
  beginInventoryRecords, checkInventoryStatus, setBeginInventoryInit
} from '../modules/beginInventoryRecords'

import {
  endInventoryRecords
} from '../modules/endInventoryRecords'


import InventoryRecords from '../components/inventoryRecords';

const mapDispatchToProps = {
  DgetInventoryRecordsData: (page = 1) => getInventoryRecordsData(page),
  DbeginInventoryRecords: params => beginInventoryRecords(params),
  DendInventoryRecords: (id, currentPage) => endInventoryRecords(id, currentPage),
  checkInventoryStatus: id => checkInventoryStatus(id),
  setBeginInventoryInit: () => setBeginInventoryInit()
}

const mapStateToProps = state => ({
  getinventoryRecords: state.inventoryRecords.getInventoryRecords,
  beginInventoryRecords: state.inventoryRecords.beginInventoryRecords,
  endInventoryRecords: state.inventoryRecords.endInventoryRecords,
  personalBasicInfo: state.getPersonalBasicInfo,
  globalStore: state.globalStore
})


export default connect(mapStateToProps, mapDispatchToProps)(InventoryRecords)
