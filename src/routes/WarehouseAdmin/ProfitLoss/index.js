import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'profitLoss',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const ProfitLostRecods = require('./containers/profitLostRecordsContainer').default
        const getProfitLossListReducer = require('./modules/getProfitLossList').default
        const checkSingleProfitLossDetailReducer = require('./modules/checkProfitLossList').default

        injectReducer(store, {
          key: 'profitLossListData',
          reducer: combineReducers({
            getProfitLossListReducer,
            checkSingleProfitLossDetailReducer
          })
        });

        /*  Return getComponent   */
        cb(null, ProfitLostRecods)

        /* Webpack named bundle   */
      }, 'ProfitLostRecods')
    }
  },
  childRoutes: [
    {
      path: 'checkInProfitLost',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const CheckInProfitLost = require('./containers/CheckInProfitLostContainer').default
          const checkInProfitLossReducer = require('./modules/checkInProfitLoss').default

          injectReducer(store, {
            key: 'CheckInProfitLost',
            reducer: checkInProfitLossReducer
          });

          /*  Return getComponent   */
          cb(null, CheckInProfitLost)

          /* Webpack named bundle   */
        }, 'CheckInProfitLost')
      }
    }
  ]
});
