/**
 * Created by chenming on 2016/10/21.
 */
import OperationReceiveList from './OperationReceiveList';

import {
  connect
} from 'react-redux'
import {
  getOperationReceiveData
} from './modules/operationReceiveList'
// 绑定action
const mapDispatchToProps = {
  getOperationReceiveData: params => getOperationReceiveData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  operationReceiveList: state.operationReceiveList
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationReceiveList)
