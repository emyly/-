/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/25.
 */
import { connect } from 'react-redux'
import { getRoles, destroyRoles } from './modules/RoleTreeActions'
import RoleTree from './RoleTree';

const mapStateToProps = state => ({
  dataSource: state.roleTree.dataSource,
  checkedData: state.roleTree.checkedData
})

const mapDispatchToProps = {
  getRoles,
  destroyRoles
}

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps)

const withRef = true;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef })(RoleTree);
