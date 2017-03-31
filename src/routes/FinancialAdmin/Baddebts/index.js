
import Baddebts from './components/Baddebts'
import BaddebtsList from './components/BaddebtsList'
import NotBaddebtsDetail from './components/NotBaddebtsDetail'
import BaddebtsAbleDetail from './components/BaddebtsAbleDetail'
import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'baddebts',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Baddebts);
    }, 'Baddebts')
  },
  indexRoute: { component: BaddebtsList },
  childRoutes: [
    {
      path: 'baddebtsAble/:id',
      component: BaddebtsAbleDetail
    },
    {
      path: 'notBaddebts/:id',
      component: NotBaddebtsDetail
    },
  ]
});
