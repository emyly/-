/**
 * Created by chenming on 2016/10/24.
 */
import WarehouseInDetailDialog from './WarehouseInDetailDialog';

import {
  connect
} from 'react-redux'
import {
  getWarehouseInDetailData
} from './modules/warehouseInDetailDialog'
// 绑定action
const mapDispatchToProps = {
  getWarehouseInDetailData: params => getWarehouseInDetailData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  warehouseInDetailDialog: state.warehouseInDetailDialog,
  orderBasicInfoForm: state.orderBasicInfoForm
})

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseInDetailDialog)

