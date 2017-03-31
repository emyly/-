/**
 * Created by wangming on 2016/3/27.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：拣货推荐单生成方式
 */
export default class SelectMethodDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    closeSelectCallback: PropTypes.func.isRequired,
    systemSuggestCallback: PropTypes.func.isRequired,
    selfSelectCallback: PropTypes.func.isRequired,
    prematchingSuggestCallback: PropTypes.func.isRequired,
  };

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    this.setState({ temporaryDialogOpen: nextProps.dialogOpen });
  }

  // 关闭对话框
  closeSelectDialog = () => {
    // this.setState({ temporaryDialogOpen: false });
    this.props.closeSelectCallback();
  };

  // 系统推荐
  systemSuggest = () => {
    // this.closeTemporaryDialog();
    this.props.systemSuggestCallback();
  };

  // 自选库位
  selfSelect = () => {
    // this.closeTemporaryDialog();
    this.props.selfSelectCallback();
  };

  // 预配套
  prematchingSuggest = () => {
    // this.closeTemporaryDialog();
    this.props.prematchingSuggestCallback();
  };

  render() {
    const contentStyle = { width: '750px', height: '335px' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.closeSelectDialog}
      />,
    ];
    return (<Dialog
      modal
      open={this.props.dialogOpen}
      onRequestClose={this.closeSelectDialog}
      actions={actions}
      autoScollBodyContent
      contentStyle={contentStyle}
      bodyStyle={bodyStyle}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
        <div
          style={{ marginRight: '20px',
            fontFamily: 'SourceHanSansCN-Medium',
            fontSize: '20px',
            color: 'rgba(0,0,0,0.87)',
            letterSpacing: '0px',
            lineHeight: '20px' }}
        ><span>手术配货</span></div>
        <div
          style={{ fontFamily: 'PingFangSC-Regular',
            fontSize: '16px',
            color: 'rgba(0,0,0,0.54)',
            lineHeight: '16px' }}
        ><span>请选择拣货推荐单生成方式</span></div>
      </div>
      <div
        style={{ marginTop: '2.1rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between' }}
      >
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,160,255,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.systemSuggest}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/WarehouseAdmin/DistributionOperation/xitongtuijian.png' alt={'系统推荐'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>系统推荐</div>
        </div>
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,190,156,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.selfSelect}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/WarehouseAdmin/DistributionOperation/zixuankuwei.png' alt={'自选库位'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>自选库位</div>
        </div>
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,190,156,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.prematchingSuggest}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/prematching.png' alt={'预配套库位'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>预配套库位</div>
        </div>
      </div>
    </Dialog>)
  }
}

