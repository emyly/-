import { connect } from 'react-redux'

import SurgeryOrderList from '../components/SurgeryOrderList'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryOrderList)
