/**
 * Created by sjf on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Error from 'material-ui/svg-icons/action/report-problem';
import './EmployeeInfoDialog.scss'

/**
 * 员工管理编辑按钮组件
 * */
export default class EmployeeInfoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmployeeName: this.props.EmployeeName || '',
      YHB: {},
      Number: this.props.Number || '',
      Password: '',
      ConfirmPassword: '',
      verify: this.props.verify,
      errorMessage: '',
      openError: '',
      beforeEmployeeName: this.props.EmployeeName || '',
      beforeNumber: this.props.Number || ''
    };
  }
  static propTypes = {
    verify: PropTypes.bool,
    open: PropTypes.bool,
    EmployeeName: PropTypes.string,
    title: PropTypes.string,
    Number: PropTypes.string,
    editEmployeeInfo: PropTypes.func,
    handleEmployeeDialogToggle: PropTypes.func,
    createEmployeeRemote: PropTypes.func,
    OrderId: PropTypes.number
  }
  static defaultProps = {
    EmployeeName: '',
    Number: '',
  };
  componentWillReceiveProps = (nextProps) => {
    if (!this.props.open) {
      this.setState({
        EmployeeName: '',
        Number: '',
        Password: '',
        ConfirmPassword: '',
      });
    }
    const addEmployee = '添加员工';
    if (this.props.title === addEmployee) {
      this.setState({
        EmployeeName: '',
        Number: '',
        verify: nextProps.verify
      })
    } else {
      this.setState({
        EmployeeName: nextProps.EmployeeName,
        Number: nextProps.Number,
        verify: nextProps.verify
      });
    }
  };

  handleEmployeeNameChange = (event) => {
    this.setState({
      beforeEmployeeName: this.state.EmployeeName,
      EmployeeName: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      Password: event.target.value,
    });
  };
  handleConfirmPasswordChange = (event) => {
    this.setState({
      ConfirmPassword: event.target.value,
    });
  };
  handleNumberChange = (event) => {
    this.setState({
      beforeNumber: this.state.Number,
      Number: event.target.value,
    });
  };
  validator = (component) => {
    const verify = {
      EmployeeName: !!this.state.EmployeeName,
      Password: !!this.state.Password,
      ConfirmPassword: !!this.state.ConfirmPassword,
      Number: !!this.state.Number,
      ConfirmPasswordSame: this.state.Password === this.state.ConfirmPassword,
    };
    return component === 'ALL' ? verify : verify[component];
  };
  handleOnClick = () => {
    this.setState({
      verify: true
    })
    const editEmployee = '编辑员工信息';
    if (this.props.title === editEmployee) {
      const validatorList = this.validator('ALL');
      let dealfn = true;
      for (const property in validatorList) {
        if (!validatorList[property]) (dealfn = false);
      }

      if (dealfn || (!this.state.Password && !this.state.ConfirmPassword)) {
        const YHB = {
          SJHM: this.state.Number, // 手机号码
          YHXM: this.state.EmployeeName, // 创建人
          MM: this.state.Password, //密码
        };
        this.setState({
          YHB,
        });
        this.props.editEmployeeInfo(this.props.OrderId, YHB);
        this.props.handleEmployeeDialogToggle();
      }
    } else {
      const validatorList = this.validator('ALL');
      let dealfn = true;
      for (const property in validatorList) {
        if (!validatorList[property]) (dealfn = false);
      }
      if (dealfn) {
        const YHB = {
          SJHM: this.state.Number, // 手机号码
          YHXM: this.state.EmployeeName, // 创建人
          MM: this.state.Password, //密码
        };
        this.setState({
          YHB,
        });
        this.props.createEmployeeRemote(YHB);
        this.props.handleEmployeeDialogToggle();
      }
    }
  }
  componentWillMount = () => {
    const creatEmployee = '添加员工';
    if (this.props.title === creatEmployee) {
      this.setState({
        passwordName: '密码设置'
      })
    } else {
      this.setState({
        passwordName: '密码重置'
      })
    }
  };

  render() {
    const title = '添加员工';
    const createPasswordError = (this.state.verify && !this.validator('Password') ? 'inline-block' : 'none');
    const EditPasswordError = (this.state.verify && !this.validator('Password') && this.validator('ConfirmPassword') ? 'inline-block' : 'none');
    const createConfirmPassword = (this.state.verify && !this.validator('ConfirmPassword') ? 'inline-block' : 'none');
    const EditConfirmPassword = (this.state.verify && !this.validator('ConfirmPassword') && this.validator('Password') ? 'inline-block' : 'none');
    const saveCreateTitleColor = (!this.validator('EmployeeName') && !this.validator('Password')
    && !this.validator('ConfirmPassword') && !this.validator('Number') ? '#c4c4c4' : '#00A0FF');
    const saveEditTitleColor = ((this.validator('Password') || this.validator('ConfirmPassword')
    || this.state.beforeEmployeeName !== this.state.EmployeeName || this.state.beforeNumber !== this.state.Number) ? '#00A0FF' : '#c4c4c4');
    const actionsEdit = [
      <FlatButton
        label='取消'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#979797' }}
        onTouchTap={this.props.handleEmployeeDialogToggle}
      />,
      <FlatButton
        label='保存'
        disabled={
          this.props.title === title ?
          !this.validator('EmployeeName') && !this.validator('Password') &&
          !this.validator('ConfirmPassword') &&
          !this.validator('Number') :
          this.state.beforeEmployeeName === this.state.EmployeeName &&
          !this.validator('EmployeeName') && this.state.beforeNumber === this.state.Number &&
          !this.validator('Number') && !this.validator('Password') && !this.validator('ConfirmPassword')}
        labelStyle={{
          fontFamily: 'SourceHanSansCN-Medium',
          fontSize: 14,
          color: (this.props.title === title ?
          saveCreateTitleColor : saveEditTitleColor) }}
        onTouchTap={this.handleOnClick}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        actions={actionsEdit}
        modal={false}
        open={this.props.open}
      >
        <div>
          <div>
            <span style={{ marginRight: '2%', width: '10%' }}>员工姓名:</span>
            <TextField
              hintText='请输入员工姓名' defaultValue={this.state.EmployeeName}
              style={{ width: '50%', marginLeft: '10px', fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: 'rgba(0,0,0,0.87)' }}
              onChange={this.handleEmployeeNameChange} id='EmployeeName' name='EmployeeName'
            />
            <span >
              <FlatButton
                label='请输入员工姓名' labelPosition='before' icon={<Error />}
                style={{
                  display: this.state.verify && !this.validator('EmployeeName') ? 'inline-block' : 'none',
                  color: 'red',
                  cursor: 'default' }} hoverColor='#fff'
              />
            </span>
          </div>
          <br />
          <div>
            <span style={{ marginRight: '2%', width: '10%' }}>{this.state.passwordName}:</span>
            <TextField
              hintText='请输入密码' defaultValue={this.state.Password}
              style={{
                width: '50%',
                marginLeft: '10px',
                fontFamily: 'SourceHanSansCN-Regular',
                fontSize: 16,
                color: 'rgba(0,0,0,0.87)' }}
              onChange={this.handlePasswordChange}
              id='EmployeeName1'
              name='EmployeeName1'
            />
            <span >
              <FlatButton
                label='请输入密码'
                labelPosition='before' icon={<Error />}
                style={{
                  display: this.props.title === title ? createPasswordError : EditPasswordError,
                  color: 'red',
                  cursor: 'default' }} hoverColor='#fff'
              />
            </span>
          </div>
          <br />
          <div>
            <span style={{ marginRight: '2%', width: '10%' }}>确认密码:</span>
            <TextField
              hintText='请确认密码' defaultValue={this.state.ConfirmPassword}
              style={{ width: '50%', marginLeft: '10px', fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: 'rgba(0,0,0,0.87)' }}
              onChange={this.handleConfirmPasswordChange} id='EmployeeName1'
              name='EmployeeName1'
            />
            <span >
              <FlatButton
                label='请输入确认密码'labelPosition='before' icon={<Error />}
                style={{
                  display: this.props.title === title ? createConfirmPassword : EditConfirmPassword,
                  color: 'red',
                  cursor: 'default'
                }}
                hoverColor='#fff'
              />
              <FlatButton
                label='两次密码输入不一致'labelPosition='before' icon={<Error />}
                style={{
                  display: this.state.verify && this.validator('ConfirmPassword') && !this.validator('ConfirmPasswordSame') ? 'inline-block' : 'none',
                  color: 'red',
                  cursor: 'default' }}
                hoverColor='#fff'
              />
            </span>
          </div>
          <br />
          <div>
            <span style={{ marginRight: '2%', width: '10%' }}>联系方式:</span>
            <TextField
              hintText='请输入联系方式' defaultValue={this.state.Number}
              style={{ width: '50%',
                marginLeft: '10px',
                fontFamily: 'SourceHanSansCN-Regular',
                fontSize: 16,
                color: 'rgba(0,0,0,0.87)' }} onChange={this.handleNumberChange} id='EmployeeName2'
              name='EmployeeName2'
            />
            <span >
              <FlatButton
                label='请输入联系方式' labelPosition='before' icon={<Error />}
                style={{
                  display: this.state.verify && !this.validator('Number') ? 'inline-block' : 'none',
                  color: 'red',
                  cursor: 'default' }} hoverColor='#fff'
              />
            </span>
          </div>
        </div>
      </Dialog>
    )
  }
}
