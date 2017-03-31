/**
 * Created by sjf on 2016/11/7.
 */

import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import SurgeryRecovery from './components/SurgeryRecovery';
import SurgeryRecoverySummary from './components/SurgeryRecoverySummary';
import ScanPhysical from './containers/ScanPhysicalContainer';

import SugeryRecoveryDetail from './containers/SurgeryRecoveryDetailContainer';

export default store => ({
  path: 'surgeryRecovery',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const surgeryRecoveryGoodsSummary = require('./modules/surgeryRecoveryGoodsSummary').default;
      const historyRecoveryRecords = require('./modules/historyRecoveryRecords').default;

      injectReducer(store, {
        key: 'SugeryRecoveryDetail',
        reducer: combineReducers({
          surgeryRecoveryGoodsSummary,
          historyRecoveryRecords
        })
      });

      cb(null, SurgeryRecovery)
    }, 'SurgeryRecovery')
  },
  indexRoute: { component: SurgeryRecoverySummary },
  childRoutes: [
    {
      path: ':id',
      component: SugeryRecoveryDetail
    },
    {
      path: ':id/scanPhysical/scanPhysicalList',
      component: ScanPhysical
    }

  ]
})
