/**
 * Created by shenjf on 2016/11/22.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import './Dialog.scss';

export default class BusinessDialog extends Component {
  static defaultProps = {
    title: '',
    titleStyle: {},
    contentStyle: {},
    style: {},
    bodyStyle: {},
    childrenStyle: {}
  };
  static propTypes = {
    title: PropTypes.node,
    titleStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
    actions: PropTypes.node.isRequired,
    childrenStyle: PropTypes.object,
    open: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    return (<Dialog
      modal={false}
      titleStyle={{ ...this.props.titleStyle,
        fontFamily: 'SourceHanSansCN-Medium',
        fontSize: '20px',
        color: 'rgba(0,0,0,0.87)',
        height: '4.52rem',
        border: 'none' }}
      contentStyle={{ width: '55.1rem', ...this.props.contentStyle, maxWidth: 'none', maxHeight: 'none', border: 'none' }}
      autoScrollBodyContent
      actionsContainerStyle={{ border: 'none', height: '55px', overflow: 'hidden' }}
      actions={this.props.actions}
      bodyStyle={{ overflowY: 'auto', ...this.props.bodyStyle }}
      open={this.props.open}
      title={<div>{this.props.title}</div>}
      style={{ ...this.props.style }}
    >
      <div className='businessDialogStyle' style={{ ...this.props.childrenStyle }}>
        {
          this.props.children
        }
      </div>
    </Dialog>)
  }
}
