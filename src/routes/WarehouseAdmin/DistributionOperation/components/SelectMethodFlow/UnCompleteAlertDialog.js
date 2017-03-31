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
export default class UnCompleteAlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    goonMatchCallback: PropTypes.func.isRequired,
    gotoSelectCallback: PropTypes.func.isRequired,
    closeUnCompleteCallback: PropTypes.func.isRequired,
    lastMaterial: PropTypes.object.isRequired,
  };

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
  }

  // 关闭暂存对话框
  closeUnCompleteDialog = () => {
    // this.setState({ temporaryDialogOpen: false });
    this.props.closeUnCompleteCallback();
  };

  // 继续暂存拣货
  goonMatch = () => {
    // this.closeTemporaryDialog();
    this.props.goonMatchCallback();
  };

  // 全新拣货
  gotoSelect = () => {
    // this.closeTemporaryDialog();
    this.props.gotoSelectCallback();
  };


  render() {
    const contentStyle = { width: '35.7rem', height: '20.1rem' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    const actions = [
      <FlatButton
        label='关闭'
        primary={false}
        onTouchTap={this.closeUnCompleteDialog}
      />,
      <FlatButton
        label='继续推荐'
        primary={false}
        onTouchTap={this.goonMatch}
      />,
      <FlatButton
        label='提交'
        primary
        onTouchTap={this.gotoSelect}
      />,
    ];

    return (<Dialog
      modal
      open={this.props.dialogOpen}
      onRequestClose={this.closeUnCompleteDialog}
      actions={actions}
      autoScollBodyContent
            // style ={{width: '25%', left:'50%', marginLeft: '-12%'}}
      contentStyle={contentStyle}
      bodyStyle={bodyStyle}
      title='未完成拣货提醒'
    >
        当前订单还有{this.props.lastMaterial.lastNeed}种
        {this.props.lastMaterial.lastNumber}件
        商品未完成拣货，是否要继续提交拣货单?
      </Dialog>)
  }
}

