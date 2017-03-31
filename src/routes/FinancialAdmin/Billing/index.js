
import Billing from './components/Billing'
import BillingList from './components/BillingList'
import NotBillingDetail from './components/NotBillingDetail'
import BillingAbleDetail from './components/BillingAbleDetail'
import BillingBatchSubmitContainer from './containers/BillingBatchSubmitContainer'
import BillingSubmitContainer from './containers/BillingSubmitContainer'
import billingBatchSubmit from './modules/billingBatchSubmit';

import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'billing',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {
        key: 'billing',
        reducer: combineReducers({
          billingBatchSubmit
        })
      });
      cb(null, Billing);
    }, 'Billing')
  },
  indexRoute: { component: BillingList },
  childRoutes: [
    {
      path: 'billingAble/:id',
      component: BillingAbleDetail
    },
    {
      path: 'notBilling/:id',
      component: NotBillingDetail
    },
    {
      path: 'batchSubmit',
      component: BillingBatchSubmitContainer
    },
    {
      path: 'submit',
      component: BillingSubmitContainer
    }
  ]
});

