import Credit from './components/Credit';
import CreditHomeContainer from './containers/CreditHomeContainer';
import CreditSeeContainer from './containers/CreditSeeContainer';
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'homecredit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const creditSee = require('./modules/creditSee').default;
      injectReducer(store, {
        key: 'credit',
        reducer: combineReducers({
          creditSee
        })
      });
      cb(null, Credit);
    }, 'Credit')
  },
  indexRoute: { component: CreditHomeContainer },
  childRoutes: [
    {
      path: 'seeCredit',
      component: CreditSeeContainer
    }
  ]
});

