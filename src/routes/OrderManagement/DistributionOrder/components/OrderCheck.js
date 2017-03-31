/**
 * Created by qyf on 2017/3/14.
 */

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import DataGrid from 'components/DataGrid'
import TextField from 'material-ui/TextField'
import ChooseGoodsAuthDialog from 'components/ChooseGoodsAuthDialog'
import CardUI from 'components/StandardUI/StandardCard'
import GoBackButton from 'components/GoBackButton'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import DialogDepotSelect from 'components/DepotSelectDialog';
import Location from 'components/Location'
import EditCell from 'components/EditCell'
import _ from 'lodash'
import './DistributtonOrder.scss';
import DateTimePicker from 'components/DateTimePicker';
import AppBar from 'material-ui/AppBar';
import SelectDropMenu from 'components/SelectDropMenu';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import Immutable from 'immutable';
import StandardDataGrid from 'components/StandardDataGrid';

export default class OrderCheck extends Component {

  constructor(props) {
    super(props);

    this.contract_type = 0;
    this.authorize = false;
    this.valid = true;
    this.distribution = true

    this.state = {
      organizationId: Number(this.props.globalStore.organizationId),
      atSelect: [],
      atMessage: '',
      distriButionAddress: '',
      isSelectAdress: false,
      operateId: '',
      saleManage: '',
      operatePart: '',
      doctorManage: '',
      sendTime: '',
      lobId: 0,
      operateTemplate: 0,
      addProductionDialogOpen: false,
      chooseAddrDialogOpen: false,
      temptAddress: '', // 暂存用户选中的地址，点击确定后根据该值获取receiveAddress
      manageAddrDialogOpen: false,
      LXSJ: '', // 联系人手机
      supplier: '',
      contracts: {},
      supplierId: '',
      brandId: 0,
      type: '""',
      storageDataSource: [],       // 暂存购物车商品数据
      operateName: '',
      operateIntoRoad: '',
      verify: false,
      brandName: '',
      lobName: '',
      dataSource: [], // 过滤后的商品
      templetsProductionList: [],
      authorizeString: '',
      contractsString: '',
      messageDialogOpen: false,
      messageDialogMessage: '',
      searchText: '',              // 用户输入的搜索条件
      isChoosegoodShow: false, // 购物车是否高亮
      isSearch: false,             // 是否显示搜索框

    }
    this.submitData = [];
    this.templetProductionNumber = {};
  }

