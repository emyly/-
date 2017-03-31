/**
 * Created by zhanglei on 2016/10/31.
 */


import React, { Component, PropTypes } from 'react';
import StandardForm from 'components/StandardForm';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import OrderTracker from 'components/OrderTracker';
import RaisedButton from 'material-ui/RaisedButton';

import FlatButton from 'material-ui/FlatButton';


export default class FormUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      openInfo: false,
      openWarning: false,
      openError: false
    };
  }

  handleTouchTap1 = () => {
    this.setState({
      openError: false,
      openWarning: false,
      openInfo: true,
      message: '这里是测试消息'
    });
  };
  handleTouchTap2 = () => {
    this.setState({
      openError: false,
      openWarning: true,
      openInfo: false,
      message: '这里发生了一个警告',
    });
  };
  handleTouchTap3 = () => {
    this.setState({
      openError: true,
      openWarning: false,
      openInfo: false,
      message: '这里发生了一个错误'
    });
  };
  handleRequestClose = () => {
    this.setState({
      openInfo: false,
      openWarning: false,
      openError: false
    });
  };

  render() {
    const actions = [
      <FlatButton key='reset' label='重置表单' />,
      <RaisedButton key='save' label='保存数据' />
    ];

    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap1}
          label='Info'
        />
        <RaisedButton
          onTouchTap={this.handleTouchTap2}
          label='Warning'
        />
        <RaisedButton
          onTouchTap={this.handleTouchTap3}
          label='Error'
        />
        <StandardForm title='这里演示的是表单页组成，以及消息框' message='您当前正在处理 <杭州市妇幼保健院 #908432> 的订单，当前仓库是 <杭州市江干区第二仓库>'>
          <StandardFormCardList activeStep={0}>
            <StandardFormCard title='拣货提示单' stepName='拣货／配货' completed showContent={false} expanded>
              <OrderBasicInfoForm orderId={111} orgId={222} />
            </StandardFormCard>
            <StandardFormCard title='复核确认' message='请查看或选择' stepName='复核／确认' avatar='fg-128.jpg' showContent={false} />
          </StandardFormCardList>
        </StandardForm>
        <StandardForm title='这里演示的是表单页组成，以及消息框' message='您当前正在处理 <杭州市妇幼保健院 #908432> 的订单，当前仓库是 <杭州市江干区第二仓库>'>
          <StandardFormCardList activeStep={1}>
            <StandardFormCard title='拣货提示单' stepName='拣货／配货' completed showContent />
            <StandardFormCard title='复核确认' message='请查看或选择' actions={actions} showStep={false} expanded>
              <OrderBasicInfoForm orderId={111} orgId={222} />
            </StandardFormCard>
          </StandardFormCardList>
        </StandardForm>

        <OrderTracker completeIndex={4} onlyShowCompleted={false} />

        <InformationSnackBar
          message={this.state.message} open={this.state.openInfo}
          onRequestClose={this.handleRequestClose}
        />
        <WarningSnackBar
          message={this.state.message} open={this.state.openWarning}
          onRequestClose={this.handleRequestClose}
        />
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

/*
 flex-direction: row;
 justify-content: flex-end;
 display: flex;
 * */
