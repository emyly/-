import { connect } from 'react-redux'

/* Dispatch function */
import { fetchEmployeeList } from '../modules/Employee'
import { editEmployeeInfo, editEmployeeInfoFetching } from '../modules/EditEmployee'
import { createEmployeeRemote, createEmployeeFetching, createEmployeehandleError } from '../modules/CreateEmployee'
import { deleteEmployeeRemote, deleteEmployeeRemoteFetching } from '../modules/DeleteEmployee'
import { roleEditInfo, employeeRoleEditFetching } from '../modules/EmployeeRoleEdit'

/*
 *  container component: only responsible for wiring in the actions
 *  ant state necessary to render a presentaional component
 */
import Employee from 'components/EmployeeTableDataGrid'

const mapDispatchToProps = {
  fetchEmployeeList,
  createEmployeeRemote,
  editEmployeeInfo,
  editEmployeeInfoFetching,
  deleteEmployeeRemote,
  roleEditInfo,
  employeeRoleEditFetching,
  createEmployeeFetching,
  deleteEmployeeRemoteFetching,
  createEmployeehandleError
};

/* NOTE: reducer's hiearchy */
const mapStateToProps = state => ({
  employeeList: state.employee.listEmployee.employeeList,
  currentPage: state.employee.listEmployee.currentPage,
  employeeRoleIsEditing: state.employee.employeeRoleEdit.isEditing,
  employeeIsEditing: state.employee.editEmployee.isEditing,
  employeeIsCreating: state.employee.createEmployee.isCreating,
  employeeIsDeleting: state.employee.deleteEmployee.isDeleting,
  errorOpenDialogStatus: state.employee.createEmployee.errorOpenDialogStatus,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
