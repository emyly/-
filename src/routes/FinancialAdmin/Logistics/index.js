
import Logistics from './components/Logistics'
import LogisticsList from './components/LogisticsList'
import NotLogisticsDetail from './components/NotLogisticsDetail'
import LogisticsAbleDetail from './components/LogisticsAbleDetail'
import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'logistics',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Logistics);
    }, 'Logistics')
  },
  indexRoute: { component: LogisticsList },
  childRoutes: [
    {
      path: 'logisticsAble/:id',
      component: LogisticsAbleDetail
    },
    {
      path: 'notLogistics/:id',
      component: NotLogisticsDetail
    },
  ]
});
