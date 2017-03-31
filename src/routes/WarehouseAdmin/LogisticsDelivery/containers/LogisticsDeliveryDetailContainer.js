/**
 * Created by magellan on 2016/11/9.
 */

import { connect } from 'react-redux'

import { postLogisticsDeliverySend } from '../modules/logisticsDeliveryDetail'
import {
  getPickingRecordDate
} from 'components/PickingRecordDateGrid/modules/pickingRecordDateGrid'
import OutWarehouseCheckDetail from '../components/LogisticsDeliveryDetail'

const mapDispatchToProps = {
  postLogisticsDeliverySend,
  getPickingRecordDate: (id, type) => getPickingRecordDate(id, type)
}

const mapStateToProps = state => ({
  logisticsDeliveryDetail: state.logisticsDeliverySend,
  globalStore: state.globalStore,
  orderBasicInfoForm: state.orderBasicInfoForm,
  pickingRecordDateGrid: state.pickingRecordDateGrid,
  warehouseOutDetailDialog: state.warehouseOutDetailDialog,
})

export default connect(mapStateToProps, mapDispatchToProps)(OutWarehouseCheckDetail)
