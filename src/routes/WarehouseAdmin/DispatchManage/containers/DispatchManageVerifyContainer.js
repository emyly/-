import {
	connect
} from 'react-redux'
import {
	postDispatchManageVerify, getOrderDetail, initStore
} from '../modules/dispatchManageVerify'
import {
	getDispatchManageList,
} from '../modules/dispatchManage'
import DispatchManageVerify from '../components/DispatchManageVerify'

const mapDispatchToProps = {
  postDispatchManageVerify, getOrderDetail, getDispatchManageList, initStore
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  dispatchManageVerify: state.dispatchManage.dispatchManageVerify
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchManageVerify)
