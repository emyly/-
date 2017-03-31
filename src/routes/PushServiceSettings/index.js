/**
 * Created by NXQ on 2/23/2017.
 */
import PushServiceSettingsContainer from './containers/PushServiceSettingsContainer';
import PushServiceSettingsRouter from './components/PushServiceSettingsRouter';

import { injectReducer } from 'store/reducers';
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'pushServiceSettings',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const pushServiceSettings = require('./modules/pushServiceSettings').default;

      injectReducer(store, {
        key: 'pushService',
        reducer: combineReducers({
          pushServiceSettings
        })
      });
      cb(null, PushServiceSettingsRouter);
    }, 'PushServiceSettings')
  },
  indexRoute: { component: PushServiceSettingsContainer },
  childRoutes: [
  ]
})
