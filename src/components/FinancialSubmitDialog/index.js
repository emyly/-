
/**
 * Created by NXQ on 2017/1/9.
 */

import {
  connect
} from 'react-redux'
import FinancialSubmitDialog from './FinancialSubmitDialog';


import {
  postFinancialExpressOrLogisticsData,
  initFinancialSubmitPostState
} from './modules/financialSubmitDialog'

const mapDispatchToProps = {
  postFinancialExpressOrLogisticsData,
  initFinancialSubmitPostState
}
const mapStateToProps = state => ({
  financialSubmitDialog: state.financialSubmitDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialSubmitDialog)

