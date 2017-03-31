import { injectReducer } from 'store/reducers'
import DistributionOrderList from './containers/DistributionOrderListContainers';
import OrderChidren from './components/OrderChidren';

export default store => ({
  path: 'distributionOrder',
  component: OrderChidren,
  indexRoute: { component: DistributionOrderList },
  childRoutes: [
    {
      path: 'distributionOrderDetail/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const DistributionOrderDetailContainers = require('./containers/DistributionOrderDetailContainers').default
          cb(null, DistributionOrderDetailContainers)
        })
      },

    },
    {
      path: 'orderCheck',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const OrderCheckContainers = require('./containers/OrderCheckContainers').default
          const reducer = require('./modules/disorderCheck').default
          injectReducer(store, { key: 'disorderCheck', reducer })
          cb(null, OrderCheckContainers)
        }, 'disorderCheck')
      },
    }

  ]

})
