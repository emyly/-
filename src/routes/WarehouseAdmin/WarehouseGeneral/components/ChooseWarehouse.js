/**
 * Created by chenming on 2016/12/1.
 */
import React, { Component, PropTypes } from 'react';
import EditWarehouseDialog from 'components/EditWarehouseDialog'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import EditLocationStorageDialog from 'components/EditLocationStorageDialog'
import _ from 'lodash';
import ErrorSnackBar from 'components/SnackBar/WarningSnackBar';
import PageGrid from '../../../../components/PageGrid';
import IconMenu from 'material-ui/IconMenu';
import './ChooseWarehouse.scss'
import GoodsSearchIndex from 'components/GoodsSearch'
import moment from 'moment'
// import ChangeReceiveAddress from './ChangeReceiveAddress'
import ChooseReceiveAddress from './ChooseReceiveAddress'
/**
 * 仓库概况
 * */
export default class ChooseWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 选择显示仓库界面还是商品界面
      isShowWarehouseView: true,
      // 仓库库位数组
      boxesData: [],
      // 仓库路径数组 存放仓库对象或者库位对象
      WareHousePath: [{ GUID: 0, CKMC: '仓库概况', isWareHouse: true }],
      // 仓库ID
      CKIDArray: [0],
      // 点击的是否为仓库
      isClickWarehouse: true,
      // 新建按钮下拉框
      isPopOverOpen: false,
      // 当前在仓库还是库位下
      isInWarehouse: false,
      // 点击当前仓库ID
      currentWarehouseID: 0,
      // 被点击的仓库对象
      selectedCKObj: null,
      // 被点击的库位对象
      selectedLocationStorageObj: null,
      // 当前仓库对象(用于仓库创建)
      currentWarehouseObject: {},
      isOpenWarehouse: false,
      isOpenLocationStorage: false,
      message: '',
      openError: false,
      // 判断是编辑仓库还是创建仓库
      isEditWarehouse: false,
      // 判断是编辑库位还是创建库位
      isEditLocationStorage: false,
      // 点击编辑库位的KW对象
      locationStorageKWObject: {},
      // 商品列表页数组
      productionDataArray: [],
      // 修改默认收发货地址
      isChangeAddress: false,
      // 修改收货还是发货
      isChangeReceiveAddress: false,
      // 是否打开选择物流地址
      isOpenChooseAddress: false,
      chooseValue: null,
      // 商品列表参数
      productionListParams: {},

    }
  }
  static propTypes = {
    // 外部引用props
    chooseWarehouseData: PropTypes.object,
    getSingleLocationWarehouseProduction: PropTypes.func,
    patchForbidAndUseWarehouse: PropTypes.func,
    getSingleWareHouseChildData: PropTypes.func,
    getSingleLocationChildData: PropTypes.func,
    patchForbidAndUseWarehouseInit: PropTypes.func,
    chooseGoodsStoreDialog: PropTypes.object,
    initEditLocationStoragelData: PropTypes.func,
    putEidtLocationStorageData: PropTypes.func
  }
  getTableData =() => ({
    columnOptions: [
      {
        label: '品牌',
        attr: 'SPPPMC',
        render: row => (<div>
          {row.SPPPMC || '-'}
        </div>),
        style: { textAlign: 'center' }
      },
      {
        label: '商品编号',
        attr: 'SPBH',
        style: { textAlign: 'center', }
      }, {
        label: '商品名称',
        attr: 'SPMC',
        style: { textAlign: 'center' }
      },
      {
        label: '批号',
        attr: 'SPPH',
        style: { textAlign: 'center' }
      }, {
        label: '商品描述',
        attr: 'SPMS',
        style: { textAlign: 'center' }
      }, {
        label: '效期',
        attr: 'YXQZ',
        formater: (time) => {
          const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
          return date;
        },
        style: { textAlign: 'center' }
      }, {
        label: '生产日期',
        attr: 'SCRQ',
        formater: (time) => {
          const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
          return date;
        },
        style: { textAlign: 'center' }
      }, {
        label: '数量',
        attr: 'SL',
        style: { textAlign: 'center' }
      }
    ],
    TableHeaderStyle: {
      backgroundColor: 'transparent'
    },
    dataSource: this.props.chooseWarehouseData.singleLocationWarehouseProductionData.Result.SPCCB || [],
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false,
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    showIndex: true,
    pagination: {
      currentPage: this.props.chooseWarehouseData.currentPage || 1,
      totalCount: this.props.chooseWarehouseData.singleLocationWarehouseProductionData.Result.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        let params;
        if (!_.has(this.state.productionListParams, 'KWID')) {
          params = { page, params: { KWID: this.state.currentWarehouseObject.GUID, body: {} } }
        } else {
          params = { page, params: this.state.productionListParams }
        }
        this.props.getSingleLocationWarehouseProduction(params);
      }
    }
  })
  /**
   * 点击仓库编辑按钮
   * */
  handleButtonEditClick = value => (event) => {
    event.stopPropagation();
    if (value.ZTBS === 'E') {
      if (value.isWareHouse) {
        this.setState({ isEditWarehouse: true, selectedCKObj: value, currentWarehouseID: value.GUID, isOpenWarehouse: true });
      } else {
        this.setState({
          locationStorageKWObject: value,
          selectedLocationStorageObj: value,
          isOpenLocationStorage: true,
          isEditLocationStorage: true });
      }
    }
  }
  /**
   * 更改仓库/库位状态
   * */
  handleClickChangeWarehouseStatus = value => (event) => {
    event.stopPropagation();
    if (value.FJCKID !== 0) {
      if (value.isWareHouse ? value.MRCK !== 0 : value.MRKW !== 0) {
        const params = { body: { SFJY: value.ZTBS === 'E' ? 1 : 0 }, CKID: value.GUID, CKKW: value.isWareHouse ? 'CKB' : 'KWB' };
        this.props.patchForbidAndUseWarehouse(params);
      }
    }
  }
  /**
   * 点击仓库按钮
   * */
  handleClickWarehouse = e => () => {
    if (e.ZTBS === 'D') {
      return;
    }
    const warehousePathArray = this.state.WareHousePath;
      // 查找是否存在已有路径
    const index = _.findIndex(this.state.WareHousePath, value => (value.GUID === e.GUID && (e.isWareHouse ?
      value.CKMC === e.CKMC : value.KWMC === e.KWMC)));
    if (index !== -1) {
      warehousePathArray.splice(index + 1, warehousePathArray.length - index - 1);
    } else {
      warehousePathArray.push(e);
    }
    this.setState({ currentWarehouseObject: e, isShowWarehouseView: true, CKID: e.GUID, WareHousePath: warehousePathArray });
    const CKIDArray = this.state.CKIDArray;
    CKIDArray.push(e);
    if (e.isWareHouse) {
      this.props.getSingleWareHouseChildData(e.GUID);
    } else {
      this.props.getSingleLocationChildData(e.GUID);
    }
    this.setState({ CKIDArray });
    if (this.state.isShowWarehouseView) {
      this.props.patchForbidAndUseWarehouseInit();
    }
  }
  handleClose = () => {
    this.setState({ isChangeAddress: false, isOpenLocationStorage: false, isPopOverOpen: false, isOpenWarehouse: false, openError: false });
    this.reloadCurrentPage();
  }
  handleAddressAdminClose = () => {
    this.setState({ isOpenChooseAddress: false });
    this.reloadCurrentPage();
  }
  componentWillMount = () => {
    this.setState({ isShowWarehouseView: true });
    this.props.getSingleWareHouseChildData(this.state.CKIDArray[this.state.CKIDArray.length - 1]);
  }
  /**
   * 刷新当前页面
   * */
  reloadCurrentPage = () => {
    // if (this.state.isShowWarehouseView) {
    // this.props.getSingleWareHouseChildData(this.state.WareHousePath[this.state.WareHousePath.length-1].GUID);
    // }else{
    // this.setState({isShowWarehouseView:true});
    // this.props.getSingleWareHouseChildData(this.state.WareHousePath[this.state.WareHousePath.length-1].GUID);
    // }
    this.setState({ isShowWarehouseView: true });
    if (this.state.WareHousePath[this.state.WareHousePath.length - 1].isWareHouse) {
      this.props.getSingleWareHouseChildData(this.state.WareHousePath[this.state.WareHousePath.length - 1].GUID);
    } else {
      this.props.getSingleLocationChildData(this.state.WareHousePath[this.state.WareHousePath.length - 1].GUID);
    }
  }
  /**
   * 打开新建downDrop
   * */
  handleClickOpenDownDrop = () => {
    this.setState({ isPopOverOpen: true, anchorEl: event.currentTarget });
  }
  /**
   * 新建仓库/库位(za)
   * */
  handleClickCreatWarehouse = (event, value) => {
    if (this.state.isInWarehouse) {
      if (value === '1') {
        this.setState({ isEditWarehouse: false, isOpenWarehouse: true });
      }
    } else if (value === '1') {
      this.setState({ isOpenLocationStorage: true, isEditLocationStorage: false });
    }
    this.setState({ isPopOverOpen: false });
  }
  handleClickCreateWarehouseInEnd = (event, value) => {
    if (this.state.isInWarehouse) {
      switch (value) {
        case '1':
          this.setState({ isEditWarehouse: false, isOpenWarehouse: true });
          break;
        case '2':
          this.setState({ isOpenLocationStorage: true, isEditLocationStorage: false });
          break;
        case '3':
          break;
        default:
          break;
      }
    } else {
      switch (value) {
        case '1':
          this.setState({ isOpenLocationStorage: true, isEditLocationStorage: false });
          break;
        case '2':
          break;
        default:
          break;
      }
    }
    this.setState({ isPopOverOpen: false });
  }
  /**
   * 切换预配套
  **/
  handleClickWarehouseSwitchYPT = value => (event) => {
    event.stopPropagation();
    const params = {KWB: {
      YPTKW: value.YPTKW === '0' ? '1' : '0',
      KWMS: value.KWMS,
      KWMC: value.KWMC },
      KWID: value.GUID };
    this.props.putEidtLocationStorageData(params);
  }
  /**
   * 显示仓库Box
  */
  renderWarehouse = (value, index) => {
    return (
      <div
        key={`ChooseWareHouse${index}`}
        onClick={this.handleClickWarehouse(value)}
        style={{ cursor: value.ZTBS === 'E' ? 'pointer' : 'default' }}
        className='warehouseGeneral_warehouse'
      >
        <div
          style={{ background: value.ZTBS === 'E' ? value.isWareHouse === true ? '#364354' : '#A6ACE2' : '#919191' }}
          className='warehouseGeneral_warehouse_header'
        >
          <div>
            <img
              alt=""
              className='warehouseGeneral_warehouse_header_WarehouseIcon'
              src={value.isWareHouse ? '/warehouseGeneralIcon/warehouse.png' : '/warehouseGeneralIcon/locationStorage.png'}
            />
          </div>
          <div className='warehouseGeneral_warehouse_header_title'>{value.isWareHouse === true ? value.CKMC : value.KWMC}</div>
        </div>
        <div className='warehouseGeneral_warehouse_bottom'>
          <div>
            <div style={{ marginLeft: '2.1rem', marginTop: '4.3rem', fontSize: '11px' }}>
              <span>收货地址:</span>
              <span onClick={this.handleChangeReceiveAddress({ CKB: value, isReceiveAddress: 0 })}>{value.SHDZ || '暂无收货地址'}</span>
            </div>
            <div style={{ marginLeft: '2.1rem', marginTop: '1rem', fontSize: '11px' }}>
              <span>发货地址:</span>
              <span onClick={this.handleChangeReceiveAddress({ CKB: value, isReceiveAddress: 1 })}>{value.FHDZ || '暂无发货地址'}</span>
            </div>
          </div>
        </div>
        <div onClick={this.handleClickChangeWarehouseStatus(value)} className='warehouseGeneral_warehouse_bottom_forbid' >
          {
              (() => {
                if (((_.has(value, 'MRCK') && value.MRCK !== '1') || (_.has(value, 'MRKW') && value.MRKW !== '1')) && value.FJCKID !== 0) {
                  return (
                    <div
                      style={{ width: '2.4rem',
                        height: '1.4rem',
                        background: `url(/warehouseGeneralIcon/${value.ZTBS === 'D' ?
                          'SwitchOff.png' : 'SwitchOn.png'}) 0% 0% / 100% 100% no-repeat` }}
                    />
                  );
                } else {
                  return (
                    <div style={{ width: '2.4rem', height: '1.4rem' }} />
                  );
                }
              })()
            }
          <div style={{ width: '4.5rem', height: '1.4rem', marginRight: '0', fontSize: '14px', lineHeight: '1.4rem', textAlign: 'left' }}>
            {value.FJCKID === 0 ? '' : value.MRCK === '1' ?
              '' : value.ZTBS === 'E' ? '已启用' : '已禁用'}
          </div>
        </div>
        <div onClick={this.handleButtonEditClick(value)} >
          <img
            alt=''
            className='warehouseGeneral_warehouse_edit'
            src={value.ZTBS === 'E' ? '/warehouseGeneralIcon/editIcon.png' : '/warehouseGeneralIcon/editDisable.png'}
          />
        </div>
      </div>
    );
  }
  /**
   * 显示库位Box
  */
  renderLocalStorage = (value, index) => {
    return (
      <div
        key={`ChooseWareHouse${index}`}
        onClick={this.handleClickWarehouse(value)}
        style={{ cursor: value.ZTBS === 'E' ? 'pointer' : 'default' }}
        className='warehouseGeneral_locationStorage'
      >
        <div
          style={{ background: value.ZTBS === 'E' ? value.isWareHouse === true ? '#364354' : '#A6ACE2' : '#919191' }}
          className='warehouseGeneral_locationStorage_header'
        >
          <div >
            <img
              alt=''
              style={{ marginBottom: '1rem' }}
              className='warehouseGeneral_locationStorage_header_WarehouseIcon'
              src={value.isWareHouse ? '/warehouseGeneralIcon/warehouse.png' : '/warehouseGeneralIcon/locationStorage.png'}
            />
          </div>
          <div className='warehouseGeneral_locationStorage_header_title'>{value.isWareHouse === true ? value.CKMC : value.KWMC}</div>
        </div>
        <div className='warehouseGeneral_locationStorage_bottom'>
          <div>
            <div style={{ marginLeft: '2.1rem', marginTop: '4.3rem', fontSize: '11px' }}>
              <span>商品种类:</span>
              <span>{value.SPZS || 0}</span>
            </div>
            <div style={{ marginLeft: '2.1rem', marginTop: '1rem', fontSize: '11px' }}>
              <span>商品数量:</span>
              <span>{value.KCSL || 0}</span>
            </div>
          </div>
        </div>
        <div className='warehouseGeneral_storageWarehouse_bottom_forbid' >
          <div style={{ display: 'flex', flexDirection: 'row' }} onClick={this.handleClickWarehouseSwitchYPT(value)}>
            <div
              style={{
                width: '2.4rem',
                height: '1.4rem',
                background: `url(/warehouseGeneralIcon/${value.YPTKW === '0' ?
                  'SwitchOff.png' : 'SwitchOn.png'}) 0% 0% / 100% 100% no-repeat` }}
            />
            <span style={{ width: '4.5rem', height: '1.4rem', marginRight: '0', fontSize: '14px', lineHeight: '1.4rem', textAlign: 'left' }}>
              预配套
            </span>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', paddingTop: '1rem' }}
            onClick={this.handleClickChangeWarehouseStatus(value)}
          >
            {
              (() => {
                if (((_.has(value, 'MRCK') && value.MRCK !== '1') || (_.has(value, 'MRKW') && value.MRKW !== '1')) && value.FJCKID !== 0) {
                  return (
                    <div
                      style={{
                        width: '2.4rem',
                        height: '1.4rem',
                        background: `url(/warehouseGeneralIcon/${value.ZTBS === 'D' ?
                        'SwitchOff.png' : 'SwitchOn.png'}) 0% 0% / 100% 100% no-repeat` }}
                    />
                  );
                } else {
                  return (
                    <div style={{ width: '2.4rem', height: '1.4rem' }} />
                  );
                }
              })()
            }
            <span style={{ width: '4.5rem', height: '1.4rem', marginRight: '0', fontSize: '14px', lineHeight: '1.4rem', textAlign: 'left' }}>
              {value.MRKW === '1' ? '' : value.ZTBS === 'E' ? '已启用' : '已禁用'}
            </span>
          </div>
        </div>
        <div onClick={this.handleButtonEditClick(value)} >
          <img
            alt=''
            className='warehouseGeneral_locationStorage_edit'
            src={value.ZTBS === 'E' ? '/warehouseGeneralIcon/editIcon.png' : '/warehouseGeneralIcon/editDisable.png'}
          />
        </div>
      </div>
    );
  }
  /**
   * 仓库/库位
   * */
  showWarehouse = () => {
    if (this.props.chooseGoodsStoreDialog.BoxesData.length !== 0) {
      return this.state.boxesData.map((value, index) => {
        if (value.isWareHouse) {
          return this.renderWarehouse(value, index)
        } else {
          return this.renderLocalStorage(value, index)
        }
      })
    } else {
      return (
        <div />
      );
    }
  }
  /**
   * 仓库选择
   * */
  chooseWarehouse = () => (
    <div style={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
      {
          this.showWarehouse()
        }
    </div>
    )
  /**
   * 获取筛选条件结果
   * */
  getFilterResult = (e) => {
    const productionListparams = { KWID: this.state.currentWarehouseObject.GUID, body: { SPFLID: e.SPFLID, SL: 1, WQ: e.WQ, BZ: e.BZ } };
    const params = { page: 1, params: productionListparams };
    this.props.getSingleLocationWarehouseProduction(params);
    this.setState({ productionListParams: productionListparams, isShowWarehouseView: false });
  }
  /**
   * 商品列表页面
   * */
  chooseProduction = () => {
    if (!_.has(this.props.chooseWarehouseData.singleLocationWarehouseProductionData, 'Result')) {
      const productionListparams = { KWID: this.state.currentWarehouseObject.GUID, body: {} };
      const params = { page: 1, params: productionListparams };
      this.props.getSingleLocationWarehouseProduction(params);
    }
    if (this.state.productionDataArray.length !== 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <GoodsSearchIndex callback={this.getFilterResult} filters={['lobBrandThreeType', 'property', 'pack', 'expireDate']} />
          <div>
            {
              (() => {
                if (_.has(this.props.chooseWarehouseData.singleLocationWarehouseProductionData, 'Result')) {
                  return (<PageGrid options={this.getTableData()} />);
                }
              })()
            }
          </div>
        </div>
      );
    } else {
      return (<div>暂无数据。。。</div>);
    }
  }
  componentWillReceiveProps = (nextValue) => {
    if (!_.isEmpty(nextValue.editLocationStorageDialog.editLocationStorageData)) {
      this.props.initEditLocationStoragelData();
      this.reloadCurrentPage();
    }
    if (nextValue.chooseGoodsStoreDialog.BoxesData.length === 0 && nextValue.chooseGoodsStoreDialog.goodsDataSource.length !== 0) {
      this.setState({ isShowWarehouseView: true });
    }
    if (nextValue.chooseGoodsStoreDialog.goodsDataSource) {
      this.setState({ productionDataArray: nextValue.chooseGoodsStoreDialog.goodsDataSource });
    }
    if (_.has(nextValue.chooseWarehouseData.error, 'response')) {
      this.setState({ message: nextValue.chooseWarehouseData.error.response.Message, openError: true });
      this.props.patchForbidAndUseWarehouseInit();
    }
    if (nextValue.chooseWarehouseData.forbidAndUseData) {
      if (nextValue.chooseWarehouseData.forbidAndUseData.Code === 0) {
        this.reloadCurrentPage();
      }
      this.props.chooseWarehouseData.forbidAndUseData = null;
    }
    if (nextValue.chooseGoodsStoreDialog.BoxesData) {
      if (nextValue.chooseGoodsStoreDialog.BoxesData.length === 0) {
        this.setState({ isShowWarehouseView: false });
      }
      if (nextValue.chooseGoodsStoreDialog.BoxesData.length !== 0) {
        this.setState({isShowWarehouseView: true, isInWarehouse: nextValue.chooseGoodsStoreDialog.BoxesData[0].isWareHouse });
      }
      this.setState({ boxesData: nextValue.chooseGoodsStoreDialog.BoxesData });
    }
  }
  /**
   * 新建按钮 在仓库和库位层显示新建按钮
   * */
  createNewStorage = () => {
    if (this.state.productionDataArray.length === 0) {
      if (!this.state.isShowWarehouseView) {
        return (
          <div className='warehouseGeneral_header_createWarehousebtn'>
            <IconMenu
              iconButtonElement={
                <RaisedButton
                  style={{ color: '#41A0FF', background: '#41A0FF' }}
                  label='新建'
                  onTouchTap={this.handleClickOpenDownDrop}
                />}
              onChange={this.handleClickCreateWarehouseInEnd}
              value={this.state.chooseValue}
            >
              <MenuItem value='1' primaryText={this.state.isInWarehouse ? '新建子仓库' : '新建库位'} />
              {
                (() => {
                  if (this.state.isInWarehouse) {
                    return (
                      <MenuItem value='2' primaryText='新建库位' />
                    );
                  }
                })()
              }
              <MenuItem value='3' primaryText='取消' />
            </IconMenu>
          </div>
        );
      } else {
        return (
          <div className='warehouseGeneral_header_createWarehousebtn'>
            <IconMenu
              iconButtonElement={
                <RaisedButton
                  style={{ color: '#41A0FF', background: '#41A0FF' }}
                  label='新建'
                  onTouchTap={this.handleClickOpenDownDrop}
                />}
              onChange={this.handleClickCreatWarehouse}
              value={this.state.chooseValue}
            >
              <MenuItem value='1' primaryText={this.state.isInWarehouse ? '新建子仓库' : '新建库位'} />
              <MenuItem value='2' primaryText='取消' />
            </IconMenu>
          </div>
        );
      }
    }
  }
  /**
   * 修改默认收发货地址
   * */
  handleChangeReceiveAddress = value => (event) => {
    event.stopPropagation();
    if (value.CKB.isWareHouse) {
      this.setState({ isEditWarehouse: true, locationStorageKWObject: value.CKB, currentWarehouseID: value.CKB.GUID });
    } else {
      this.setState({ locationStorageKWObject: value.CKB });
    }
      // 判断收发货
    if (value.isReceiveAddress === 0) {
        // 判断是否已经SHDZ
      if (value.CKB.SHDZ === '') {
        this.setState({ isOpenChooseAddress: true, isChangeReceiveAddress: true });
      } else {
        this.setState({ isOpenChooseAddress: true, isChangeReceiveAddress: true });
      }
    } else if (value.CKB.FHDZ === '') {// 判断是否有发货地址
      this.setState({ isOpenChooseAddress: true, isChangeReceiveAddress: false });
    } else {
      this.setState({ isOpenChooseAddress: true, isChangeReceiveAddress: false });
    }
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <div className='warehouseGeneral_header'>
          <div className='warehouseGeneral_header_warehousePath'>
            {
              this.state.WareHousePath.map((value, index) => <a
                key={`warehousePath${index}`} style={{ cursor: 'pointer' }}
                onClick={this.handleClickWarehouse(value)}
              >{`${index > 0 ? '>' : ''}${value.isWareHouse ? value.CKMC : value.KWMC}`}</a>)
            }
          </div>
          {
            this.createNewStorage()
          }
        </div>
        {
          this.state.isShowWarehouseView ? this.chooseWarehouse() : this.chooseProduction()
        }
        <div style={{ height: '0', display: 'none' }}>
          <EditLocationStorageDialog
            CurrentKWObj={this.state.selectedLocationStorageObj || {}}
            KWID={this.state.locationStorageKWObject.GUID || 0}
            KWB={this.state.WareHousePath[this.state.WareHousePath.length - 1]}
            isEditSubLocationStorage={this.state.isEditLocationStorage}
            closeCallBack={this.handleClose}
            open={this.state.isOpenLocationStorage}
          />
          <EditWarehouseDialog
            CurrentCKObj={this.state.selectedCKObj}
            CKObject={this.state.currentWarehouseObject}
            isEditSubWarehouse={this.state.isEditWarehouse}
            open={this.state.isOpenWarehouse}
            CKID={this.state.currentWarehouseID}
            closeCallBack={this.handleClose}
          />
          <ChooseReceiveAddress
            CKID={this.state.currentWarehouseID}
            CKObject={this.state.currentWarehouseObject}
            isReceiveAddress={this.state.isChangeReceiveAddress}
            open={this.state.isOpenChooseAddress}
            closeCallBack={this.handleAddressAdminClose}
          />
        </div>
        <div style={{ height: 1 }}>
          <ErrorSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleClose} />
        </div>
      </div>
    );
  }
}

