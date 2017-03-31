
import React, { Component, PropTypes } from 'react';

import './LoadingDialog.scss';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress'

export default class LoadingDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      flag: true,
      isLoading: '0',
      showCloseBtn: false
    };
  }
  static propTypes = {
    initGlobalLoading: PropTypes.func
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loadingDialog.isLoading === '1') {
      if (this.state.flag) {
        this.state.isLoading = nextProps.loadingDialog.isLoading;
        this.setState({
          flag: false,
          isLoading: nextProps.loadingDialog.isLoading
        })
        setTimeout(this.handleTimeout(), 1000);
      }
    } else {
      this.setState({
        open: false,
        flag: true,
        isLoading: '0',
        showCloseBtn: false
      });
    }
  };
  /**
   * setTimeout
   */
  handleTimeout = () => () => {
    if (this.state.isLoading === '1') {
      this.setState({
        open: true
      })
    }
  }
  /**
   * 关闭dialog
   */
  handleCloseDialog = () => {
    this.setState({
      open: false,
      flag: true,
      isLoading: '0',
      showCloseBtn: false
    });
    this.props.initGlobalLoading();
  }
  /**
   * loading 鼠标进入
   */
  handleLoadingMouseEnter = () => {
    this.setState({
      showCloseBtn: true
    });
  }
  /**
   * loading 鼠标离开
   */
  handleLoadingMouseLeave = () => {
    this.setState({
      showCloseBtn: false
    });
  }
  render() {
    return (
      <Dialog
        modal={false}
        titleStyle={{ height: '0px', border: 'none' }}
        open={this.state.open}
        contentStyle={{ width: '150px', height: '150px', maxWidth: 'none', maxHeight: 'none' }}
        className='global-loading-dialog'
        contentClassName='global-loading-dialog-content'
        overlayClassName='global-loading-dialog-overlay'
      >
        <div
          className='loading-dialog'
          onMouseEnter={this.handleLoadingMouseEnter}
          onMouseLeave={this.handleLoadingMouseLeave}
        >
          <CircularProgress size={80} thickness={6} color='#0082ff' style={{ zIndex: 99998 }} />
          <img
            style={{ display: this.state.showCloseBtn ? 'block' : 'none' }}
            className='close-img' src='/CloseLoadingDialog.png' alt='' onClick={this.handleCloseDialog}
          />
        </div>
      </Dialog>
    )
  }
}
