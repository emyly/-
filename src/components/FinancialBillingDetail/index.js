/**
 * Created by wangming on 2016/1/9.
 */

import FinancialBillingDetail from './FinancialBillingDetail';

import {
  connect
} from 'react-redux'
import {
  getFinancialBillingDetail
} from './modules/financialBillingDetail'

//绑定action
const mapDispatchToProps = {
  getFinancialBillingDetail: (params) => getFinancialBillingDetail(params)
}

//绑定store中对应的组件key
const mapStateToProps = (state) => ({
  financialBillingDetail : state.financialBillingDetail,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialBillingDetail)

