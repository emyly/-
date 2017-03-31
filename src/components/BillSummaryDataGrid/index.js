/**
 * Created by liuyali on 2016/10/26.
 */
import {
  connect
} from 'react-redux'
import BillSummaryDataGrid from './BillSummaryDataGrid';

import {
  getBillSmmryData,
} from './modules/BillSummaryDataGrid'

const mapDispatchToProps = {
  getBillSmmryData: ddid => getBillSmmryData(ddid)
}
const mapStateToProps = state => ({
  BillSmmryData: state.getBillSmmryData
})

export default connect(mapStateToProps, mapDispatchToProps)(BillSummaryDataGrid)

