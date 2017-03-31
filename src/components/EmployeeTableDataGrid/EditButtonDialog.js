/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import EmployeeInfoDialog from './EmployeeInfoDialog';
/**
 * 员工管理编辑按钮组件
 * */
export default class EditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_employee_dialog_open: false,
    };
  }
  static propTypes = {
    EmployeeName: PropTypes.string,
    editEmployeeInfo: PropTypes.func,
    Number: PropTypes.string,
    OrderId: PropTypes.number,
  }
  handleEditEmployeeDialogToggle = () => {
    this.setState({ edit_employee_dialog_open: !this.state.edit_employee_dialog_open });
  };
  render() {
    return (
      <span>
        <RaisedButton
          label='编辑'
          style={{ marginRight: 15 }}
          onTouchTap={this.handleEditEmployeeDialogToggle}
          buttonStyle={{ backgroundColor: '#00BD9C' }} labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
        />
        <EmployeeInfoDialog
          title='编辑员工信息'
          open={this.state.edit_employee_dialog_open}
          EmployeeName={this.props.EmployeeName}
          Number={this.props.Number}
          handleEmployeeDialogToggle={this.handleEditEmployeeDialogToggle}
          editEmployeeInfo={this.props.editEmployeeInfo}
          OrderId={this.props.OrderId}
        />
      </span>
    )
  }
}

