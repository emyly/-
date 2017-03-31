/**
 * Created by NXQ on 2017/2/17.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardDialog';
import FlatButton from 'material-ui/FlatButton';
import './VerificationConfirmDialog.scss'
import TextField from 'material-ui/TextField';

/**
 * 核销确认提交对话框
 */
export default class VerificationConfirmDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',     // 用来显示的计算公式或字符串
      result: 0,       // 计算结果数字或字母
      randomType: false, // 随机到的数据类型  false表示字母 true表示数字
      color: '#1e1e1e', // 验证码字体颜色
      verify: false,   // 验证标识位
      verificationCode: '', // 用户输入的验证码
      submitBtnDisabled: false,
      submitBtnTitle: '确认核销',
    }
  }
  static defaultProps = {
    open: false,
    validationType: '0'    // '0'表示随机字母或随机算法公式 '1'表示随机字母 '2'表示随机算法公式
  };
  static propTypes = {
    // 验证类型
    validationType: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    // 验证结果回调
    handleDialogResultCallBack: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === true && nextProps.open !== this.props.open) {
      this.randomData();
    }
    if (nextProps.open === false) {
      this.setState({
        formula: '',     // 用来显示的计算公式或字符串
        result: 0,       // 计算结果数字或字母
        randomType: false, // 随机到的数据类型  false表示字母 true表示数字
        color: '#1e1e1e', // 验证码字体颜色
        verify: false,   // 验证标识位
        verificationCode: '', // 用户输入的验证码
        submitBtnDisabled: false,
        submitBtnTitle: '确认核销',
      })
    }
  }
  /**
   * 生成随机数(验证码换一换)
   */
  randomData = () => {
    this.setState({
      verify: false,        // 点换一换时清除验证标识位
      verificationCode: ''  // 点换一换时清除输入框内容
    });
    this.randomColor();
    let randomIndex = -1;
    if (this.props.validationType === '0') {       // 随机字母或随机算法公式
      randomIndex = Math.round(Math.random() * 1);    // 随机字母或算法公式
    }
    if (this.props.validationType === '1' || Number(randomIndex) === 0) { // 随机字母
      this.randomLetter();
    } else if (this.props.validationType === '2' || Number(randomIndex) === 1) { // 随机算法公式
      this.randomFormula();
    }
  }
  /**
   * 随机显示的颜色
   */
  randomColor = () => {
    let color = '';   // 随机字母结果
    const codeNormal = 'abcdefABCDEF0123456789';// 字母库
    for (let i = 0; i < 6; i++) {  // 随机获取6个字母
      color += codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
    }
    this.setState({
      color: `#${color}`
    })
  }
  /**
   * 随机字母
   */
  randomLetter = () => {
    let result = '';   // 随机字母结果
    let formula = '';  // 字母
    const codeNormal = 'qwerasdfzxcv2345678';// 字母库
    for (let i = 0; i < 4; i++) {  // 随机获取四个字母
      const random = Math.round(Math.random() * (codeNormal.length - 1));
      result += codeNormal[random];
      formula = `${formula}   ${codeNormal[random]}`;
    }
    this.setState({
      formula,
      result,
      randomType: false
    })
  }
  /**
   * 随机算法公式
   */
  randomFormula = () => {
    let formula = ''; // 计算公式
    let result = 0;   // 计算结果
    // 获取随机的两个两位数
    let Calpre = Math.round(Math.random() * 9);
    let Calafter = Math.round(Math.random() * 9);

    // 获得随机运算符
    const codeCal = ['-', '+'];
    const index = Math.round(Math.random() * 1);

    switch (codeCal[index]) { // 判断运算符并计算
      case '-':
        if (Calpre < Calafter) {    // 减法时如果前者大于后者调换顺序
          const temp = Calpre;
          Calpre = Calafter;
          Calafter = temp;
        }
        formula = `${Calpre}  -  ${Calafter}  =  ?  `;
        result = Calpre - Calafter;
        break;
      case '+':
        formula = `${Calpre}  +  ${Calafter}  =  ? `;
        result = Calpre + Calafter;
        break;
      default:
        formula = `${Calpre}  +  ${Calafter}  =  ? `;
        result = Calpre + Calafter;
        break;
    }
    this.setState({
      formula,
      result,
      randomType: true
    })
  }
  /**
   * 判断输入的验证码是否正确
   */
  validatorInputValue = () => this.state.verificationCode !== this.state.result
  /**
   * 表单验证 false表示验证通过 true表示验证失败
   */
  validator = (key = 'ALL') => {
    const verify = {
      verificationCode: this.state.verificationCode !== ''
    }
    return key === 'ALL' ? (() => {
      let verifyStatus = false;
      for (const va in verify) {
        if (!verify[va] || this.validatorInputValue()) {
          verifyStatus = true;
        }
      }
      return verifyStatus;
    })() : verify[key];
  }
  /**
   * input onChange 事件
   */
  handleChangeCode = () => (event) => {
    this.setState({
      verificationCode: this.state.randomType && event.target.value !== '' ? Number(event.target.value) : String(event.target.value)
    })
  }
  /**
   * 获取焦点事件
   */
  handleFocus = () => () => {
    this.setState({
      verify: false
    })
  }
  /**
   * 确认核销
   */
  handleSubmit = () => {
    this.setState({
      verify: this.validator()
    })
    if (!this.validator()) {
      this.props.handleDialogResultCallBack();
      this.setState({
        submitBtnDisabled: true,
        submitBtnTitle: '核销中...'
      })
    }
  }

  render() {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.props.handleDialogClose}
        style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#979797' }}
      />,
      <FlatButton
        label={this.state.submitBtnTitle}
        disabled={this.state.submitBtnDisabled}
        onTouchTap={this.handleSubmit}
        style={{ color: '#00A0FF', fontFamily: 'SourceHanSansCN-Regular' }}
      />
    ];
    return (
      <Dialog
        actions={actions}
        open={this.props.open}
        title='核销确认'
      >
        <div className='verification-confirm-dialog'>
            您正在核销，请确认是否提交 ?<br />
          {
              (() => {
                if (this.state.formula) {
                  return (<div className='verification-confirm-dialog-content'>
                    <div className='verification-title'>
                      <span className='verification-font' style={{ height: '35px', lineHeight: '35px' }}>验证码:</span>
                      <span className='verification-font' style={{ height: '55px', lineHeight: '40px' }}>输入验证码:</span>
                    </div>
                    <div className='verification-show'>
                      <div className='verification-show-div'>
                        <span
                          className='verification-font verification-random'
                          style={{ width: '50%', color: this.state.color }}
                        >{this.state.formula}</span>
                        <span
                          className='verification-font verification-exchange'
                          style={{ width: '50%', color: '#00a0ee', cursor: 'pointer' }}
                          onClick={this.randomData}
                        >换一换</span>
                      </div>
                      <div style={{ height: '55px', paddingTop: '3px' }}>
                        <TextField
                          style={{ height: '40px' }}
                          errorStyle={{ display: 'flex' }}
                          value={this.state.verificationCode}
                          errorText={this.state.verify && (!this.validator('verificationCode') || this.validatorInputValue()) && <div className='warning'>{!this.validator('verificationCode') ? '请输入验证码' : '验证码输入错误,请重新输入'}</div>}
                          type={this.state.randomType ? 'number' : 'text'} hintText={this.state.randomType ? '请输入公式结果' : '请输入验证码'}
                          onChange={this.handleChangeCode()}
                          onFocus={this.handleFocus()}
                        />
                      </div>
                    </div>
                  </div>)
                }
              })()
            }

        </div>
      </Dialog>
    )
  }


}
