import { connect } from 'react-redux'

import SurgeryOrderDetail from '../components/SurgeryOrderDetail'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryOrderDetail)
