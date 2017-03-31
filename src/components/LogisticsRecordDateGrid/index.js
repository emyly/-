/**
 * Created by wrq on 2016/10/26.
 */
import {
  connect
} from 'react-redux'

import {
  getLogisticsRecordDate,
} from './modules/logisticsRecordDateGrid'

import LogisticsRecordDateGrid from './LogisticsRecordDateGrid';

const mapDispatchToProps = {
  getLogisticsRecordDate: (id, type) => getLogisticsRecordDate(id, type)
}
const mapStateToProps = state => ({
  logisticsRecordDateGrid: state.logisticsRecordDateGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsRecordDateGrid)
