/**
 * Created by magellan on 2016/12/9.
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import BdMap from 'components/BdMap';
import _ from 'lodash';
import Location from 'components/Location'
import AtSelect from 'components/AtSelect'
import SmallDialog from 'components/StandardUI/StandardDialog';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import './ChooseReceiveAddress.scss'

/**
 *选择默认收发货地址
**/
export default class ChooseReceiveAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ZZJGWLDZB: [],
      isOpenDeleteConfirmDialog: false,
      choosedCurrentAddress: null,
      ZZJGWLDZBObj: {},
      message: '',
      openError: false,
      handleCloseError: null,
      currentDeleteObj: null,
      XZQHID: null
    }
  }
  static propTypes = {
    // 调用组件参数
    open: PropTypes.bool.isRequired,
    closeCallBack: PropTypes.func.isRequired,
    isReceiveAddress: PropTypes.bool.isRequired,
    CKID: PropTypes.number.isRequired,

    // 外面传进来的props
    globalStore: PropTypes.object,
    getLogisticsAddressList: PropTypes.func,
    chooseReceiveAddress: PropTypes.object,
    initChooseReceiveAddress: PropTypes.func,
    postChooseReceiveAddress: PropTypes.func,
    postDeleteAddress: PropTypes.func,
    initLocationData: PropTypes.func,
    putEditOneAddress: PropTypes.func,
    addOrganizationAddress: PropTypes.func
  }
  static defaultProps = {
  }

  handleClose = () => {
    this.props.closeCallBack();
  }

  handleConfirm = () => {

  }
  reloadCurrentPage = () => {
    const params = { JXSID: this.props.globalStore.organizationId, SFLX: [this.props.isReceiveAddress ? '1' : '0'] }
    this.props.getLogisticsAddressList(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.CKID !== this.props.CKID) {
      const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
      ZZJGWLDZBObj.GLCKID = nextProps.CKID;
    }
    if (nextProps.chooseReceiveAddress.postChooseAddress) {
      nextProps.chooseReceiveAddress.postChooseAddress = null;
      this.reloadCurrentPage();
    }
    if (nextProps.chooseReceiveAddress.receiveAddressResult) {
      const contentArray = [];
      nextProps.chooseReceiveAddress.receiveAddressResult.Result.ZZJGWLDZB.map((value) => {
        if (value.GLCKID === nextProps.CKID) {
          value.isOnMouseOver = false;
          value.isEditAddress = false;
          contentArray.push(value);
        }
      })
      contentArray.push({ isCreatBtn: false, isEditAddress: false })
      this.setState({ ZZJGWLDZB: contentArray });
      this.props.chooseReceiveAddress.receiveAddressResult = null;
    }
    if (nextProps.CKID !== this.props.CKID || nextProps.isReceiveAddress !== this.props.isReceiveAddress) {
      const params = { JXSID: nextProps.globalStore.organizationId, SFLX: [nextProps.isReceiveAddress ? '1' : '0'] }
      this.props.getLogisticsAddressList(params);
    }
    if (_.has(nextProps.chooseReceiveAddress.deleteAddressResult, 'Code')) {
      if (nextProps.chooseReceiveAddress.deleteAddressResult.Code === 0) {
        this.props.initChooseReceiveAddress();
        this.reloadCurrentPage();
        this.setState({ isOpenDeleteConfirmDialog: false });
        this.clearData();
      }
    }
    if (_.has(nextProps.chooseReceiveAddress.postAddOrganizationAddress, 'Code')) {
      if (nextProps.chooseReceiveAddress.postAddOrganizationAddress.Code === 0) {
        this.props.initChooseReceiveAddress();
        this.reloadCurrentPage();
        // this.clearData();
      }
    }
    if (_.has(nextProps.chooseReceiveAddress.putEditAddressResult, 'Code')) {
      if (nextProps.chooseReceiveAddress.putEditAddressResult.Code === 0) {
        this.reloadCurrentPage();
        this.props.initChooseReceiveAddress();
        this.clearData();
      }
    }
  }
  clearData = () => {
    const ZZJGWLDZBObj = { GLCKID: this.state.ZZJGWLDZBObj.GLCKID }
    this.setState({ ZZJGWLDZBObj });
  }
  handleConfirmDelete = () => {
    this.props.postDeleteAddress({ GUID: this.state.currentDeleteObj.GUID });
  }
  componentWillMount() {

  }
  handleClickSetDetaltAddress = (e) => {
    const ZZJGWLDZB = e;
    const params = { params: { ZZJGWLDZB: {
      JD: ZZJGWLDZB.JD,
      XZQHID: ZZJGWLDZB.XZQHID,
      SFLX: ZZJGWLDZB.SFLX,
      LXSJ: ZZJGWLDZB.LXSJ,
      GLCKID: ZZJGWLDZB.GLCKID,
      WD: ZZJGWLDZB.WD,
      GD: ZZJGWLDZB.GD,
      LXRID: ZZJGWLDZB.LXRID,
      LXDH: ZZJGWLDZB.LXDH,
      DZ: ZZJGWLDZB.DZ,
      SFMR: '1',
      LXR: ZZJGWLDZB.LXR
    } },
      GUID: ZZJGWLDZB.GUID }
    this.props.postChooseReceiveAddress(params);
      // this.props.closeCallBack();
  }
  /**
   * 取消删除收发货地址
  */
  handleCancelDelete = () => {
    this.setState({ isOpenDeleteConfirmDialog: false });
  }
  /**
   * 删除收发货地址
  */
  handleClickDeleteAddress = value => () => {
    this.setState({ isOpenDeleteConfirmDialog: true, choosedCurrentAddress: value, currentDeleteObj: value });
  }
    /**
   * 获取地址
   * */
  getLocationValue = (e) => {
    const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
    ZZJGWLDZBObj.XZQHID = e.QXID;
    this.setState({ ZZJGWLDZBObj });
  }
  showDialog = () => {
    const confirmAction = [<FlatButton
      label='关闭'
      onTouchTap={this.handleCancelDelete}
    />, <FlatButton
      label='删除'
      secondary
      onTouchTap={this.handleConfirmDelete}
    />];
    return (
      <SmallDialog
        actions={confirmAction}
        modal
        open={this.state.isOpenDeleteConfirmDialog}
        title={'确认删除'}
        titleStyle={{ fontSize: '20px', color: 'rgba(0,0,0,0.87)' }}
        contentStyle={{ width: '57.1rem' }}
      >
        <div>请确认是否删除该地址</div>
      </SmallDialog>
    );
  }
  setDetaltAddress = value => () => {
    this.handleClickSetDetaltAddress(value);
  }
  handleOpenAddAddressDialog = () => {
    this.setState({ isAddWarehouseAddressDialog: true });
  }
  handleClickSavaEdit = (value, index) => () => {
    this.props.initLocationData();
    this.clearData();
    const ZZJGWLDZB = this.state.ZZJGWLDZB;
    ZZJGWLDZB[index].isEditAddress = !ZZJGWLDZB[index].isEditAddress;
    this.setState({ ZZJGWLDZB });
  }
  /**
   * 百度地图
  */
  onSelect = (point, address, e, f) => {
    this.props.initLocationData();
    const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
    ZZJGWLDZBObj.JD = point.lng;
    ZZJGWLDZBObj.WD = point.lat;
    ZZJGWLDZBObj.GD = 0;
    ZZJGWLDZBObj.DZ = address;
    ZZJGWLDZBObj.XZQHDZ = `${f.addressComponents.province}-${f.addressComponents.city}-${f.addressComponents.district}`;
    // if (this.props.locationData.provinceData.length !== 0) {
    //   const provinceObj = this.props.locationData.provinceData.filter((value, index) => (value.name === f.addressComponents.province))
    //   const params = { provinceID: provinceObj[0].GUID, cityName: f.addressComponents.city, countyName: f.addressComponents.district };
    //   this.props.getLocationId(params);
    // }
    this.setState({ ZZJGWLDZBObj });
    // this.refs.location.replacePoint(e);
  }
  /**
   * 选择@谁
  */
  handleClickSelectPerson = (e) => {
    const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
    ZZJGWLDZBObj.LXRID = e[0].id;
    ZZJGWLDZBObj.LXR = e[0].name;
    ZZJGWLDZBObj.LXSJ = e[0].SJHM;
  }
  textFieldChanged = (event) => {
    const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
    switch (event.target.id) {
      case 'DZ':
        ZZJGWLDZBObj.DZ = event.target.value;
        break;
      case 'LXDH':
        ZZJGWLDZBObj.LXDH = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ ZZJGWLDZBObj });
  }

  /**
   * 编辑地址页面
   * isEditAddress:true为编辑地址，false为创建地址
  */
  showEditAddress = (isEditAddress, value, index) => (
    <div className='chooseReceiveAddress_editCellBox'>
      <div style={{ height: '3.4rem', width: '25rem', marginLeft: '-1rem' }}>
        <Location
          detailAddress={this.state.ZZJGWLDZBObj.XZQHDZ}
          XZQHID={this.state.ZZJGWLDZBObj.XZQHID}
          location={{ QX: _.has(this.state.ZZJGWLDZBObj, 'XZQHDZ') ?
          this.state.ZZJGWLDZBObj.XZQHDZ.split('-')[2] : '区',
            S: _.has(this.state.ZZJGWLDZBObj, 'XZQHDZ') ?
          this.state.ZZJGWLDZBObj.XZQHDZ.split('-')[0] : '省',
            SS: _.has(this.state.ZZJGWLDZBObj, 'XZQHDZ') ?
          this.state.ZZJGWLDZBObj.XZQHDZ.split('-')[1] : '市' }} callback={this.getLocationValue}
        />
      </div>
      <div style={{ height: '2.8rem', paddingLeft: '1.4rem' }}>
        <TextField
          value={_.has(this.state.ZZJGWLDZBObj, 'DZ') ? this.state.ZZJGWLDZBObj.DZ : ''}
          onChange={this.textFieldChanged}
          hintText={'填写详细地址'}
          style={{ width: '28rem', height: '3.1rem' }} id={'DZ'}
        />
      </div>
      <div style={{ height: '3rem', marginLeft: '-1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <AtSelect
            title={isEditAddress ? value.LXR : null}
            isSingle
            style={{ width: '14.2rem', marginLeft: '3rem' }}
            callback={this.handleClickSelectPerson}
            organizationId={this.props.globalStore.organizationId}
          />
          <TextField
            value={_.has(this.state.ZZJGWLDZBObj, 'LXDH') ? this.state.ZZJGWLDZBObj.LXDH : null}
            onChange={this.textFieldChanged}
            hintText={'联系电话'}
            style={{ width: '37rem', height: '40px', marginTop: '0.6rem' }}
            id={'LXDH'}
          />
        </div>
      </div>
      <div style={{ height: '13rem', paddingTop: '1.3rem' }}>
        <div style={{ paddingLeft: '2.2rem', color: 'rgba(0,0,0,0.38)', paddingBottom: '0.8rem' }}>地理信息</div>
        <div style={{ paddingLeft: '1.5rem' }}>
          <BdMap
            mouseScale={false}
            scale={14}
            marker={[{ point:
            { lat: _.has(this.state.ZZJGWLDZBObj, 'WD') ? this.state.ZZJGWLDZBObj.WD : null,
              lng: _.has(this.state.ZZJGWLDZBObj, 'JD') ? this.state.ZZJGWLDZBObj.JD : null },
              selected: true }]}
            id='location'
            ref='location'
            style={{ width: '45.4rem', height: '10rem' }}
            onSelect={this.onSelect}
            centerMarker={isEditAddress ? true : null}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '44rem', marginTop: '2rem' }}>
        <div onClick={this.handleClickSavaEdit(value, index)} style={{ fontSize: '1rem', color: '#808080', marginRight: '1.1rem' }}>取消</div>
        <div onClick={this.handleClickCreateAddress(isEditAddress, value, index)} style={{ fontSize: '1rem', color: '#808080' }}>保存</div>
      </div>
    </div>
    )

  handleClickCreateAddress = (isEditAddress, value, index) => {
    const descKeys = { XZQHID: '选择行政区划', DZ: '填写地址', LXRID: '选择管理人员', LXDH: '填写联系电话', JD: '进行仓库定位', WD: '进行仓库定位' };
    return () => {
      const ZZJGWLDZBObj = this.state.ZZJGWLDZBObj;
      ZZJGWLDZBObj.SFLX = this.props.isReceiveAddress ? '1' : '0';
      ZZJGWLDZBObj.SFMR = '0';
      const params = { ZZJGWLDZB: ZZJGWLDZBObj }
      for (const key in descKeys) {
        if (typeof (this.state.ZZJGWLDZBObj[key]) === 'undefined') {
          this.setState({ openError: true, message: descKeys[key] });
          return;
        }
      }
      if (isEditAddress) { // 编辑
        const paramsObj = { GUID: value.GUID, ZZJGWLDZB: params };
        this.props.putEditOneAddress(paramsObj);
      } else { // 创建
        this.props.addOrganizationAddress(params);
      }
      this.props.initLocationData();
    }
  }
  componentWillUnmount() {

  }
  onMouseover = (value, index) => () => {
    const ZZJGWLDZB = this.state.ZZJGWLDZB;
    ZZJGWLDZB[index].isOnMouseOver = true;
    this.setState({ ZZJGWLDZB });
  }
  onMouseOut = (value, index) => () => {
    const ZZJGWLDZB = this.state.ZZJGWLDZB;
    ZZJGWLDZB[index].isOnMouseOver = false;
    this.setState({ ZZJGWLDZB });
  }

  /**
   * isEditAddress:true为编辑地址，false为创建地址
   * @memberOf ChooseReceiveAddress
   */
  handleClickAddAddress = (isEditAddress, index, value) => () => {
    const ZZJGWLDZB = this.state.ZZJGWLDZB;
    this.state.ZZJGWLDZB.map((sub_value, sub_index) => {
      if (sub_value.isEditAddress === true) {
        ZZJGWLDZB[sub_index].isEditAddress = false;
      }
    })
    ZZJGWLDZB[index].isEditAddress = !ZZJGWLDZB[index].isEditAddress;
    const DZBObj = {};
    DZBObj.GLCKID = this.state.ZZJGWLDZBObj.GLCKID;
    if (isEditAddress === true) {
      DZBObj.XZQHID = ZZJGWLDZB[index].XZQHID;
      DZBObj.DZ = ZZJGWLDZB[index].DZ;
      DZBObj.LXR = ZZJGWLDZB[index].LXR;
      DZBObj.LXRID = ZZJGWLDZB[index].LXRID;
      DZBObj.LXDH = ZZJGWLDZB[index].LXDH;
      DZBObj.JD = ZZJGWLDZB[index].JD;
      DZBObj.WD = ZZJGWLDZB[index].WD;
      DZBObj.GD = ZZJGWLDZB[index].GD;
    }
    this.setState({ ZZJGWLDZB, ZZJGWLDZBObj: DZBObj });
  }
  handleCloseError = () => {
    this.setState({ openError: false })
  }
  /**
   * 地址列表
  */
  showWarehouseAddressList = ZZJGWLDZB => ZZJGWLDZB.map((value, index) => {
    return (
      <div
        key={`ChooseReceiveAddress_${index}`}
        className='chooseReceiveAddress_infoListBox'
        style={{ height: value.isEditAddress ? '28rem' : '9.3rem' }}
        id={index}
      >
        {
            (() => {
              if (_.has(value, 'isCreatBtn')) {
                if (value.isEditAddress === true) {
                  return this.showEditAddress(false, value, index)
                } else {
                  return (
                    <div className='chooseReceiveAddress_infoListContent' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div className='chooseReceiveAddress_infoListContent_add' onClick={this.handleClickAddAddress(false, index)}>
                        <a href={`#${index}`} style={{ textDecoration: 'none' }}>
                          <img src={'/warehouseGeneralIcon/addIcon.png'} role={'presentation'} />
                          <div style={{ marginTop: '0.9rem', color: 'rgba(0,0,0,0.38)' }} >添加</div>
                        </a>
                      </div>
                    </div>
                  );
                }
              } else if (value.isEditAddress === true) {
                return this.showEditAddress(true, value, index)
              } else {
                return (
                  <div
                    className='chooseReceiveAddress_infoListContent'
                    onMouseOut={this.onMouseOut(value, index)}
                    onMouseOver={this.onMouseover(value, index)}
                  >
                    <div style={{ height: '100%', width: '70%' }}>
                      <div className='chooseReceiveAddress_infoList_info' style={{ marginTop: '1.1rem' }}>{value.DZ}</div>
                      <div className='chooseReceiveAddress_infoList_info'>{value.LXR}</div>
                      <div className='chooseReceiveAddress_infoList_info'>{value.LXSJ}</div>
                    </div>
                    <div style={{ height: '100%', width: '30%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '65%' }}>
                        {
                            (() => {
                              if (value.SFMR === '1') {
                                return (
                                  <div className='chooseReceiveAddress_infoList_Label' style={{ background: '#D0011B', height: '100%' }}>
                                    默认地址
                                  </div>);
                              } else {
                                return (
                                  <div
                                    className='chooseReceiveAddress_infoList_setDetault'
                                    style={{ display: value.isOnMouseOver ? 'block' : 'none' }}
                                    onClick={this.setDetaltAddress(value)}
                                  >
                                    设为默认
                                  </div>)
                              }
                            })()
                          }
                      </div>
                      <div style={{ height: '35%', alignItems: 'center', display: 'flex', flexDirection: 'row', paddingLeft: '7.5rem' }}>
                        <div
                          onClick={this.handleClickAddAddress(true, index, value)}
                          style={{ cursor: 'pointer' }}
                          className='chooseReceiveAddress_infoList_edit'
                        >
                          <a href={`#${index}`} style={{ textDecoration: 'none', color: '#808080' }}>
                            编辑
                          </a>
                        </div>
                        <div
                          style={{ cursor: 'pointer' }}
                          className='chooseReceiveAddress_infoList_delete'
                          onClick={this.handleClickDeleteAddress(value)}
                        >
                        删除
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })()
          }
      </div>
    );
  }

    )
  render() {
    const actions = [
      <FlatButton
        label='关闭'
        onTouchTap={this.handleClose}
      />];
    return (
      <div>
        <Dialog
          actions={actions}
          modal
          open={this.props.open}
          autoDetectWindowHeight
          autoScrollBodyContent
          contentStyle={{ maxWidth: '70rem', width: '57.1rem' }}
          title={this.props.isReceiveAddress ? '管理收货地址' : '管理发货地址'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
            {
              this.showWarehouseAddressList(this.state.ZZJGWLDZB)
            }
          </div>
          <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleCloseError} />
        </Dialog>
        {
          this.showDialog()
        }
      </div>
    );
  }
}