  /* 失败信息提示*/
  handleRequestClose = () => {
    this.setState({
      messageDialogOpen: !this.state.messageDialogOpen
    });
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    getDistriButionOrganization: PropTypes.func,
    globalStore: PropTypes.object,
    initStore: PropTypes.func,
    chooseGoodsInitStore: PropTypes.func,
    getDisSearchContracts: PropTypes.func,
    getDistriButionAddress: PropTypes.func,
    getDisSearchContractsrGanization_id: PropTypes.func,
    disorderCheck: PropTypes.object,
    submitDistriButionOrder: PropTypes.func,
    setChoosedAuthGood: PropTypes.func,
    setChoosedAuthGoods: PropTypes.func,
    failStore: PropTypes.func,
  }
  /**
   * 字符串模糊匹配
   */
  isSearchGoodsInfoLike = (value) => {
    return (String(value.no).indexOf(this.state.searchText) !== -1) ||
      (value.name.indexOf(this.state.searchText) !== -1) ||
      (value.desc.indexOf(this.state.searchText) !== -1);
  }
  handleSearchGoods = () => {
    const newDataSource = [];
    this.state.storageDataSource.map((value) => {
      if (this.isSearchGoodsInfoLike(value)) {
        newDataSource.push(value);
      }
    })
    this.setState({
      dataSource: newDataSource
    })
  }
  componentWillMount() {
    this.props.getDistriButionOrganization(this.contract_type, this.props.globalStore.organizationId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.disorderCheck.authorizations && nextProps.disorderCheck.authorizations.length > 0) {
      this.setState({
        brandName: nextProps.disorderCheck.authorizations[0].brand_name,
        lobName: nextProps.disorderCheck.authorizations[0].business_line_name,
        brandId: nextProps.disorderCheck.authorizations[0].brand_id,
        lobId: nextProps.disorderCheck.authorizations[0].business_line_id
      })
    }
    /* 初始化地址*/
    if (nextProps.disorderCheck.distriButionAddress && nextProps.disorderCheck.distriButionAddress.length > 0) {
      this.setState({
        distriButionAddress: nextProps.disorderCheck.distriButionAddress[0],
        LXSJ: nextProps.disorderCheck.distriButionAddress[0].LXSJ,
        isSelectAdress: true
      })
    }
    if (this.state.templetsProductionList.length || nextProps.setChoosedAuthGoods.choosedGoods.length) {
      const goodsArray = this.state.operateTemplate ? this.state.templetsProductionList : nextProps.setChoosedAuthGoods.choosedGoods;
      const storageDataSource = goodsArray;
      this.state.storageDataSource = _.cloneDeep(storageDataSource);
      this.state.dataSource = _.cloneDeep(storageDataSource);
      this.setState({
        storageDataSource: this.state.storageDataSource,
        dataSource: this.state.dataSource
      })
      if (this.state.searchText !== '') {
        this.handleSearchGoods();
      }
    }
    if (nextProps.setChoosedAuthGoods.choosedGoods.length) {
      this.submitData = nextProps.setChoosedAuthGoods.choosedGoods;
      this.setState({ dataSource: nextProps.setChoosedAuthGoods.choosedGoods })
    }
    if (nextProps.disorderCheck.PHDDB.GUID) {
      this.setState({
        messageDialogOpen: true,
        messageDialogMessage: `已创建订单：${nextProps.disorderCheck.PHDDB.GUID}`
      });
      this.handleTitleAction();
      this.props.initStore();
      this.props.chooseGoodsInitStore();
      this.setState({
        storageDataSource: [],
        dataSource: [],
        brandName: '',
        lobName: '',
      })
    }
  }
  cleanStore =() => {
    this.props.failStore();
    this.props.chooseGoodsInitStore();
    this.props.getDisSearchContractsrGanization_id()
    this.setState({
      storageDataSource: [],
      dataSource: [],
      brandName: '',
      lobName: '',
    })
  }
  componentWillUnmount() {
    this.cleanStore()
  }
  chooseAddrDialogClose = () => {
    this.setState({ chooseAddrDialogOpen: false })
  }
  chooseAddrDialogSure = () => {
    this.setState({
      LXSJ: JSON.parse(this.state.temptAddress).LXSJ,
      distriButionAddress: JSON.parse(this.state.temptAddress),
      DZ: `${JSON.parse(this.state.temptAddress).CKMC}:${JSON.parse(this.state.temptAddress).DZ}`
    })
    this.setState({
      chooseAddrDialogOpen: false,
      isSelectAdress: true
    })
  }
  manageAddrDialogClose = () => {
    this.setState({ manageAddrDialogOpen: false })
  }
  AtSelectFocus=() => {
    document.getElementById('TextField').focus();
  }
  OrderAtFocus=() => {
    document.getElementById('OrderAtTextField').focus();
  }  /* 选择地址关闭按钮*/
  chooseAddrDialog = () => {
    this.setState({ chooseAddrDialogOpen: true })
    // if(this.props.createOrder.receiveAddress.length > 0){
    //   this.setState({chooseAddrDialogOpen:true})
    // }
  }
  /* 截止配送时间*/
  sendTimeCallBack = (date) => {
    this.setState({
      sendTime: date
    })
  }
  /* 供应商*/
  handleSupplierChange =(event, index, value) => {
    this.setState({
      supplierId: value.id,
      supplierName: value.name,
      sendTime: '',
      authorizeString: JSON.stringify(value),
    })
    this.props.getDisSearchContracts(this.contract_type, this.authorize, value.id, this.valid, this.distribution)
    this.props.getDistriButionAddress(this.props.globalStore.organizationId);
  }
  /* 合同*/
  handleDistriContractsChange=(event, index, value) => {
    this.setState({
      contractsString: JSON.stringify(value),
      contracts: value,
      isChoosegoodShow: true,
    })
    this.props.getDisSearchContractsrGanization_id(value.id)
  }
  /* 业务线*/
  handleLOBSelectCallback =(value, name) => {
    if (this.state.lobId !== Number(value)) {
      this.setState({
        brandId: 0,
        type: '""',
        operateTemplate: '',
        storageDataSource: [],       // 暂存购物车商品数据
        dataSource: [],         // 过滤后的购物车商品数据
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
      })
      /* this.dataSource = [];
      this.props.brandSelectInitStore();
      this.props.initStoreCreateOrderTypes();
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();*/
    }
    this.setState({ lobId: Number(value), lobName: name })
  }
  setAddress =(address, index) => (event) => {
    const addressWrapperArr = document.querySelectorAll('.addressWrapper');
    for (let i = 0; i < addressWrapperArr.length; i++) {
      addressWrapperArr[i].classList.remove('activeAddressWrapper');
    }
    addressWrapperArr[index].classList.add('activeAddressWrapper');
    this.setState({ temptAddress: address })
  }

