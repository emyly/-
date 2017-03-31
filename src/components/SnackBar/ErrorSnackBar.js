/**
 * Created by zhanglei on 2016/11/1.
 */

import React, { Component, PropTypes } from 'react'
import Snackbar from 'material-ui/Snackbar'
import './SnackBar.scss'

export default class ErrorSnackBar extends Component {
  static defaultProps = {
    message: 'Default Message', // 提示消息文本
    autoHideDuration: 4000      // 自动隐藏时间
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    autoHideDuration: PropTypes.number,
    onRequestClose: PropTypes.func.isRequired
  }

  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.props.autoHideDuration}
        className='snackBar_error'
        onRequestClose={this.props.onRequestClose}
      />
    )
  }
}
