/**
 * Created by shenjf on 2016/11/22.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import './Dialog.scss';

export default class MessageDialog extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: '',
    titleStyle: {},
    contentStyle: {},
    style: {}
  };
  static propTypes = {
    title: PropTypes.node,
    titleStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    style: PropTypes.object,
    actions: PropTypes.node.isRequired
  };

  render() {
    return (<Dialog
      modal={false}
      titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '20px', color: 'rgba(0,0,0,0.87)', height: '4.5rem', ...this.props.titleStyle }}
      contentStyle={{ width: '35.715rem', ...this.props.contentStyle, maxWidth: 'none', maxHeight: 'none', overflowY: 'auto' }}
      actions={this.props.actions}
      actionsContainerStyle={{ height: '50px', overflow: 'hidden' }}
      open={this.props.open}
      title={<div>{this.props.title}</div>}
      style={this.props.style}
    >
      <div className='dialogStyle'>
        {
          this.props.children
        }
      </div>
    </Dialog>)
  }
}
