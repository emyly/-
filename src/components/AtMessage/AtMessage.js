/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './AtMessage.scss'
import TextField from 'material-ui/TextField';

/**
 * 使用场景：填写留言（@谁）
 */
export default class AtMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isFocus:false
    };
  }
  static defaultProps = {
    style: {},
    divStyle: {},
    textareaStyle: {},
    hintText: '填写留言',
    rowsMax: 2,
    isCreateOrder: false,
  }
  static propTypes = {
    style: PropTypes.object,
    divStyle: PropTypes.object,
    callback: PropTypes.func,
    hintText: PropTypes.string,
    className: PropTypes.string,
    rowsMax: PropTypes.number,
    isCreateOrder: PropTypes.bool,
    Src:PropTypes.string,
    atMContent:PropTypes.string,
    id:PropTypes.string,
    textFocus:PropTypes.func,
  }

  handleChange = (event) => {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback(event.target.value)
    }
    this.setState({
      isFocus:true,
      value: event.target.value
    });
  };
  myFocus = ()=> {
    this.setState({
      isFocus: !this.state.isFocus
    });
  };

  render() {
    //const text = [
    //  // <FlatButton label="返回" onTouchTap={this.handleCancle}/>,
    //  <div style={{textAlign:'center'}}><img src="/CreateOrder/liuyan.png"/></div>,
    //  <div style={{textAlign:'center'}}>添加留言</div>
    //];
    return (
      <div>
        {
          (() => {
            if (this.props.isCreateOrder===false){
              return (
                <div style={this.props.divStyle}>
                  <TextField
                    value={this.state.value}
                    onChange={this.handleChange}
                    rows={1}
                    rowsMax={this.props.rowsMax}
                    style={{ ...this.props.style, fontFamily: 'SourceHanSansCN-Regular' }}
                    className={this.props.className}
                    multiLine
                    textareaStyle={this.props.textareaStyle}
                    hintText={this.props.hintText}
                  />
                </div>
              )
            } else {
              return (
                  <div className="atMessage__create">
                    <TextField
                      hintText=''
                      value={this.state.value}
                      onChange={this.handleChange}
                      multiLine={true}
                      rows={3}
                      rowsMax={3}
                      id={this.props.id}
                      className={this.props.className}
                      inputStyle={{ height: 30, lineHeight: '15px', padding:5,fontSize:'14px' }}
                      style={{width: '100%', height: 100}}
                      underlineStyle={{display:'none'}}
                      onFocus={this.myFocus}
                      onBlur={this.myFocus}
                      textareaStyle={{marginTop:5}}
                    />
                    <div className="createHintText" onClick={this.props.textFocus} style={{display:this.state.isFocus===true||this.state.value?'none':'block'}}>
                      <img src={this.props.Src}/>
                      <div style={{textAlign:'center'}}>{this.props.atMContent}</div>
                    </div>
                  </div>
              )
            }
          })()
        }
      </div>
    )
  }
}
