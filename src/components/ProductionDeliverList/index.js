/**
 * Created by chenming on 2016/10/21.
 */
import ProductionDeliverList from './ProductionDeliverList';
import {
  connect
} from 'react-redux'
import {
  getProductionDeliverData
} from './modules/productionDeliverList'
// 绑定action
const mapDispatchToProps = {
  getProductionDeliverData: params => getProductionDeliverData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  productionDeliverList: state.productionDeliverList
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductionDeliverList)

