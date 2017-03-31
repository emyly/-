/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'components/StandardUI/StandardDialog';
import './ForbiddenButtonDialog.scss';
/*
 *适用场景：员工按钮禁用和弹窗
 * */
export default class ForbiddenButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forbidden_employee_dialog_open: false,
      ButtonValue: '',
      title: '',
      DialogContent: '',
    };
  }
  static propTypes = {
    label: PropTypes.string,
    roleSet: PropTypes.func,
    GUID: PropTypes.number,
    organizationId: PropTypes.number,
    page: PropTypes.number,

  }
  handleforbiddenEmployeeDialogOpen = () => {
    this.setState({ forbidden_employee_dialog_open: true });
  };
  handleforbiddenEmployeeDialogClose = () => {
    const titleChange = '禁用';
    if (this.props.label === titleChange) {
      this.props.roleSet(this.props.GUID, 'D', this.props.organizationId, this.props.page);
    } else {
      this.props.roleSet(this.props.GUID, 'E', this.props.organizationId, this.props.page);
    }
    this.setState({ forbidden_employee_dialog_open: false });
  };
  handleCancel = () => {
    this.setState({ forbidden_employee_dialog_open: false });
  };

  render() {
    const actionsForbidden = [
      <FlatButton
        label='取消'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#979797' }}
        onTouchTap={this.handleCancel}

      />,
      <FlatButton
        label='确定'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#00A0FF' }}
        primary
        onTouchTap={this.handleforbiddenEmployeeDialogClose}
      />
    ];
    return (
      <span>
        <RaisedButton
          label={this.props.label}
          style={{ marginRight: 15 }}
          onTouchTap={this.handleforbiddenEmployeeDialogOpen}
          buttonStyle={{ backgroundColor: '#FF625B' }} labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
        />
        <Dialog
          title={`角色${this.props.label}`}
          actions={actionsForbidden}
          modal={false}
          open={this.state.forbidden_employee_dialog_open}
        >
          <div>
            {`确定${this.props.label}该角色吗？`}
          </div>
        </Dialog>
      </span>
    )
  }

}
