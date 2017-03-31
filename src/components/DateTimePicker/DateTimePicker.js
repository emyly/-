/**
 * Created by NXQ on 12/2/2016.
 */


import React, { Component, PropTypes } from 'react';

import './DateTimePicker.scss';

import TimePicker from 'material-ui/TimePicker';

import DatePicker from 'material-ui/DatePicker';

import TextField from 'material-ui/TextField';

import moment from 'lib/moment';

require('intl/locale-data/jsonp/zh');

/**
 * 使用场景:中文日期+时间选择器
 */
export default class DateTimePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datePickerData: '',
      timePickerData: '',
      totalTime: ''
    }
  }

  static defaultProps = {
    TextFieldStyle: {},
    hintText: '',
    errorText: '',
    hintStyle: {},
    underlineShow: true,
    isClear: false,           // 是否清除数据
    inputStyle: {}
  };
  static propTypes = {
    TextFieldStyle: PropTypes.object,
    hintText: PropTypes.string,
    errorText: PropTypes.node,
    hintStyle: PropTypes.object,
    callback: PropTypes.func,
    underlineShow: PropTypes.bool,
    isClear: PropTypes.bool,
    inputStyle: PropTypes.object,
  };
  /**
   * DatePickerOnChange
   */
  handleDatePickerChange = (event, date) => {
    this.refs.TimePickerRef.openDialog();
    this.setState({
      datePickerData: Number(date),
      totalTime: Number(date)
    });
    this.props.callback(Number(date));
  }
  /**
   * TimePickerOnChange
   */
  handleTimePickerChange = (event, date) => {
    const total = Number(this.state.datePickerData) + (((new Date(date).getHours() * 60) + new Date(date).getMinutes()) * 60 * 1000);
    this.setState({
      timePickerData: Number(date),
      totalTime: total
    })
    this.props.callback(total);
  }
  /**
   * TextField外层div点击事件
   */
  handleTextFieldOutClick = (event) => {
    this.refs.DatePickerRef.openDialog();
    event.preventDefault();
    event.stopPropagation();
  };
  render() {
    const totalValue = this.state.totalTime === '' ? '' : moment(Number(this.state.totalTime)).format('YYYY-MM-DD HH:mm');
    const dateValue = this.props.isClear ? '' : totalValue;
    return (
      <div>
        <div onClick={this.handleTextFieldOutClick} >
          <TextField
            id='DateTimePicker'
            errorStyle={{ display: 'flex' }}
            style={{ height: '40px', ...this.props.TextFieldStyle, cursor: 'pointer' }}
            inputStyle={{ paddingBottom: '8px', ...this.props.inputStyle }}
            value={dateValue}
            errorText={this.props.errorText ? <div className='warning'>{this.props.errorText}</div> : ''}
            hintText={this.props.hintText}
            underlineShow={this.props.underlineShow}
            hintStyle={{ lineheight: '40px', ...this.props.hintStyle }}
          />
        </div>
        <div style={{ display: 'none' }}>
          <DatePicker
            autoOk
            id='DateTime_DatePicker'
            DateTimeFormat={global.Intl.DateTimeFormat}
            locale='zh'
            ref='DatePickerRef'
            cancelLabel='取消'
            onChange={this.handleDatePickerChange}
          />
          <TimePicker
            autoOk
            id='DateTime_TimePicker'
            ref='TimePickerRef'
            format='24hr'
            cancelLabel='取消'
            okLabel='确认'
            onChange={this.handleTimePickerChange}
          />
        </div>
      </div>
    )
  }
}
