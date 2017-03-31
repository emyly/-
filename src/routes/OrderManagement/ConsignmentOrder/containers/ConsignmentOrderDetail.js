import { connect } from 'react-redux'

import ConsignmentOrderDetail from '../components/ConsignmentOrderDetail'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsignmentOrderDetail)
