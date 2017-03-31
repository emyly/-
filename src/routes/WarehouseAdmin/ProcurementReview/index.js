/**
 * Created by wmt on 2016/12/12.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import ProcurementReviewDetail from './containers/ProcurementReviewDetailContainer';
import ProcurementReviewList from './containers/ProcurementReviewListContainer';

/**
 * 使用场景：采购复核
 */
export default store => ({
  path: 'procurementReview',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ProcurementReview = require('./components/ProcurementReview').default;
      const procurementReviewDetail = require('./modules/procurementReviewDetail').default;
      const reviewList = require('./modules/reviewList').default

      injectReducer(store, {
        key: 'procurementReview',
        reducer: combineReducers({
          reviewList,
          procurementReviewDetail
        })
      })
      cb(null, ProcurementReview)
    }, 'procurementReview')
  },
  indexRoute: { component: ProcurementReviewList },
  childRoutes: [
    {
      path: ':id/:state',
      component: ProcurementReviewDetail
    }
  ],
})
