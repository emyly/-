/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import AuthorizationDialog from 'components/AuthorizationDialog';
import RaisedButton from 'material-ui/RaisedButton';
import './AuthorizationButtonDialog.scss';
/**
 * 使用场景：企业管理授权按钮和弹窗
 */
export default class AuthorizationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_employee_dialog_open: false,
      verify: false,
      element: ''
    };
  }

  static propTypes = {
    employeeRoleEditFetching: PropTypes.func,
    employeeIsEditing: PropTypes.bool,
    GUID: PropTypes.number,
    fetchEmployeeList: PropTypes.func,
    roleEditInfo: PropTypes.func,
  }

  handleRoleDialogtoggler = () => {
    this.setState({ edit_employee_dialog_open: !this.state.edit_employee_dialog_open, verify: false });
  };
  render() {
    return (
      <span>
        {/* <FlatButton label="角色设置" style={{marginRight: 15}} onTouchTap={this.handleRoleDialogtoggler} icon={<ActionGavel/>}/>*/}
        <RaisedButton label='角色设置' style={{ marginRight: 15 }} onTouchTap={this.handleRoleDialogtoggler} buttonStyle={{ backgroundColor: '#FFA95D' }} labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }} />
        <AuthorizationDialog title='角色设置' verify={this.state.verify} employeeRoleEditFetching={this.props.employeeRoleEditFetching} employeeIsEditing={this.props.employeeIsEditing} GUID={this.props.GUID} fetchEmployeeList={this.props.fetchEmployeeList} roleEditInfo={this.props.roleEditInfo} open={this.state.edit_employee_dialog_open} handleRoleDialogtoggler={this.handleRoleDialogtoggler} Permissions={false} />
      </span>
    )
  }
}
