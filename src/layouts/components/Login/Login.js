/**
 * Created by wmt on 2017/1/12.
 */
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import MessageDialog from 'components/StandardUI/StandardDialog'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List'
import hostname2Name from 'lib/hostname2Name'
import { getHostName } from 'lib/utils'
import './Login.scss'

const hostname = getHostName();
const regPhone = /^1[3|4|5|8][0-9]\d{8}$/;
const hintStyle = {
  paddingLeft: '21px',
  fontFamily: 'SourceHanSansCN-Regular',
  fontSize: '20px',
  color: '#808080',
  letterSpacing: '0.71px'
};
const inputStyle = {
  paddingLeft: '21px',
  border: '1px solid #D8D8D8',
  borderRadius: '4px',
  lineHeight: '60px',
  height: 60
};
const underlineStyle = {
  border: 'none'
};
const textFieldStyle = {
  width: '100%',
  height: '60px',
  lineHeight: '34px',
  backgroundColor: '#fff',
  borderRadius: '4px',
  marginBottom: '40px'
};
const raisedButtonStyle = { width: '100%', height: '60px', lineHeight: '60px' };
const raisedButtonLabelStyle = { color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: 20, letterSpacing: '38px', paddingLeft: '38px' };
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      messageDialogOpen: false,
      messageDialogTitle: '',
      messageDialogMessage: '',
      isLogin: true,
      newPW: '',
      NewPWSec: '',
      verify: false,
      verifyPW: false,
      sendMessDisbale: false,
      defaultChecked: false,
      sendMessText: '获取验证码',
      verifyCode: '',
      codeVerify: false
    };
    this.count = 60;
    this.isSendMess = false;
    this.selfProps = this.props
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleEvent);
  }

  handleEvent = (event) => {
    if (event.key === 'Enter') {
      this.handleLoginClick()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.selfProps = nextProps;
    if (this.selfProps.login.message) {
      this.setState({
        messageDialogTitle: '失败',
        messageDialogOpen: true,
        messageDialogMessage: this.selfProps.login.message
      })
      this.selfProps.initStore();
    }

    if (this.selfProps.login.resetPWResult) {
      this.setState({
        messageDialogTitle: '重置密码',
        messageDialogOpen: true,
        messageDialogMessage: '重置密码成功',
        isLogin: true
      })
      this.selfProps.initStore();
    }

    if (this.selfProps.login.result) {
      this.selfProps.getToken();
      this.selfProps.initStore();
    }
  }

  componentWillUnmount() {
    this.isSendMess = false;
    window.clearInterval(this.setInterval);
    window.removeEventListener('keydown', this.handleEvent);
  }

  validator = (component) => {
    const verify = {
      phone: regPhone.test(this.state.name),
      NewPWSec: this.state.newPW === this.state.NewPWSec,
      verifyCode: !!this.state.verifyCode,
      newPW: this.state.newPW.length > 0
    }
    return component === 'ALL' ? verify : verify[component];
  }

  validatorLogin = (component) => {
    const verify = {
      password: this.state.password.length > 0,
      name: this.state.name.length > 0
    }
    return component === 'ALL' ? verify : verify[component];
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleNewPWChange = (event) => {
    this.setState({ newPW: event.target.value })
  }

  handleNewPWSecChange = (event) => {
    this.setState({ NewPWSec: event.target.value })
  }

  handleVerifyCodeChange = (event) => {
    this.setState({ verifyCode: event.target.value })
  }

  handleLoginClick = () => {
    const validatorList = this.validatorLogin('ALL');
    for (const va in validatorList) {
      if (!validatorList[va]) {
        this.setState({
          messageDialogOpen: true,
          messageDialogTitle: '警告',
          messageDialogMessage: '请填写必填项'
        })
        this.setState({
          verify: true
        })
        return;
      }
    }
    this.selfProps.userLogin(this.state.name, this.state.password)
  }

  handleSendMess = () => {
    this.count = 60;
    if (!this.validator('phone')) {
      return this.setState({ codeVerify: true })
    }
    if (this.isSendMess) {
      return;
    }
    this.setState({ disabled: true })
    this.isSendMess = true;
    this.selfProps.sendMess(this.state.name)
    this.setInterval = self.setInterval(this.countSecond, 1000)
  }

  countSecond =() => {
    if (this.count === 0) {
      this.isSendMess = false;
      window.clearInterval(this.setInterval)
      this.setState({ sendMessDisbale: false, sendMessText: '重新获取' })
    } else {
      --this.count;
      this.setState({ sendMessDisbale: true, sendMessText: `重新获取(${this.count})` })
    }
  }

  handleOnNestedListToggle= () => {
    this.setState({
      defaultChecked: !this.state.defaultChecked
    })
  }

  handleResetPWClick = () => {
    const validatorList = this.validator('ALL');
    for (const va in validatorList) {
      if (!validatorList[va]) {
        this.setState({
          messageDialogOpen: true,
          messageDialogTitle: '警告',
          messageDialogMessage: '请填写必填项'
        })
        this.setState({
          verify: true
        })
        return;
      }
    }
    this.selfProps.resetPW(this.state.name, this.state.newPW, this.state.verifyCode)
  }
  /**
   * 页脚公共部分
   * */
  renderFooter() {
    return (
      <div>
        <hr className='lineStyle' />
        <FlatButton
          label={this.state.isLogin ? '找回密码' : '返回登录页'}
          onTouchTap={() => this.setState({ isLogin: !this.state.isLogin, verify: false, codeVerify: false })}
          labelStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '18px', color: '#808080', letterSpacing: '5px', padding: 0 }}
          style={{ float: 'right' }}
        />
      </div>
    )
  }
  /**
   * 登录
   */
  renderLogin() {
    return (
      <div id='Login'>
        <TextField
          errorText={this.state.verify && !this.validatorLogin('password') && <div className='warning'>请输入密码</div>}
          type='password' value={this.state.password}
          hintStyle={hintStyle}
          style={{ width: '100%', height: '60px', lineHeight: '34px', backgroundColor: '#fff', borderRadius: '4px', marginBottom: '37px' }}
          inputStyle={inputStyle}
          underlineStyle={underlineStyle} onChange={this.handlePasswordChange} hintText={'请输入密码'}
          errorStyle={{ lineHeight: '40px' }}
        />
        <ListItem
          onNestedListToggle={this.handleOnNestedListToggle} primaryTogglesNestedList
          primaryText='自动登录' leftIcon={<Checkbox style={{ margin: 0 }} checked={this.state.defaultChecked} />}
          hoverColor='transparent' innerDivStyle={{ marginLeft: 0, padding: '3px 40px ' }}
          style={{ color: '#808080', margin: 0, marginBottom: '25px', fontSize: '18px' }}
        />
        <RaisedButton
          onTouchTap={this.handleLoginClick} label='登录' style={raisedButtonStyle} primary
          labelStyle={raisedButtonLabelStyle}
        />
        {this.renderFooter()}
      </div>
    )
  }

  /**
   * 重置密码
   */
  renderResetPW() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
          <TextField
            hintStyle={hintStyle} inputStyle={inputStyle} underlineStyle={underlineStyle}
            style={{ width: '56%',
              height: '60px',
              lineHeight: '34px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              marginBottom: '40px',
              marginRight: '4%' }}
            errorStyle={{ lineHeight: '40px' }}
            errorText={this.state.verify && !this.validator('verifyCode') && <div className='warning'>请输入验证码</div>}
            value={this.state.verifyCode} onChange={this.handleVerifyCodeChange} hintText={'验证码'}
          />
          <RaisedButton
            onTouchTap={this.handleSendMess}
            disabled={this.state.sendMessDisbale}
            label={this.state.sendMessText}
            style={{ width: '40%', height: '60px', lineHeight: '60px' }} primary
            labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: 20 }}
          />

        </div>
        <TextField
          errorStyle={{ lineHeight: '40px' }}
          errorText={this.state.verify
          && !this.validator('newPW')
          && <div className='warning'>请输入新密码</div>}
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineStyle={underlineStyle}
          type='password'
          value={this.state.newPW}
          style={textFieldStyle}onChange={this.handleNewPWChange}
          hintText={'请输入新密码'}
        />
        <TextField
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineStyle={underlineStyle}
          errorStyle={{ lineHeight: '40px' }}
          style={textFieldStyle}
          errorText={(this.state.verify || this.state.verifyPW)
          && !this.validator('NewPWSec')
          && <div className='warning'>两次密码不一致</div>}
          type='password'
          value={this.state.NewPWSec}
          onChange={this.handleNewPWSecChange}
          onBlur={() => this.setState({ verifyPW: true })} hintText={'请再次输入新密码'}
        />
        <RaisedButton onTouchTap={this.handleResetPWClick} label='提交' style={raisedButtonStyle} primary labelStyle={raisedButtonLabelStyle} />
        {this.renderFooter()}
      </div>
    )
  }

  render() {
    const background = `url(/${hostname}loginlogo.png) no-repeat center right`;
    const { isLogin } = this.state
    return (
      <div className='submitPage'>
        <div className='submitPageContainer' style={{ marginTop: this.state.isLogin ? '-296px' : '-323px' }}>
          <div className='title' style={{ background }}>
            <div className='titleBorder'>
              <div className='titleContBorder'>
                <div className='welcome'>
                  {isLogin ? 'Welcome' : 'Forgot Password'}
                </div>
                <div className='welcomeSubmit'>
                  {
                    isLogin ?
                      hostname ? `欢迎登录${hostname2Name[hostname]}物流平台` : '欢迎登录医捷云' : '找回密码'
                  }
                </div>
              </div>
            </div>
          </div>
          <TextField
            value={this.state.name}
            errorText={(this.state.verify || this.state.codeVerify) && (this.state.isLogin ? !this.validatorLogin('name')
            : !this.validator('phone')) && <div className='warning'>{this.state.isLogin ? '请输入注册名' : '请输入正确的手机号'}</div>}
            errorStyle={{ lineHeight: '40px' }}
            hintStyle={hintStyle}
            style={textFieldStyle} onChange={this.handleNameChange} hintText={'请输入注册名'}
            inputStyle={inputStyle} underlineStyle={underlineStyle}
          />
          {this.state.isLogin ? this.renderLogin() : this.renderResetPW()}

          <MessageDialog
            open={this.state.messageDialogOpen} title={this.state.messageDialogTitle}
            actions={<RaisedButton
              onTouchTap={() => {
                this.setState({ messageDialogOpen: !this.state.messageDialogTitle });
                this.selfProps.initStore();
              }} label='确定'
            />}
          >
            {this.state.messageDialogMessage}
          </MessageDialog>
        </div>
        <div className='footer-bottom-content' >
          <a className='footer-bottom-a' href='http://www.miitbeian.gov.cn'>沪ICP备16018179号-1</a>
        </div>
      </div>
    );
  }
}
