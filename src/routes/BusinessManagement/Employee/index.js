import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({
  path: 'employee',

  /* Async getComponent is only invoked when route matches */
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      /* component */
      const Employee = require('./containers/EmployeeContainer').default;

      /* reducers */
      const listEmployee = require('./modules/Employee').default;
      const editEmployee = require('./modules/EditEmployee').default;
      const createEmployee = require('./modules/CreateEmployee').default;
      const deleteEmployee = require('./modules/DeleteEmployee').default;
      const employeeRoleEdit = require('./modules/EmployeeRoleEdit').default;

      /* Add the reducers to the store on key 'employee' */
      injectReducer(store, {
        key: 'employee',
        reducer: combineReducers({
          listEmployee,
          createEmployee,
          editEmployee,
          deleteEmployee,
          employeeRoleEdit
        })
      });
      /* Return getComponent */
      callback(null, Employee);

    /* webpack named bundle */
    }, 'employee')
  }
})
