/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：暂存提示
 */
export default class TemporaryDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temporaryDialogOpen: false
    }
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    temporarySelectCallback: PropTypes.func.isRequired,
    openSelectDialogCallback: PropTypes.func.isRequired,
    closeTemporaryCallback: PropTypes.func.isRequired,
  };

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    this.setState({ temporaryDialogOpen: nextProps.dialogOpen });
  }

  // 关闭暂存对话框
  closeTemporaryDialog = () => {
    // this.setState({ temporaryDialogOpen: false });
    this.props.closeTemporaryCallback();
  };

  // 继续暂存拣货
  handleGoOnTemporary = () => {
    // this.closeTemporaryDialog();
    this.props.temporarySelectCallback();
  };

  // 全新拣货
  handleNewSelect = () => {
    // this.closeTemporaryDialog();
    this.props.openSelectDialogCallback();
  };


  render() {
    const contentStyle = { width: '35.7rem', height: '20.1rem' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    const actions = [
      <FlatButton
        label='关闭'
        primary={false}
        onTouchTap={this.closeTemporaryDialog}
      />,
      <FlatButton
        label='全新拣货'
        primary={false}
        onTouchTap={this.handleNewSelect}
      />,
      <FlatButton
        label='继续拣货'
        primary
        onTouchTap={this.handleGoOnTemporary}
      />,
    ];

    return (<Dialog
      modal
      open={this.props.dialogOpen}
      onRequestClose={this.closeTemporaryDialog}
      actions={actions}
      autoScollBodyContent
            // style ={{width: '25%', left:'50%', marginLeft: '-12%'}}
      contentStyle={contentStyle}
      bodyStyle={bodyStyle}
      title='继续拣货提醒'
    >
        是否继续之前中断了的拣货操作?
      </Dialog>)
  }
}