  /* 分销商*/
  renderSupplier() {
    const items = this.props.disorderCheck.authorizeOrganizations.map(value => ({ id: value.id, name: value.name }));
    return (
      <SelectDropMenu
        title={'供应商'}
        items={items}
        isShowError={this.state.verify && !this.validator('renderSupplier')}
        onChange={this.handleSupplierChange}
        isClear={!this.state.authorizeString}
      />
    )
  }
  /* 合同*/
  renderContract() {
    const items = this.props.disorderCheck.contractsList.map(value => ({ id: value._id, name: value.authorize_organization_name }));
    return (
      <SelectDropMenu
        title={'合同'}
        items={items}
        isShowError={this.state.verify && !this.validator('renderContract')}
        onChange={this.handleDistriContractsChange}
        isClear={!this.state.contractsString}
      />
    )
  }
  /**
   * 要求送货时间
   */
  renderSendTime() {
    return (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <img src='/CreateOrder/DeliveryTimeRequired.png' alt='' style={{ width: '40px', height: '40px' }} />
        <DateTimePicker
          hintText='配送截止时间'
          underlineShow={false}
          isClear={this.state.sendTime === ''}
          callback={this.sendTimeCallBack}
          TextFieldStyle={{ height: '44px', paddingLeft: '15px', width: 'auto' }}
          hintStyle={{ lineheight: '44px',
            width: 'inherit',
            color: this.state.verify && !this.validator('renderSendTime') ? 'red' : '#979797',
            fontSize: '14px' }}
        />
      </div>
    )
  }
  /**
   * 送货联系人及地址
   */
  renderAddress() {
    return (
      <div onClick={this.chooseAddrDialog} style={{ height: 'auto', marginTop: -4, position: 'relative' }}>
        <div
          className='atMessage__create'
          style={{ cursor: 'pointer',
            zIndex: 99,
            display: this.state.isSelectAdress === true ? 'none' : 'block',
            border: this.state.verify && !this.validator('renderSupplier') ? '1px solid red' : 'none' }}
        >
          <div className='createHintText'>
            <img src='/CreateOrder/Group 10.png' alt='' />
            <div style={{ textAlign: 'center' }}>选择收货地址及联系人</div>
          </div>
        </div>
        <div className='atMessage__create address' style={{ display: this.state.isSelectAdress === true ? 'block' : 'none' }}>
          <div className='createAddress'>
            <div className='creat__DZ'>
              <span className='logWidth log__DZ'>收货地址：</span>
              <span className='logisAddress'>{this.state.distriButionAddress.CKMC}<br />{this.state.distriButionAddress.DZ}</span>
            </div>
            <div className='creat__DZIphone'>
              <span className='logWidth log__DZ'>联系人：</span>
              <span className='logPersonName'>{this.state.distriButionAddress.LXR}<br />{this.state.LXSJ}</span>
            </div>
          </div>
          <div className='addressIcon'>〉</div>
        </div>
      </div>
    )
  }
  renderAppBar() {
    return (
      <AppBar
        title={'添加更多其他商品'}
        iconElementLeft={<img
          src='/CreateOrder/AddMoreGoods.png'
          alt='' style={{ paddingTop: (!!this.state.operateTemplate || !this.state.hospital) ? '0px' : '8px' }}
        />}
        iconElementRight={<img src={'/CreateOrder/RightArrowIcon.png'} alt='' />}
        titleStyle={{ fontFamily: 'SourceHanSansCN-Medium',
          fontSize: '14px',
          color: '#FFFFFF',
          height: '44px',
          lineHeight: '44px' }}
        style={{ height: '44px',
          cursor: (!!this.state.operateTemplate || !this.state.hospital) ? 'inherit' : 'pointer',
          backgroundColor: this.state.isChoosegoodShow === true ? '#00bf9c' : '#d8d8d8' }}
        onTouchTap={this.handleAddProductionDialogOpen}
      />

    )
  }
  handleAtSelectChange =(result) => {
    this.setState({ atSelect: result })
  }

