/**
 * Created by liuyali on 2016/11/23.
 */
import {
    connect
} from 'react-redux'

import {
    surgeryRecoveryGoodsSummary
} from '../modules/surgeryRecoveryGoodsSummary'

import {
    historyRecoveryRecords
} from '../modules/historyRecoveryRecords'

import SugeryRecoveryDetail from '../components/SurgeryRecoveryDetail'

const mapDispatchToProps = {
  surgeryRecoveryGoodsSummary: id => surgeryRecoveryGoodsSummary(id),
  historyRecoveryRecords: id => historyRecoveryRecords(id),
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  orderBasicInfoForm: state.orderBasicInfoForm,
  surgeryRecoveryGoodsSummaryData: state.SugeryRecoveryDetail.surgeryRecoveryGoodsSummary,
  historyRecoveryRecordsData: state.SugeryRecoveryDetail.historyRecoveryRecords
})

export default connect(mapStateToProps, mapDispatchToProps)(SugeryRecoveryDetail)
