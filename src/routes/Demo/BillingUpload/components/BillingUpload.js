/**
 * Created by liuyali on 2016/12/21.
 */
import './BillingUpload.scss'
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* 公共组件*/
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

export default class BillingUpload extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    message: '',
    openError: false,
    completeFlag: false,
    uploading: false,
    errorFlag: false,
    submitData: [],
    Body: null,
    hasUpload: false
  }
  componentWillMount() {
    const obj = {
      DDID: 900000000017,
      DJLX: '0',
      DJID: '1'
    };
    this.setState({
      Body: obj
    });
    this.props.getBillingData(obj.DDID);
  }

  componentWillReceiveProps(nextProps) {
    const temptState = { ...this.state }
    /* 判断用户是否已经上传了发票，已经上传禁用上传按钮*/
    if (nextProps.billingUploadData.getStatus) {
      temptState.hasUpload = true;
    } else {
      temptState.hasUpload = false;
    }

    temptState.uploading = false;
    const lis = document.querySelectorAll('.preview>li');

    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('cmpltImgPreview', 'errorImgPreview');
    }

    if (nextProps.billingUploadData.status && nextProps.billingUploadData.hasUploadFlag) {
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('cmpltImgPreview');
      }
      temptState.completeFlag = true;
    } else if (!nextProps.billingUploadData.status && nextProps.billingUploadData.hasUploadFlag) {
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('errorImgPreview');
      }
      temptState.errorFlag = true;
    }
    // /*上传发票成功后获取发票*/
    if (nextProps.billingUploadData.status && nextProps.billingUploadData.hasUploadFlag && !nextProps.billingUploadData.getStatus) {
      this.props.getBillingData(this.state.Body.DDID);
    }

    this.setState({
      ...temptState
    });
  }

  goBack = () => {

  }
  handleOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  uploadImg = () => {
    const btnARR = document.getElementById('upload');
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    btnARR.dispatchEvent(e);
  }
  handleFiles = () => () => {
    window.URL = window.URL || window.webkitURL;
    const files = document.getElementById('upload').files;
    const preview = document.querySelector('.preview');
    const fileArr = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
        /*
         * 选择的图片推入待上传数组
         * */
      fileArr.push(file);
        /*
        * 显示缩略图
        * */
      const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

      if (!rFilter.test(file.type)) {
        continue;
      }
      const li = document.createElement('li');
      li.classList.add('imgPreview');
      preview.appendChild(li);

      const img = document.createElement('img');
      img.src = window.URL.createObjectURL(file);
      img.height = 60;
      img.onload = function (e) {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);

        /*
        * 添加完成图标图标
        * */
      const cmplt = document.createElement('div');
      cmplt.classList.add('imgComplete', 'completeUp');
      const icon1 = document.createElement('img');
      icon1.src = '/done.png'

      const p = document.createElement('p');
      p.innerHTML = '完成';
      cmplt.appendChild(icon1);
      cmplt.appendChild(p);

        /*
         * 添加失败图标
         * */
      const errDiv = document.createElement('div');
      errDiv.classList.add('imgComplete', 'errorUp');
      const icon3 = document.createElement('img');
      icon3.src = '/renovate.png'

      const errhint = document.createElement('p');
      errhint.innerHTML = '上传失败，重新上传';
      errDiv.appendChild(icon3);
      errDiv.appendChild(errhint);


        /*
        * 添加删除图标
        * */
      const dlt = document.createElement('div');
      dlt.classList.add('imgDelete');
      dlt.addEventListener('click', this.deleteImg(dlt));

      const icon2 = document.createElement('img');
      icon2.src = '/sc copy 2.png'
      dlt.appendChild(icon2);

      li.appendChild(cmplt);
      li.appendChild(dlt);
      li.appendChild(errDiv);
    }

      /*
      * 更新图片的index
      * */
    const liArr = preview.childNodes;
    for (let j = 0; j < liArr.length; j++) {
      liArr[j].indexNum = j;
    }

    this.setState({
      submitData: this.state.submitData.concat(fileArr)
    });
  }
  deleteImg = dlt => () => {
    const li = dlt.parentNode;
    const preview = document.querySelector('.preview');
    preview.removeChild(li);
    this.state.submitData.splice(li.indexNum, 1);
      /*
       * 更新图片的index
       * */
    const liArr = preview.childNodes;
    for (let j = 0; j < liArr.length; j++) {
      liArr[j].indexNum = j;
    }

    this.setState({
      submitData: this.state.submitData
    });
  }
  submit = () => {
    if (this.state.submitData.length > 0) {
      this.setState({
        uploading: true
      });
      const imgData = new FormData();
      imgData.append('Body', JSON.stringify({ WDB: { WDMC: '发票照片', SSJXSID: this.props.globalStore.organizationId } }));

      for (let i = 0; i < this.state.submitData.length; i++) {
        imgData.append('FPARR', this.state.submitData[i]);
      }

      this.props.uploadBillingImgData(this.state.Body, imgData);
    }
  }
  render() {
    const actions =
      (<nav>
        <RaisedButton
          label='返回'
          style={{ marginLeft: '5px' }}
          backgroundColor='#D8D8D8'
          buttonStyle={{ boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: 2 }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', letterSpacing: 2 }}
          onTouchTap={this.goBack}
        />
        <RaisedButton
          disabled={this.state.hasUpload ? true : false}
          label={this.state.hasUpload ? '发票已上传' : '上传发票'}
          style={{ marginLeft: '5px' }}
          backgroundColor='#00be9c'
          buttonStyle={{ boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: 2 }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', letterSpacing: 2 }}
          onTouchTap={this.handleOpen}
        />
      </nav>);
    const dialogAction = [
      <FlatButton label='关闭' onTouchTap={this.handleClose} />,
      <FlatButton
        label={this.state.completeFlag ? '完成' : this.state.errorFlag ? '重新上传' : '上传'}
        labelStyle={{
          color: '#00A0FF'
        }}
        onTouchTap={this.state.completeFlag ? this.handleClose : this.submit}
      />
    ]
    return (<StandardForm iconPosition='-60px -60px' title='两票制'>
      <StandardFormCardList activeStep={0}>
        <StandardFormCard message={'您当前正在对<00131411>出库单做上传发票业务的操作'} title='发票' stepName='待回收信息查看' actions={actions} completed showContent showStep={false} expanded>
          <div className='billingImgList'>
            {
                this.props.billingUploadData.data.map((FP, index) => <div className='billingImgDIv' key={index + 1}>
                  <div className='billingImgHeader'>
                    <img src='/logistIcon/icon-08.png' alt='' />
                    <p>发票照片</p>
                  </div>
                  <div className='billingImg'>
                    <img src={FP} alt='' />
                  </div>
                </div>)
              }
          </div>
          <Dialog
            title='上传发票'
            modal={false}
            actions={dialogAction}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div style={{ paddingLeft: '1.2rem', marginTop: '1.5rem' }}>
              <ul className='preview' />
              <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name='FPARR' id='upload' />
              <div className='uploadDiv' onClick={this.uploadImg}>
                <div className='wareAddicon' />
              </div>
              <p style={{ margin: '20px 0' }}>点击从本地添加一个或多个要上传的票据扫描文件或照片</p>
            </div>
          </Dialog>
          <ErrorSnackBar
            message={this.state.message} open={this.state.openError}
            onRequestClose={this.handleClose}
          />
        </StandardFormCard>
      </StandardFormCardList>
    </StandardForm>)
  }
}
