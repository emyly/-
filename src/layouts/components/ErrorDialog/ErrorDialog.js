
import React, { Component, PropTypes } from 'react';

import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';

import './ErrorDialog.scss';

export default class ErrorDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openError: false
    };
  }
  handleRequestClose = () => {
    this.setState({
      openError: !this.state.openError
    });
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errorDialog.errorOpenDialogStatus) {
      this.setState({
        openError: true
      });
      this.props.putChangeErrorStatus();
    }
  };
  render() {
    return (
      <div className='error-dialog' style={{ display: this.props.errorDialog.status ? 'none' : 'block' }}>
        {
         (() => {
           if (!this.props.errorDialog.status && this.props.errorDialog.error) {
             if (this.props.errorDialog.error.Code < -800) {
               return (<WarningSnackBar
                 message={this.props.errorDialog.error.Message}
                 open={this.state.openError}
                 onRequestClose={this.handleRequestClose}
               />)
             } else {
               return (<ErrorSnackBar
                 message={this.props.errorDialog.error.Message || this.props.errorDialog.error.message}
                 open={this.state.openError}
                 onRequestClose={this.handleRequestClose}
               />)
             }
           }
         })()
       }
      </div>
    )
  }
}
