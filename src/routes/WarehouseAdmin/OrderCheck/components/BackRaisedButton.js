/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardDialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './BackRaisedButton.scss'
/*
* 外审订单退回
* */
export default class BackRaisedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: ''
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSure = () => {
    this.setState({ loading: true });
    this.props.postOrderCheckBack(this.props.orderId, this.state.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.backRaisedButton.Code == 0) {
      this.setState({
        open: false,
        loading: false
      })
      this.context.router.push('/orderCheckList');
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleClose}
        style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#979797' }}
      />,
      <FlatButton
        label='退回'
        primary
        onTouchTap={this.handleSure}
        style={{ color: '#DF3C3C', fontFamily: 'SourceHanSansCN-Regular' }}
        disabled={this.state.loading}
      />
    ];
    const style = {
      float: 'right',
      width: '120px',
      marginRight: '30px',
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#fff'
    };
    return (
      <div>
        <RaisedButton label='审核退回' onTouchTap={this.handleOpen} style={style} labelColor='#fff' backgroundColor='#FF625B' buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }} />
        <Dialog
          actions={actions}
          open={this.state.open}
          title='审核退回'
        >
          <div>
               您正在审核此订单，请确认是否退回此订单 ?<br />
               退回理由：<br />
            <textarea name='aa' id='' style={{ width: '100%' }} rows='100' className='backTextArea' />
          </div>
        </Dialog>
      </div>
    )
  }

}
