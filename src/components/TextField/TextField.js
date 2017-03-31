
/**
 * Created by shenjf on 2016/11/22.
 */

import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import './TextField.scss';

export default class StandardTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      errorText: null
    }
  }

  static defaultProps = {
    /**
     * 注:挑选了部分TextField常用属性，如使用到其他属性自行添加入参及入参默认值
     */
    defaultValue: '',
    name: '',
    hintText: '',
    errorStyle: {},
    errorText: null,
    inputStyle: {},
    style: {},
    value: '',
    onChange: () => {},
    isNumberLimited: false,
    isShowError: false
  };

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isNumberLimited: PropTypes.bool, //输入框限定为数字
  };

  // handlePatientNameChange = (event) => {
  //   this.setState({ patientName: event.target.value })
  // };
  textFieldDidChange = (e) => {
    if (this.props.isNumberLimited && isNaN(e.target.value)) {
      this.setState({ isShowError: true });
    } else {
      this.setState({ isShowError: false });
      this.props.onChange(e);
    }
  }
  clickTextField = () => {
    document.getElementById(`${this.props.name}_textField`).focus();
  }
  render() {
    return (
      <div className='newTextField' style={{ border: this.state.isShowError ? '1px solid red' : null }} onClick={this.clickTextField}>
        <div style={{ margin: '0 16px', fontSize: '12px', width: '65px', color: '#4A4A4A' }}>
          {this.props.name}:
        </div>
        <div style={{ width: '63%' }}>
          <TextField
            id={`${this.props.name}_textField`}
            errorText={this.state.errorText || this.props.errorText}
            hintText=' ' value={this.props.value}
            onChange={this.textFieldDidChange}
            inputStyle={{ height: 30, lineHeight: '30px', padding: 2, fontSize: '14px' }}
            style={{ marginTop: '-4px', width: '100%', height: 35, lineHeight: '20px' }}
            underlineStyle={{ display: 'none' }}
          />
        </div>
        <span className='editIcon' />
      </div>
    )
  }
}
