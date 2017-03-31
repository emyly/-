
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
import LogisticsDelivery from './components/LogisticsDelivery';
import LogisticsDeliverySummary from './components/LogisticsDeliverySummary';
import LogisticsDeliveryDetail from './containers/LogisticsDeliveryDetailContainer';
import LogisticsDeliveryPrint from './containers/LogisticsDeliveryPrintContainer'


export default store => ({
  path: 'logisticsDelivery',
  component: LogisticsDelivery,

  indexRoute: { component: LogisticsDeliverySummary },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LogisticsDeliveryDetailContainer = require('./modules/logisticsDeliveryDetail').default
      const LogisticsDeliveryPrintContainer = require('./modules/logisticsDeliveryPrint').default
      injectReducer(store, {
        key: 'logisticsDeliveryDetail',
        reducer: combineReducers({
          LogisticsDeliveryDetailContainer,
          LogisticsDeliveryPrintContainer
        })
      });
      cb(null, LogisticsDelivery)
    }, 'LogisticsDelivery')
  },
  childRoutes: [
    {
      path: 'logisticsDeliveryDetail/:id',
      component: LogisticsDeliveryDetail

    },
    {
      path: '/logisticsDelivery/logisticsDeliveryDetail/:id/logisticsDeliveryPrint',
      component: LogisticsDeliveryPrint
    },

  ],

})

