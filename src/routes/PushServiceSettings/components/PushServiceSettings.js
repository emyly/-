/**
 * Created by NXQ on 2/23/2017.
 */
import React, { Component, PropTypes } from 'react';

import PushServiceSettingsCard from 'components/PushServiceSettingsCard';
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';

import './PushServiceSettings.scss';

export default class PushServiceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appPushDataObject: {},         // app内推数据
      shortMessageDataObject: {},    // 短信推送数据
      speechPushDataObject: {},      // 语音推送数据
      mailPushDataObject: {},        // 邮件推送
      pushServiceSettingsData: [],
      intervalTime: '',
      message: '',
      openMessageBar: false,

    }
  }
  static propTypes = {
    getPushServiceSettingsData: PropTypes.func.isRequired,
    updatePushServiceSettingsData: PropTypes.func.isRequired,
    initPushServiceSettingsData: PropTypes.func.isRequired
  }
  componentWillMount = () => {
    this.props.getPushServiceSettingsData();
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pushServiceSettings.pushServiceSettingsData.length) {
      nextProps.pushServiceSettings.pushServiceSettingsData.map((value) => {
        // 后期补上语音和邮件的数据
        if (value.XXLX === 'G') Object.assign(this.state.appPushDataObject, value);
        if (value.XXLX === 'D') Object.assign(this.state.shortMessageDataObject, value);
      })
      this.setState({
        pushServiceSettingsData: nextProps.pushServiceSettings.pushServiceSettingsData,
        appPushDataObject: this.state.appPushDataObject,
        shortMessageDataObject: this.state.shortMessageDataObject
      })
    }
    if (nextProps.pushServiceSettings.updateSetUpStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '时间间隔设置成功！',
      })
    }
  }
  /**
   * 间隔时间callback
   */
  intervalTimeCallBack = (newValue) => {
    this.setState({
      intervalTime: newValue === '' ? '' : newValue * 60000
    })
  }
  /**
   * 设置间隔时间
   */
  handleTouchTapSubmit = () => {
    if (_.has(this.state.shortMessageDataObject, 'GUID') && this.state.intervalTime !== '') {
      this.props.updatePushServiceSettingsData(this.state.shortMessageDataObject.GUID, this.state.intervalTime);
    }
  }
  /**
   * 提示信息框开关
   */
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar
    });
    if (!this.state.openMessageBar) {
      this.props.initPushServiceSettingsData();
    }
  };
  render() {
    const actions = (<nav>
      <RaisedButton
        disabled={!_.has(this.state.shortMessageDataObject, 'GUID') || this.state.intervalTime === ''}
        label='确认生效'
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#FF625B'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
        onTouchTap={this.handleTouchTapSubmit}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='推送服务设置'
        iconPosition={'0px 0px'}
        actions={actions}
        label={'推送'}
        message={'"APP内推送通知"服务未被处理时，在本页开启升级推送方式并设置间隔时间'}
        childrenStyle={{ backgroundColor: '#f6f6f6' }}
      >
        <div className='push-service-settings'>
          <PushServiceSettingsCard type='0' pushDataObject={this.state.appPushDataObject} />
          <PushServiceSettingsCard type='1' pushDataObject={this.state.shortMessageDataObject} callback={this.intervalTimeCallBack} />
          <PushServiceSettingsCard type='2' pushDataObject={this.state.speechPushDataObject} />
          <PushServiceSettingsCard type='3' pushDataObject={this.state.mailPushDataObject} />
        </div>
        <InformationSnackBar
          message={this.state.message || ''}
          autoHideDuration={1000}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>
    )
  }
}
