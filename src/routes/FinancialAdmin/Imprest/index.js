
import Imprest from './components/Imprest'
import ImprestList from './components/ImprestList'
import ImprestDetail from './components/ImprestDetail'

import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'imprest',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Imprest);
    }, 'Imprest')
  },
  indexRoute: { component: ImprestList },
  childRoutes: [
    {
      path: 'details',
      component: ImprestDetail
    }
  ]
});
