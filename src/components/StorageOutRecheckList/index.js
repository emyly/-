/**
 * Created by chenming on 2016/10/21.
 */
import StorageOutRecheckList from './StorageOutRecheckList';

import {
  connect
} from 'react-redux'
import {
  getStorageOutRecheckData
} from './modules/storageOutRecheckList'
// 绑定action
const mapDispatchToProps = {
  getStorageOutRecheckData: params => getStorageOutRecheckData(params)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  storageOutRecheckList: state.storageOutRecheckList
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageOutRecheckList)

