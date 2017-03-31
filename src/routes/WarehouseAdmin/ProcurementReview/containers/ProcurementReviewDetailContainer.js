import { connect } from 'react-redux'

import ProcurementReviewDetail from '../components/ProcurementReviewDetail'

import { actions } from '../modules/procurementReviewDetail'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  procurementReviewDetail: state.procurementReview.procurementReviewDetail
})

export default connect(mapStateToProps, actions)(ProcurementReviewDetail)
