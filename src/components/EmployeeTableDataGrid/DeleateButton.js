/**
 * Created by sjf on 2016/11/14.
 */
/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'components/StandardUI/StandardDialog';
/*
 *适用场景：角色按钮禁用和弹窗
 * */
export default class DeleateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleate_dialog_open: false
    }
  }
  static propTypes = {
    deleteEmployeeRemote: PropTypes.func,
    OrderId: PropTypes.number,
  }
  handleToggle = () => {
    this.setState({ deleate_dialog_open: !this.state.deleate_dialog_open });
  };
  handleSure = () => {
    this.props.deleteEmployeeRemote(this.props.OrderId);
    this.setState({ deleate_dialog_open: false });
  };
  render() {
    const actionsForbidden = [
      <FlatButton
        label='取消'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#979797' }}
        primary
        onTouchTap={this.handleToggle}
      />,
      <FlatButton
        label='确定'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#00A0FF' }}
        onTouchTap={this.handleSure}
      />
    ];
    return (
      <span>
        <RaisedButton
          label='删除'
          style={{ marginRight: 15 }}
          onTouchTap={this.handleToggle}
          buttonStyle={{ backgroundColor: '#FF625B' }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
        />
        <Dialog
          title='删除员工'
          actions={actionsForbidden}
          modal={false}
          open={this.state.deleate_dialog_open}
        >
          <div>
            确认删除？
          </div>
        </Dialog>
      </span>
    )
  }

}
