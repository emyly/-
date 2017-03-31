/**
 * Created by liuyali on 2017/3/29.
 */
import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialogmin from 'components/StandardUI/StandardDialog';
// 企业证照上传
export default class UploadDialog extends Component {
  static propTypes = {
    openStatus: PropTypes.bool,
    ifFin: PropTypes.func,
    cloaseDialog: PropTypes.func,
  }
  closeDialog = value => () => {
    this.props.ifFin(value);
  }
  closeD = () => {
    this.props.cloaseDialog()
  }
  render() {
    const actions = [<FlatButton
      label='关闭'
      labelStyle={{
        color: '#979797'
      }}
      style={{ float: 'left' }}
      onTouchTap={this.closeD}
    />, <FlatButton
      labelStyle={{
        color: '#00A0FF'
      }}
      label='四证'
      onTouchTap={this.closeDialog(1)}
    />, <FlatButton
      onTouchTap={this.closeDialog(2)}
      labelStyle={{
        color: '#00A0FF'
      }}
      label='多证合一'
    />];
    return (
      <Dialogmin
        title='企业证照'
        actions={actions}
        modal
        open={this.props.openStatus}
        autoDetectWindowHeight
        autoScrollBodyContent
      >
        <div style={{ margin: 30 }}>
          您的企业是具备四证（营业执照、税务登记证、医疗器械经营许可证、组织机构代码证）还是多证合一（多证合一、医疗器械经营许可证）？
        </div>
      </Dialogmin>
    )
  }
}
