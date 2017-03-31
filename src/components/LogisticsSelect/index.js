import LogisticsSelect from './LogisticsSelect';
import {
  connect
} from 'react-redux'
import {
  getLogisticsCompanyData,
} from './modules/logisticsSelect'
/**
 * 用户的操作当作 Action，传给 Store
 * */
const mapDispatchToProps = {
  getLogisticsCompanyData: () => getLogisticsCompanyData()
}

/**
 * 外部的state映射props
 * */
const mapStateToProps = state => ({
  logisticSelect: state.logisticSelect
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsSelect)