  handleAtMessageChange =(result) => {
    this.setState({ atMessage: result })
  }

  handleAddProductionDialogOpen = () => {
   /* if (!(!!this.state.operateTemplate || !this.state.hospital)) {
      this.setState({ addProductionDialogOpen: true });
    }*/
    this.setState({ addProductionDialogOpen: true })
  }
  /* 地址联系人*/
  validator = (component) => {
    const verify = {
      renderSupplier: !!this.state.authorizeString,
      renderContract: !!this.state.contractsString,
      renderReceiveAddress: !!this.state.distriButionAddress,
      renderSendTime: !!this.state.sendTime,
      LOBSelect: !!this.state.lobId
    }
    return component === 'ALL' ? verify : verify[component];
  }
  /* 添加商品*/
  handleAddProductionDialogClose = () => {
    this.setState({ addProductionDialogOpen: !this.state.addProductionDialogOpen });
  }
  /* 提交*/
  handleDisSubmmitOrder=() => {
    const validatorList = this.validator('ALL');
    const submitData = this.state.storageDataSource;
    for (const va in validatorList) {
      if (!validatorList[va]) {
        this.setState({
          messageDialogOpen: true,
          messageDialogMessage: '订单提交失败,请补全必填信息'
        })
        this.setState({
          verify: true
        })
        return;
      } else if (!submitData.some((production) => {
        if (production.SL) {
          return true;
        }
      })) {
        this.setState({
          messageDialogOpen: true,
          messageDialogMessage: '至少添加一件商品'
        })
        return;
      }
    }
    if (Number(this.state.sendTime) < Number(new Date().getTime())) {
      this.setState({
        messageDialogOpen: true,
        messageDialogMessage: '送货时间早于当前时间'
      })
      return;
    }
    const {
      contracts,
      atMessage,
      atSelect,
      supplierId,
      supplierName,
      brandId,
      brandName,
      orderAtMessage,
      distriButionAddress,
      LXSJ,
      sendTime
      } = this.state;
    this.props.submitDistriButionOrder({
      SHJXSID: supplierId,
      SHJXSMC: supplierName,
      PPID: brandId,
      PPMC: brandName,
      DDMS: orderAtMessage,
      HTID: contracts.id,
      SP: this.submitData.map(o => ({ GUID: o.id, SL: o.SL })),
      TZNR: atMessage,
      BTZR: atSelect.map(o => o.id),
      SHLXRID: distriButionAddress.LXRID,
      SHLXR: distriButionAddress.LXR,
      SHLXRDH: LXSJ,
      SHXZQHID: distriButionAddress.XZQHID,
      SHDZ: `${distriButionAddress.LXR}\n${distriButionAddress.CKMC}`,
      SHDZID: distriButionAddress.GUID,
      RKCKID: distriButionAddress.GLCKID,
      DHRQ: sendTime,
    })
  }
/* 提交之后页面跳转*/
  handleTitleAction =() => {
    this.context.router.push({
      pathname: '/distributionOrder',
    });
  }

  handleCallback = (returnValue) => {
    this.setState({ inventoryName: returnValue.name, inventoryId: returnValue.id });
  };

