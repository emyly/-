/**
 * Created by sjf on 2016/11/5.
 */
import { connect } from 'react-redux'

/* Dispatch function */
import { getRoleData } from '../modules/Role';
import { RoleList } from '../modules/RoleList'
import { creatRoleList, creatRoleListFetching } from '../modules/Creat'
import { roleSet } from '../modules/RoleSet'
import { editRoleList, editRoleListFetching, editRoleName } from '../modules/EditRole'
import RoleTableDataGrid from 'components/RoleTableDataGrid';

const mapDispatchToProps = {
  getRoleData,
  RoleList,
  creatRoleList,
  creatRoleListFetching,
  roleSet,
  editRoleList,
  editRoleListFetching,
  editRoleName
};

const mapStateToProps = state => ({
  roleData: state.role.Rolereducer.roleData,
  currentPage: state.role.Rolereducer.currentPage,
  AllPermissions: state.role.RoleList.AllPermissions,
  SelectPermissions: state.role.RoleList.SelectPermissions,
  creatRoleListData: state.role.CreatRoleList.creatRoleListData,
  creatIsFetching: state.role.CreatRoleList.isFetching,
  editIsFetching: state.role.EditRole.isFetching,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleTableDataGrid)
