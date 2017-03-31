

import Deposit from './components/Deposit'
import DepositList from './components/DepositList'
import DepositDetail from './components/DepositDetail'

import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'deposit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Deposit);
    }, 'Deposit')
  },
  indexRoute: { component: DepositList },
  childRoutes: [
    {
      path: 'details',
      component: DepositDetail
    }
  ]
});
