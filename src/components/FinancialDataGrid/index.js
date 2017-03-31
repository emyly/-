/**
 * Created by wangming on 2017/1/5.
 */
import FinancialDataGrid from './FinancialDataGrid';

import {
  connect
} from 'react-redux'
import {
  getFinancialListData
} from './modules/financialDataGrid'
//绑定action
const mapDispatchToProps = {
  getFinancialListData: (params) => getFinancialListData(params)
}

//绑定store中对应的组件key
const mapStateToProps = (state) => ({
  financialDataGrid : state.financialDataGrid,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialDataGrid)

