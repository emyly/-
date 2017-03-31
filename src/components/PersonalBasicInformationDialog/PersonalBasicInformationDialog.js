/**
 * Created by liuyali on 2016/10/31.
 */

import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import FlatButton from 'material-ui/FlatButton';
// import UserList from 'components/User';

import './PersonalBasicInformationDialog.scss';

const radioStyle = { margin: '0px 80px', width: 100 };

export default class PersonalBasicInformationDialog extends Component {

  state = {
    dialogOpen: false,
    editState: false, // 当前是否在编辑状态
    btnTxt: '资料编辑',
    exitTxt: '关闭',
    logoutBtnStatus: 'inline-block',
    hintMsg: '',  // 错误信息提示
    editData: {}
  }
  static propTypes = {
    exitDispatch: PropTypes.func.isRequired,
    getPersonalBasicInfo: PropTypes.object.isRequired,
    getPersonalBasicInfoData: PropTypes.func.isRequired,
    globalStore: PropTypes.object.isRequired,
    putPersonalBasicInfoData: PropTypes.func.isRequired,
  }
  componentWillMount() {
    if (this.props.getPersonalBasicInfo.loginOut) {
      /* 退出处理*/
      window.location = '/';
    }
    this.props.getPersonalBasicInfoData(this.props.globalStore.GUID);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getPersonalBasicInfo.loginOut) {
      /* 退出处理*/
      window.location = '/';
    }

    if (nextProps.globalStore.GUID !== this.props.globalStore.GUID) {
      this.props.getPersonalBasicInfoData(nextProps.globalStore.GUID)
    }

