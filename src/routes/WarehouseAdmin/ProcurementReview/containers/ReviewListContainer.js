import { connect } from 'react-redux'

import ReviewList from '../components/ReviewList'

import { actions } from '../modules/reviewList'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  reviewList: state.procurementReview.reviewList
})

export default connect(mapStateToProps, actions)(ReviewList)
