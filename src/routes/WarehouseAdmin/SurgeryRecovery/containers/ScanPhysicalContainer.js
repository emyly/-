/**
 * Created by liuyali on 2016/11/24.
 */
import {
    connect
} from 'react-redux'

import ScanPhysical from '../components/ScanPhysical';
import {
    surgeryRecoveryGoodsSummaryClearAll,
    surgeryRecoveryGoodsSummary,
    addOrSubstractSurgeryRecoveryGoodsNum,
    submitRecoveryGoods,
    editUnSurgeryRecoveryGoods,
    filterRecoveryGoods
} from '../modules/surgeryRecoveryGoodsSummary'

const mapDispatchToProps = {
  surgeryRecoveryGoodsSummaryClearAll: () => surgeryRecoveryGoodsSummaryClearAll(),
  submitRecoveryGoods: (ddid, data, params) => submitRecoveryGoods(ddid, data, params),
  surgeryRecoveryGoodsSummary: id => surgeryRecoveryGoodsSummary(id),
  addOrSubstractSurgeryRecoveryGoodsNum: (SM, SPPHID, num) => addOrSubstractSurgeryRecoveryGoodsNum(SM, SPPHID, num),
  editUnSurgeryRecoveryGoods: (LX, SPPHID, value) => editUnSurgeryRecoveryGoods(LX, SPPHID, value),
  filterRecoveryGoods: filter => filterRecoveryGoods(filter)
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  surgeryRecoveryGoodsSummaryData: state.SugeryRecoveryDetail.surgeryRecoveryGoodsSummary,
});


export default connect(mapStateToProps, mapDispatchToProps)(ScanPhysical)
