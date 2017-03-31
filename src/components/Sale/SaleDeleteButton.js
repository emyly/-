/**
 * Created by sjf on 2016/11/21.
 */
import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Delete from 'material-ui/svg-icons/action/delete-forever'
/**
 * 销售人员编辑按钮弹窗
 * */
export default class SaleDeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleate_dialog_open: false
    };
  }
  static propTypes = {
    /**
     * 添加按钮值
     */
    deleteSaleRemote: PropTypes.func,
    OrderId: PropTypes.number,
    tabValue: PropTypes.number,
  };
  handleToggle = () => {
    this.setState({ deleate_dialog_open: !this.state.deleate_dialog_open });
    this.props.deleteSaleRemote(this.props.OrderId);
  };
  handleSure = () => {
    this.setState({ deleate_dialog_open: false });
  };
  componentWillMount = () => {
    if (this.props.tabValue === 0) {
      this.setState({
        labelValue: '编辑销售代表信息'
      });
    } else {
      this.setState({
        labelValue: '编辑销售助理信息'
      });
    }
  };
  render() {
    const actionsForbidden = [
      <FlatButton
        label='取消'
        style={{ margin: 10 }}
        primary
        onTouchTap={this.handleSure}
      />,
      <RaisedButton
        label='确定'
        style={{ margin: 10 }}
        primary
        onTouchTap={this.handleToggle}
      />
    ];
    return (
      <span>
        <FlatButton
          label='删除'
          style={{ marginRight: 15 }} secondary onTouchTap={this.handleEditEmployeeDialogToggle} icon={<Delete />}
          onClick={this.handleOnClick}
        />
        <Dialog
          title={this.state.title}
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
