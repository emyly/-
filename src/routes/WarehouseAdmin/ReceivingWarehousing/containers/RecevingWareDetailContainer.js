
import {
  connect
} from 'react-redux'
import {
  getRecevingGoodsData
} from '../modules/recevingWareDetail'
import RecevingWareDetail from '../components/RecevingWareDetail'
import {
  getHistoryWarehousing,
} from '../../../../components/HistoryWarehousingDataGrid/modules/saga'
const mapDispatchToProps = {
  getRecevingGoodsData: (GUID, CKRK, DDLX) => getRecevingGoodsData(GUID, CKRK, DDLX),
  getHistoryWarehousing: (id, type) => getHistoryWarehousing(id, type)
}

const mapStateToProps = state => ({
  recevingWareDetail: state.recevingWareDetail,
  historyWarehousingDataGrid: state.historyWarehousingDataGrid,
  globalStore: state.globalStore,
  orderBasicInfoForm:state.orderBasicInfoForm
})

export default connect(mapStateToProps, mapDispatchToProps)(RecevingWareDetail)
