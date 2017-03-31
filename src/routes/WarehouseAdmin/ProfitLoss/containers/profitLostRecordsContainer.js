/**
 * Created by liuyali on 2016/11/17.
 */
/**
 * Created by liuyali on 2016/11/17.
 */
import {
  connect
} from 'react-redux'

import {
  getProfitLossList
} from '../modules/getProfitLossList'

import {
  checkSingleProfitLossDetail
} from '../modules/checkProfitLossList'

import ProfitLostRecods from '../components/profitLostRecords';

const mapDispatchToProps = {
  getProfitLossList: page => getProfitLossList(page),
  checkSingleProfitLossDetail: id => checkSingleProfitLossDetail(id)
}

const mapStateToProps = state => ({
  profitLossListData: state.profitLossListData.getProfitLossListReducer,
  checkSingleProfitLossDetailData: state.profitLossListData.checkSingleProfitLossDetailReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfitLostRecods)
