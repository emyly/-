/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './ForwardingRisedButton.scss'
export default class ForwardingRisedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSure = () => {
    this.setState({ open: false });
    this.context.router.push('/orderCheckList/OrderForwarding');
  }
  render() {
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='确定'
        primary
        onTouchTap={this.handleSure}
      />
    ];
    const style = {
      float: 'right',
      width: '120px',
      marginRight: '30px'
    };
    return (
      <span>
        <RaisedButton label='确认转单' primary onTouchTap={this.handleOpen} style={style} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            您正在转发此采购订单，请确认是否确认转单？
          </Dialog>
      </span>
    )
  }

}
