/**
 * Created by chenming on 2016/10/24.
 */
import LogisticsDetailDialog from './LogisticsDetailDialog';

import {
  connect
} from 'react-redux'
import {
  getLogisticsDetailData,
} from './modules/logisticsDetailDialog'
import {
  getWarehouseOutDetailData
} from 'components/WarehouseOutDetailDialog/modules/warehouseOutDetailDialog'
// 绑定action
const mapDispatchToProps = {
  getLogisticsDetailData: params => getLogisticsDetailData(params),
  getWarehouseOutDetailData: params => getWarehouseOutDetailData(params),
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  logisticsDetailDialog: state.logisticsDetailDialog,
  logisticSelect: state.logisticSelect,
  orderBasicInfoForm: state.orderBasicInfoForm,
  warehouseOutDetailDialog: state.warehouseOutDetailDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsDetailDialog)
