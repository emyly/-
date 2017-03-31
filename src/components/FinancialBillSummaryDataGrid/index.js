/**
 * Created by NXQ on 2017/1/9.
 */

import {
  connect
} from 'react-redux'
import FinancialBillSummaryDataGrid from './FinancialBillSummaryDataGrid';

import {
  getFinancialBillSummaryData,
} from './modules/financialBillSummaryDataGrid'

const mapDispatchToProps = {
  getFinancialBillSummaryData
}
const mapStateToProps = state => ({
  financialBillSummaryDataGrid: state.financialBillSummaryDataGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialBillSummaryDataGrid)

