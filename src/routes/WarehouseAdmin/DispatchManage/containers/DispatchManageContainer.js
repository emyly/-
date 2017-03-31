import {
	connect
} from 'react-redux'
import {
	getDispatchManageList,
} from '../modules/dispatchManage'
import DispatchManage from '../components/DispatchManage'

const mapDispatchToProps = {
  getDispatchManageList
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  dispatchManage: state.dispatchManage.dispatchManage
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchManage)
