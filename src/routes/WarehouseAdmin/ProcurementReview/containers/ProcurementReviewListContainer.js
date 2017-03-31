import { connect } from 'react-redux'

import ProcurementReviewList from '../components/ProcurementReviewList'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementReviewList)
