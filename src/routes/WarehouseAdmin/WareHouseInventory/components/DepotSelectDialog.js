/**
 * Created by liuyali on 2017/3/13.
 */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

/* 公共组件*/
import DialogDepotSelect from 'components/DepotSelectDialog';

import './WareHouseInventory.scss';

// 选择仓库组件
export default class DepotSelectDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Index: 0,
      inventoryName: '',
      inventoryId: ''
    }
  }
  static propTypes = {
    callback: React.PropTypes.func.isRequired,
  }
  handleButtonClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleCallback = (returnValue) => {
    this.setState({ inventoryName: returnValue.name, inventoryId: returnValue.id });
    this.props.callback(returnValue.id);
  };

  render() {
    return (
      <div className='infoWrapper'>
        <img src='WarehouseInventory/ckpc_pcck.png' alt='' />
        <img className='selectAdd' src='orderCheckIcon/icon-11.png' alt='' />
        <span className='tagTitle'>拟盘存仓库:</span>
        <TextField
          id='inventory' onTouchTap={this.handleButtonClick} hintText='' value={this.state.inventoryName}
          inputStyle={{ cursor: 'pointer' }} style={{ width: 'calc(100%)', cursor: 'pointer' }}
        />
        <DialogDepotSelect
          handleButtonClick={this.handleButtonClick}
          open={this.state.open}
          ifStorage={false}
          ifShowOrder={false} callback={this.handleCallback}
        />
      </div>

    )
  }

}
