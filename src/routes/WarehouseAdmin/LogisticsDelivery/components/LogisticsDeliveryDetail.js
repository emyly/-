/**
 * Created by chenming on 2016/10/24.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './LogisticsDeliveryDetail.scss'
import LogisticsSelect from 'components/LogisticsSelect'
import SmallDialog from 'components/StandardUI/StandardDialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import FlatButton from 'material-ui/FlatButton';
import PickingRecordDateGrid from 'components/PickingRecordDateGrid'
import OrderDetailForm from 'components/OrderDetailForm'
import DropDownMenu from 'material-ui/DropDownMenu';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import MenuItem from 'material-ui/MenuItem';
import LogisticsDetailDialog from 'components/LogisticsDetailDialog'
import CardUI from 'components/StandardUI/StandardCard';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import ChineseDatePicker from 'components/ChineseDatePicker';
import moment from 'moment'
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import _ from 'lodash';
import GoBackButton from 'components/GoBackButton';

const topStyle = {
  // background: #364356;  '#00A0FF'
  backgroundColor: '#00A0FF'

}
const CardTextStyle = {
  height: '39.5rem',
  padding: 0
}
export default class LogisticsDeliveryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryType: '1',
      totalCost: '0',
      connectPerson: '联系人',
      connectNumber: '联系电话',
      connectAdress: '联系地址',
      SFDF: '0',
      WLGSID: null,

      // 出入库单号
      selectedCRKDHArray: [],
      // 发货人信息
      productionSender: {},
      // @到的人
      ATPersonArray: [],
      // 通知内容
      TZNR: '',
      BFJE: null,
      WLFY: null,
      BJJE: null,
      JJFY: null,
      WLDH: null,
      // 物流单发货信息
      isShowLogisticSendDetail: false,
      // 物流单详情
      isShowLogisticDetail: false,
      CRKID: 0,
      WLID: null,
      params: {},
      // 出库单ID(点击Checkbox)
      CRKDID: null,
      // 物流公司名称
      WLGS: null,
      refresh: false,
      message: '',
      openError: false,
      isPrintDialog: false,
      sendTime: null,
      isShowErrorText: false,
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    // 外部传入props
    globalStore: PropTypes.object,
    location: PropTypes.object,
    postLogisticsDeliverySend: PropTypes.func,
    logisticsDeliveryDetail: PropTypes.object,
    getPickingRecordDate: PropTypes.object,
    pickingRecordDateGrid: PropTypes.object,
    params: PropTypes.object
  }
  componentWillMount = () => {
    this.setState({ sendTime: Date.parse(new Date()), productionSender: { name: this.props.globalStore.YHXM, SJHM: this.props.globalStore.SJHM } });
  }
  static defaultProps = {
    primaryText: '自有物流'
  }
  /**
   * 点击发货按钮
   * */
  clickSendbtn = () => {
    if (this.state.selectedCRKDHArray.length === 0) {
      this.setState({ openError: true, message: '选择单号' });
    } else if (this.state.deliveryType === '1') {
      // 自有物流
      if (this.state.selectedCRKDHArray.length !== 0) {
        if (_.has(this.state.productionSender, 'name')) {
          const params = this.handleConfirmCommit();
          params.WLDB.GSMC = this.state.GSMC;
          this.setState({ params, isShowLogisticSendDetail: true });
        } else {
          this.setState({ openError: true, message: '请选择发货联系人' });
        }
      } else {
        this.setState({ openError: true, message: '你还没选择物流单号' });
      }
    } else if (this.state.selectedCRKDHArray.length !== 0) {
      if (this.state.totalCost !== '请输入正确的数字') {
        if (this.state.WLGSID !== '') {
          if (this.refs.WLDHtextField.getValue() !== '') {
            const params = this.handleConfirmCommit();
            params.WLDB.GSMC = this.state.GSMC;
            this.setState({ params, isShowLogisticSendDetail: true });
          } else {
            this.setState({ openError: true, message: '请填写物流单号' });
          }
        } else {
          this.setState({ openError: true, message: '请选择物流公司' });
        }
      } else {
        this.setState({ openError: true, message: '请输入正确的数字' });
      }
    }
  }
  /**
   * 自有物流
   * */
  chooseOwnLogistics = () => {
    this.setState({ deliveryType: '1', sendTime: new Date() });
  }
  /**
   * 点击checkBox按钮
   * */
  checkBoxOnChange = () => {
    this.setState({ SFDF: this.state.SFDF === '0' ? '1' : '0' });
  }

  handleOrderStateDropDownMenuChange = (event, index, value) => {
    this.setState({ deliveryType: String(value) });
  };
  /**
   * 点击Checkbox那行(排除Checkbox)
   * */
  clickCheckBoxRow = (e) => {
    this.setState({ WLID: e.GUID, CRKID: e.CRKID });
  }
  /**
   * 物流公司
   * */
  chooseLogisticCompany = () => {
    this.setState({ deliveryType: '0', sendTime: null });
  }
  /**
   * 关闭界面所有对话框
   * */
  handleClose = () => {
    this.setState({ isShowLogisticDetail: false, isShowLogisticSendDetail: false, openError: false });
  }
  /**
   * 点击物流发货记录列表，返回checkBox数组
   * */
  handleClickCheckBox = (e) => {
    this.setState({ selectedCRKDHArray: e });
  }
  /**
   * 点击物流发货记录回调
   * */
  handleLogisticsRecordClick = (e) => {
    this.setState({ WLID: e.GUID, isShowLogisticDetail: true, CRKID: e.CRKID });
  }
  /**
   * 点击选择发货人回调
   * */
  handleClickSelectPerson = (e) => {
    if (e.length === 0) {
      this.setState({ productionSender: { name: '', SJHM: '' } });
    } else {
      this.setState({ productionSender: { name: e[0].name, SJHM: e[0].SJHM } });
    }
  }
  /**
   * 输入通知内容回调
   **/
  clickATMessage = (e) => {
    this.setState({ TZNR: e });
  }
  /**
   * 选择物流公司回调
   * */
  chooseLogisticsDeliveryCompany = (e) => {
    this.setState({ WLGSID: e.GUID, GSMC: e.GSMC });
  }

  /**
   * 选择@人
   * */
  handleClickMultiSelectPerson = (e) => {
    const personArray = [];
    e.map((valule) => {
      personArray.push(valule.id);
    })
    this.setState({ ATPersonArray: personArray });
  }
  /**
   * 获取提交参数
   * */
  handleConfirmCommit = () => {
    // 上一页传回来的DDB
    // 出入库单ID数组
    const CRKDHArray = [];
    this.state.selectedCRKDHArray.map((value, index) => {
      CRKDHArray.push(value.CRKID);
    })
    const DDB = this.props.location.state.DDB;
    let params;
    if (this.state.deliveryType === '0') {
      // 选择物流公司
      params = { WLDB: {
        DDLX: DDB.DDLX,
        DDLXR: DDB.SHLXR,
        BFJE: this.refs.BFJEtextField.getValue(),
        DDLXRDH: DDB.SHLXRDH,
        WLGSID: this.state.WLGSID,
        SFDF: this.state.SFDF,
        CRKIDSZ: CRKDHArray,
        DDID: DDB.GUID,
        DJMC: '物流单',
        WLLX: this.state.deliveryType,
        WLFY: this.refs.WLFYtextField.getValue(),
        BJJE: this.refs.BJJEtextField.getValue(),
        WLZFY: this.state.totalCost,
        DDDD: DDB.SHDZ === null ? null : DDB.SHDZ.split('\n')[0],
        JJFY: this.refs.JJFYtextField.getValue(),
        WLDH: this.refs.WLDHtextField.getValue(),
        SFSJ: this.state.sendTime === null ? Date.parse(new Date()) : this.state.sendTime,
        MDJXSID: DDB.CJJXSID
      },
        TZ: {
          BTZR: this.state.ATPersonArray,
          TZNR: this.state.TZNR
        }
      }
    } else {
      // 自有物流
      params = {
        WLDB: {
          SFLXDH: DDB.SHLXRDH,
          DDLXR: DDB.SHLXR,
          DJMC: '物流单',
          WLLX: this.state.deliveryType,
          SFLXR: this.state.productionSender.name,
          DDLXRDH: DDB.SHLXRDH,
          DDDD: DDB.SHDZ === null ? null : DDB.SHDZ.split('\n')[0],
          DDID: DDB.GUID,
          MDJXSID: DDB.CJJXSID,
          CRKIDSZ: CRKDHArray,
          DDLX: DDB.DDLX,
          SFSJ: this.state.sendTime === null ? Date.parse(new Date()) : this.state.sendTime
        },
        TZ: {
          BTZR: this.state.ATPersonArray,
          TZNR: this.state.TZNR
        }
      }
    }
    return params;
  }
  /**
   * 提交
   * */
  handleClickLogisticsSend = () => {
    this.props.postLogisticsDeliverySend(this.handleConfirmCommit());
    this.setState({ selectedCRKDHArrayisShowLogisticDetail: false, isShowLogisticSendDetail: false });
  }
  componentWillReceiveProps(nextValue) {
    if (nextValue.logisticsDeliveryDetail.error.code !== 0 && this.props.logisticsDeliveryDetail.error !== {}) {
      if (_.has(nextValue.logisticsDeliveryDetail.error.response, 'Message')) {
        this.setState({ message: nextValue.logisticsDeliveryDetail.error.response.Message, openError: true });
        this.props.logisticsDeliveryDetail.error.code = 0;
      }
    }
    if (nextValue.logisticsDeliveryDetail.Result.Code === 0) {
      this.props.getPickingRecordDate(this.props.location.state.DDB.GUID, [0, 1]);
      this.setState({ isPrintDialog: true });
      nextValue.logisticsDeliveryDetail.Result.Code = null;
    }
    // let isTurnToList = true;
    // if (nextValue.pickingRecordDateGrid !== null && nextValue.pickingRecordDateGrid !== this.props.pickingRecordDateGrid) {
    //   nextValue.pickingRecordDateGrid.pickingRecordDate.map((value) => {
    //     if (value.WLDH === null) {
    //       isTurnToList = false
    //     }
    //   })
    //   if (isTurnToList) {
    //     if (nextValue.location.state.orderStatus === 0) {
    //       window.history.back();
    //     }
    //   }else {

    //   }
    // }

    this.setState({
      connectPerson: nextValue.orderBasicInfoForm.orderData.SHLXR,
      connectNumber: nextValue.orderBasicInfoForm.orderData.SHLXRDH,
      connectAdress: nextValue.orderBasicInfoForm.orderData.SHDZ });
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 打印
   */
  handleClosePrint = () => {
    // orderBasicInfoForm.orderData.SHLXR
    const params = [];
    this.state.selectedCRKDHArray.map((value, index) => {
      const obj = {};
      obj.DDID = this.props.location.state.DDB.GUID;
      obj.CRKDID = value.CRKID
      params.push(obj);
    })
    const WLDBObjs = this.state.params;
    this.props.pickingRecordDateGrid.pickingRecordDate.map((value, index) => {
      if (value.CRKID === this.state.params.WLDB.CRKIDSZ[0]) {
        WLDBObjs.WLDB.WLDH = value.WLDH;
      }
    })
    this.context.router.push({
      pathname: `/logisticsDelivery/logisticsDeliveryDetail/${this.props.location.state.DDB.GUID}/logisticsDeliveryPrint`,
      state: { WLDB: WLDBObjs.WLDB, param: params, DDB: this.props.location.state.DDB }
    });
  }
  /**
   * 显示物流发货记录
   * */
  showLogisticsRecord = () => (
    <div className='col-lg-6 col-md-6 col-sm-12'>
      <CardUI
        expanded
        title={Number(this.props.location.state.orderStatus) === 0 ? '出库单记录' : '已发货出库单'}
        avatar={`/logistIcon/icon-0${Number(this.props.location.state.orderStatus) === 0 ? '7' : '8'}.png`}
        label={`${this.props.location.state.orderStatus === 1 ? '' : '需勾选'}`}
        topStyle={{ backgroundColor: `${this.props.location.state.orderStatus === 0 ? '#00A0FF' : '#364356'}` }}
        CardTextStyle={{ height: `${this.props.location.state.orderStatus === 0 ? '39.5rem' : '23.4rem'}`, padding: 0 }}
      >
        <PickingRecordDateGrid
          orderStatus={this.props.location.state.orderStatus}
          isRefresh={this.state.refresh}
          clickCheckBoxRow={this.clickCheckBoxRow}
          organizationId={this.props.globalStore.organizationId}
          GUID={Number(this.props.params.id)}
          rowClick={this.handleLogisticsRecordClick}
          checkboxCallback={this.handleClickCheckBox}
        />
      </CardUI>
    </div>
  )
  /**
   * 关闭打印提示框
   */
  handlePrintClose = () => {
    this.props.getPickingRecordDate(this.props.location.state.DDB.GUID, [0, 1]);
    this.setState({ isPrintDialog: false });
  }
  /**
   * 打印物流信息
  */
  handleClickPrintLogistics = (WLDBObj) => {
    const params = [{ CRKDID: WLDBObj.CRKID, DDID: this.props.location.state.DDB.GUID }];
    this.context.router.push({
      pathname: `/logisticsDelivery/logisticsDeliveryDetail/${this.props.location.state.DDB.GUID}/logisticsDeliveryPrint`,
      state: { WLDB: WLDBObj, param: params, DDB: this.props.location.state.DDB }
    });
  }
  /**
   * 显示物流发货详情
   * */
  showLogisticsDetail = () => (
    <LogisticsDetailDialog
      clickPrintLogisticsCallback={this.handleClickPrintLogistics}
      CRKDIDArray={[{ DDID: this.props.location.state.DDB.GUID, CRKDID: this.state.CRKID }]}
      isShowSendbtn={false}
      CKDID={this.state.WLID}
      open={this.state.isShowLogisticDetail}
      confirmCallBack={this.handleClose}
    />
  )
  /**
   * 物流发货确认
   * */
  confirmLogisticsSend = () => {
    // 传入参数
    const params = [];
    this.state.selectedCRKDHArray.map((value, index) => {
      const obj = {};
      obj.DDID = this.props.location.state.DDB.GUID;
      obj.CRKDID = value.CRKID
      params.push(obj);
    })
    return (
      <LogisticsDetailDialog
        paramsObj={this.state.params}
        CRKDIDArray={params}
        isShowSendbtn
        clickSendCallBack={this.handleClickLogisticsSend}
        open={this.state.isShowLogisticSendDetail}
        confirmCallBack={this.handleClose}
      />
    );
  }
  /* *
   * 输入框发生改变
   * */
  textFieldChanged = (e) => {
    if (e.target.id === 'BJJE') {
      const BJJE = this.refs.BJJEtextField.getValue();
      if (isNaN(BJJE)) {
        this.setState({ isShowErrorText: true });
      } else {
        this.setState({ isShowErrorText: false });
      }
    } else {
        // 判断是否为数字，设置默认值为0
      const BFJE = parseFloat(this.refs.BFJEtextField.getValue() === '' ?'0' :
        isNaN(this.refs.BFJEtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) :
        this.refs.BFJEtextField.getValue());
      const JJFY = parseFloat(this.refs.JJFYtextField.getValue() === '' ? '0' :
        isNaN(this.refs.JJFYtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) :
        this.refs.JJFYtextField.getValue());
      const WLFY = parseFloat(this.refs.WLFYtextField.getValue() === '' ? '0' :
        isNaN(this.refs.WLFYtextField.getValue()) === true ? this.setState({ totalCost: '请输入正确的数字' }) :
        this.refs.WLFYtextField.getValue());
      const ZFY = BFJE + JJFY + WLFY;
      if (!isNaN(ZFY)) {
        this.setState({ totalCost: ZFY.toFixed(2) });
      } else {
        this.setState({ totalCost: '请输入正确的数字' });
      }
    }
  }
  handleErrorClose = () => {
    this.setState({ openError: false });
  }
  /**
   * 选择物流公司显示填写物流信息
   * */
  logisticsTypeInInfo = () => {
    const CheckboxStyle = {
      color: '979797',
      border: '1px solid #979797 !important'
    }
    return (
      <div className='LogisticsDeliveryDetail_typeInInfo'>
        <div className='LogisticsDeliveryDetail_leftContent'>
          <span style={{ display: 'inline-block', width: '10rem', marginRight: 10, textAlign: 'right' }} key={'h4_warehouse_004'}>物流单号：</span>
          <span style={{ display: 'inline-block', marginLeft: 18 }}>
            <TextField ref='WLDHtextField' hintText='物流单号' className='AtTextFieldStyle' style={{ width: '25rem', height: '3.5rem' }} />
          </span>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '10rem', marginRight: 10, textAlign: 'right' }}>物流金额总计：</span>
          <span
            className='AtTextFieldStyle'
            style={{
              display: 'inline-block',
              borderBottom: '1px solid rgb(224,224,224)',
              marginLeft: 18,
              paddingBottom: '3px',
              height: '2.8rem',
              color: 'rgba(0,0,0,0.87)' }}
          >
            {this.state.totalCost}
          </span>
        </div>
        <div style={{ width: '28rem', marginLeft: 125 }}>
          <div>
            <div className='col-lg-6 col-md-12 col-sm-6'>
              <span style={{ display: 'inline-block', textAlign: 'right' }}>保价金额：</span>
              <span style={{ display: 'inline-block' }}>
                <TextField
                  id={'BJJE'}
                  errorText={this.state.isShowErrorText ? '请输入数字' : null}
                  className='LogisticsDeliveryDetail_rightContent'
                  onChange={this.textFieldChanged}
                  ref='BJJEtextField'
                  hintText=''
                  style={{ width: '5.6rem', height: '2.6rem' }}
                />
              </span>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-6'>
              <span style={{ display: 'inline-block', textAlign: 'right' }}>加急费用：</span>
              <span style={{ display: 'inline-block' }}>
                <TextField ref='JJFYtextField' onChange={this.textFieldChanged} hintText='' style={{ width: '5.6rem', height: '2.6rem' }} />
              </span>
            </div>
          </div>
          <div className='col-lg-6 col-md-12 col-sm-6'>
            <span style={{ display: 'inline-block', textAlign: 'right' }}>保险金额：</span>
            <span style={{ display: 'inline-block' }}>
              <TextField ref='BFJEtextField' onChange={this.textFieldChanged} hintText='' style={{ width: '5.6rem', height: '2.6rem' }} />
            </span>
          </div>
          <div className='col-lg-6 col-md-12 col-sm-6' >
            <span style={{ display: 'inline-block', textAlign: 'right' }}>物流费用：</span>
            <span style={{ display: 'inline-block' }}>
              <TextField ref='WLFYtextField' onChange={this.textFieldChanged} hintText='' style={{ width: '5.6rem', height: '2.6rem' }} />
            </span>
          </div>
        </div>
        <div style={{ fontFamily: 'SourceHanSansCN-Normal', width: '15rem', margin: '0 auto' }}>
          <Checkbox
            className='leftContent'
            style={{ height: '1px', fontSize: '14px', color: 'rgba(0,0,0,0.38)' }}
            labelStyle={CheckboxStyle}
            label='到付'
            onCheck={this.checkBoxOnChange}
            iconStyle={{
              display: 'inline-block',
              fill: this.state.SFDF === '0' ? '#979797' : 'rgb(0,160,255)',
              color: '#979797',
              userSelect: 'none' }}
          />
        </div>
      </div>
    );
  };
  /**
   * 点击送货时间
  */
  handleDataPickerChange = (e, f) => {
    this.setState({ sendTime: Date.parse(f) });
  }
  render() {
    const filter =
      <div />;
    let titleActions;
    if (this.props.location.state.orderStatus === 0) {
      titleActions = [
        <GoBackButton key='logisticsDelivery_1' style={{ marginRight: '10px' }} />,
        <RaisedButton key='logisticsDelivery_2' label='发货' icon={<ContentAddCircle />} onTouchTap={this.clickSendbtn} />,
      ];
    } else {
      titleActions = <div><GoBackButton style={{ marginRight: '10px' }} /></div>
    }
    const logistFilter = (<DropDownMenu
      id='OrderStateDropDownMenu'
      style={{marginLeft: '-20px', position: 'relative', zIndex: '999'}}
      underlineStyle={{outline: 'none', borderTop: 'none'}}
      labelStyle={{fontFamily: 'PingFangSC-Medium',
        fontSize: '20px',
        color: 'rgb(255, 255, 255)',
        letterSpacing: '0.71px'}}
      value={this.state.deliveryType}
      onChange={this.handleOrderStateDropDownMenuChange}
    >
      <MenuItem value='1' primaryText='自有物流' onActive={this.chooseOwnLogistics} />
      <MenuItem value='0' primaryText='物流公司' onActive={this.chooseLogisticCompany} />
    </DropDownMenu>)
    const printAction = [<FlatButton
      label='关闭'
      onTouchTap={this.handlePrintClose}
    />, <FlatButton
      label='打印'
      secondary
      onTouchTap={this.handleClosePrint}
    />];
    return (
      <StandardForm
        iconPosition='-150px 0px'
        filter={filter}
        actions={titleActions}
        title='物流发货详情页面'
        message={`您当前正在处理订单号为<${this.props.params.id}>的订单`}
      >
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='' message='' actions={titleActions} showStep={false} expanded>
            <div className='LogisticsDeliveryDetail_mainBox'>
              <div className='LogisticsDeliveryDetail_historyInfo' >
                {
                  // 显示物流发货记录
                  this.showLogisticsRecord()
                }
                <div className='col-lg-6 col-md-6 col-sm-12' style={{ display: this.props.location.state.orderStatus === 0 ? 'block' : 'none' }}>
                  <CardUI
                    expanded
                    dropMenuTitle={logistFilter}
                    avatar='/logistIcon/icon-07.png'
                    label=''
                    CardTextStyle={CardTextStyle}
                    topStyle={topStyle}
                  >
                    <div style={{ paddingTop: '1.5rem' }}>
                      {
                        (() => {
                          // 选择自有物流
                          if (this.state.deliveryType === '1') {
                            return (
                              <div className='LogisticsDeliveryDetail_Flex'>
                                <div className='LogisticsDeliveryDetail_content_flex'>
                                  <span className='orgSpanOne'>物流公司：</span>
                                  <span className='orgSpan AtTextFieldStyle' style={{ height: '3.6rem' }}>自有物流</span>
                                </div>
                                <div className='LogisticsDeliveryDetail_content_flex'>
                                  <span className='orgSpanOne'>选择送货人:</span>
                                  <span>
                                    <AtSelect
                                      hintStyle={{ color: 'rgba(0, 0, 0, 0.870588)' }}
                                      isSingle
                                      style={{ height: '50px' }}
                                      className='AtTextFieldStyle'
                                      callback={this.handleClickSelectPerson}
                                      organizationId={this.props.globalStore.organizationId}
                                      title={this.state.productionSender.name}
                                    />
                                  </span>
                                </div>
                                <div className='LogisticsDeliveryDetail_content_flex'>
                                  <span className='orgSpanOne'>联系电话：</span>
                                  <span>
                                    <TextField
                                      value={this.state.productionSender.SJHM}
                                      className='AtTextFieldStyle'
                                      style={{ height: '3.6rem' }}
                                      id={'LogisticsDeliveryDetail_textField1'}
                                    />
                                  </span>
                                </div>
                              </div>)
                          } else {
                            return (
                              <div
                                style={{fontFamily: 'SourceHanSansCN-Normal',
                                  display: 'flex',
                                  width: '35rem',
                                  margin: '0 auto',
                                  fontSize: '14px',
                                  color: 'rgba(0,0,0,0.38)' }}
                              >
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '10rem',
                                    height: '3.4rem',
                                    lineHeight: '6.2rem',
                                    marginRight: -13 }}
                                >
                                选择物流公司：
                                </span>
                                <span style={{ display: 'inline-block', marginLeft: 18 }}>
                                  <LogisticsSelect
                                    SelectFieldStyle={{
                                      height: '48px',
                                      lineHight: '48px',
                                      width: '25rem'}}
                                    callBack={this.chooseLogisticsDeliveryCompany}
                                  />
                                </span>
                              </div>)
                          }
                        })()
                      }
                    </div>
                    {
                      (() => {
                        // 如果选择是物流公司，显示保价金额等数据
                        if (this.state.deliveryType === '0') {
                          return (this.logisticsTypeInInfo());
                        }
                      })()
                    }
                    <div className='LogisticsDeliveryDetail_Flex'>
                      <div className='LogisticsDeliveryDetail_content_flex'>
                        <span className='orgSpanOne'>发货时间：</span>
                        <span>
                          <ChineseDatePicker
                            className='AtTextFieldStyle'
                            hintStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: 'rgba(0, 0, 0, 0.870588)' }}
                            textFieldStyle={{ width: '23.2rem' }}
                            name={'stopPropagationTextField'}
                            style={{ overflow: 'hidden' }}
                            hintText={moment(this.state.sendTime).format('YYYY/MM/DD')}
                            DatePicker={this.state.sendTime}
                            onChange={this.handleDataPickerChange}
                          />
                        </span>
                      </div>
                      <div className='LogisticsDeliveryDetail_content_flex'>
                        <span className='orgSpanOne'>选择@谁：</span>
                        <span>
                          <AtSelect
                            callback={this.handleClickMultiSelectPerson}
                            className='AtTextFieldStyle'
                            organizationId={this.props.globalStore.organizationId}
                          />
                        </span>
                      </div>
                      <div className='LogisticsDeliveryDetail_content_flex'>
                        <span className='orgSpanOne'>填写备注：</span>
                        <span>
                          <AtMessage callback={this.clickATMessage} rowsMax={3} className='AtTextFieldStyle' style={{ height: '3.7rem' }} />
                        </span>
                      </div>
                    </div>
                  </CardUI>
                </div>
              </div>
              {
                // 物流单详情
                this.showLogisticsDetail()
              }
              {
                // 发货确认按钮
                this.confirmLogisticsSend()
              }
              <OrderDetailForm
                orderId={Number(this.props.params.id)}
                orgId={this.props.globalStore.organizationId}
                position={1}
                sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}/>
              <SmallDialog
                actions={printAction}
                modal
                open={this.state.isPrintDialog}
                title={'发货完成'}
                titleStyle={{ fontSize: '20px', color: 'rgba(0,0,0,0.87)' }}
                contentStyle={{ width: '57.1rem' }}
              >
                <div>您已经完成物流发货，是否打印物流发货详情单？</div>
              </SmallDialog>
              <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleErrorClose} />
            </div>
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    );
  }
}
