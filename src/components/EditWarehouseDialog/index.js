/**
 * Created by chenming on 2016/12/1.
 */
import EditWarehouseDialog from './EditWarehouseDialog';
import { initLocationData } from 'components/Location/modules/location'
import {
  connect
} from 'react-redux'
import {
  getWarehouseDetailData,
  putWarehouseDetailData,
  postCreateNewWarehouse,
  initEditWarehouseDetailDialogData,
  getLocationId
} from './modules/editWarehouseDialog'

// 绑定action
const mapDispatchToProps = {
  getWarehouseDetailData: params => getWarehouseDetailData(params), // 暂不用
  putWarehouseDetailData: params => putWarehouseDetailData(params),
  postCreateNewWarehouse: params => postCreateNewWarehouse(params),
  initLocationData: params => initLocationData(params),
  initEditWarehouseDetailDialogData: () => initEditWarehouseDetailDialogData(),
  getLocationId: params => getLocationId(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  editWarehouseDialog: state.editWarehouseDialog,
  globalStore: state.globalStore,
  locationData: state.LocationReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(EditWarehouseDialog)
