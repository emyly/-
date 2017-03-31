/**
 * Author: wangming 2017/2/16
 */

import React from 'react'
import {
  Dialog,
  FlatButton
} from 'material-ui'

import CircularProgress from 'material-ui/CircularProgress';

export default class TemporaryStorage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      step: 0, // 0: 拣货提醒， 1: 正在暂存， 2: 暂存失败， 3： 暂存成功
      title: '',
      content: '',
      actions: [],
    }
  }

  static defaultProps = {

  };

  static propTypes = {
    temporaryData: React.PropTypes.object.isRequired,
    setTemporaryStorage: React.PropTypes.func.isRequired,
    temporaryStorage: React.PropTypes.object.isRequired,
  };

  componentWillMount = () => {

  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.temporaryStorage.resultState) {
      this.setStep(3);
    } else {
      this.setStep(2);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setStep(0);
    this.setState({ open: true });
  };

  // 开始暂存
  handleTemporary = () => {
    this.setStep(1);
    this.props.setTemporaryStorage(this.props.temporaryData);
  };

  setStep = (step) => {
    let title = '';
    let content = '';
    let actions = [];
    if (step === 0) {
      title = '暂存拣货提醒';
      content = '你将终止正在拣货的业务，是否需要暂存当前正在拣货的内容';
      actions = [
        <FlatButton
          label='取消'
          primary={false}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label='暂存'
          primary
          onTouchTap={this.handleTemporary}
        />,
      ];
    } else if (step === 1) {
      title = '正在暂存';
      content = (<div style={{ margin: '0 auto', width: '40', height: '40', marginBottom: '40' }}>
        <CircularProgress thickness={7} />
      </div>)
      actions = [];
    } else if (step === 2) {
      title = '暂存失败';
      content = '你正在拣货的业务暂存失败';
      actions = [
        <FlatButton
          label='关闭'
          primary={false}
          onTouchTap={this.handleClose}
        />,
      ];
    } else if (step === 3) {
      title = '暂存成功';
      content = '你正在拣货的业务已暂存'
      actions = [
        <FlatButton
          label='关闭'
          primary={false}
          onTouchTap={this.handleClose}
        />,
      ];
    }

    this.setState({ title, content, actions, step });
  }
  render() {
    const contentStyle = { width: '35.7rem', height: '20.1rem' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    return (
      <div
        style={{ width: '180px',
          margin: '0 0 0 auto',
          textAlign: 'center',
          height: '100%',
          background: '#008FE4',
          lineHeight: '69px',
          cursor: 'pointer' }}
        onClick={this.handleOpen}
      >
        <span>暂存拣货</span>
        <Dialog
          title={this.state.title}
          actions={this.state.actions}
          modal
          open={this.state.open}
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          {this.state.content}
        </Dialog>
      </div>
    );
  }

}
