/**
 * Created by qyf on 2016/10/30.
 */
import HistoryWarehousingDataGrid from './HistoryWarehousingDataGrid';

import {
  connect
} from 'react-redux'
import {
  getHistoryWarehousing,
} from './modules/historyWarehousingDataGrid'
const mapDispatchToProps = {
  getHistoryWarehousing: (id, type) => getHistoryWarehousing(id, type)
}
const mapStateToProps = state => ({
  historyWarehousingDataGrid: state.historyWarehousingDataGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryWarehousingDataGrid)
