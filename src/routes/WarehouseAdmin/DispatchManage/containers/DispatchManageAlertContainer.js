import {
	connect
} from 'react-redux'
import {
	postDispatchManage,
} from '../modules/dispatchManageAlert'
import DispatchManageAlert from '../components/DispatchManageAlert'

const mapDispatchToProps = {
  postDispatchManage
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  dispatchManageAlert: state.dispatchManage.dispatchManageAlert
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchManageAlert)
