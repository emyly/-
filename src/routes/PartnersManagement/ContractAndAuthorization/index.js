
import ContractAndAuthorization from './components/ContractAndAuthorization'
import ContractAndAuthorizationHome from './components/ContractAndAuthorizationHome';
import AuthorizationEdit from './components/AuthorizationEdit';
import ContractAddContainer from './containers/ContractAddContainer';
import AuthorizationAdd from './components/AuthorizationAdd';
import AuthorizationEditContainer from './containers/AuthorizationEditContainer';
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: '/contractAndAuthorization',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const contractAdd = require('./modules/contractAdd').default;
      injectReducer(store, {
        key: 'contractAndAuthorization',
        reducer: combineReducers({
          contractAdd
        })
      });
      cb(null, ContractAndAuthorization);
    }, 'ContractAndAuthorization')
  },
  indexRoute: { component: ContractAndAuthorizationHome },
  childRoutes: [
    {
      path: 'contractAdd',
      component: ContractAddContainer
    },
    {
      path:　'authorizationEdit',
      component: AuthorizationEditContainer
    },
    {
      path: 'authorizationAdd',
      component: AuthorizationAdd
    }
  ]
})
