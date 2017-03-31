/**
 * Created by wangming on 2016/11/1.
 */


import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import './BarCodeTextField.scss';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import hibcParse from './hibc_parse';

// 条码类型
const barCodeType = {
  HIBC: 0,
  UCC: 1,
  OTHER: 2,
};

// 状态机状态
const codeHandleState = {
  START: 0,
  WAIT: 1,
  OTHER: 2,
};


/**
 * 此组件不支持页面同时放置或者同时出现两个或两个以上，会造成API请求紊乱
 */
export default class BarCodeTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintText: this.props.hintText,
      scanMode: this.props.scanMode,
      textValue: '',
      selectValue: '',
      modeText: '手动',
      errorMessage: '',
      openError: false,
      submiting: false,
      sendSPTM: [], // 发送条码
      timer: null, //定时器对象
    }
    this.codeType = barCodeType.OTHER;
    this.handleState = codeHandleState.START;
    this.handleStateCallback = {};
    this.timer = null;
    this.sendSPTM = [];
    this.UCCBuffer = {};
    this.HIBCBuffer = {};
    this.HIBCIndex = 0;
  }
  static defaultProps = {
    hintText: '条码扫描',
    scanMode: true,
    showHint: true
  };

  static propTypes = {
    showHint: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    hintText: React.PropTypes.string,
    orderId: React.PropTypes.number,
    orderType: React.PropTypes.string,
    logisticId: React.PropTypes.string, // 物流单号
    StorageId: React.PropTypes.number, // 库位id
    inOut: React.PropTypes.bool.isRequired, // 入库or出库 true: 出库 , false: 入库
    scanMode: React.PropTypes.bool, // 输入模式.   true: 手动输入， false： 扫码
		// onManualSubmit: React.PropTypes.func.isRequired //用于手动提交
    sendTimerInterval: React.PropTypes.number, //设置输入超时时间
    CKID: React.PropTypes.number, //转移仓库
    KWID: React.PropTypes.array, //选中的库位数组
    transGoods: React.PropTypes.bool,
    inputStyle:PropTypes.object,
    hintStyle:PropTypes.object
  };

  componentWillMount = () => {
    console.debug('componentWillMount barCodeTextField 1:', this.props);
    // Object.keys(codeHandleState).map(key=>{
    //   this.handleStateCallback[key] =
    // })
    this.handleStateCallback[codeHandleState.START] = this.handleStateStart;
    this.handleStateCallback[codeHandleState.WAIT] = this.handleStateWait;
    this.handleStateCallback[codeHandleState.OTHER] = this.handleStateOther;
  };

  componentWillUnmount = () => {
    console.debug('componentWillUnmount barCodeTextField 1:', this.props);
    window.removeEventListener('keyup', this.f2KeyUp);
  };

  f2KeyUp = (e) => {
    console.debug(event);
    if (event.key === 'F2') {
      document.getElementById('barCodeTextField').focus();
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.f2KeyUp);

		// document.onKeyUp= this.f2KeyUp;
    document.getElementById('barCodeTextField').focus();
  }


  isEmptyObject = (objectData) => {
    const ret = Object.keys(objectData).length;
    return ret === 0;
  };


  componentWillReceiveProps(nextProps) {
    console.debug('BarCodeTextField: componentWillReceiveProps', nextProps);
    this.setState({
      text: nextProps.text
    });
    this.setState({ textValue: '' });
    if (Object.prototype.toString.call(nextProps.barCodeTextField.barCodeData) !== '[object Undefined]') {
      if (!this.isEmptyObject(nextProps.barCodeTextField.barCodeData)) {
        console.debug('barCodeTextField 1:', nextProps, this.state);
        if (this.state.submiting) {
          this.props.onChange(Object.assign({}, nextProps.barCodeTextField.barCodeData));
          this.props.clearErrorMsg();
          this.setState({ submiting: false });
        }
      }else if(nextProps.barCodeTextField.transferData.length > 0) {
        console.debug('barCodeTextField 1:', nextProps, this.state);
        if (this.state.submiting) {
          this.props.onChange( nextProps.barCodeTextField.transferData );
          this.props.clearErrorMsg();
          this.setState({ submiting: false });
        }
      } else {
        this.setState({ submiting: false })
        if (nextProps.barCodeTextField.error) {
          console.debug('barCodeTextField 2:', nextProps.barCodeTextField.error.response.Message);
          if (Object.prototype.toString.call(nextProps.barCodeTextField.error.response) !== '[object Undefined]') {
            this.setState({ errorMessage: nextProps.barCodeTextField.error.response.Message });
            this.setState({ openError: true });
          }
        }
      }
    }
  }
  showSubmitButton = () => {
    if (this.state.scanMode) {
      return (<RaisedButton
        label='确定'
        onTouchTap={this.onManualSubmit}
        style={{ marginLeft: '18px',
          marginRight: '20px',
          width: '6.6rem',
          height: '2.6rem',
          lineHeight: '2.6rem',
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)',
          borderRadius: '2px',
          ...this.props.btnStyle }}
        buttonStyle={{ background: '#00BE9C', fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', ...this.props.buttonStyle }}
        labelStyle={{ color: '#FFF', ...this.props.labelStyle }}
      />)
    }
  };

  showChangeModeButton = () => <RaisedButton
    label={this.state.modeText}
    primary
    onTouchTap={this.changeScanMode}
    style={{ marginLeft: '10px', marginRight: '20px' }}
		/>;

  // 异常处理
  handleError = (msg) => {
    this.setState({
      openError: true,
      errorMessage: msg
    });
  }


  // code预处理，去掉前后空格及*号符号
  preHandlebarCode = (value) => {
    const tpValue = value;
    const length = tpValue.length;

    if (tpValue[0] === ' ' || tpValue[0] === '*') {
      return this.preHandlebarCode(tpValue.substring(1));
    } else if (tpValue[length - 1] === ' ' || tpValue[length - 1] === '*') {
      return this.preHandlebarCode(tpValue.substring(0, length - 1));
    }
    return tpValue;
  }

  // 解码 支持HIBC && UCC
  // handleBarCode = (value) => {
  //   const tpValue = this.preHandlebarCode(String(value)); //code预处理，去掉前后空格及*号符号
  //   console.debug('handleBarCode 1:', tpValue);
  //   const caseValue = tpValue.substring(0, 2);
  //   const valueLength = tpValue.length;
  //   // const tm = window.setTimeout();
  //   var tm = null;

  //   if(this.state.timer){ //处理次码
  //     window.clearTimeout(this.state.timer); //清理定时器
  //     this.state.sendSPTM.push(tpValue); //压入发送条码数组
  //     this.setState({timer: null, sendSPTM: this.state.sendSPTM});
  //     return 1;
  //   }else{ //处理主码
  //     if(tpValue[0] === '+'){ //HIBC字符 双码
  //       this.codeType = barCodeType.HIBC;
  //       const tpSend = [];
  //       tpSend.push(tpValue);
  //       tm = window.setTimeout(this.handleTimeOut, this.props.sendTimerInterval || 10000);
  //       this.setState({timer: tm, sendSPTM: tpSend});
  //       return 0;
  //     }else if(caseValue === '00'){ //UCC
  //       if(valueLength === 20) { //双码
  //         const tpSend = [];
  //         tpSend.push(tpValue);
  //         tm = window.setTimeout(this.handleTimeOut, this.props.sendTimerInterval || 10000);
  //         this.setState({timer: tm, sendSPTM: tpSend});
  //         return 0;
  //       }else if(valueLength > 20){ //单码
  //         this.state.sendSPTM.push(tpValue);
  //         this.setState({timer: tm, sendSPTM:  this.state.sendSPTM});
  //         return 1;
  //       }else{ //其他 格式不支持或扫码异常
  //          this.handleError('输入条码格式不支持或不符合规范');
  //          return 0;
  //       }
  //     }else if(caseValue === '01' || caseValue === '02'){ //UCC
  //       if(valueLength === 16) { //双码
  //         const tpSend = [];
  //         tpSend.push(tpValue);
  //         tm = window.setTimeout(this.handleTimeOut, this.props.sendTimerInterval || 10000);
  //         this.setState({timer: tm, sendSPTM: tpSend});
  //         return 0;
  //       }else if(valueLength > 16){ //单码
  //         this.state.sendSPTM.push(tpValue);
  //         this.setState({timer: tm, sendSPTM:  this.state.sendSPTM});
  //         return 1;
  //       }else{ //其他 格式不支持或扫码异常
  //          this.handleError('输入条码格式不支持或不符合规范');
  //          return 0;
  //       }
  //     }else{ //其他 格式不支持或扫码异常
  //        this.handleError('输入条码格式不支持或不符合规范');
  //        return 0;
  //     }
  //   }

  //   return 0;
  // }

  ifUCC = (value) => {
    const keySub = value.substring(0, 2);
    const keySubb = value.substring(0, 3);

    return (['00', '01', '02', '10', '11', '13',
      '15', '17', '21', '30', '37'].find(val => val === keySub)
    || ['240', '241', '250', '251'].find(val => val === keySubb))
  }

  handleDecodeHIBC = (value) => {
    const tpSend = [];
    tpSend.concat(this.sendSPTM);
    tpSend.push(value);
    console.debug('handleDecodeHIBC:', tpSend, this.sendSPTM);
    this.HIBCBuffer = hibcParse(tpSend);
    console.debug('handleDecodeHIBC: 1', this.HIBCBuffer);
  }

  handleCodeHIBC = (value) => {
    // this.handleDecodeHIBC(value);
    this.sendSPTM.push(value);
  }

  hanldeCodeUCC = (value) => {
    this.hanldeDeCodeUCC(value);
    const preCode = value.substring(0, 2);
    if (preCode === '00' || preCode === '01' || preCode === '02') {
      this.sendSPTM[0] = value;
    } else {
      this.sendSPTM[1] = value;
    }
  }

  hanldeDeCodeUCC = (value) => {
    const tpValue = String(value);
    if (tpValue.length === 0) {

    } else {
      switch (tpValue.substring(0, 2)) {
        case '00':
          this.UCCBuffer['00'] = tpValue.substring(2, 20);
          return this.hanldeDeCodeUCC(tpValue.substring(20));
          break;
        case '01':
          this.UCCBuffer['01'] = tpValue.substring(2, 16);
          return this.hanldeDeCodeUCC(tpValue.substring(16));
          break;
        case '02':
          this.UCCBuffer['02'] = tpValue.substring(2, 16);
          return this.hanldeDeCodeUCC(tpValue.substring(16));
          break;
        case '10':
          this.UCCBuffer['10'] = tpValue.substring(2);
          return;
          break;
        case '11':
          this.UCCBuffer['11'] = tpValue.substring(2, 8);
          return this.hanldeDeCodeUCC(tpValue.substring(8));
          break;
        case '13':
          this.UCCBuffer['13'] = tpValue.substring(2, 8);
          return this.hanldeDeCodeUCC(tpValue.substring(8));
          break;
        case '15':
          this.UCCBuffer['15'] = tpValue.substring(2, 8);
          return this.hanldeDeCodeUCC(tpValue.substring(8));
          break;
        case '17':
          this.UCCBuffer['17'] = tpValue.substring(2, 8);
          return this.hanldeDeCodeUCC(tpValue.substring(8));
          break;
        case '21':
          this.UCCBuffer['21'] = tpValue.substring(2);
          return;
          break;
        case '30':
          this.UCCBuffer['30'] = tpValue.substring(2);
          return;
          break;
        case '37':
          this.UCCBuffer['37'] = tpValue.substring(2);
          return;
          break;
        default: {
          switch (tpValue.substring(0, 3)) {
            case '240':
              this.UCCBuffer['240'] = tpValue.substring(3);
              return;
              break;
            case '241':
              this.UCCBuffer['241'] = tpValue.substring(3);
              return;
              break;
            case '250':
              this.UCCBuffer['250'] = tpValue.substring(3);
              return;
              break;
            case '251':
              this.UCCBuffer['251'] = tpValue.substring(3);
              break;
            default:
          }
        }
      }
    }
  }

  // 输入定时器超时处理
  // handleTimeOut = () => {
  //   window.clearTimeout(this.state.timer);
  //   this.setState({timer: null, sendSPTM: []});
  //   this.handleError('输入条码格式不支持或不符合规范');
  // }


  handleTimeOut = () => {
    window.clearTimeout(this.state.timer);
    this.clearTimer();
    this.sendSPTM = [];
    this.clearTimer();
    this.handleState = codeHandleState.START;
    this.UCCBuffer = {};
    this.HIBCBuffer = {};
    this.HIBCIndex = 0;
    // this.setState({timer: null, sendSPTM: []});
    this.handleError('输入条码格式不支持或不符合规范或等待扫码超时');
  }

  startTimer = () => {
    this.timer = window.setTimeout(this.handleTimeOut, this.props.sendTimerInterval || 8000);
  }

  clearTimer = () => {
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  // 完整性检查
  ifShouldSend = (codeType) => {
    const tpUCC = this.UCCBuffer;
    if (codeType === barCodeType.UCC) {
      if (tpUCC['00'] || tpUCC['01'] || tpUCC['02']) {
        if ((tpUCC['11'] || tpUCC['17']) && (tpUCC['21'] || tpUCC['10'])) {
          return true;
        }
      }
    } else if (codeType === barCodeType.HIBC) {
      this.HIBCBuffer = hibcParse(this.sendSPTM);
      console.debug('ifShouldSend:', this.HIBCBuffer);
      if (this.HIBCBuffer.date && this.HIBCBuffer.lot && this.HIBCBuffer.product) {
        return true;
      }
    }

    return false;
  }

  handleStateOther = () => {
    console.debug('handleStateOther');
    this.handleError('输入条码格式不支持或不符合规范');
    this.clearTimer();
    this.UCCBuffer = {};
    this.HIBCBuffer = {};
  }

  // 开始状态处理
  handleStateStart = (value) => {
    const tpValue = value;
    if (tpValue[0] === '+') {
      this.codeType = barCodeType.HIBC;
      this.handleCodeHIBC(tpValue);
      this.startTimer();
      this.handleState = codeHandleState.WAIT;
      this.HIBCIndex++;
    } else if (this.ifUCC(tpValue)) {
      this.codeType = barCodeType.UCC;
      this.hanldeCodeUCC(tpValue);
      if (!this.ifShouldSend(this.codeType)) {
        this.startTimer();
        this.handleState = codeHandleState.WAIT;
      } else {
        this.handleState = codeHandleState.OTHER;
      }
    } else {
      this.codeType = barCodeType.OTHER;
    }
  };

  handleStateWait = (value) => {
    const tpValue = value;
    if (tpValue[0] === '+') {
      this.codeType = barCodeType.HIBC;
      this.handleCodeHIBC(tpValue);
      if (!this.ifShouldSend(this.codeType)) {
        if (this.HIBCIndex === 2) {
          this.codeType = barCodeType.OTHER;
          this.handleState = codeHandleState.START;
          this.clearTimer();
          this.sendSPTM = [];
          this.handleError('输入条码格式不支持或不符合规范');
          this.UCCBuffer = {};
          this.HIBCBuffer = {};
          this.HIBCIndex = 0;
        } else {
          this.clearTimer();
          this.startTimer();
          this.handleState = codeHandleState.WAIT;
          this.HIBCIndex++;
        }
      } else {
        this.handleState = codeHandleState.OTHER;
      }
    } else if (this.ifUCC(tpValue)) {
      this.codeType = barCodeType.UCC;
      this.hanldeCodeUCC(tpValue);
      if (!this.ifShouldSend(this.codeType)) {
        this.clearTimer();
        this.sendSPTM = [];
        this.handleError('输入条码格式不支持或不符合规范');
        this.UCCBuffer = {};
        this.handleState = codeHandleState.START;
      } else {
        this.handleState = codeHandleState.OTHER;
      }
    } else {
      this.codeType = barCodeType.OTHER;
      this.handleState = codeHandleState.START;
      this.clearTimer();
      this.sendSPTM = [];
      this.handleError('输入条码格式不支持或不符合规范');
      this.UCCBuffer = {};
      this.HIBCBuffer = {};
      this.HIBCIndex = 0;
    }
  };

  // 条码状态处理
  handleCodeState = (value) => {
    // if(this.handleState === codeHandleState.START) { //开始状态

    // }else if(this.handleState === codeHandleState.WAIT) { //等待下一个状态

    // }else{ //其他

    // }
    this.handleStateCallback[this.handleState](value);
  };


  // 解码 支持HIBC && UCC
  handleBarCode = (value) => {
    const tpValue = this.preHandlebarCode(String(value)); // code预处理，去掉前后空格及*号符号
    // console.debug('handleBarCode 1:', tpValue);
    // const caseValue = tpValue.substring(0, 2);
    // const valueLength = tpValue.length;
    // const tm = window.setTimeout();
    // var tm = null;

    this.handleCodeState(tpValue);

    // if(this.state.timer){ //处理次码
    //   window.clearTimeout(this.state.timer); //清理定时器
    //   this.state.sendSPTM.push(tpValue); //压入发送条码数组
    //   this.setState({timer: null, sendSPTM: this.state.sendSPTM});
    //   return 1;
    // }else{ //处理主码
    //   if(tpValue[0] === '+'){ //HIBC字符 双码
    //     this.codeType = barCodeType.HIBC;
    //     return 0;
    //   }else if(caseValue === '00'){ //UCC

    //   }else{ //其他 格式不支持或扫码异常
    //      this.handleError('输入条码格式不支持或不符合规范');
    //      return 0;
    //   }
    // }

    // return 0;
  }

  handleTranGood = (value) => {
    // const objectTm = {};
    const ret = this.handleBarCode(value);
    console.debug('handleBarcodeByOut:', this.sendSPTM, this.timer, ret);
    // if(ret === 1 && this.state.sendSPTM.length > 0) {
    this.props.getTranGood({
      SPTM: this.sendSPTM,
      KWID: this.props.KWID,
      CKID: this.props.CKID
    });
    // this.setState({sendSPTM: []});
    this.sendSPTM = [];
    this.clearTimer();
    this.handleState = codeHandleState.START;
    this.UCCBuffer = {};
    this.HIBCBuffer = {};
    this.HIBCIndex = 0;
    this.setState({ textValue: '' });
  };

  handleBarcodeByOut = (value) => {
    // const objectTm = {};
    const ret = this.handleBarCode(value);
    console.debug('handleBarcodeByOut:', this.sendSPTM, this.timer, ret);
    // if(ret === 1 && this.state.sendSPTM.length > 0) {
    if (this.handleState === codeHandleState.OTHER) {
      this.props.getBarcodeOut({
        SPTM: this.sendSPTM,
        KWID: this.props.StorageId
      });
      // this.setState({sendSPTM: []});
      this.sendSPTM = [];
      this.clearTimer();
      this.handleState = codeHandleState.START;
      this.UCCBuffer = {};
      this.HIBCBuffer = {};
      this.HIBCIndex = 0;
    }
    this.setState({ textValue: '' });
  };

  handleBarcodeByIn =(value) => {
    // const objectTm = {};
    const ret = this.handleBarCode(value);
    console.debug('handleBarcodeByIn:', this.sendSPTM, this.timer);
    if (this.handleState === codeHandleState.OTHER) {
      this.props.getBarcodeIn({
        SPTM: this.sendSPTM,
        DDLX: this.props.orderType,
        DDID: this.props.orderId,
        WLDH: this.props.logisticId
      });

      this.sendSPTM = [];
      this.clearTimer();
      this.handleState = codeHandleState.START;
      this.UCCBuffer = {};
      this.HIBCBuffer = {};
      this.HIBCIndex = 0;
    }
    this.setState({ textValue: '' });
  };

  onManualSubmit = () => {
    console.debug('onManualSubmit in');
    // if (!this.state.submiting) {

    if (this.props.transGoods){
      //商品转移
      this.handleTranGood(this.state.textValue);
      this.setState({ submiting: true });
    }
    else if (this.state.textValue) {
				// 调用接口并返回
      this.setState({ submiting: true });
      if (this.props.inOut) {
					// 出库
        console.debug(this.state.textValue);
        this.handleBarcodeByOut(this.state.textValue);
      } else {
					// 入库
        this.handleBarcodeByIn(this.state.textValue);
      }
    }
    // }

    document.getElementById('barCodeTextField').focus();
  };

  startScan = () => {

  };

  barCodeOnChange = (event) => {
		// 调用接口并返回数据
		// this.props.onChange();
    this.setState({ textValue: event.target.value });
  };

  showBarText = () =>
		// if(this.state.scanMode){
    <TextField
      {...this.props.definitionStyle}
      inputStyle={this.props.inputStyle}
      hintStyle={this.props.hintStyle}
      style={{background: '#fff', color: '#C4C4C4', width: '26rem', height: '3.3rem', borderRadius: '4px', top: '50%', paddingLeft: '4px', position: 'relative', fontFamily: 'SourceHanSansCN-Regular', ...this.props.style }}
      onKeyUp={this.onKeyUp} underlineShow={false} hintText={this.props.showHint ? `${this.props.hintText}按F2扫描` : this.props.hintText} value={this.state.textValue} ref='barCodeTextField' id='barCodeTextField' onChange={this.barCodeOnChange}
			 />
		// }else{
		// 	 return <TextField  style={{borderStyle: 'solid', borderWidth: '1px',borderColor: 'rgb(0, 188, 212)'}}
		// 	            underlineShow={false} hintText={this.props.hintText} value={this.state.textValue} ref='barCodeTextField' id='barCodeTextField' onChange={this.barCodeOnChange} />
		// }
	;

  handleSelectChange = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  onKeyUp = (e) => {
    console.debug('barcode onKeyUp:', e.keyCode);
    e.keyCode === 13 && this.onManualSubmit()
  };

  showSelectField = () => {
    const selectMenuItem = [
      {
        id: 0,
        name: '手动输入'
      },
      {
        id: 1,
        name: '自动扫描'
      }
    ];

    return (<SelectField value={this.state.selectValue} hintText='手动/扫描' onChange={this.handleSelectChange} style={{ width: 100 }}>
      {
				selectMenuItem.map(value => <MenuItem value={value.id} key={value.id} primaryText={value.name} />)
			}
    </SelectField>)
  };

  handleRequestClose = () => {
    this.setState({
      openError: false,
      errorMessage: ''
    });
    this.props.clearErrorMsg();
  };

  render() {
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.props.handleButtonClick}
      />,
      <RaisedButton
        label='确认'
        primary
				// disabled={true}
        onTouchTap={this.handleOK}
        style={{ marginLeft: '10px', marginRight: '20px' }}
      />
    ];
    return (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
        {
				this.showBarText()
			}
        {
				this.showSubmitButton()
			}
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
