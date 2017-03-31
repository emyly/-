import { connect } from 'react-redux'
import { getDispatchApplyDetail, } from '../modules/dispatchApplyDetail'
import DispatchApplyDetail from '../components/DispatchApplyDetail'

const mapDispatchToProps = { getDispatchApplyDetail }

const mapStateToProps = state => ({
 	globalStore: state.globalStore,
  dispatchApplyDetail: state.dispatchApply.dispatchApplyDetail
})

export default connect(mapStateToProps, mapDispatchToProps)(DispatchApplyDetail)
