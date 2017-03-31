/**
 * Created by liuyali on 2016/11/21.
 */

import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import UploadDialog from './UploadDialog'
import UploadImg from './UploadImg'
import './BasicInformation.scss';

// 企业基本信息变更 组件
export default class ChangeInfoBtn extends Component {
  state = {
    uploadFin: false,
    open: false,
    ifFinOpen: false,
    imgArray: [],
    status: 0 // 0代表为选择，1未完成多证合一，2代表完成多证合一
  }
  static propTypes = {
    BasicInformation: PropTypes.object,
    globalStore: PropTypes.object,
    getOrgCertificate: PropTypes.func,
    getBasicInfoData: PropTypes.func,
    callback: PropTypes.func,
    setBasicInfoDataInit: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string
  }
  componentWillReceiveProps(nextProps) {
    const lis = document.querySelectorAll('.BuploadDiv');
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('cmpltImgPreview', 'errorImgPreview');
    }

    if (nextProps.BasicInformation.uploadFin && this.state.open) {
      this.setState({
        uploadFin: true
      });
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('cmpltImgPreview');
      }
    } else if (!nextProps.BasicInformation.uploadFin && this.state.open) {
      this.setState({
        uploadFin: false
      });
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('errorImgPreview');
      }
    }
  }

  openDialog = () => {
    this.setState({
      ifFinOpen: true,
    });
  }
  closeDialog = () => {
    this.setState({
      open: false,
    })
  }
  chooseIfFin=(key) => {
    if (key === 1) {
      this.setState(
        {
          ifFinOpen: false,
          open: true,
          status: key,
          imgArray: [{ id: 'img1', documentType: 'Y', documentName: '营业执照' },
            { id: 'img2', documentType: 'S', documentName: '税务登记证' },
            { id: 'img3', documentType: 'Z', documentName: '组织机构代码证' },
            { id: 'img4', documentType: 'J', documentName: '医疗经营许可证' }]
        }
      )
    } else if (key === 2) {
      this.setState(
        {
          ifFinOpen: false,
          open: true,
          status: key,
          imgArray: [{ id: 'img1', documentType: 'M' }, { id: 'img2', documentType: 'J', documentName: '医疗经营许可证' }]

        }
      )
    }
  }
  closeUploadDialog = () => {
    this.setState(
      {
        ifFinOpen: false,
      }
    )
  }

  AuthImg =(imginfo) => {
    if (document.querySelector(`input[name = ${imginfo.id}]`).files[0]) {
      const imgData = new FormData();
      const uploadImage = document.querySelector(`input[name = ${imginfo.id}]`).files[0];

      const obj = {
        WDB: {
          WDMC: uploadImage.name, // 文档名称
          SSJXSID: this.props.globalStore.organizationId, //所属经销商ID
        }
      };
      imgData.append('Body', JSON.stringify(obj));
      imgData.append('file', uploadImage);

      const imgInfo = {
        id: imginfo.id,
        orgId: this.props.globalStore.organizationId,
        info: obj,
        formdata: imgData,
        documentType: imginfo.documentType,
        documentName: imginfo.documentName,
      }
      return imgInfo;
    }
    return false;
  }

  submitImg = () => {
    let submitArr = [];
    submitArr = this.state.imgArray.map(imgInfo => this.AuthImg(imgInfo));
    submitArr = submitArr.filter((data, index) => {
      // return data;
      if (data) {
        return data;
      }
    });
    if (submitArr.length > 0) {
      this.props.getBasicInfoData(submitArr);
    } else {
      this.props.callback();
    }
  }

  initDialog = () => {
    this.setState({
      open: false
    });
    this.props.getOrgCertificate(this.props.globalStore.organizationId);
    // this.props.setBasicInfoDataInit();
  }

  getContent =() => {
    switch (this.state.status) {
      case 0:
        return <div className='BimagesWrapper' />;
      case 1:
        return (
          <div style={{ padding: 0, marginTop: '3rem' }} className='BimagesWrapper'>
            <UploadImg id='img1' documentType='Y' documentName='营业执照' text='企业法人营业执照' />
            <UploadImg id='img2' documentType='S' documentName='税务登记证' text='税务登记证' />
            <UploadImg id='img3' documentType='Z' documentName='组织机构代码证' text='组织机构代码证' />
            <UploadImg id='img4' documentType='J' documentName='医疗经营许可证' text='医疗器械经营许可证' />
          </div>
        )
      case 2:
        return (
          <div style={{ padding: 0, marginTop: '3rem' }} className='BimagesWrapper'>
            <UploadImg id='img1' text='多证合一' />
            <UploadImg id='img2' text='医疗器械经营许可证' />
          </div>
        );
      default:
    }
  }
  getOrgCertificate = () => {
    this.props.getOrgCertificate(this.props.globalStore.organizationId);
  }
  render() {
    const actions = [<FlatButton
      label='关闭'
      onTouchTap={this.closeDialog}
    />, <FlatButton
      labelStyle={{
        color: '#00A0FF'
      }}
      label={this.state.uploadFin ? '完成' : '更新'}
      onTouchTap={this.state.uploadFin ? this.initDialog : this.submitImg}
      primary
    />];

    return (
      <div style={this.props.style}>
        <RaisedButton
          label={this.props.text}
          onTouchTap={this.openDialog}
          backgroundColor='#FFA95D' labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular' }}
        />
        <Dialog
          title={
            <div>
              <span>基本信息变更</span>
              <span className='BminTitle'>已上传税务登记证</span>
            </div>
          }
          actions={actions}
          modal
          open={this.state.open}
        >
          <div style={{ padding: 0 }} className='BimagesWrapper'>
            <div className='BhintMessage'>
              依据相关法律法规，医疗器械流通企业变更信息应当以各类证照登记信息为准。如您需要继续变更企业基本信息，请上传您企业最新的证照，经审核之后变更方能生效
            </div>
            {
              this.getContent()
            }
          </div>
        </Dialog>
        <UploadDialog cloaseDialog={this.closeUploadDialog} openStatus={this.state.ifFinOpen} ifFin={this.chooseIfFin} />
      </div>
    )
  }
}

