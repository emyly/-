
import Verification from './components/Verification'
import VerificationListContainer from './containers/VerificationListContainer'
import NotVerificationDetail from './components/NotVerificationDetail'
import VerificationAbleDetailContainer from './containers/VerificationAbleDetailContainer'
import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'verification',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const reducer = require('./modules/verification').default;
      injectReducer(store, { key: 'verification', reducer });
      cb(null, Verification);
    }, 'Verification')
  },
  indexRoute: { component: VerificationListContainer },
  childRoutes: [
    {
      path: 'verificationAble/:id',
      component: VerificationAbleDetailContainer
    },
    {
      path: 'notVerification/:id',
      component: NotVerificationDetail
    },
  ]
});
