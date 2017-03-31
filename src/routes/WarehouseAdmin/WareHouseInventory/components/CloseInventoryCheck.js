import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DialogMini from 'components/StandardUI/StandardDialog';
import './WareHouseInventory.scss';


// 结束盘存组件
export default class CloseInventoryCheck extends Component {
  state = {
    dialogState: false
  }
  static propTypes = {
    DendInventoryRecords: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    getinventoryRecords: React.PropTypes.object.isRequired,
  }
  dialogFinish = () => {
    this.props.DendInventoryRecords(this.props.id, this.props.getinventoryRecords.currentPage);
    this.setState({ dialogState: false });
  };

  dialogOpen = () => {
    this.setState({ dialogState: true });
  };
  dialogCancel = () => {
    this.setState({ dialogState: false });
  };
  render() {
        // 结束盘存弹窗按钮
    const close_inventoryCheck = [
      <FlatButton
        label='关闭'
        onTouchTap={this.dialogCancel}
      />,
      <FlatButton
        label='结束盘存'
        primary
        onTouchTap={this.dialogFinish}
      />,
    ];

    return (
      <div style={{ display: 'inline-block' }}>
        <RaisedButton
          backgroundColor='#01BD9C'
          labelColor='white'
          onTouchTap={this.dialogOpen}
          label='结束盘存'
        />
        <DialogMini
          label='Modal Dialog'
          title='结束盘存'
          actions={close_inventoryCheck}
          modal
          open={this.state.dialogState}
          onRequestClose={this.dialogCancel}
          titleClassName='dialogTitle'
        >
          <div>
            <div style={{ padding: '50px' }}>即将结束盘存，是否要恢复仓库运营？</div>
          </div>
        </DialogMini>
      </div>
    )
  }
}
