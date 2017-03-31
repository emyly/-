/**
 * Created by liuyali on 2016/11/4.
 */

import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({

  path: 'basicInformation',

  /* Async getComponent is only invoked when route matches */
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const BasicInformation = require('./containers/BasicInformationContainer').default
      const reducer = require('./modules/BasicInformation').default;
      const getOrgCertificate = require('../../PartnersManagement/FirstBusinessRegistration/modules/getOrgCertificates').default;

      /* Add the reducer to the store on key 'employee' */
      injectReducer(store, {
        key: 'BasicInformationState',
        reducer: combineReducers({
          getOrgCertificate,
          reducer
        })
      });
      /* Return getComponent */
      callback(null, BasicInformation)

      /* webpack named bundle */
    }, 'BasicInformation')
  }
})

