import { connect } from 'react-redux'

import OrderDetailForm from './OrderDetailForm';

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  logisticsRecordDateGrid: state.logisticsRecordDateGrid,
  BillSmmryData: state.getBillSmmryData,
  orderBasicInfoForm: state.orderBasicInfoForm,
  gatheringDetailTable: state.gatheringDetailTable,
  billingDetailTable: state.billingDetailTable,
  baddebtsDetailTable: state.baddebtsDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailForm)