  handleNumberChange = (row, value) => {
    let $$choosedGoods = Immutable.fromJS(this.props.setChoosedAuthGoods.choosedGoods);
    $$choosedGoods.some(($$production, index) => {
      if ($$production.get('id') === row.id) {
        $$choosedGoods = $$choosedGoods.set(index, $$production.set('SL', Number(value)))
        return true;
      }
    })

    this.props.setChoosedAuthGood($$choosedGoods.toSeq().filter(o => o.get('SL') > 0).toJS());

    this.state.storageDataSource.map((storage) => {
      if (storage.id === row.id) {
        storage.SL = Number(value)
      }
    });
    this.state.storageDataSource.filter(storage => Number(storage.SL) > 0);
    if (!$$choosedGoods.length) {
      this.setState({
        dataSource: []
      })
    }

    this.submitData = $$choosedGoods.toJS();
  }
  /**
   * 购物车单个商品删除焦点问题
   */
  handleInputFocus = (event) => {
    event.target.select();
  }
  /**
   * 搜索框失去焦点
   */
  handleSearchInputBlur = () => {
    if (this.state.searchText === '') {
      this.setState({
        dataSource: this.state.storageDataSource,
        isSearch: false
      })
    }
  }
  /**
   * 一键清空
   */
  ClearShoppingCartGoods = () => {
    this.props.chooseGoodsInitStore();
    this.setState({
      storageDataSource: [],
      dataSource: []
    })
  }
  /**
   * 物料号搜索
   */
  handleIsSearch = () => {
    document.getElementById('textFieldCreateOrder').focus();
    this.setState({
      isSearch: true
    })
  }
  /**
   * 搜索框onChange
   */
  handleSearchInput = (event) => {
    this.state.searchText = event.target.value;
    if (this.state.searchText !== '') {
      this.handleSearchGoods();
    } else {
      this.setState({
        dataSource: this.state.storageDataSource
      })
    }
    this.setState({
      searchText: this.state.searchText
    })
  }
  render() {
    const actions =
      (<nav>
        <GoBackButton /> &nbsp;
        <RaisedButton
          onTouchTap={this.handleDisSubmmitOrder} label='提交订单'
          buttonStyle={{ backgroundColor: '#00A0FF', }}
          labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }}
        />
        {/* <RaisedButton labelPosition="after" primary={true} icon={<ContentAddCircle />} onTouchTap={this.handleCreateOrder} label='新建订单' />*/}
      </nav>);
    const addrActions = [
      <FlatButton
        label='取消'
        onTouchTap={this.chooseAddrDialogClose}
      />, <FlatButton
        label='确定'
        primary
        onTouchTap={this.chooseAddrDialogSure}
      />,
    ];
    const shoppingCartGoods = this.state.operateTemplate ? this.state.templetsProductionList : this.props.setChoosedAuthGoods.choosedGoods;
    const goodsKinds = shoppingCartGoods.length;
    let goodsTotal = 0;
    shoppingCartGoods.map((goods) => { goodsTotal += Number(goods.SL); });
    const manageAddrActions = [
      <FlatButton
        label='返回'
        onTouchTap={this.manageAddrDialogClose}
      />
    ];
    const options = {
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },
      tableAttrs: {
        selectable: false
      },
      showIndex: true,
      columnOptions: [{
        label: (() => {
          return (<div>
            <div
              style={{ display: 'flex',
                height: this.state.isSearch ? 'auto' : '0px',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer' }}
            >
              <img onClick={this.handleSearchGoods} src='/CreateOrder/FilterIcon.png' alt='' style={{ width: '25px', height: '25px' }} />
              <TextField
                inputStyle={{
                  height: '30px',
                  backgroundColor: '#647794',
                  borderRadius: '2px',
                  color: '#b5c6e0',
                  fontSize: '14px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
                id='textFieldCreateOrder'
                ref='textFieldCreateOrder'
                underlineShow={false}
                hintText={''}
                style={{ width: '120px', height: '30px' }}
                onChange={this.handleSearchInput}
                onBlur={this.handleSearchInputBlur}
              />
            </div>
            <div style={{ display: this.state.isSearch ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
              <img src='/CreateOrder/FilterIcon.png' style={{ width: '30px', height: '30px' }} onClick={this.handleIsSearch} alt='' />
              <span onClick={this.handleIsSearch}>物料号</span>
            </div>
          </div>)
        })(),
        attr: 'no'
      }, {
        label: '名称',
        attr: 'name'
      }, {
        label: '规格',
        attr: 'desc'
      }, {
        label: '数量',
        attr: 'SL',
        render: (row, col) => {
          if (this.state.operateTemplate) {
            return row.SL;
          }
          const num = Number(row.SL) || '';
          return (<EditCell
            value={num}
            onFocus={(event) => { this.handleInputFocus(event) }}
            onChange={value => this.handleNumberChange(row, value)}
          />)
        }
      },
      {
        label: '删除',
        attr: 'SL',
        render: (row, col) => {
          if (this.state.operateTemplate) {
            return row.SL;
          }
          return (
            <img
              onClick={value => this.handleNumberChange(row, value)}
              src='/CreateOrder/iconfont-shanchu.png' alt='' style={{ width: '12px', height: '14px', cursor: 'pointer' }}
            />
          )
        }
      }
      ]
    }
    const organizationId = this.state.organizationId;
    return (
      <StandardDataGrid
        title='铺货订单'
        label={'铺货'}
        message={'您当前正在铺货下单'}
        actions={actions}
        iconPosition={'-120px -120px'}
        childrenStyle={{ overflow: 'hidden', paddingBottom: '0px' }}
      >
        <div className='distributtonOrder' style={{ height: goodsKinds ? 'calc(100% - 48px)' : '100%', overflow: 'auto', paddingBottom: '10px' }}>
          <CardUI
            title='订单信息'
            message='' actions={actions} showStep={false} expanded
            CardStyle={{ marginBottom: '16px' }}
            avatar='/CreateOrder/OrderDetailIcon.png' label=''
            topStyle={{ backgroundColor: '#364356', height: '40px', lineHeight: '40px' }}
            titleStyle={{ height: '40px', lineHeight: '40px', fontSize: '14px' }}
            iconStyleLeft={{ margin: '-2px 20px 0px -18px' }}
            CardTextStyle={{ height: 'auto' }}
          >
            <div className='col-lg-6 col-md-12 col-sm-12'>
              {this.renderSupplier()}
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              {this.renderContract()}
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div
                className='lobName'
                style={{
                  cursor: 'pointer',
                  border: this.state.verify && !this.validator('renderContract') ? '1px solid red' : 'none',
                  color: this.state.verify && !this.validator('renderContract') ? 'red' : 'rgba(0, 0, 0, 0.870588)' }}
              >
                <span>业务线：</span>
                <span> {this.state.lobName}</span>
              </div>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div
                className='lobName'
                style={{
                  cursor: 'pointer',
                  color: this.state.verify && !this.validator('renderContract') ? 'red' : 'rgba(0, 0, 0, 0.870588)',
                  border: this.state.verify && !this.validator('renderContract') ? '1px solid red' : 'none' }}
              >
                <span>品牌：</span>
                <span>{this.state.brandName}</span>
              </div>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              {this.renderSendTime()}
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              {this.renderAddress()}
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='who' style={{ minWidth: '48px', marginLeft: '16px' }}>@谁：</div>
              <AtSelect
                isShowOldSelect={false} isClear={this.state.atSelect.length === 0}
                isShowAddIcon={false} organizationId={organizationId}
                callback={this.handleAtSelectChange} underlineStyle={{ width: '99%' }}
                inputStyle={{ width: 'inherit' }}
              />
            </div>
            <div>
              <div className='col-lg-6 col-md-6 col-sm-12' style={{ backgroundColor: 'transparent', marginTop: '12px' }}>
                <AtMessage
                  callback={this.handleAtMessageChange}
                  isCreateOrder id='TextField'
                  textFocus={this.AtSelectFocus}
                  atMContent='填写留言' Src='/CreateOrder/liuyan.png' hintText=''
                />
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12' style={{ backgroundColor: 'transparent', marginTop: '12px' }}>
                <AtMessage
                  callback={this.handleAtMessageChange}
                  isCreateOrder id='OrderAtTextField'
                  textFocus={this.OrderAtFocus}
                  atMContent='添加订单备注' Src='/CreateOrder/liuyan.png' hintText=''
                />
              </div>
            </div>
          </CardUI>
          <div className='col-lg-12 col-md-12 col-sm-12 appbar'>
            {this.renderAppBar()}

          </div>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <DataGrid
              options={options} dataSource={this.state.dataSource}
              dataGridStyle={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
            />
          </div>
          {
            (() => {
              if (goodsKinds) {
                return (<AppBar
                  iconElementLeft={<div />}
                  style={{ width: '100%', height: '48px', backgroundColor: '#fcefe4', border: '1px solid #ff9336' }}
                >
                  <div className='shopping-cart-collect-content'>
                    <div className='shopping-cart-amount'>
                      <img src='/CreateOrder/ShoppingCart.png' alt='' />
                      <span className='black-font' style={{ paddingLeft: '15px' }}>购物车当前商品:</span>
                      <span className='orange-font' style={{ paddingLeft: '10px' }}>{goodsKinds}</span>
                      <span className='black-font'>种，</span>
                      <span className='orange-font' style={{ paddingLeft: '5px' }}>{goodsTotal}</span>
                      <span className='black-font'>件</span>
                    </div>
                    <div className='shopping-cart-operation'>
                      <FlatButton
                        label='创建为手术模板'
                        style={{ display: 'none' }}
                        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#ff9336' }}
                        primary
                        onTouchTap={() => {}}
                        icon={<img src='/CreateOrder/CreateTemplate.png' alt='' style={{ width: '18px', height: '18px' }} />}
                      />
                      <FlatButton
                        label='一键清空'
                        style={this.props.setChoosedAuthGoods.choosedGoods.length && !this.state.operateTemplate ?
                                              { float: 'right', marginRigt: '15px' } : { display: 'none' }}
                        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#fe6b6b' }}
                        primary
                        onTouchTap={this.ClearShoppingCartGoods}
                        icon={<img src='/CreateOrder/ClearShoppingCart.png' alt='' style={{ width: '15px', height: '18px' }} />}
                      />
                    </div>
                  </div>
                </AppBar>)
              }
            })()
          }

          <ChooseGoodsAuthDialog
            brandId={this.state.brandId}
            businessLineId={this.state.lobId}
            contractType={this.contract_type}
            haveBusinessLineIdAndBrandId={!!(!!this.state.brandId && !!this.state.lobId)}
            AuthorizeOrganizationId={Number(this.state.supplierId)}
            businessLineName={this.state.lobName}
            brandName={this.state.brandName}
            AuthorizedOrganizationId={this.state.organizationId}
            open={this.state.addProductionDialogOpen}
            handleDialog={this.handleAddProductionDialogClose}
          />
          <Dialog
            actions={addrActions}
            title={
              <div>
                <span>选择收货地址</span>
                <span onTouchTap={this.manageAddrDialogOpen} style={{ display: 'none' }} className='addTitle'>管理收货地址</span>
              </div>
          }
            open={this.state.chooseAddrDialogOpen}
            onRequestClose={this.chooseAddrDialogClose}
          >
            {
              this.props.disorderCheck.distriButionAddress.map((address, index) => <div
                style={{ cursor: 'pointer' }}
                key={index}
                onClick={this.setAddress(JSON.stringify(address), index)}
                className='addressWrapper'
              >
                <p>{address.CKMC}</p>
                <p>{address.DZ}</p>
                <p>{address.LXR}</p>
                <p>{address.LXSJ}</p>
              </div>)
            }
          </Dialog>
          <Dialog
            actions={manageAddrActions}
            title='管理收货地址'
            open={this.state.manageAddrDialogOpen}
            onRequestClose={this.manageAddrDialogClose}
          >
            <div className='addressWrapper'>
              <TextField
                onTouchTap={this.handleButtonClick} hintText='请选择收货仓库' value={this.state.inventoryName}
                inputStyle={{ cursor: 'pointer' }} style={{ cursor: 'pointer' }}
              />
              <Location label1='省' label2='市' label3='区' />
              <DialogDepotSelect
                handleButtonClick={this.handleButtonClick}
                open={this.state.DialogDepotOpen}
                ifStorage={false} ifShowOrder={false}
                callback={this.handleCallback}
              />
              <AtSelect isShowOldSelect={false} title='请选择联系人' organizationId={organizationId} />
            </div>
            {/* <div onTouchTap = {this.addAddrDialogOpen} className='addNewAddress' >*/}
            {/* <div className='wareAddicon'></div>*/}
            {/* <p className='Badd'>添加新收货地址</p>*/}
            {/* </div>*/}
            {
              this.props.disorderCheck.distriButionAddress.map((address, index) => <div
                key={index}
                onClick={this.setAddress(JSON.stringify(address), index)} className='addressWrapper'
              >
                <p>{address.CKMC}</p>
                <p>{address.DZ}</p>
                <p>{address.LXR}</p>
                <p>{address.LXSJ}</p>
                <p className='editOrDel'>
                  <FlatButton
                    label='编辑'
                    labelStyle={{
                      color: '#00A0FF'
                    }}
                  />
                  <FlatButton
                    label='删除'
                    labelStyle={{
                      color: '#D0011B'
                    }}
                  />
                </p>
              </div>)
            }
          </Dialog>
          <ErrorSnackBar
            message={this.state.messageDialogMessage}
            open={this.state.messageDialogOpen}
            onRequestClose={this.handleRequestClose}
          />

        </div>
      </StandardDataGrid>
    );
  }
}
