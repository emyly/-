/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import AuthorizationDialog from 'components/AuthorizationDialog';
import RaisedButton from 'material-ui/RaisedButton';
import './AuthorizationRaisedButtonDialog.scss';
/**
 * 使用场景：企业管理授权按钮和弹窗
 */
export default class AuthorizationRaisedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_employee_dialog_open: false,
      roleListCheckData: [],
      roleListData: [],
      editIsFetching: '',
      title: ''
    };
  }
  static propTypes = {
    RoleList: PropTypes.func,
    editRoleListFetching: PropTypes.func,
    GUID: PropTypes.number,
    organizationId: PropTypes.number,
    name: PropTypes.string,
    AllPermissions: PropTypes.array,
    SelectPermissions: PropTypes.array,
    getRoleList: PropTypes.func,
    editRoleName: PropTypes.func,
  }
  handleRoleDialogtoggler = () => {
    this.setState({ edit_employee_dialog_open: !this.state.edit_employee_dialog_open });
  };
  handleClick = () => {
    this.props.RoleList(this.props.GUID);
    this.setState({
      title: '编辑角色'
    })
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      roleListCheckData: nextProps.roleListCheckData,
      roleListData: nextProps.roleListData,
      editRoleList: nextProps.editRoleList,
      editIsFetching: nextProps.editIsFetching

    });
  };
  render() {
    return (
      <span>
        <RaisedButton
          label='编辑'
          style={{ marginRight: 15 }}
          onTouchTap={this.handleRoleDialogtoggler}
          buttonStyle={{ backgroundColor: '#00BE9C' }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
          onClick={this.handleClick}
        />
        <AuthorizationDialog
          title={this.state.title}
          editRoleName={this.props.editRoleName}
          editRoleListFetching={this.props.editRoleListFetching}
          GUID={this.props.GUID}
          editIsFetching={this.state.editIsFetching}
          getRoleList={this.props.getRoleList} editRoleList={this.state.editRoleList}
          open={this.state.edit_employee_dialog_open} name={this.props.name}
          handleRoleDialogtoggler={this.handleRoleDialogtoggler} Permissions
          AllPermissions={this.props.AllPermissions} SelectPermissions={this.props.SelectPermissions}
          organizationId={this.props.organizationId}
        />
      </span>
    )
  }
}
