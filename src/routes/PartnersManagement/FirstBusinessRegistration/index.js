import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({
  path: 'firstBusinessRegistrationList',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const FirstBusinessRegistrationList = require('./containers/FirstBusinessRegistrationListContainer').default
        const getFirstBusinessRegistrationList = require('./modules/getRelatedOrg').default;

        injectReducer(store, {
          key: 'getFirstBusinessRegistrationListReducer',
          reducer: combineReducers({
            getFirstBusinessRegistrationList,
          })
        });

        cb(null, FirstBusinessRegistrationList)
      }, 'firstBusinessRegistrationList')
    }
  },
  childRoutes: [
    {
      path: 'register',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const FirstBusinessRegistration = require('./containers/FirstBusinessRegistrationContainer').default
          const FirstBusinessRegistrationReducer = require('./modules/FirstBusinessRegistration').default
          const BasicInformation = require('routes/BusinessManagement/BasicInformation/modules/BasicInformation').default;

          injectReducer(store, {
            key: 'FirstBusinessRegistrationReducer',
            reducer: combineReducers({
              FirstBusinessRegistrationReducer,
              BasicInformation
            })
          });
          /*  Return getComponent   */
          cb(null, FirstBusinessRegistration)

          /* Webpack named bundle   */
        }, 'register')
      }
    }, {
      path: ':id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const CheckInRegistration = require('./containers/CheckInRegistrationContainer').default
          const getOrgCertificate = require('./modules/getOrgCertificates').default;
          const getEnterpriseInformation = require('./modules/getEnterpriseInformation').default;

          injectReducer(store, {
            key: 'OrgCertificate',
            reducer: combineReducers({
              getOrgCertificate,
              getEnterpriseInformation
            })
          });
          cb(null, CheckInRegistration)
        }, 'register')
      }
    }
  ]
})
