/**
 * Created by chenming on 2016/12/1.
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import BdMap from 'components/BdMap';
import _ from 'lodash';
import Location from 'components/Location'
import Checkbox from 'material-ui/Checkbox';
import AtSelect from 'components/AtSelect'
import './EditWarehouseDialog.scss'
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';

export default class EditWarehouseDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CKB: {},
      // 是否创建默认收发货地址
      isCreateDefaultAddress: true,
      personObj: {},
      LXDH: null,
      detailAddress: null,
      message: '',
      openError: false
    }
  }
  static propTypes = {
    open: PropTypes.bool.isRequired,
    // 是否为编辑仓库 true为编辑仓库 false为新建仓库
    isEditSubWarehouse: PropTypes.bool.isRequired,
    closeCallBack: PropTypes.func.isRequired,
    // 仓库ID
    CKID: PropTypes.number.isRequired,
    // 上级仓库对象
    CKObject: PropTypes.object.isRequired,
    // 当前仓库对象
    CurrentCKObj: PropTypes.object,

    // 外部应用Props
    putWarehouseDetailData: PropTypes.func,
    postCreateNewWarehouse: PropTypes.func,
    initLocationData: PropTypes.func,
    editWarehouseDialog: PropTypes.object,
    globalStore: PropTypes.object,
  }
  static defaultProps = {
    isEditSubWarehouse: false
  }
  handleComfirm = () => {
    let params;
    if (this.props.isEditSubWarehouse) {
      params = { CKB: {
        CKMC: this.state.CKB.CKMC,
        XZQHID: this.state.CKB.XZQHID,
        SZDZ: this.state.CKB.SZDZ,
        JD: this.state.CKB.JD,
        WD: this.state.CKB.WD,
        CKMS: this.state.CKB.CKMS
      },
        CKID: this.props.CKID }
    } else {
      params = { CKB: {
        CKMC: this.state.CKB.CKMC,
        XZQHID: this.state.CKB.XZQHID,
        SZDZ: this.state.CKB.SZDZ,
        JD: this.state.CKB.JD,
        WD: this.state.CKB.WD,
        CKMS: this.state.CKB.CKMS,
        FJCKID: this.props.CKObject.GUID,
      } }
      if (this.state.isCreateDefaultAddress) {
        const ZZJGWLDZB = {
          DZ: this.state.CKB.SZDZ,
          JD: this.state.CKB.JD,
          WD: this.state.CKB.WD,
          GD: 0,
          LXRID: this.state.personObj.id,
          LXR: this.state.personObj.name,
          LXDH: this.state.LXDH,
          XZQHID: this.state.CKB.XZQHID
        }
        params.ZZJGWLDZB = ZZJGWLDZB;
      }
      if (!_.has(this.state.personObj, 'name') && this.state.isCreateDefaultAddress) {
        this.setState({ message: '请选择联系人', openError: true });
        return;
      }
      const descKeys = { CKMS: '填写仓库描述', SZDZ: '填写详细地址', CKMC: '填写仓库名称', JD: '进行仓库定位', WD: '进行仓库定位', CKB: 'CKB', XZQHID: '选择行政区划' };
      const ignoreObj = { CKMS: '仓库描述', SZDZ: '详细地址' };
      for (const key in params.CKB) {
        if (typeof (params.CKB[key]) === 'undefined' || params.CKB[key] === null) {
          if (!_.has(ignoreObj, key)) {
            this.setState({ message: `请${descKeys[key]}`, openError: true });
            return;
          }
        }
      }
    }
    if (this.props.isEditSubWarehouse) {
      this.props.putWarehouseDetailData(params);
    } else {
      this.props.postCreateNewWarehouse(params);
    }
    this.props.initLocationData();
  }
  handleClose = () => {
    this.props.initLocationData();
    this.setState({ CKB: {}, personObj: {}, LXDH: null, detailAddress: null });
    this.props.closeCallBack();
  }
  handleCloseError = () => {
    this.setState({ openError: false });
  }
  onSelect = (point, address, e, f) => {
    this.props.initLocationData();
    const CKBObj = _.cloneDeep(this.state.CKB);
    CKBObj.JD = point.lng;
    CKBObj.WD = point.lat;
    CKBObj.SZDZ = address;
    CKBObj.XZQHDZ = `${f.addressComponents.province}-${f.addressComponents.city}-${f.addressComponents.district}`;
    // if (this.props.locationData.provinceData.length !== 0) {
    //   const provinceObj = this.props.locationData.provinceData.filter((value, index) => (value.name === f.addressComponents.province))
    //   const params = { provinceID: provinceObj[0].GUID, cityName: f.addressComponents.city, countyName: f.addressComponents.district };
    //   this.props.getLocationId(params);
    // }
    document.getElementById('SZDZ').value = address;
    this.setState({ CKB: CKBObj, detailAddress: address });
    this.refs.location.replacePoint(e);
  }
  /**
   * 输入框发生改变
   * */
  textFieldChanged = () => (event) => {
    const CKBObj = this.state.CKB;
    switch (event.target.id) {
      case 'CKMC':
        CKBObj.CKMC = event.target.value;
        break;
      case 'SZDZ':
        CKBObj.SZDZ = event.target.value;
        break;
      case 'CKMS':
        CKBObj.CKMS = event.target.value;
        break;
      case 'LXDH':
        this.setState({ LXDH: event.target.value });
        break;
      default:

        break;
    }
    this.setState({ CKB: CKBObj });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditSubWarehouse === false && _.isEmpty(this.state.CKB)) {
      const CKBObj = {
        XZQHID: null,
        CKMC: '',
        SZDZ: '',
        CKMS: '',
        FJCKID: nextProps.CKObject.FJCKID,
        JD: 120.120875,
        WD: 30.294127,
        GD: 10 };
      this.setState({ CKB: CKBObj });
    }
    if (nextProps.editWarehouseDialog.putWarehouseDetailData.Code === 0) {
      this.props.editWarehouseDialog.putWarehouseDetailData.Code = null;
      this.props.closeCallBack();
    }
    if (nextProps.editWarehouseDialog.postCreateWarehouseData.Code === 0) {
      this.props.editWarehouseDialog.postCreateWarehouseData.Code = null;
      this.props.closeCallBack();
    }
    if (this.props.open !== nextProps.open && nextProps.isEditSubWarehouse) {
      this.setState({ CKB: nextProps.CurrentCKObj });
    }
  }
  getLocationValue = (e) => {
    const CKB = this.state.CKB;
    CKB.XZQHID = e.QXID;
    this.setState({ CKB });
  }
  /**
   * 点击选择发货人回调
   * */
  handleClickSelectPerson = (e) => {
    this.setState({ personObj: e[0] });
  }
  componentWillMount() {
    if (!this.props.isEditSubWarehouse) {
      const CKBObj = {
        XZQHID: null,
        CKMC: '',
        SZDZ: '',
        CKMS: '',
        FJCKID: this.props.CKObject.FJCKID,
        JD: 120,
        WD: 30,
        GD: 10 };
      this.setState({ CKB: CKBObj });
    }
  }
  checkBoxOnChange = () => {
    this.setState({ isCreateDefaultAddress: !this.state.isCreateDefaultAddress });
  }
  componentWillUnmount() {
  }
  render() {
    const actions = [
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Checkbox
          onCheck={this.checkBoxOnChange}
          style={{
            marginTop: '0.5rem',
            display: this.props.isEditSubWarehouse ? 'none' : 'block',
            width: '17rem',
            marginRight: '37rem',
            paddingRight: '7rem' }}
          checked={this.state.isCreateDefaultAddress}
          label={'设为默认'}
        />
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem' }}>
          <FlatButton
            label='取消'
            onTouchTap={this.handleClose}
          /><FlatButton
            label='确认'
            primary
            onTouchTap={this.handleComfirm}
          />
        </div>
      </div>
    ];
    if (this.props.open) {
      // const point = { lat: _.has(this.state.CKB, 'WD') ? this.state.CKB.WD : 0, lng: _.has(this.state.CKB, 'JD') ? this.state.CKB.JD : 0 };
      return (
        <div style={{ width: '59.1rem', height: '696px' }}>
          <Dialog
            actions={actions}
            modal
            open={this.props.open}
            autoDetectWindowHeight
            autoScrollBodyContent
            contentStyle={{ maxWidth: '70.1rem', width: '70.1rem' }}
            title={this.props.isEditSubWarehouse ? '编辑仓库' : '新建子仓库'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '4.4rem' }}>
              {
            (() => {
              if (!this.props.isEditSubWarehouse) {
                return (
                  <div style={{ height: this.state.isCreateDefaultAddress ? 'auto' : '0rem' }}>
                    <div className='EditWarehouseDialog_content' style={{ height: 'auto' }}>
                      {
                        (() => {
                          if (this.state.isCreateDefaultAddress) {
                            return (
                              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                  <div
                                    style={{ background: 'url(/WarehouseInventory/所在地icon.png) no-repeat',
                                      lineHeight: '2.5rem',
                                      width: '2.5rem',
                                      height: '2.1rem',
                                      paddingRight: '20px',
                                      marginTop: '1rem' }}
                                  />
                                  <div className='EditWarehouseDialog_Descript' style={{ marginTop: '1rem' }}>联系人</div>
                                  <AtSelect
                                    isSingle
                                    style={{ width: '19.2rem', marginLeft: '1.4rem' }}
                                    callback={this.handleClickSelectPerson}
                                    organizationId={this.props.globalStore.organizationId}
                                    title='请选择管理人员'
                                  />
                                  <div style={{ width: '8rem', height: '48px', lineHeight: '48px' }}>{this.state.personObj.SJHM}</div>
                                </div>
                                <div style={{ marginLeft: '11rem' }}>
                                  <TextField
                                    style={{ width: '37.5rem' }}
                                    id={'LXDH'}
                                    onChange={this.textFieldChanged()}
                                    value={this.state.LXDH}
                                    hintText={'请输入联系电话'}
                                  />
                                </div>
                              </div>
                            );
                          }
                        })()
                      }
                    </div>
                  </div>
                );
              }
            })()
          }
              <div className='EditWarehouseDialog_content'>
                <div
                  className='EditWarehouseDialog_icon'
                  style={{ background: 'url(/warehouseGeneralIcon/storageName.png) no-repeat' }}
                />
                <div className='EditWarehouseDialog_Descript'>仓库名称</div>
                <div className='EditWarehouseDialog_content_third' >
                  <TextField
                    style={{ width: '37.5rem' }}
                    id={'CKMC'}
                    onChange={this.textFieldChanged()}
                    defaultValue={this.props.isEditSubWarehouse ? this.props.CurrentCKObj.CKMC : ''}
                    hintText={this.props.isEditSubWarehouse ? '请输入子仓库名称' : '请输入仓库名称'}
                  />
                </div>
              </div>
              <div className='EditWarehouseDialog_content'>
                <div
                  className='EditWarehouseDialog_icon'
                  style={{ background: 'url(/warehouseGeneralIcon/location.png) no-repeat' }}
                />
                <div className='EditWarehouseDialog_Descript' >所在地</div>
                <div className='EditWarehouseDialog_content_third' style={{ marginLeft: '-1.4rem' }}>
                  <Location
                    XZQHID={this.props.isEditSubWarehouse ? this.state.CKB.XZQHID : null}
                    detailAddress={this.state.CKB.SZDZ}
                    style1={{ fontSize: '16px' }}
                    style2={{ fontSize: '16px' }}
                    style3={{ fontSize: '16px' }}
                    callback={this.getLocationValue}
                    location={{ QX: _.has(this.state.CKB, 'XZQHDZ') ? this.state.CKB.XZQHDZ.split('-')[2] : '',
                      S: _.has(this.state.CKB, 'XZQHDZ') ? this.state.CKB.XZQHDZ.split('-')[0] : '',
                      SS: _.has(this.state.CKB, 'XZQHDZ') ? this.state.CKB.XZQHDZ.split('-')[1] : '' }}
                  />
                </div>
              </div>
              <div className='EditWarehouseDialog_content'>
                <div
                  className='EditWarehouseDialog_icon'
                  style={{ background: 'url(/warehouseGeneralIcon/address.png) no-repeat' }}
                />
                <div className='EditWarehouseDialog_Descript'>详细地址</div>
                <div className='EditWarehouseDialog_content_third'>
                  <TextField
                    style={{ width: '37.5rem' }}
                    id={'SZDZ'}
                    onChange={this.textFieldChanged()}
                    defaultValue={this.state.CKB.SZDZ}
                    hintText={this.state.CKB.SZDZ !== '' ? '' : '请输入或定位详细地址'}
                  />
                </div>
              </div>
              <div className='EditWarehouseDialog_content'>
                <div
                  className='EditWarehouseDialog_icon'
                  style={{ background: 'url(/warehouseGeneralIcon/storageDescription.png) no-repeat' }}
                />
                <div className='EditWarehouseDialog_Descript'>描述</div>
                <div className='EditWarehouseDialog_content_third'>
                  <TextField
                    style={{ width: '37.5rem' }}
                    id={'CKMS'}
                    onChange={this.textFieldChanged()}
                    defaultValue={this.props.isEditSubWarehouse ? this.props.CurrentCKObj.CKMS : ''}
                    hintText={this.props.isEditSubWarehouse ? '请输入子仓库描述' : '请输入仓库描述'}
                  />
                </div>
              </div>
              <div style={{ height: '2.1rem', width: '100%', marginTop: '2rem', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', background: 'url(/warehouseGeneralIcon/geography.png) no-repeat' }} />
                <div className='EditWarehouseDialog_Descript'>地理信息</div>
              </div>
              <div style={{ marginLeft: '1.2rem', marginTop: '2rem' }}>
                <BdMap
                  mouseScale={false} scale={14} marker={[
                    { point: { lat: _.has(this.state.CKB, 'WD') ? this.state.CKB.WD : null,
                      lng: _.has(this.state.CKB, 'JD') ? this.state.CKB.JD : null },
                      selected: true },
                  ]} id='location' ref='location' style={{ width: '55rem', height: '17.3rem' }}
                  onSelect={this.onSelect}
                  centerMarker={!this.props.isEditSubWarehouse}
                />
              </div>
            </div>
            <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleCloseError} />
          </Dialog>
        </div>
      );
    } else {
      return (<div />);
    }
  }
}
