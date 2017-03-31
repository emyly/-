/**
 * Created by liuyali on 2017/3/27.
 */
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
/*
 * 编辑企业基本信息，弹窗中的输入框
 * */

export default class EditBlock extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    showError: PropTypes.bool
  }
  onChangeHandle = (e, newvalue) => {
    this.props.callback(e, newvalue)
  }
  render() {
    const props = this.props;
    return (<div>
      {
        props.multiline ? <div style={props.style} className={this.props.showError ? 'multiInfoDiv penIcon editBlockError' : 'multiInfoDiv penIcon'}>
          <span>{props.label}</span>
          <TextField
            onChange={props.callback}
            id={props.id}
            underlineShow={false}
            multiLine
            rows={props.line || 3}
            rowsMax={props.maxLines || 3}
            value={props.value}
            defaultValue={props.defaultValue}
            hintText=''
            hintStyle={{ height: '44px',
              bottom: 'inherit',
              fontFamily: 'PingFangSC-Regular',
              fontSize: '12px',
              color: '#979797', }}
            textareaStyle={{ fontFamily: 'SourceHanSansCN-Medium !important',
              fontSize: '12px',
              color: '#4a4a4a' }}
            style={{ width: 'calc(100% - 44px)', height: '44px', lineHeight: '18px' }}
          />
        </div> : <div style={props.style} className={this.props.showError ? 'editInfoDiv penIcon editBlockError' : 'editInfoDiv penIcon'}>
          <span>{props.label}</span>
          <TextField
            onChange={this.onChangeHandle}
            id={props.id}
            value={props.value}
            defaultValue={props.defaultValue}
            underlineShow={false}
            hintText=''
            inputStyle={{ fontFamily: 'SourceHanSansCN-Medium !important',
              fontSize: '12px',
              color: '#4a4a4a',
              height: '44px'}}
            style={{ width: 'calc(100% - 80px - 44px)', height: '44px', lineHeight: '42px' }}
          />
        </div>
      }
    </div>)
  }
}
