/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardDialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MessageDialog from 'components/StandardUI/StandardDialog'
import './SuccessRaisedButton.scss'

export default class SuccessRaisedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      messageDialogOpen: false,
      messageDialogTitle: '',
      messageDialogMessage: ''
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleOpen = () => {
    this.props.onClick();
    if (!this.props.CKCK) {
      return this.setState({
			  messageDialogOpen: true,
			  messageDialogTitle: '警告',
			  messageDialogMessage: '请选择发货仓库'
      })
    }
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSure = () => {
    this.setState({ loading: true });
    this.props.postOrderCheckAgree(this.props.orderId, this.props.CKCK, this.props.TZNR, this.props.BTZR)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.successRaisedButton.Code == 0) {
      this.props.initStore();
      this.setState({
        open: false,
        loading: false
      });
      this.context.router.push('/orderCheckList');
    }
  }

  render() {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleClose}
        style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#979797' }}
      />,
      <FlatButton
        label='通过'
        onTouchTap={this.handleSure}
        style={{ color: '#00A0FF', fontFamily: 'SourceHanSansCN-Regular' }}
        disabled={this.state.loading}
      />
    ];
    const style = {
      float: 'right',
      width: '120px',
    };
    return (
      <div>
        <RaisedButton label='审核通过' onTouchTap={this.handleOpen} style={style} backgroundColor='#00BE9C' labelColor='#fff' buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }} />
        <Dialog
          actions={actions}
          open={this.state.open}
          title='审核通过'
        >
          <p>您正在审核此订单，请确认是否订单通过？</p>
        </Dialog>
        <MessageDialog open={this.state.messageDialogOpen} title={this.state.messageDialogTitle} actions={<RaisedButton onTouchTap={() => this.setState({ messageDialogOpen: !this.state.messageDialogTitle })} label='确定' />}>
          {this.state.messageDialogMessage}
        </MessageDialog>
      </div>
    )
  }

}
