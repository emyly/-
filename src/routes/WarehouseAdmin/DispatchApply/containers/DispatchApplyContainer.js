import { connect } from 'react-redux'
import { getDispatchApplyList, } from '../modules/dispatchApply'
import DispatchApply from '../components/DispatchApply'

const mapDispatchToProps = { getDispatchApplyList }

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  dispatchApply: state.dispatchApply.dispatchApply
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchApply)
