/**
 * Created by chenming on 2016/10/21.
 */
import OperationReceiveRecheckList from './OperationReceiveRecheckList';

import {
  connect
} from 'react-redux'
import {
  getOperationReceiveRecheckData
} from './modules/operationReceiveRecheckList'
// 绑定action
const mapDispatchToProps = {
  getOperationReceiveRecheckData: params => getOperationReceiveRecheckData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  operationReceiveRecheckList: state.operationReceiveRecheckList
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationReceiveRecheckList)

