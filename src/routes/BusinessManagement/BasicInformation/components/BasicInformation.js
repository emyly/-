/**
 * Created by liuyali on 2016/11/4.
 */
import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import FlatButton from 'material-ui/FlatButton';
import './BasicInformation.scss';
import ChangeInfoBtn from '../containers/BasicInformationBtnContainer'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import Location from 'components/Location'
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import InfoImg from './InfoImg'
import BdMap from 'components/BdMap';
import EditBlock from './EditBlock'
import InfoDiv from './InfoDiv'
import AppIndividuation from './AppIndividuation'
import TextField from 'material-ui/TextField'

export default class BasicInformation extends Component {
  state = {
    message: '',
    openError: false,
    JGLX: 'J', // J为机构，Y为医院
    info: {}, // 企业信息，修改时修改改obj
    tempInfo: {}, // 保存用户信息
    SSSF: '--', // 所属省份
    SSCS: '--', // 城市
    XZQHID: null, // 所属区域
    verify: false,
    open: false
  }
  static propTypes = {
    globalStore: PropTypes.object,
    BasicInformation: PropTypes.object,
    locationData: PropTypes.object,
    getOrgCertificateData: PropTypes.object,
    getAllLocationData: PropTypes.func,
    getOrgCertificate: PropTypes.func,
    getCorporationBasicInfo: PropTypes.func,
    putCorporationBasicInfo: PropTypes.func,
    setBasicInfoDataInit: PropTypes.func,
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  componentWillMount() {
    this.setState({
      marker: [
        { address: '杭州市西湖区文一路115号', selected: true },
        { point: { lat: 30.294264, lng: 120.138427 }, selected: true },
        { point: { lat: 30.299602, lng: 120.139821 } },
        { point: { lat: 30.294488, lng: 120.141115 } },
        { point: { lat: 30.294488, lng: 120.142115 } },
      ]
    });
    const params = { XZQHID: undefined };
    this.props.getAllLocationData(params);
    this.props.getOrgCertificate(this.props.globalStore.organizationId);
    this.props.getCorporationBasicInfo(this.props.globalStore.organizationId);
  }
  componentWillReceiveProps(nextProps) {
    /* 报错处理*/
    if (!nextProps.BasicInformation.status && nextProps.BasicInformation.error) {
      this.setState({
        message: nextProps.BasicInformation.error.response.Message,
        openError: true
      });
      return;
    }
    /* putFlag为true，用户更新了信息，重新获取信息*/
    if (nextProps.BasicInformation.status && nextProps.BasicInformation.putFlag) {
      this.setState({
        open: false
      });
      this.props.getCorporationBasicInfo(this.props.globalStore.organizationId);
      return;
    }
    /* 获取企业基本信息后，将基本信息保存在tempInfo中*/
    if (nextProps.BasicInformation.status && nextProps.BasicInformation.ZZJGB) {
      const temptObj = {};
      /* 根据XZQHID查询所属省市*/
      if (nextProps.BasicInformation.ZZJGB.XZQHID && nextProps.locationData.allAreaArr.length > 0) {
        const filted = nextProps.locationData.allAreaArr.filter((value, index) => value.GUID === nextProps.BasicInformation.ZZJGB.XZQHID);
        temptObj.SSSF = filted[0].S || '--';
        temptObj.SSCS = filted[0].SS || '--';
      }
      /* info中存放用户可以编辑的信息*/
      const info = {
        LXDH: nextProps.BasicInformation.ZZJGB.LXDH,
        CZ: nextProps.BasicInformation.ZZJGB.CZ,
        YZBM: nextProps.BasicInformation.ZZJGB.YZBM,
        GSWZ: nextProps.BasicInformation.ZZJGB.GSWZ,
        JBXXMS: nextProps.BasicInformation.ZZJGB.JBXXMS,
        XZQHID: nextProps.BasicInformation.ZZJGB.XZQHID,
        LXDZ: nextProps.BasicInformation.ZZJGB.LXDZ
      };
      if (this.state.JGLX === 'J') {
        info.JYFW = nextProps.BasicInformation.ZZJGB.JYFW;
      } else {
        info.YZXM = nextProps.BasicInformation.ZZJGB.YZXM;
        info.CWS = nextProps.BasicInformation.ZZJGB.CWS;
        info.MZSL = nextProps.BasicInformation.ZZJGB.MZSL;
      }
      temptObj.tempInfo = info;
      this.setState({
        ...temptObj, ...nextProps.BasicInformation.ZZJGB
      });
    }
  }
  handleInfoChage = (event, newValue) => {
    const property = event.target.id;
    this.setState({
      [property]: newValue,
    });
  }
  handleError = () => {
    this.setState({
      message: '选择证件照后才能更新！',
      openError: true
    });
  }
  getCorpCertificate = () => {
    let certArr = [];
    if (this.props.getOrgCertificateData.data.length > 0) {
      certArr = this.props.getOrgCertificateData.data.map((value, index) => (<InfoImg key={index + 1} src={value.GUID} text={value.WDMC} />))
    } else {
      certArr.push(<InfoImg key={1} text='企业法人营业执照' />);
      certArr.push(<InfoImg key={2} text='企业税务登记证' />);
      certArr.push(<InfoImg key={3} text='医疗器械经营许可证' />);
      certArr.push(<InfoImg key={4} text='企业主治机构代码证' />);
      certArr.push(<InfoImg key={5} text='企业三证合一-营业执照' />);
    }
    return certArr;
  }
  closeDialog = () => {
    this.setState({
      verify: false,
      open: false,
      ...this.state.tempInfo
    })
  }
  openDialog = () => {
    this.setState({
      open: true
    })
  }
  /*
  * 提交修改信息，先做所有信息验证。
  * */
  submitInfo = () => {
    const flag = this.validate('ALL');
    if (!flag) {
      this.setState({
        openError: true,
        message: '修改失败,请补全必填信息',
        verify: true
      })
    } else {
      const body = {};
      for (const k in this.state.tempInfo) {
        if (Object.prototype.hasOwnProperty.call(this.state.tempInfo, k)) {
          body[k] = this.state[k];
        }
      }
      this.props.putCorporationBasicInfo({ id: this.props.globalStore.organizationId, body });
    }
  }
  /* 用户点击地图选择公司行政地址
   根据地图返回市和区，找到区对应的ID
   * 修改Location公共组件的ID（state中的XZQHID）
   *修改info中的XZQHID和LXDZ
   * */
  onSelect = (point, address, e, f) => {
    if (!e.overlay) {
      this.setState({ marker: [{ point, selected: true }] });
    } else {
      this.refs.myBdMap.selectOnePoint(e);
    }
    const district = f.addressComponents.district;
    const city = f.addressComponents.city;
    const filtered = this.props.locationData.allAreaArr.filter((value, index) => value.SS === city && value.QX === district);
    this.setState({
      XZQHID: filtered[0].GUID || this.state.XZQHID,
      LXDZ: f.address
    })
  }
/* 用户手动选择公司行政地址*/
  selectAdd = (params) => {
    this.setState({
      XZQHID: params.QXID
    })
  }
  validate = (key) => {
    if (key !== 'ALL') {
      return !!this.state[key]
    }
    let flag = true;
    for (const k in this.state.tempInfo) {
      if (Object.prototype.hasOwnProperty.call(this.state.tempInfo, k)) {
        flag = flag && !!this.state[k]
      }
    }
    return flag;
  }
  render() {
    const editActions = [<FlatButton
      label='关闭'
      onTouchTap={this.closeDialog}
    />, <FlatButton
      labelStyle={{
        color: '#00A0FF'
      }}
      label='完成'
      onTouchTap={this.submitInfo}
    />];
    const actions = (<nav>
      <RaisedButton
        label='编辑信息'
        primary
        onTouchTap={this.openDialog}
        style={{ marginRight: '15px' }}
      /> <ChangeInfoBtn initFun={this.props.setBasicInfoDataInit} callback={this.handleError} style={{ display: 'inline-block' }} text='上传证照' />
    </nav>);
    // console.log('......this.state', this.state);
    return (
      <StandardForm
        iconPosition='-60px -90px'
        actions={actions}
        title={'企业基本信息'}
      >
        {/* 显示单个物流发货记录商品详情*/}
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='' message='' actions={actions} showStep={false} expanded>
            <div style={{ marginTop: '-16px' }} className='BasicInformation'>
              <div style={{ margin: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)' }} className='canvasList'>
                <div className='billTitle'>
                  <img src='CorporationInfo/map.png' alt='' />
                  <span>
                  企业证照
                </span>
                </div>
                <div style={{ height: 300, overflowY: 'scroll', justifyContent: 'space-around' }} className='imgsShow'>
                  {
                    this.getCorpCertificate()
                  }
                </div>
                <div />
              </div>
              <div
                style={{ marginTop: '2rem', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)' }}
                className='canvasList'
              >
                <div className='billTitle'>
                  <img src='CorporationInfo/iconfont-miaoshu.png' alt='' />
                  <span>
                  企业基本信息
                </span>
                </div>
                <div style={{ display: 'block', padding: '1rem' }} className='imgsShow'>
                  <div style={{ margin: 0 }} className='row' >
                    <InfoDiv title='机构名称：' content={this.props.BasicInformation.ZZJGB.JGMC || '--'} />
                    <InfoDiv title='所属省份：' content={this.state.SSSF || '--'} />
                    <InfoDiv title='联系地址：' content={this.props.BasicInformation.ZZJGB.LXDZ || '--'} />
                    <InfoDiv title='邮政编码：' content={this.props.BasicInformation.ZZJGB.YZBM || '--'} />
                    <InfoDiv title='所在城市：' content={this.state.SSCS || '--'} />
                    <InfoDiv title='公司网站：' content={this.props.BasicInformation.ZZJGB.GSWZ || '--'} />
                    <InfoDiv title='联系电话：' content={this.props.BasicInformation.ZZJGB.LXDH || '--'} />
                    <InfoDiv title='传真：' content={this.props.BasicInformation.ZZJGB.CZ || '--'} />
                    <div className='col-sm-12 infoDiv'>
                      <div className='infoTitle'>
                        经营范围：
                      </div>
                      <div className='infocontext'>
                        {this.props.BasicInformation.ZZJGB.JYFW || '--'}
                      </div>
                    </div>
                    <div className='col-sm-12 infoDiv'>
                      <div className='infoTitle'>
                        企业描述：
                      </div>
                      <div className='infocontext'>
                        {this.props.BasicInformation.ZZJGB.JBXXMS || '--'}
                      </div>
                    </div>
                  </div>
                </div>
                <div />
              </div>
              <div className='BimagesWrapper'>
                <AppIndividuation id='wlcm' text='APP启动欢迎页设置' />
                <AppIndividuation id='yd1' text='更新引导页1设置' />
                <AppIndividuation id='yd2' text='更新引导页2设置' />
              </div>
            </div>
            <Dialog
              title='编辑基本信息'
              actions={editActions}
              modal
              contentStyle={{ width: '90%' }}
              open={this.state.open}
            >
              <div className='row'>
                <div className='col-sm-12 col-md-6 editDiv'>
                  <div style={{ background: 'rgba(242, 247, 255, 0.8)' }} className='editInfoDiv'>
                    <span>机构名称</span>
                    <TextField
                      id='JGMC'
                      disabled
                      defaultValue={this.state.JGMC}
                      underlineShow={false}
                      hintText=''
                      inputStyle={{ fontFamily: 'SourceHanSansCN-Medium !important',
                        fontSize: '12px',
                        color: '#4a4a4a',
                        height: '44px' }}
                      style={{ width: 'calc(100% - 80px - 44px)', height: '44px', lineHeight: '42px' }}
                    />
                  </div>
                  <EditBlock
                    showError={this.state.verify && !this.validate('LXDH')}
                    id='LXDH' callback={this.handleInfoChage}
                    defaultValue={this.state.LXDH}
                    style={{ background: 'rgba(242,247,255,0.8)' }} label='联系电话 ：'
                  />
                  <EditBlock
                    showError={this.state.verify && !this.validate('CZ')}
                    id='CZ' callback={this.handleInfoChage} defaultValue={this.state.CZ} style={{ background: 'rgba(242,247,255,0.8)' }} label='传真 ：'
                  />
                  <EditBlock
                    showError={this.state.verify && !this.validate('YZBM')}
                    id='YZBM'
                    callback={this.handleInfoChage}
                    defaultValue={this.state.YZBM}
                    style={{ background: 'rgba(242,247,255,0.8)' }} label='邮编 ：'
                  />
                  <EditBlock
                    showError={this.state.verify && !this.validate('GSWZ')}
                    id='GSWZ'
                    callback={this.handleInfoChage}
                    defaultValue={this.state.GSWZ}
                    style={{ background: 'rgba(242,247,255,0.8)' }}
                    label='网址 ：'
                  />
                  {
                    (() => {
                      const ARR = [];
                      if (this.state.JGLX === 'Y') {
                        ARR.push(<EditBlock
                          showError={this.state.verify && !this.validate('YZXM')}
                          key='YZXM'
                          id='YZXM'
                          callback={this.handleInfoChage}
                          defaultValue={this.state.YZXM}
                          style={{ background: 'rgba(254,249,245,0.8)' }} label='院长 ：'
                        />);
                        ARR.push(<EditBlock
                          showError={this.state.verify && !this.validate('CWS')}
                          key='CWS'
                          id='CWS'
                          callback={this.handleInfoChage}
                          defaultValue={this.state.CWS}
                          style={{ background: 'rgba(254,249,245,0.8)' }} label='床位数 ：'
                        />);
                        ARR.push(<EditBlock
                          showError={this.state.verify && !this.validate('MZSL')}
                          key='MZSL'
                          id='MZSL'
                          callback={this.handleInfoChage}
                          defaultValue={this.state.MZSL}
                          style={{ background: 'rgba(254,249,245,0.8)' }} label='门诊数量 ：'
                        />);
                      } else {
                        ARR.push(<EditBlock
                          showError={this.state.verify && !this.validate('JYFW')}
                          key='JYFW'
                          id='JYFW'
                          callback={this.handleInfoChage}
                          defaultValue={this.state.JYFW} multiline style={{ background: '#EFEFF4' }} line={3} maxLines={3} label='经营范围 ：'
                        />)
                      }
                      return ARR;
                    })()
                  }
                  <EditBlock
                    showError={this.state.verify && !this.validate('JBXXMS')}
                    id='JBXXMS'
                    callback={this.handleInfoChage}
                    defaultValue={this.state.JBXXMS} multiline
                    style={{ background: '#EFEFF4' }} line={6} maxLines={6} label='企业简介 ：'
                  />
                </div>
                <div className='col-sm-12 col-md-6 editDiv'>
                  <Location
                    showError={this.state.verify && !this.validate('XZQHID')}
                    callback={this.selectAdd}
                    XZQHID={this.state.XZQHID}
                    wrapperStyle={{ height: 'auto' }}
                    otherStyles={{
                      labelStyle: { fontFamily: 'SourceHanSansCN-Medium !important',
                        fontSize: '12px',
                        height: '44px',
                        lineHeight: '44px',
                        color: '#4a4a4a',
                        top: 'auto',
                        paddingLeft: '80px'
                      },
                      menuStyle: { overflow: 'hidden', width: 'calc(100% - 10px)' },
                    }}
                    style1={{
                      margin: '8px 0',
                      display: 'block',
                      height: '44px',
                      position: 'relative',
                      left: 'auto',
                      right: 'auto',
                      width: '100%',
                      background: 'rgba(242, 247, 255, 0.8)' }}
                    style2={{
                      margin: '8px 0',
                      display: 'block',
                      height: '44px',
                      position: 'relative',
                      left: 'auto',
                      right: 'auto',
                      width: 'calc(100%)',
                      background: 'rgba(242, 247, 255, 0.8)' }}
                    style3={{
                      margin: '8px 0',
                      display: 'block',
                      height: '44px',
                      position: 'relative',
                      left: 'auto',
                      right: 'auto',
                      width: '100%',
                      background: 'rgba(242, 247, 255, 0.8)' }}
                  />
                  <EditBlock
                    showError={this.state.verify && !this.validate('LXDZ')}
                    id='LXDZ'
                    callback={this.handleInfoChage}
                    value={this.state.LXDZ}
                    defaultValue={this.state.LXDZ} multiline
                    style={{ background: '#EFEFF4' }} line={3} maxLines={3} label='详细地址 ：'
                  />
                  <BdMap
                    id='myBdMap' ref='myBdMap' city='杭州市' scale={14} style={{ height: 300 }}
                    mouseScale={false}
                    onSelect={this.onSelect}
                    marker={this.state.marker}
                  />
                </div>
              </div>
            </Dialog>
            <ErrorSnackBar
              message={this.state.message} open={this.state.openError}
              onRequestClose={this.handleRequestClose}
            />

          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    );
  }
}
