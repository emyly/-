import { connect } from 'react-redux'
import { postDispatchApply, initStore } from '../modules/dispatchApplyAlert'
import { getDispatchApplyList } from '../modules/dispatchApply'
import DispatchApplyAlert from '../components/DispatchApplyAlert'

const mapDispatchToProps = { postDispatchApply, initStore, getDispatchApplyList }

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  dispatchApplyAlert: state.dispatchApply.dispatchApplyAlert
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchApplyAlert)
