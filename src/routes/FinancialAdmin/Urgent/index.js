
import Urgent from './components/Urgent'
import UrgentList from './components/UrgentList'
import NotUrgentDetail from './components/NotUrgentDetail'
import UrgentAbleDetail from './components/UrgentAbleDetail'
import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'urgent',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Urgent);
    }, 'Urgent')
  },
  indexRoute: { component: UrgentList },
  childRoutes: [
    {
      path: 'urgentAble/:id',
      component: UrgentAbleDetail
    },
    {
      path: 'notUrgent/:id',
      component: NotUrgentDetail
    },
  ]
});
