/**
 * Created by chenming on 2016/10/21.
 */
import PickingProductionList from './PickingProductionList';

import {
  connect
} from 'react-redux'
import {
  getPickingProductionData
} from './modules/pickingProductionList'
// 绑定action
const mapDispatchToProps = {
  getPickingProductionData: params => getPickingProductionData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  pickingProductionList: state.pickingProductionList
})

export default connect(mapStateToProps, mapDispatchToProps)(PickingProductionList)