    if (nextProps.getPersonalBasicInfo.status === '1') {
      this.setState({
        editState: !this.state.editState,
        btnTxt: '资料编辑',
        exitTxt: '关闭',
        logoutBtnStatus: 'inline-block',
        editData: {},
        hintMsg: ''
      });
    } else if (nextProps.getPersonalBasicInfo.status === '2') {
      this.setState({
        hintMsg: `* ${nextProps.getPersonalBasicInfo.error.response.Message}`
      });
    }
  }
  /*
  * 数据验证，如果数据验证不通过则不能提交
  * */
  dataAuth = data => true

  /*
  * 提交新的用户数据
  * */
  submitData(data) {
    if (document.getElementById('uploadImage').files[0]) {
      const uploadImage = document.getElementById('uploadImage').files[0];
      const imgData = new FormData();
      const obj = { WDB: {
        WDMC: uploadImage.name, // 文档名称
        SSJXSID: this.props.globalStore.organizationId// 所属经销商ID
      } };
      imgData.append('Body', JSON.stringify(obj));
      imgData.append('file', uploadImage);

      const newInfo = {
        // 'YHXM': data.name, // 用户姓名
        NC: data.nickName,
        LXDH: data.contact,
        XB: data.gender, // 性别
        ZW: data.job,
        DZYX: data.email, //电子邮箱
      }

      this.props.putPersonalBasicInfoData(true, this.props.globalStore.GUID, newInfo, imgData, this.props.getPersonalBasicInfo.userdata);
    } else {
      const newInfo = {
        // 'YHXM': data.name, // 用户姓名
        NC: data.nickName,
        LXDH: data.contact,
        XB: data.gender, // 性别
        ZW: data.job,
        DZYX: data.email, // 电子邮箱
        WDID: this.props.getPersonalBasicInfo.userdata.WDID
      }

      this.props.putPersonalBasicInfoData(false, this.props.globalStore.GUID, newInfo, {}, this.props.getPersonalBasicInfo.userdata);
    }
  }
  dialogCancel = () => {
    if (this.state.editState) {
      this.setState({
        editState: false,
        btnTxt: '资料编辑',
        exitTxt: '关闭',
        logoutBtnStatus: 'inline-block',
        editData: {},
        hintMsg: ''
      });
    } else {
      this.setState({
        dialogOpen: false,
      });
    }
  }
  dialogEditInfo=() => {
    if (this.state.editState) {
      if (this.dataAuth() === true) {
        // 提交新的用户数据

        this.submitData(this.state.editData);
      } else {
        this.setState({
          hintMsg: '* 请输入正确的个人信息'
        });
      }
    } else {
      this.setState({
        editState: !this.state.editState,
        btnTxt: '保存',
        exitTxt: '取消',
        logoutBtnStatus: 'none',
        editData: this.props.getPersonalBasicInfo.userdata
      });
    }
  }

  dialogOpen = () => {
    this.setState({
      dialogOpen: true
    });
  }

  changeHandle =(event) => {
    this.setState({
      editData: Object.assign({}, this.state.editData, { [event.target.name]: event.target.value })
    });
  }
  genderSel = (event, value) => {
    this.setState({
      editData: Object.assign({}, this.state.editData, { gender: value })
    });
  }
  genderIcon = (value) => {
    switch (value) {
      case 'B':
        return <ActionFavorite style={{ overflow: 'visible' }} viewBox='5 -8 28 28' color='blue' />;
      case 'G':
        return <ActionFavorite style={{ overflow: 'visible' }} viewBox='5 -8 28 28' color='pink' />;
      default:
        break;
    }
  }

  loadImageFile = (event) => {
    const oFReader = new FileReader();
    const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    const athis = this;
    oFReader.onload = function (oFREvent) {
      athis.setState({
        editData: Object.assign({}, athis.state.editData, { imgsrc: oFREvent.target.result })
      });
    };

    const oFile = event.target.files[0];
    if (!rFilter.test(oFile.type)) { alert('请选择正确的图片格式!'); return; }
    oFReader.readAsDataURL(oFile);
  }

  ifEditInfo = (userData, editData) => {
    const whole = [];
    const content = [];
    const header = [];
    if (Object.prototype.toString.call(userData) === '[object Object]') {
      if (!this.state.editState) {
        header.push(<div key='h1' className='headerImgWrapper'><img className='headerImg' ref='headerImg' src={userData.imgsrc} alt='用户头像' /></div>);
        header.push(<div key='h2' className='headerInfo'>{this.genderIcon(userData.gender)}{userData.job}</div>);
        header.push(<div key='h3' className='headerInfo'>{userData.name}</div>);
        whole.push(<div key='h' className='headerWrapper' >{header}</div>);

        content.push(<div key='c1' className='inputWrapper'><span>电话：</span><span>{userData.telephone}</span></div>);
        content.push(<div key='c2' className='inputWrapper'><span>邮箱：</span><span>{userData.email}</span></div>);
        content.push(<div key='c3' className='inputWrapper'><span>企业：</span><span>{this.props.globalStore.organizationName || '-'}</span></div>);
        whole.push(<div key='c' className='contentWrapper'>{content}</div>);
      } else {
        header.push(<div key='h1' className='headerImgWrapper'><img className='headerImg' ref='headerImg' src={editData.imgsrc} alt='用户头像' /></div>);
        header.push(<div key='h2' className='headerInfo'> <BorderColor viewBox='0 -17 40 40' color='white' /><span className='changeImg'>更换头像</span> <input id='uploadImage' ref='uploadImage' type='file' name='myPhoto' onChange={this.loadImageFile} /></div>);
        whole.push(<div key='h' className='headerWrapper'>{header}</div>);
        content.push(<div key='c7' className='inputWrapper'><span>昵称：</span><input type='text' onChange={this.changeHandle} name='nickName' value={editData.nickName} /></div>);
        content.push(<RadioButtonGroup key='c6' style={{ display: 'flex', justifyContent: 'center' }} labelPosition='right' onChange={this.genderSel} name='genderSel' defaultSelected={editData.gender}><RadioButton style={radioStyle} value='B' label='男性' /><RadioButton style={radioStyle} value='G' label='女性' /></RadioButtonGroup>);
        content.push(<div key='c2' className='inputWrapper'><span>联系电话：</span><input type='contact' onChange={this.changeHandle} name='contact' value={editData.contact} /></div>);
        content.push(<div key='c3' className='inputWrapper'><span>职务：</span><input type='text' onChange={this.changeHandle} name='job' value={editData.job} /></div>);
        content.push(<div key='c4' className='inputWrapper'><span>邮箱：</span><input type='text' onChange={this.changeHandle} name='email' value={editData.email} /></div>);
        content.push(<p key='c5' className='infoHint inputWrapper'><span />* 星号为必填项</p>);
        whole.push(<div key='c' className='contentWrapper'>{content}</div>);
      }
      return whole;
    }
  }
  exit = () => () => {
    if (this.props.getPersonalBasicInfo.loginOut) {
      return;
    }
    this.props.exitDispatch();
  }
  render() {
    const style = {
      margin: 12,
    };
    const dstyle = {
      maxWidth: 600
    };
/* onTouchTap = {this.exit}  注销按钮动作，防止删除cookie先注销该动作*/
    const actions = [
      <FlatButton
        label={this.state.exitTxt}
        style={{ margin: 10 }}
        onTouchTap={this.dialogCancel}
      />, <RaisedButton
        label='注销'
        onTouchTap={this.exit()}
        style={{ margin: 10, display: this.state.logoutBtnStatus }}
      />, <RaisedButton
        label={this.state.btnTxt}
        style={{ margin: 10 }}
        primary
        onTouchTap={this.dialogEditInfo}
      />,
    ];
    return (
      <div className='PersonalBasicInformationDialog' style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '1.4rem' }}>
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
          <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
            <div style={{ height: '2.9rem', width: '2.9rem', marginTop: 5, marginRight: 0, border: 1 }} onTouchTap={this.dialogOpen} ><img style={{ width: '40px', height: '40px', borderRadius: '5px' }} className='headerImg' ref='headerImg' src={this.props.getPersonalBasicInfo.userdata.imgsrc ? this.props.getPersonalBasicInfo.userdata.imgsrc : '/default.jpg'} alt='用户头像' /></div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
              <span className='userName'>{this.props.getPersonalBasicInfo.userdata.name || ''}</span>
              <span className='userEmail'>{this.props.getPersonalBasicInfo.userdata.email || ''}</span>
            </div>
          </div>

          {/* <UserList />*/}
        </div>
        <Dialog
          contentStyle={dstyle}
          bodyStyle={{ padding: 0 }}
          repositionOnUpdate
          label='Modal Dialog'
          actions={actions}
          modal
          open={this.state.dialogOpen}
          titleClassName='dialogTitle'
        >
          <div>
            <div>
              <form ref='personalBasicInfoForm'>

                {
                  this.ifEditInfo(this.props.getPersonalBasicInfo.userdata, this.state.editData)
                }
                <p className='errhint'>{this.state.hintMsg}</p>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
