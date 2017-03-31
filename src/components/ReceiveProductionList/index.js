/**
 * Created by chenming on 2016/10/21.
 */
import ReceiveProductionList from './ReceiveProductionList';

import {
  connect
} from 'react-redux'
import {
  getReceiveProductionData
} from './modules/receiveProductionList'
// 绑定action
const mapDispatchToProps = {
  getReceiveProductionData: params => getReceiveProductionData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  receiveProductionList: state.receiveProductionList
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProductionList)
