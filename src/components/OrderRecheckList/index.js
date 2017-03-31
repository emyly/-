/**
 * Created by chenming on 2016/10/21.
 */
import OrderRecheckList from './OrderRecheckList';
import {
  connect
} from 'react-redux'
import {
  getOrderRecheckData
} from './modules/orderRecheckList'
// 绑定action
const mapDispatchToProps = {
  getOrderRecheckData: params => getOrderRecheckData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  orderRecheckList: state.orderRecheckList,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderRecheckList)
