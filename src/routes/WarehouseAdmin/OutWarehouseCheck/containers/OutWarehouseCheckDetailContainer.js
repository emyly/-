/**
 * Created by magellan on 2016/11/9.
 */

import { connect } from 'react-redux'

import { postOutWarehouseCheck } from '../modules/outWarehouseCheckDetail'
import {
  getSelectProductionRecord,
} from 'components/SelectProductionRecordTable/modules/selectProductionRecordTable'
import OutWarehouseCheckDetail from '../components/OutWarehouseCheckDetail'

const mapDispatchToProps = {
  postOutWarehouseCheck,
  getSelectProductionRecord: (id, type) => getSelectProductionRecord(id, type)
}

const mapStateToProps = state => ({
  outWarehouseCheckDetail: state.outWarehouseCheckDetail,
  globalStore: state.globalStore,
  selectProductionRecordTable: state.selectProductionRecordTable,
  orderBasicInfoForm: state.orderBasicInfoForm.orderData
})

export default connect(mapStateToProps, mapDispatchToProps)(OutWarehouseCheckDetail)
