
  /**
 * Created by shenjf on 2016/11/22.
 */
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import './TextField.scss';

export default class TextFieldSJF extends Component {
  constructor(props) {
    super(props);
    this.state={
      patientName:''
    }
  }

  // static defaultProps = {
  //   /**
  //    * 注:挑选了部分TextField常用属性，如使用到其他属性自行添加入参及入参默认值
  //    */
  //   defaultValue: '',
  //   hintText: '',
  //   errorStyle: {},
  //   errorText: '',
  //   inputStyle: {},
  //   style: {},
  //   value: '',
  //   onChange: () => {},
  // };

  static propTypes = {
    // defaultValue: '',
    // hintText: '',
    // errorStyle: {},
    // errorText: '',
    // inputStyle: {},
    // style: {},
    // value: '',
    // onChange: () => {},

  };

  handlePatientNameChange = (event) => {
    this.setState({ patientName: event.target.value })
  };
  render() {
    return (
      <div className='newOrderWidth'>
        <div style={{ margin: '0 16px',fontSize:'14px' }}>
          病人姓名:
        </div>
        <div>
          <TextField
            hintText=' ' value={this.state.patientName}
            onChange={this.handlePatientNameChange}
            inputStyle={{ height: 30, lineHeight: '30px', padding: 2 }}
            style={{ marginTop: '-4px', width: 'inherit', height: 35, lineHeight: '20px' }}
          />
        </div>
      </div>
    )
  }
}
