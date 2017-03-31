/**
 * Created by liuyali on 2017/2/23.
 */
/**
 * Created by liuyali on 2017/2/22.
 */
/**
 * Created by liuyali on 2016/12/21.
 */
import './BillingUpload.scss'
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import MinDialog from 'components/StandardUI/StandardDialog'
import FlatButton from 'material-ui/FlatButton';

/* 公共组件*/
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

export default class BillingUpload extends Component {
  state = {
    deleteWDID: '', // 删除订单id
    checkDeleteOpen: false,
    open: false,
    checkOpen: false,
    message1: '',
    openError1: false,
    message: '',
    openError: false,
    completeFlag: false,
    uploading: false,
    errorFlag: false,
    submitData: [],
    Body: null,
    hasUpload: false
  }
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    globalStore: PropTypes.object.isRequired,
    uploadBillingImgData: PropTypes.func.isRequired,
    billingUploadData: PropTypes.object.isRequired,
    deleteOneBilling: PropTypes.object.isRequired,
    orderType: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    getBillingData: PropTypes.func.isRequired,
    DJLX: PropTypes.string.isRequired,
  }
  componentWillMount() {
    const obj = {
      DDID: this.props.orderId,
      DJLX: this.props.DJLX,
      DJID: this.props.id
    };
    this.setState({
      Body: obj
    });
    this.props.getBillingData(obj.DJID, this.props.globalStore.organizationId);
  }

  componentWillReceiveProps(nextProps) {
    let temptState = { ...this.state };

    if (nextProps.billingUploadData.data.length === 0) {
      temptState.checkOpen = false;
    }

    if (!nextProps.billingUploadData.status && nextProps.billingUploadData.uploadError) {
      temptState = { ...temptState, openError: true, message: nextProps.billingUploadData.uploadError.response.Message }
      return;
    }
    if (!nextProps.billingUploadData.status && nextProps.billingUploadData.deleteError) {
      temptState = { ...temptState,
        openError1: true,
        message1: nextProps.billingUploadData.deleteError.response.Message }
      return;
    }
    if (!nextProps.billingUploadData.status && nextProps.billingUploadData.getError) {
      temptState = { ...temptState,
        openError1: true,
        message1: nextProps.billingUploadData.getError.response.Message }
      return;
    }


    /* getStatus判断用户是否有发票，有发票禁用上传发票按钮*/
    if (nextProps.billingUploadData.hasBillings) {
      temptState.hasUpload = true;
    } else {
      temptState.hasUpload = false;
    }

    temptState.uploading = false;
    const lis = document.querySelectorAll('.preview>li');

    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('cmpltImgPreview', 'errorImgPreview');
    }
    // hasUploadFlag判断用户是否上传成功
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
    if (nextProps.billingUploadData.status && nextProps.billingUploadData.getStatus) {
      this.props.getBillingData(this.state.Body.DJID, this.props.globalStore.organizationId);
    }
    this.setState({
      ...temptState
    });
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  }
  handleClose = () => {
    document.getElementById('uploadForm').reset();
    this.setState({
      submitData: [],
      open: false,
      completeFlag: false
    })
  }

  handleCheckDialogClose = () => {
    this.setState({
      checkOpen: false
    })
  }
  handleCheckDialogOpen = () => {
    this.setState({
      checkOpen: true
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
        this.setState({
          message: '请选择正确格式的图片！',
          openError: true,
        })
        return;
      }
      const li = document.createElement('li');
      li.classList.add('imgPreview');
      preview.insertBefore(li, document.getElementById('addImg'));

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
      icon3.src = 'renovate.png'

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
    document.getElementById('uploadForm').reset();
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
      imgData.append('Body', JSON.stringify({ WDB: { WDMC: '发票照片', SSJXSID: this.props.globalStore.organizationId, WDSSYWID: 10121 } }));

      for (let i = 0; i < this.state.submitData.length; i++) {
        imgData.append('FPARR', this.state.submitData[i]);
      }

      this.props.uploadBillingImgData(this.state.Body, imgData);
    }
  }
  deleteFP = (...wdid) =>
    // this.props.deleteOneBilling()
     (event) => {
       this.setState({
         deleteWDID: wdid,
         checkDeleteOpen: true
       });
     }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  handleRequestClose1 = () => {
    this.setState({
      openError1: false
    });
  };
  handleCheckDeleteDialogClose = () => {
    this.setState({
      checkDeleteOpen: false
    });
  }
  handleCheckDeleteSure = () => {
    this.handleCheckDeleteDialogClose();
    this.props.deleteOneBilling({ WDIDS: this.state.deleteWDID });
  }
  render() {
    const dialogAction = [
      <FlatButton label='关闭' onTouchTap={this.handleClose} />,
      <FlatButton
        label={this.state.completeFlag ? '完成' : this.state.errorFlag ? '重新上传' : '上传'}
        labelStyle={{
          color: '#00A0FF'
        }}
        onTouchTap={this.state.completeFlag ? this.handleClose : this.submit}
      />
    ];
    const checkDialog = [
      <FlatButton label='关闭' onTouchTap={this.handleCheckDialogClose} />,
      <FlatButton
        label='继续上传'
        onTouchTap={this.handleOpen}
        labelStyle={{
          color: '#00A0FF'
        }}
      />,
    ]
    const checkDeleteDialog = [
      <FlatButton label='取消' onTouchTap={this.handleCheckDeleteDialogClose} />,
      <FlatButton
        label='确定'
        onTouchTap={this.handleCheckDeleteSure}
        labelStyle={{
          color: '#00A0FF'
        }}
      />,
    ]
    return (<div>
      {
        (() => {
          if (this.props.orderType === '1') {
            return (<div>
              <RaisedButton
                label={this.state.hasUpload ? '查看发票' : '上传发票'}
                style={{ float: 'left', marginLeft: '1rem' }}
                backgroundColor='#00be9c'
                buttonStyle={{ boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: 2 }}
                labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', letterSpacing: 2 }}
                onTouchTap={this.state.hasUpload ? this.handleCheckDialogOpen : this.handleOpen}
              />
              {/* 发票查看*/}
              <Dialog
                title='查看已上传发票'
                modal={false}
                actions={checkDialog}
                bodyStyle={{ overflow: 'auto' }}
                open={this.state.checkOpen}
                onRequestClose={this.handleCheckDialogOpen}
              >
                <div className='billingImgList'>
                  {
                    this.props.billingUploadData.data.map((FP, index) => <div className='billingImgDIv' key={index + 1}>
                      <div className='billingImgHeader'>
                        <img src='/logistIcon/icon-08.png' alt='' />
                        <div
                          onClick={this.deleteFP(FP.FPFJID)} style={{
                            position: 'absolute',
                            top: '.8rem',
                            right: '.5rem',
                            cursor: 'pointer',
                            zIndex: 99
                          }}
                        >
                          {FP.CJR === this.props.globalStore.GUID ? <img src='/sc.png' alt='' /> : ''}
                        </div>
                        <p style={{ zIndex: 9 }}>发票照片</p>
                      </div>
                      <div className='billingImg'>
                        <img src={FP.src} alt='' />
                      </div>
                    </div>)
                  }
                </div>
                {/* 删除发票确认弹出框*/}
                <MinDialog
                  title='确定删除发票'
                  modal={false}
                  actions={checkDeleteDialog}
                  bodyStyle={{ overflow: 'auto' }}
                  open={this.state.checkDeleteOpen}
                  onRequestClose={this.handleCheckDeleteDialogClose}
                >
                  <p style={{ paddingTop: '40px' }}>确定删除这张发票吗？</p>
                </MinDialog>
                <ErrorSnackBar
                  message={this.state.message1} open={this.state.openError1}
                  onRequestClose={this.handleRequestClose1}
                />
              </Dialog>
              {/* 发票上传*/}
              <Dialog
                title='上传发票'
                modal={false}
                actions={dialogAction}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <div style={{ paddingLeft: '1.2rem', marginTop: '1.5rem' }}>
                  <ul className='preview'>
                    <li id='addImg' className='uploadDiv imgPreview' onClick={this.uploadImg}>
                      <div className='wareAddicon' />
                    </li>
                  </ul>
                  <form id='uploadForm'>
                    <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name='FPARR' id='upload' />
                  </form>
                  <p style={{ margin: '20px 0' }}>点击从本地添加一个或多个要上传的票据扫描文件或照片</p>
                </div>
                <ErrorSnackBar
                  message={this.state.message} open={this.state.openError}
                  onRequestClose={this.handleRequestClose}
                />
              </Dialog>

            </div>)
          }
        })()
      }
    </div>)
  }
}
