/**
 * Created by magellan on 2016/11/9.
 */

import { connect } from 'react-redux'
import {
  getLogisticsDetailData
} from 'components/LogisticsDetailDialog/modules/logisticsDetailDialog'
import {
  getWarehouseOutDetailData,
  initLogisticsDetailData
} from 'components/WarehouseOutDetailDialog/modules/warehouseOutDetailDialog'

import LogisticsDeliveryPrint from '../components/LogisticsDeliveryPrint'

const mapDispatchToProps = {
  getLogisticsDetailData: params => getLogisticsDetailData(params),
  getWarehouseOutDetailData: params => getWarehouseOutDetailData(params),
  initLogisticsDetailData: () => initLogisticsDetailData()
}

const mapStateToProps = state => ({
  warehouseOutDetailDialog: state.warehouseOutDetailDialog,
  orderBasicInfoForm: state.orderBasicInfoForm,
  getPersonalBasicInfo: state.getPersonalBasicInfo,
  logisticsDetailDialog: state.logisticsDetailDialog,
  pickingRecordDateGrid: state.pickingRecordDateGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsDeliveryPrint)
