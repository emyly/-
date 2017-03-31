/**
 * Created by chenming on 2016/10/24.
 */
import WarehouseOutDetailDialog from './WarehouseOutDetailDialog';

import {
  connect
} from 'react-redux'
import {
  getWarehouseOutDetailData
} from './modules/warehouseOutDetailDialog'
import {
  setBillingUploadInit
} from 'components/BillingUpload/modules/billingUpload'
// 绑定action
const mapDispatchToProps = {
  setBillingUploadInit: () => setBillingUploadInit(),
  getWarehouseOutDetailData: params => getWarehouseOutDetailData(params),

}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  warehouseOutDetailDialog: state.warehouseOutDetailDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseOutDetailDialog)

