import { connect } from 'react-redux'

import ConsignmentOrderList from '../components/ConsignmentOrderList'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsignmentOrderList)
