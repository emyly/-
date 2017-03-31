import { injectReducer } from 'store/reducers';
import { combineReducers } from 'redux'

export default store => ({
  path: 'role',
  /* Async getComponent is only invoked when route matches */
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const role = require('./containers/RoleContainer').default;

      /* reducers */
      const Rolereducer = require('./modules/Role').default;
      const RoleList = require('./modules/RoleList').default;
      const CreatRoleList = require('./modules/Creat').default;
      const RoleSet = require('./modules/RoleSet').default;
      const EditRole = require('./modules/EditRole').default;

      /* Add the reducer to the store on key 'employee' */
      injectReducer(store, {
        key: 'role',
        reducer: combineReducers({
          Rolereducer,
          RoleList,
          CreatRoleList,
          RoleSet,
          EditRole
        }) });

      /* Return getComponent */
      callback(null, role);

      /* webpack named bundle */
    }, 'role')
  }
})
