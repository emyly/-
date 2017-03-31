
import React, { Component, PropTypes } from 'react';
const ReactDOMServer = require('react-dom/server');

import './FirstBusinessRegistration.scss';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CardUI from 'components/StandardUI/StandardCard';
import { UploadImg } from 'routes/BusinessManagement/BasicInformation/components/BasicInformationChangeBtn';
import Dialog from 'components/StandardUI/StandardDialog';
import StandardDataGrid from 'components/StandardDataGrid';
import GoBackButton from 'components/GoBackButton';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

export default class FirstBusinessRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadImages: [{ id: 'img1', documentType: 'Y', documentName: '营业执照' }, { id: 'img2', documentType: 'S', documentName: '税务登记证' }, { id: 'img3', documentType: 'Z', documentName: '组织机构代码证' }, { id: 'img4', documentType: 'J', documentName: '医疗经营许可证' }],
      SelectTypeValue: 0,
      cooperatorName: '',
      messageStatus: false,
      openError: false,
      DZHY: 1,
      PartnersType: [
        { text: '供应商', value: 2 }, { text: '经销商/医院', value: 0 }
      ]
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  handleChangeSelectType = (event, index, value) => {
    this.setState({ SelectTypeValue: value });
  };

  handleDZHY = (event, index, value) => {
    this.setState({ DZHY: value });

    if (value) {
      this.setState(
        {
          uploadImages: [{ id: 'img1', documentType: 'Y', documentName: '营业执照' }, { id: 'img2', documentType: 'S', documentName: '税务登记证' }, { id: 'img3', documentType: 'Z', documentName: '组织机构代码证' }, { id: 'img4', documentType: 'J', documentName: '医疗经营许可证' }],
        }
      );
    } else {
      this.setState(
        {
          uploadImages: [{ id: 'finimg1', documentType: 'M' }, { id: 'finimg2', documentType: 'J', documentName: '医疗经营许可证' }]
        }
      );
    }
  };
  AuthImg =(imginfo) => {
    if (document.querySelector(`input[name = ${imginfo.id}]`).files[0]) {
      const imgData = new FormData();
      const uploadImage = document.querySelector(`input[name = ${imginfo.id}]`).files[0];

      const obj = {
        WDB: {
          WDMC: uploadImage.name, //文档名称
        }
      };
      imgData.append('file', uploadImage);

      const imgInfo = {
        id: imginfo.id,
        info: obj,
        formdata: imgData,
        documentType: imginfo.documentType,
        documentName: imginfo.documentName,
      }
      return imgInfo;
    } else {
      return false;
    }
  }
  submitImg = () => {
    let submitArr = [];
    submitArr = this.state.uploadImages.map(imgInfo => this.AuthImg(imgInfo));
    return submitArr;
  }

  handleTouchTapSubmit = () => {
    if (this.state.cooperatorName.trim().length <= 0) {
      this.setState({
        message: '伙伴名称不能为空！',
        openError: true
      });
      return;
    }
    const subInfo = {
      imgArr: this.submitImg(),
      orgId: this.props.globalStore.organizationId,
      SelectTypeValue: this.state.SelectTypeValue,
      cooperatorName: this.state.cooperatorName,
    };

    this.props.createOrg(subInfo);
  };
  handleTouchTapCancel = () => {
    this.context.router.push('/firstBusinessRegistrationList');
  };
  setCooperatorName = (event) => {
    this.setState({
      cooperatorName: event.target.value
    });
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  setMessageStatus = () => {
    this.setState({
      messageStatus: false
    });
    this.context.router.push('/firstBusinessRegistrationList');
  }

  componentWillReceiveProps(nextProps) {
    /*
    * 上传图片成功，显示成功图标，失败显示失败图标
    * */
    const lis = document.querySelectorAll('.BuploadDiv');
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('cmpltImgPreview', 'errorImgPreview');
    }

    if (nextProps.FirstBusinessRegistrationData.status) {
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('cmpltImgPreview');
      }
      this.setState({
        messageStatus: true
      });
    } else {
      for (let i = 0; i < nextProps.BasicInformation.idArr.length; i++) {
        const dom = document.getElementById(nextProps.BasicInformation.idArr[i]).parentNode;
        dom.classList.add('errorImgPreview');
      }
      this.setState({
        message: nextProps.FirstBusinessRegistrationData.error.response.Message,
        openError: true
      });
    }
  }
  getUploadImg = () => {
    if (this.state.DZHY) {
      return (<div style={{ padding: 0, justifyContent: 'flex-start', marginTop: '1rem' }} className='BimagesWrapper'>
        <UploadImg id='img1' src='' documentType='Y' documentName='营业执照' text='企业法人营业执照' />
        <UploadImg id='img2' src='' documentType='S' documentName='税务登记证' text='税务登记证' />
        <UploadImg id='img3' src='' documentType='Z' documentName='组织机构代码证' text='组织机构代码证' />
        <UploadImg id='img4' src='' documentType='J' documentName='医疗经营许可证' text='医疗器械经营许可证' />
      </div>)
    } else {
      return (
        <div className='BimagesWrapper' style={{ padding: 0, justifyContent: 'space-around', marginTop: '1rem' }}>
          {/* 解决reactbug*/}
          <UploadImg id='finimg3' display={false} src='' documentName='营业执照' text='多证合一' />
          <UploadImg id='finimg4' display={false} src='' documentName='税务登记证' text='医疗器械经营许可证' />
          <UploadImg id='finimg5' display={false} src='' documentName='营业执照' text='多证合一' />
          <UploadImg id='finimg6' display={false} src='' documentName='税务登记证' text='医疗器械经营许可证' />
          {/* 解决reactbug*/}
          <UploadImg id='finimg1' src='' text='多证合一' />
          <UploadImg id='finimg2' src='' text='医疗器械经营许可证' />
        </div>
      );
    }
  }
  render() {
    const actions = [
      <FlatButton
        label='确定'
        onTouchTap={this.setMessageStatus}
        style={{ color: '#DF3C3C', fontFamily: 'SourceHanSansCN-Regular' }}
      />
    ];
    const backActions =
      (<nav style={{ display: 'flex', alignItems: 'center' }}>
        <GoBackButton style={{ marginRight: 0 }} />
      </nav>);
    return (
      <div className='first-business-registration'>
        <StandardDataGrid
          iconPosition='-120px -30px'
          title='首次经营登记'
          actions={backActions}
        >

          <CardUI
            titleStyle={{
              fontFamily: 'font-family: SourceHanSansCN-Medium',
              fontSize: '20px',
              color: 'white',
            }}
            CardTextStyle={{ height: 'auto' }}
            title='伙伴基本信息'
          >
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '3rem 2rem', flexWrap: 'wrap' }}>
              <div className='infoDivWrapper'>
                <span>伙伴名称： </span>
                <TextField onChange={this.setCooperatorName} type='string' hintText='请输入伙伴名称' />
              </div>
              <div className='infoDivWrapper'>
                <span>伙伴类型： </span>
                <SelectField
                  value={this.state.SelectTypeValue}
                  hintText='合同类型选择'
                  onChange={this.handleChangeSelectType}
                  maxHeight={200}
                >
                  {
                    this.state.PartnersType.map((value, index) => <MenuItem key={value.value} value={value.value} primaryText={value.text} />)
                  }
                </SelectField>
              </div>
              <div className='infoDivWrapper'>
                <span>是否完成多证合一： </span>
                <SelectField
                  value={this.state.DZHY}
                  hintText='是否完成多证合一'
                  onChange={this.handleDZHY}
                  maxHeight={200}
                >
                  <MenuItem value={1} primaryText='未完成' />
                  <MenuItem value={0} primaryText='已完成' />
                </SelectField>
              </div>
            </div>
          </CardUI>

          <CardUI
            titleStyle={{
              fontFamily: 'font-family: SourceHanSansCN-Medium',
              fontSize: '20px',
              color: 'white',
            }}
            CardTextStyle={{ height: 'auto' }}
            dropMenuTitle={
              <div>
                <span>证照信息上传</span>
              </div>
            }
          >
            <div style={{ padding: '2rem' }}>
              <div className='uploadImgWrapper'>
                <div className='BhintMessage'>
                依据相关法律法规，医疗器械流通企业变更信息应当以各类证照登记信息为准。如您需要继续变更企业基本信息，请上传您企业最新的证照，经审核之后变更方能生效
              </div>
                {
                this.getUploadImg()
              }
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 100 }}>
                <FlatButton
                  label='关闭'
                  style={{ marginTop: 15, marginRight: 15, width: 60 }}
                  onTouchTap={this.handleTouchTapCancel}
                />
                <FlatButton
                  label='更新'
                  style={{ marginTop: 15, marginRight: 15, width: 60 }}
                  primary
                  onTouchTap={this.handleTouchTapSubmit}
                />
              </div>
            </div>
          </CardUI>

          <ErrorSnackBar
            message={this.state.message} open={this.state.openError}
            onRequestClose={this.handleRequestClose}
          />
          <Dialog title='首次经营登记' open={this.state.messageStatus} actions={actions}>
            <div>
              登记成功！
            </div>
          </Dialog>
        </StandardDataGrid>
      </div>
    )
  }

}
