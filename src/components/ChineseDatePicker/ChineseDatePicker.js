/**
 * Created by NXQ on 12/2/2016.
 */


import React, { Component, PropTypes } from 'react';

import './ChineseDatePicker.scss';

import DatePicker from 'material-ui/DatePicker';

require('intl/locale-data/jsonp/zh');

/**
 * 使用场景:中文时间选择器
 */
export default class ChineseDatePicker extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    /**
     * 注:挑选了部分DatePicker常用属性，如使用到其他属性自行添加入参及入参默认值
     */

    DateTimeFormat: global.Intl.DateTimeFormat,
    autoOk: false,
    className: '',
    disableYearSelection: false,
    disabled: false,
    firstDayOfWeek: 1,
    locale: 'zh',
    okLabel: '确认',
    cancelLabel: '取消',
    onChange: () => {},
    onDismiss:　() => {},
    onFocus:　() => {},
    onShow:　() => {},
    onTouchTap:　() => {},
    shouldDisableDate:　() => {},
    style: {},
    textFieldStyle: {},
    hintText: '',
    errorText: '',
    errorStyle: {},
    hintStyle: {}
  };
  static propTypes = {
    errorText: PropTypes.node,
    errorStyle: PropTypes.object
  };
  render() {
    const value = this.props.value ? { value: this.props.value } : {};
    const minDate = this.props.minDate ? { minDate: this.props.minDate } : {};
    const maxDate = this.props.maxDate ? { maxDate: this.props.maxDate } : {};
    const defaultDate = this.props.defaultDate ? { defaultDate: this.props.defaultDate } : {};
    const cn = this.props.errorText ? `${this.props.className} data-picker-error` : this.props.className;
    return (
      <div>
        <DatePicker
          {...value}
          {...minDate}
          {...maxDate}
          {...defaultDate}
          DateTimeFormat={this.props.DateTimeFormat}
          autoOk={this.props.autoOk}
          className={cn}
          disableYearSelection={this.props.disableYearSelection}
          disabled={this.props.disabled}
          firstDayOfWeek={this.props.firstDayOfWeek}
          locale={this.props.locale}
          okLabel={this.props.okLabel}
          cancelLabel={this.props.cancelLabel}
          onChange={this.props.onChange}
          onDismiss={this.props.onDismiss}
          onFocus={this.props.onFocus}
          onShow={this.props.onShow}
          onTouchTap={this.props.onTouchTap}
          shouldDisableDate={this.props.shouldDisableDate}
          style={this.props.style}
          textFieldStyle={{ cursor:'pointer', ...this.props.textFieldStyle }}
          hintText={this.props.hintText}
          hintStyle={this.props.hintStyle}
        />
        {
          (() => {
            if (this.props.errorText) {
              return (<div style={{ position: 'relative', bottom: '4px', marginTop: '3px', display: 'flex', color: 'red', fontSize: '12px', lineHeight: '12px', fontFamily: 'SourceHanSansCN-Bold', ...this.props.errorStyle }}>
                <div className='warning' >{this.props.errorText}</div>
              </div>)
            }
          })()
        }
      </div>
    )
  }
}
