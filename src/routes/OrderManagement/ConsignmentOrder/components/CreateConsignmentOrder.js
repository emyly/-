/**
 * Created by sjf on 2017/3/16 .
 */
import React, { Component, PropTypes } from 'react'
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import CardUI from 'components/StandardUI/StandardCard'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import DataGrid from 'components/DataGrid'
import TextField from 'material-ui/TextField'
import ChooseGoodsAuthDialog from 'components/ChooseGoodsAuthDialog'
import LOBSelect from 'components/LOBSelect'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import GoBackButton from 'components/GoBackButton'
import MessageDialog from 'components/StandardUI/StandardDialog'
import BrandSelect from 'components/BrandSelect'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import EditCell from 'components/EditCell'
import Immutable from 'immutable'
import SelectDropMenu from 'components/SelectDropMenu';
import AppBar from 'material-ui/AppBar';
import DateTimePicker from 'components/DateTimePicker';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

import './CreateConsignmentOrder.scss'

const contract_type = '5';

class CreateConsignmentOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectAdress: false,
      DZ: '',
      DialogDepotOpen: '',
      inventoryName: '',
      inventoryId: '',
      temptAddress: '', // 暂存用户选中的地址，点击确定后根据该值获取receiveAddress
      chooseAddrDialogOpen: false,
      manageAddrDialogOpen: false,
      addProductionDialogOpen: false,
      address: '',
      sendTime: '',
      receiveAddress: '',
      dataSource: [],
      atSelect: [],
      lobId: '',
      atMessage: '',
      orderAtMessage: '',
      templetsProductionList: [],
      supplier: '',
      verify: false,
      LXSJ: '',
      messageDialogOpen: false,
      messageDialogTitle: '',
      messageDialogMessage: '',
      isSearch: false,             // 是否显示搜索框
      searchText: '',              // 用户输入的搜索条件
      fiterDataSource: [],         // 过滤后的购物车商品数据
    }
  }
  static propTypes = {
    getAuthorizeOrganization: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object
  }

  validator = (component) => {
    const verify = {
      renderSupplier: !!this.state.supplier,
      renderReceiveAddress: !!this.state.receiveAddress,
      LOBSelect: !!this.state.lobId
    }
	  return component === 'ALL' ? verify : verify[component];
  }

  	handleBrandSelectChange = (value, name) => {
  	  this.setState({
  	    brandId: value,
  	    brandName: name
  	  })
  	}


  componentWillMount() {
    this.props.getAuthorizeOrganization(contract_type, this.props.globalStore.organizationId)
    this.props.getReceiveAddress(this.props.globalStore.organizationId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createConsignmentOrder.DDB.GUID) {
      this.setState({
			  messageDialogOpen: true,
			  messageDialogTitle: '提示',
			  messageDialogMessage: `已创建订单：${nextProps.createConsignmentOrder.DDB.GUID}`
      })
      this.handleTitleAction()
      this.cleanStore()
    }// this.props
    if (nextProps.setChoosedAuthGoods.choosedGoods.length) {
      this.setState({ fiterDataSource: _.cloneDeep(nextProps.setChoosedAuthGoods.choosedGoods) });
    }
  }

  cleanStore =() => {
    this.props.initStore()
    this.props.chooseGoodsInitStore();
    this.props.brandSelectInitStore()
    this.props.lobSelectInitStore()
  }


  componentWillUnmount() {
    this.cleanStore()
  }

  handleSupplierChange =(event, index, value) => {
    this.setState({
      supplier: JSON.stringify(value),
      receiveAddress: JSON.stringify(this.props.createConsignmentOrder.receiveAddress[0]),
      isSelectAdress: true });
  }

  handleLOBSelectCallback =(value, name) => {
    this.setState({ lobId: Number(value), lobName: name })
  }

  handleTitleAction =() => {
    this.context.router.push({
      pathname: '/consignmentOrder',
    });
  }

  handleReceiveAddressChange =(event, index, value) => {
    this.setState({ LXSJ: JSON.parse(value).LXSJ })
    this.setState({ receiveAddress: value })
  }

  handleNumberChange = (row, value) => {
    let $$choosedGoods = Immutable.fromJS(this.props.setChoosedAuthGoods.choosedGoods);
    $$choosedGoods.some(($$production, index) => {
      if ($$production.get('id') == row.id) {
        $$choosedGoods = $$choosedGoods.set(index, $$production.set('SL', Number(value)))
        return true;
      }
    })
    this.props.setChoosedAuthGood($$choosedGoods.toSeq().filter(o => o.get('SL') > 0).toJS());
    if (!$$choosedGoods.length) {
      this.setState({
        fiterDataSource: []
      })
    }
  }

 	handleAtSelectChange =(result) => {
		 this.setState({ atSelect: result })
 }

  handleAtMessageChange =(result) => {
    this.setState({ atMessage: result })
  }

  handleOrderAtMessageChange =(result) => {
    this.setState({ orderAtMessage: result })
  }

  chooseAddrDialog = () => {
    this.setState({ chooseAddrDialogOpen: true })
  }
  handleAddProductionDialogOpen = () => {
    this.setState({ addProductionDialogOpen: true });
  }

  handleAddProductionDialogClose = () => {
    this.setState({ addProductionDialogOpen: !this.state.addProductionDialogOpen });
  }

  handleLXDHChange = (event) => {
    this.setState({ LXSJ: event.target.value })
  }

  handleSubmitOrder =() => {
    const validatorList = this.validator('ALL');
    for (const va in validatorList) {
      if (!validatorList[va]) {
        this.setState({
          messageDialogOpen: true,
          messageDialogTitle: '警告',
          messageDialogMessage: '请填写必填项'
        })
        this.setState({
          verify: true
        })
        return;
      }
    }
    if (!this.props.setChoosedAuthGoods.choosedGoods.some((production) => {
		    if (production.SL) {
		      return true;
		    }
		  })) {
      this.setState({
			  messageDialogOpen: true,
			  messageDialogTitle: '警告',
			  messageDialogMessage: '至少添加一件商品'
      })
		  return;
    }
    if (Number(this.state.sendTime) < Number(new Date().getTime())) {
      this.setState({
        messageDialogOpen: true,
        messageDialogMessage: '送货时间早于当前时间'
      })
      return;
    }
    let {
			address,
			sendTime,
			receiveAddress,
			dataSource,
			atSelect,
			lobId,
			atMessage,
			orderAtMessage,
			supplier,
      LXSJ,
      brandId,
      brandName
		} = this.state;
    supplier = JSON.parse(supplier);
    receiveAddress = JSON.parse(receiveAddress)
    if (sendTime === '') {
      sendTime = Date.parse(new Date());
    }
    this.props.submitStockOrder({
		  YWXZFL: lobId,
      SHJXSID: supplier.id,
      SHJXSMC: supplier.name,
      DDMS: orderAtMessage,
      DHRQ: sendTime,
      SHLXR: receiveAddress.LXR,
      SHLXRDH: LXSJ,
      SHXZQHID: receiveAddress.XZQHID,
      SHLXRID: receiveAddress.LXRID,
      SHDZ: `${receiveAddress.LXR}\n${receiveAddress.CKMC}`,
      SHDZID: receiveAddress.GUID,
      RKCKID: receiveAddress.GLCKID,
      TZNR: atMessage,
      BTZR: atSelect.map(o => o.id),
      SP: this.props.setChoosedAuthGoods.choosedGoods.map(o => ({ GUID: o.id, SL: o.SL })),
      PPID: brandId,
      PPMC: brandName,
    })
  }
  chooseAddrDialogClose = () => {
    this.setState({ chooseAddrDialogOpen: false })
  }
  chooseAddrDialogSure = () => {
    this.setState({
      LXSJ: JSON.parse(this.state.temptAddress).LXSJ,
      receiveAddress: this.state.temptAddress,
      DZ: JSON.parse(this.state.temptAddress).DZ
    })
    this.setState({ chooseAddrDialogOpen: false, isSelectAdress: true })
  }
  setAddress =(address, index) => (event) => {
    const addressWrapperArr = document.querySelectorAll('.addressWrapper');
    for (let i = 0; i < addressWrapperArr.length; i++) {
      addressWrapperArr[i].classList.remove('activeAddressWrapper');
    }
    addressWrapperArr[index].classList.add('activeAddressWrapper');
    this.setState({ temptAddress: address })
  }
	/**
	 * 选择供应商
	 */
   /* <SelectField
        errorText={this.state.verify && !this.validator('renderSupplier') && <div className='warning'>选择供应商</div>} value={this.state.supplier} labelStyle={{ lineHeight: '40px' }}
        onChange={this.handleSupplierChange} maxHeight={200} menuStyle={{ overflow: 'hidden' }} style={{ width: 'inherit', marginRight: 15, height: 40, fontFamily: 'SourceHanSansCN-Regular' }}
      >
        {this.props.createConsignmentOrder.authorizeOrganization.map(organization =>
          <MenuItem value={JSON.stringify({ id: organization.id, name: organization.name })} key={organization.id} primaryText={organization.name} />
        )}
      </SelectField>
    */
  renderSupplier() {
    return (
      <SelectDropMenu
        title={'供应商'}
        items={this.props.createConsignmentOrder.authorizeOrganization}
        onChange={this.handleSupplierChange}
        isClear={!this.state.hospitalString}
        isShowError={this.state.verify && !this.validator('renderSupplier')}
        style={{ width: '100%' }}
      />
    )
  }
  AtSelectFocus=() => {
    document.getElementById('TextField').focus();
  }
  OrderAtFocus=() => {
    document.getElementById('OrderAtTextField').focus();
  }
  /**
   * 要求送货时间callback
   */
  sendTimeCallBack = (date) => {
    this.setState({
      sendTime: date
    })
  }
	/**
	 * 要求送货时间
	 */
  /*
  <DateTimePicker
        callback={this.sendTimeCallBack}
        TextFieldStyle={{ height: 40, width: '80%' }}
      />
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
          TextFieldStyle={{ height: '44px', paddingBottom: 5, paddingLeft: '15px', width: 'auto' }}
          hintStyle={{ lineheight: '44px',
            width: 'inherit',
            color: this.state.verify && !this.validator('renderSendTime') ? 'red' : '#979797',
            fontSize: '14px' }}
          inputStyle={{ color: Number(this.state.sendTime) < Number(new Date().getTime()) ? 'red' : '#000' }}
        />
      </div>
    )
  }
  /**
   * 字符串模糊匹配
   */
  isSearchGoodsInfoLike = (value) => {
    return (String(value.no).indexOf(this.state.searchText) !== -1) ||
              (value.name.indexOf(this.state.searchText) !== -1) ||
              (value.desc.indexOf(this.state.searchText) !== -1);
  }
  /**
   * 搜索商品
   */
  handleSearchGoods = () => {
    const newDataSource = [];
    this.props.setChoosedAuthGoods.choosedGoods.map((value) => {
      if (this.isSearchGoodsInfoLike(value)) {
        newDataSource.push(value);
      }
    })
    this.setState({
      fiterDataSource: newDataSource
    })
  }
  /**
   * 搜索
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
        fiterDataSource: this.props.setChoosedAuthGoods.choosedGoods
      })
    }
    this.setState({
      searchText: this.state.searchText
    })
  }
  /**
   * 搜索框失去焦点
   */
  handleSearchInputBlur = () => {
    if (this.state.searchText === '') {
      this.setState({
        fiterDataSource: this.props.setChoosedAuthGoods.choosedGoods,
        isSearch: false
      })
    }
  }
    /**
   * ErrorSnackBar信息框开关
   */
  handleRequestClose = () => {
    this.setState({
      messageDialogOpen: !this.state.messageDialogOpen
    });
  };
	/**
	 * 收货地址
	 */
  renderReceiveAddress() {
    return (
      <SelectField
        errorText={this.state.verify && !this.validator('renderReceiveAddress') && <div className='warning'>选择收货地址</div>}
        value={this.state.receiveAddress} labelStyle={{ lineHeight: '40px' }}
        onChange={this.handleReceiveAddressChange}
        maxHeight={200} style={{ width: 'inherit', marginRight: 15, height: 40, overflow: 'hidden', fontFamily: 'SourceHanSansCN-Regular' }}
      >
        {this.props.createConsignmentOrder.receiveAddress.map(address =>
          <MenuItem value={JSON.stringify(address)} key={address.GUID} primaryText={`${address.CKMC}:${address.DZ}`} />
        )}
      </SelectField>
    )
  }
  handleAtMessageChange = (result) => {
    // this.setState({ atMessage: result })
  }
    /**
   * 一键清空
   */
  ClearShoppingCartGoods = () => {
    this.props.chooseGoodsInitStore();
    this.setState({
      storageDataSource: [],
      fiterDataSource: []
    })
  }
  render() {
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
    const organizationId = Number(this.props.globalStore.organizationId);
    const actions =
        (<nav>
          <GoBackButton />	&nbsp;
          <RaisedButton buttonStyle={{ backgroundColor: '#00A0FF', }} style={{ marginRight: '20px' }} labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }} onTouchTap={this.handleSubmitOrder} label='提交订单' />
        </nav>)
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
        label: '物料号',
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
        render: row => <EditCell type='number' style={{ width: 50 }} min='0' value={row.SL} onChange={value => this.handleNumberChange(row, value)} />
      }]
    }
    const goodsKinds = this.props.setChoosedAuthGoods.choosedGoods.length;
    let goodsTotal = 0;
    let shoppingCartGoods=this.props.setChoosedAuthGoods.choosedGoods;
    shoppingCartGoods.map((goods) => { goodsTotal += Number(goods.SL); });
    return (
      <div style={{ height: '100%' }}>
        <StandardForm iconPosition={'-210px 0'} title='创建寄售订单'message='...' >
          <StandardFormCardList>
            <StandardFormCard title='订单信息' message='' actions={actions} showStep={false} expanded>
              <div className='create-order' style={{ padding: '0 16px' }}>
                <div style={{ height: goodsKinds ? 'calc(100% - 48px)' : '100%', overflow: 'auto', paddingBottom: '10px' }}>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <CardUI
                    title='订单信息'
                    message='' actions={actions} showStep={false} expanded
                    CardStyle={{ marginBottom: '16px' }}
                    avatar='/CreateOrder/OrderDetailIcon.png' label=''
                    topStyle={{ backgroundColor: '#364356', height: '40px', lineHeight: '40px' }}
                    titleStyle={{ height: '40px', lineHeight: '40px', fontSize: '14px' }}
                    iconStyleLeft={{ margin: '-2px 20px 0px -18px' }}
                    CardTextStyle={{ height: 'auto', padding: '0 7px' }}
                  >
                    <div style={{ width: '100%', display: 'inline-block', height: '100%', overflowY: 'auto', marginTop: '16px' }}>
                      <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div className='orderWidth col-lg-12 col-md-12 col-sm-12'>
                          {this.renderSupplier()}
                        </div>
                        <div className='orderWidth col-lg-12 col-md-12 col-sm-12'>
                          <div>
                            <LOBSelect
                              newStyleFlag
                              style={{ height: 40, width: 'inherit', overflow: 'inherit' }}
                              labelStyle={{ lineHeight: '30px' }}
                              menuStyle={{ overflow: 'hidden' }}
                              errorText={this.state.verify && !this.validator('LOBSelect') && <div className='warning'>请选择业务线</div>}
                              buyerOrganizationId={organizationId}
                              sellerOrganizationId={this.state.supplier ? Number(JSON.parse(this.state.supplier).id) : 0}
                              contract_type={contract_type}
                              callback={this.handleLOBSelectCallback}
                            />
                          </div>
                        </div>
                        <div className='orderWidth col-lg-12 col-md-12 col-sm-12'>
                          <div>
                            <BrandSelect
                              newStyleFlag
                              style={{ height: 40, width: 'inherit', overflow: 'inherit' }}
                              menuStyle={{ overflow: 'hidden' }}
                              labelStyle={{ lineHeight: '30px' }}
                              buyerOrganizationId={organizationId}
                              sellerOrganizationId={this.state.supplier ? Number(JSON.parse(this.state.supplier).id) : 0}
                              LOBId={this.state.lobId} contractType={contract_type}
                              callback={this.handleBrandSelectChange}
                            />
                          </div>
                        </div>
                        <div className='orderWidth  col-lg-12 col-md-12 col-sm-12'>
                          <div style={{ marginTop: -8 }}>
                            {this.renderSendTime()}
                          </div>
                        </div>
                        <div className='orderWidth col-sm-12 '>
                          <div onClick={this.chooseAddrDialog} style={{ height: 'auto', marginTop: -4, position: 'relative' }}>
                            <div
                              className='atMessage__create'
                              style={{ cursor: 'pointer',
                                zIndex: 99,
                                display: this.state.isSelectAdress === true ? 'none' : 'block',
                                border: this.state.verify && !this.validator('renderReceiveAddress') ? '1px solid red' : 'none' }}
                            >
                              <div className='createHintText'>
                                <img src='/CreateOrder/Group 10.png' alt='' />
                                <div style={{ textAlign: 'center' }}>选择收货地址及联系人</div>
                              </div>
                            </div>
                            <div className='atMessage__create address' style={{ display: this.state.isSelectAdress === true ? 'block' : 'none' }}>
                              <div className='createAddress'>
                                <div className='creat__DZ'>
                                  <span className='logWidth'>收货地址：</span>
                                  <span className='logisAddress'>{this.state.receiveAddress === '' ? '' : JSON.parse(this.state.receiveAddress).CKMC}<br />{this.state.receiveAddress === '' ? '' : JSON.parse(this.state.receiveAddress).DZ}</span>
                                </div>
                                <div className='creat__DZIphone'>
                                  <span className='logWidth'>联系人：</span>
                                  <span className='logPersonName'>{this.state.receiveAddress === '' ? '' : JSON.parse(this.state.receiveAddress).LXR}<br />{this.state.receiveAddress === '' ? '' : JSON.parse(this.state.receiveAddress).CKMC}</span>
                                </div>
                              </div>
                              <div className='addressIcon'>〉</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className='orderWidth col-sm-12' style={{ marginTop: '5rem', display: 'flex', alignItems: 'center' }}>
                            <div className='who' style={{ minWidth: '48px', marginLeft: '16px' }}>@谁：</div>
                            <div style={{ position: 'relative' }}>
                              <AtSelect
                                isShowOldSelect={false}
                                isShowAddIcon={false}
                                organizationId={organizationId}
                                callback={this.handleAtSelectChange}
                                underlineStyle={{ width: '99%' }}
                                inputStyle={{ width: 'inherit' }}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6 col-md-6 col-sm-12' style={{ backgroundColor: 'transparent', marginTop: '12px' }}>
                            <AtMessage
                              callback={this.handleAtMessageChange}
                              textFocus={this.AtSelectFocus}
                              isCreateOrder id='TextField'
                              textFocus={this.AtSelectFocus}
                              atMContent='填写留言' Src='/CreateOrder/liuyan.png' hintText=''
                            />
                          </div>
                          <div className='col-lg-6 col-md-6 col-sm-12' style={{ backgroundColor: 'transparent', marginTop: '12px' }}>
                            <AtMessage
                              callback={this.handleOrderAtMessageChange}
                              textFocus={this.OrderAtFocus}
                              id='OrderAtTextField' atMContent='订单备注'
                              Src='/CreateOrder/liuyanbeizhu.png'
                              isCreateOrder textareaStyle={{ marginTop: 0 }}
                            />
                          </div>
                          <div />
                        </div>
                      </div>
                    </div>
                  </CardUI>
                </div>
                <div className='prestrainGoods ' className='col-lg-12 col-md-12 col-sm-12' style={{ marginBottom: '16px' }}>
                  <AppBar
                    titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#FFFFFF', height: '44px', lineHeight: '44px' }}
                    title={'添加商品'}
                    iconElementLeft={<img src={'/CreateOrder/AddMoreGoods.png'} alt='' style={{ paddingTop: '8px' }} />}
                    iconElementRight={<img src={'/CreateOrder/RightArrowIcon.png'} alt='' />}
                    onTouchTap={this.handleAddProductionDialogOpen}
                    style={{ width: '100%', height: '3.1rem', backgroundColor: '#00bf9c', borderRadius: '2px', cursor: 'pointer' }}
                  />
                </div>
                <div className='col-sm-12' >
                  <DataGrid
                    options={options}// fiterDataSource
                    dataSource={this.state.fiterDataSource}
                    dataGridStyle={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
                  />
                </div>
              </div>       {
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
               
              </div>
            </StandardFormCard>
          </StandardFormCardList>
        </StandardForm>
        <ChooseGoodsAuthDialog
          haveBusinessLineIdAndBrandId={!!(!!this.state.brandId && !!this.state.lobId)}
          brandId={this.state.brandId}
          brandName={this.state.brandName}
          contractType={Number(contract_type)}
          getSelectionCallback={this.handleChooseGoodsAuthDialogCallback}
          AuthorizeOrganizationId={this.state.supplier ? JSON.parse(this.state.supplier).id : 0}
          AuthorizedOrganizationId={organizationId}
          open={this.state.addProductionDialogOpen}
          businessLineId={Number(this.state.lobId)}
          businessLineName={this.state.lobName}
          handleDialog={this.handleAddProductionDialogClose}
        />
        <ErrorSnackBar
          message={this.state.messageDialogMessage}
          open={this.state.messageDialogOpen}
          onRequestClose={this.handleRequestClose}
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
            this.props.createConsignmentOrder.receiveAddress.map((address, index) => <div
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
      </div>
    );
  }
}

export default CreateConsignmentOrder
