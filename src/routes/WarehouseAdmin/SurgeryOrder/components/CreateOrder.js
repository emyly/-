/**
 * Created by wmt on 2016/11/30 .
 */
import React, { Component, PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField'
import IconMenu from 'material-ui/IconMenu';
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'components/ChineseDatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import LOBSelect from 'components/LOBSelect'
import BrandSelect from 'components/BrandSelect'
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import DataGrid from 'components/DataGrid'
import TextField from 'material-ui/TextField'
import StandardTextField from 'components/TextField'
import ChooseGoodsAuthDialog from 'components/ChooseGoodsAuthDialog'
import CardUI from 'components/StandardUI/StandardCard'
import './CreateOrder.scss'
import GoBackButton from 'components/GoBackButton'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import DialogDepotSelect from 'components/DepotSelectDialog';
import Location from 'components/Location'
import EditCell from 'components/EditCell'
import AlertProductionType from '../containers/AlertProductionTypeContainer'
import Immutable from 'immutable'
import _ from 'lodash'
import DateTimePicker from 'components/DateTimePicker';
import StandardDataGrid from 'components/StandardDataGrid';
import AppBar from 'material-ui/AppBar';
import SelectDropMenu from 'components/SelectDropMenu';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

const contract_type = '2';

export default class SurgeryOrder extends Component {
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
      alertProductionTypeOpen: false,
      sellType: 0,
      hospital: 0,
      lobId: 0,
      address: '',
      type: '""',
      operateName: '',
      operateId: '',
      operatePart: '',
      operateIntoRoad: '',
      operateTemplate: 0,
      sendTime: '',
      operateTime: '',
      receiveAddress: '',
      dataSource: [],
      patientName: '',
      age: '',
      inpatientNumber: '',
      bedNumber: '',
      atSelect: [],
      atMessage: '',
      orderAtMessage: '',
      sex: 'B',
      saleManage: '',
      saleAssistant: '',
      doctorManage: '',
      doctor: [],
      hospitalName: '',
      hospitalString: '',
      templetsProductionList: [],
      organizationId: Number(this.props.globalStore.organizationId),
      organizationName: this.props.globalStore.organizationName,
      verify: false,
      LXSJ: '',
      messageDialogOpen: false,
      messageDialogMessage: '',
      valueMultiple: '',
      SaleManageChipData: [],
      SaleAssistantChipData: [],
      openSaleManage: false,
      openSaleAssistant: false,
      isSearch: false,             // 是否显示搜索框
      searchText: '',              // 用户输入的搜索条件
      storageDataSource: [],       // 暂存购物车商品数据
      fiterDataSource: [],         // 过滤后的购物车商品数据
    }
    this.templetProductionNumber = {};
    this.dataSource = [];
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    initStore: PropTypes.func.isRequired,
    initStoreCreateOrderTypes: PropTypes.func.isRequired,
    initStoreCreateOrderTemplets: PropTypes.func.isRequired,
    initStoreCreateOrderOperateOtherAttr: PropTypes.func.isRequired,
    initStoreCreateOrderAuthorizeOrganization: PropTypes.func.isRequired,
    getAuthorizeOrganization: PropTypes.func.isRequired,
    chooseGoodsInitStore: PropTypes.func.isRequired,
    lobSelectInitStore: PropTypes.func.isRequired,
    getDistribution: PropTypes.func.isRequired,
    getReceiveAddress: PropTypes.func.isRequired,
    getSaleList: PropTypes.func.isRequired,
    getDoctorList: PropTypes.func.isRequired,
    brandSelectInitStore: PropTypes.func.isRequired,
    getAuthorizeTypes: PropTypes.func.isRequired,
    getOperatePart: PropTypes.func.isRequired,
    getOperateIntoRoad: PropTypes.func.isRequired,
    getOperateName: PropTypes.func.isRequired,
    getProductionList: PropTypes.func.isRequired,
    getOperateTemplets: PropTypes.func.isRequired,
    submitSurgeryOrder: PropTypes.func.isRequired,
    setChoosedAuthGoods: PropTypes.object.isRequired,
    setChoosedAuthGood: PropTypes.func.isRequired,
    createOrder: PropTypes.object,
    globalStore: PropTypes.object.isRequired,

  };

  validator = (component) => {
    const verify = {
      renderHospital: !!this.state.hospitalString,
      renderProductionType: !!JSON.parse(this.state.type),
      renderOperate: !!this.state.operateId,
      renderReceiveAddress: !!this.state.receiveAddress,
      renderSaleManage: !!this.state.saleManage,
      renderOperatePart: !!this.state.operatePart,
      doctorManage: !!this.state.doctorManage,
      renderSendTime: !!this.state.sendTime,
      LOBSelect: !!this.state.lobId,
      BrandSelect: !!this.state.brandId
    }
    return component === 'ALL' ? verify : verify[component];
  }

  componentWillMount() {
    this.props.getAuthorizeOrganization(contract_type, this.state.organizationId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createOrder.DDB.GUID) {
      this.setState({
        messageDialogOpen: true,
        messageDialogMessage: `已创建订单：${nextProps.createOrder.DDB.GUID}`
      })
      this.handleTitleAction()
      this.props.initStore()
      this.props.chooseGoodsInitStore();
      this.setState({
        storageDataSource: [],
        fiterDataSource: []
      })
    }
    /* 初始化地址*/
    if (nextProps.createOrder.receiveAddress && nextProps.createOrder.receiveAddress.length > 0) {
      this.setState({
        receiveAddress: nextProps.createOrder.receiveAddress[0],
        LXSJ: nextProps.createOrder.receiveAddress[0].LXSJ,
        isSelectAdress: true
      })
    }
    if (this.state.operateTemplate) {
      this.state.templetsProductionList = nextProps.createOrder.templetsProductionList.map(o => ({
        SL: this.templetProductionNumber[o.id], ...o
      }));
      this.setState({ templetsProductionList: this.state.templetsProductionList });
    }
    if (!this.state.operateTemplate && this.props.createOrder.typeId !== JSON.parse(this.state.type).id) {
      this.dataSource = nextProps.createOrder.typeProductionList.map(o => ({ SL: 0, ...o }));
    }
    if (this.state.templetsProductionList.length || nextProps.setChoosedAuthGoods.choosedGoods.length) {
      const goodsArray = this.state.operateTemplate ? this.state.templetsProductionList : nextProps.setChoosedAuthGoods.choosedGoods;
      const storageDataSource = goodsArray;
      this.state.storageDataSource = _.cloneDeep(storageDataSource);
      this.state.fiterDataSource = _.cloneDeep(storageDataSource);
      this.setState({
        storageDataSource: this.state.storageDataSource,
        fiterDataSource: this.state.fiterDataSource
      })
      if (this.state.searchText !== '') {
        this.handleSearchGoods();
      }
    }
  }

  componentWillUnmount() {
    this.cleanStore()
  }

  cleanStore =() => {
    this.props.initStore();
    this.props.chooseGoodsInitStore();
    this.props.brandSelectInitStore();
    this.props.lobSelectInitStore();
    this.setState({
      storageDataSource: [],
      fiterDataSource: []
    })
  }

  handleSellTypeChange =(event, index, value) => {
    if (Number(this.state.sellType) !== Number(value.id)) {
      const organizationId = Number(this.props.globalStore.organizationId);
      this.cleanStore();
      this.templetProductionNumber = {};
      this.dataSource = [];
      this.setState({
        isSelectAdress: false,
        sellType: value.id,
        verify: false,
        address: '',
        type: '""',
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
        operateTemplate: 0,
        sendTime: '',
        operateTime: '',
        receiveAddress: '',
        dataSource: [],
        patientName: '',
        inpatientNumber: '',
        bedNumber: '',
        atSelect: [],
        atMessage: '',
        orderAtMessage: '',
        sex: '男',
        saleManage: '',
        saleAssistant: '',
        doctorManage: '',
        doctor: [],
        hospital: '',
        hospitalName: '',
        hospitalString: '',
        templetsProductionList: [],
        organizationId: Number(this.props.globalStore.organizationId),
        organizationName: this.props.globalStore.organizationName,
      })
      if (value.id) {
        this.setState({
          organizationId: null
        });
        this.props.getDistribution(contract_type, organizationId);
      } else {
        this.props.getAuthorizeOrganization(contract_type, organizationId)
      }
    }
  }

  handleHospitalChange =(event, index, value) => {
    if (this.state.hospital !== Number(value.id)) {
      const hospital = value.id;
      this.setState({
        hospital: Number(hospital),
        hospitalName: value.name,
        hospitalString: JSON.stringify(value),
        lobId: 0,
        brandId: 0,
        type: '""',
        operateTemplate: '',
        storageDataSource: [],       // 暂存购物车商品数据
        fiterDataSource: [],         // 过滤后的购物车商品数据
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
      })
      this.props.lobSelectInitStore();
      this.props.brandSelectInitStore();
      this.props.initStoreCreateOrderTypes();
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();

      this.props.getReceiveAddress(hospital)
      this.props.getSaleList(this.state.organizationId, hospital)
      this.props.getDoctorList(hospital)
    }
  }

  handleTitleAction =() => {
    this.context.router.push({
      pathname: '/surgeryOrder',
    });
  }

  handleLOBSelectCallback =(value, name) => {
    if (this.state.lobId !== Number(value)) {
      this.setState({
        brandId: 0,
        type: '""',
        operateTemplate: '',
        storageDataSource: [],       // 暂存购物车商品数据
        fiterDataSource: [],         // 过滤后的购物车商品数据
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
      })
      this.dataSource = [];
      this.props.brandSelectInitStore();
      this.props.initStoreCreateOrderTypes();
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();
    }
    this.setState({ lobId: Number(value), lobName: name })
  }

  handleBrandSelectChange =(value, name) => {
    if (this.state.brandId !== Number(value)) {
      this.setState({
        type: '""',
        operateTemplate: '',
        storageDataSource: [],       // 暂存购物车商品数据
        fiterDataSource: [],         // 过滤后的购物车商品数据
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
      })
      this.dataSource = [];
      this.props.initStoreCreateOrderTypes();
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();
    }

    this.setState({ brandId: Number(value), brandName: name })
    const params = [contract_type, this.state.lobId, value, this.state.organizationId, this.state.hospital]
    if (this.state.sellType) {
      params.push(this.props.globalStore.organizationId)
    }
    this.props.getAuthorizeTypes.apply(null, params);
  }

  handleDepotSelectDialogByTextCallback =(value) => {
    this.setState({ address: value })
  }

  handleProductionTypeChange =(event, index, value) => {
    if (JSON.parse(this.state.type).id !== value.id) {
      this.setState({
        operateTemplate: 0,
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
        storageDataSource: [],       // 暂存购物车商品数据
        fiterDataSource: [],         // 过滤后的购物车商品数据
      })
      this.dataSource = [];
      this.props.initStoreCreateOrderTypes(false);
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();
    }
    const typeId = value.id
    this.setState({ type: JSON.stringify(value) })
    this.props.getOperatePart(typeId)
    this.props.getOperateIntoRoad(typeId)
    this.props.getOperateName(typeId)

    this.props.getProductionList(this.state.hospital, this.state.organizationId, this.props.createOrder.types[index].goods, typeId)
    const params = [contract_type, this.state.lobId, this.state.brandId, typeId, this.state.organizationId, this.state.hospital];
    if (this.state.sellType) {
      params.push(this.props.globalStore.organizationId)
    }
    this.props.getOperateTemplets.apply(null, params)
  }

  handleOperateNameChange =(event, index, value) => {
    this.setState({
      operateId: value.id,
      operateName: event.target.innerText
    })
  }

  handleOperatePartChange =(event, index, value) => {
    this.setState({ operatePart: value.id })
  }

  handleOperateTemplateChange =(event, index, value) => {
    if (!index) {
      const goodsArray = this.props.setChoosedAuthGoods.choosedGoods;
      const storageDataSource = goodsArray;
      this.state.storageDataSource = _.cloneDeep(storageDataSource);
      this.state.fiterDataSource = _.cloneDeep(storageDataSource);
      this.setState({
        storageDataSource: this.state.storageDataSource,
        fiterDataSource: this.state.fiterDataSource,
        operateTemplate: false
      })
      if (this.state.searchText !== '') {
        this.handleSearchGoods();
      }
      return;
    }
    if (JSON.parse(this.state.operateTemplate).id !== value.id) {
      this.props.initStoreCreateOrderTemplets(false);
    }
    this.setState({ operateTemplate: JSON.stringify(value) })
    this.templetProductionNumber = {}
    this.props.createOrder.templets[index - 1].goods.map((o) => {
      this.templetProductionNumber[o.id] = o.count
    })
    this.props.getProductionList(this.state.hospital, this.state.organizationId, Object.keys(this.templetProductionNumber) || [])
  }

  handleIntoRoadChange =(event, index, value) => {
    this.setState({ operateIntoRoad: value.id })
  }

  handleReceiveAddressChange =(event, index, value) => {
    this.setState({ LXSJ: JSON.parse(value).LXSJ })
    this.setState({ receiveAddress: value })
  }

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
        fiterDataSource: []
      })
    }
  }

  handlePatientNameChange = (event) => {
    this.setState({ patientName: event.target.value })
  }
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value })
  }

  handleLXDHChange = (event) => {
    this.setState({ LXSJ: event.target.value })
  }


  handleInpatientNumberChange = (event) => {
    this.setState({ inpatientNumber: event.target.value })
  }

  handleBedNumberChange = (event) => {
    this.setState({ bedNumber: event.target.value })
  }

  handleAtSelectChange =(result) => {
    this.setState({ atSelect: result })
  }

  handleAtMessageChange =(result) => {
    this.setState({ atMessage: result })
  }

  handleOrderAtMessageChange =(result) => {
    this.setState({ orderAtMessage: result })
  };
  AtSelectFocus=() => {
    document.getElementById('TextField').focus();
  }
  OrderAtFocus=() => {
    document.getElementById('OrderAtTextField').focus();
  }

  handleAddProductionDialogOpen = () => {
    if (!(!!this.state.operateTemplate || !this.state.hospital)) {
      this.setState({ addProductionDialogOpen: true });
    }
  }

  handleAddProductionDialogClose = () => {
    this.setState({ addProductionDialogOpen: !this.state.addProductionDialogOpen });
  }

  handleSexChange = (event, value) => {
    this.setState({ sex: value })
  }

  handleSaleManageChange =(event, value) => {
    this.setState({
      saleManage: value,
      SaleManageChipData: [{
        XSRYID: value,
        XSRYNAME: event.target.innerText
      }]
    })
  }

  handleDoctorManageChange =(result) => {
    if (result.length) {
      this.setState({
        doctorManage: result[0].id,
        doctor: result
      });
    } else {
      this.setState({
        doctorManage: '',
        doctor: []
      })
    }
  }

  handleDoctorChange =(result) => {
    this.setState({ doctor: result })
  }

  handleDistributionChange =(event, index, value) => {
    if (Number(this.state.organizationId) !== Number(value.id)) {
      this.setState({
        organizationId: value.id,
        organizationName: event.target.innerText,
        hospital: '',
        hospitalName: '',
        hospitalString: '',
        lobId: 0,
        brandId: 0,
        type: '""',
        operateTemplate: '',
        storageDataSource: [],       // 暂存购物车商品数据
        fiterDataSource: [],         // 过滤后的购物车商品数据
        operateName: '',
        operateId: '',
        operatePart: '',
        operateIntoRoad: '',
      })
      this.props.initStoreCreateOrderAuthorizeOrganization();
      this.props.lobSelectInitStore();
      this.props.brandSelectInitStore();
      this.props.initStoreCreateOrderTypes();
      this.props.initStoreCreateOrderTemplets();
      this.props.chooseGoodsInitStore();
      this.props.initStoreCreateOrderOperateOtherAttr();

      this.props.getAuthorizeOrganization(contract_type, value.id);
    }
  }

  handleSubmitOrder =() => {
    const validatorList = this.validator('ALL');
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
      }
    }

    const submitProductionList = this.state.storageDataSource;
    if (!submitProductionList.some((production) => {
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
    if (Number(this.state.sendTime) < Number(new Date().getTime())) {
      this.setState({
        messageDialogOpen: true,
        messageDialogMessage: '送货时间早于当前时间'
      })
      return;
    }

    const {
      sellType,
      hospital,
      lobId,
      operateName,
      operateId,
      operatePart,
      operateIntoRoad,
      sendTime,
      operateTime,
      receiveAddress,
      patientName,
      inpatientNumber,
      bedNumber,
      atSelect,
      atMessage,
      orderAtMessage,
      sex,
      saleManage,
      saleAssistant,
      doctorManage,
      doctor,
      hospitalName,
      organizationId,
      organizationName,
      brandId,
      brandName,
      LXSJ
    } = this.state;
    let {
      type,
      operateTemplate,
    } = this.state;
    const { GUID, SJHM } = this.props.globalStore;
    // let HTH = null;
    type = JSON.parse(type);
    operateTemplate = JSON.parse(operateTemplate);
    this.props.createOrder.contracts.some((contract) => {
      if (contract.authorized_organization_id === this.state.hospital) {
        // HTH = contract.contract_number || null
        return true;
      }
    })

    this.props.submitSurgeryOrder({
      isDistribute: sellType,
      YWXZFL: lobId,
      ZJE: this.state.operateTemplate ? JSON.parse(this.state.type).price : JSON.parse(this.state.operateTemplate).price,
      DDMC: '手术下单',
      SSLXID: type.id,
      SSLXMC: type.name,
      SSMBID: operateTemplate.id,
      SSMBMC: operateTemplate.name,
      SHJXSID: organizationId,
      SHJXSMC: organizationName,
      RKCKID: receiveAddress.GLCKID,
      PPID: brandId,
      PPMC: brandName,
      CJJXSID: hospital,
      CJJXSMC: hospitalName,
      DDMS: orderAtMessage,
      CGLXR: GUID,
      CGLXRDH: SJHM,
      SHLXRID: receiveAddress.LXRID,
      SHLXR: receiveAddress.LXR,
      SHLXRDH: LXSJ,
      SHXZQHID: receiveAddress.XZQHID,
      SHDZ: `${receiveAddress.LXR}\n${receiveAddress.CKMC}`,
      SHDZID: receiveAddress.GUID,
      YYID: hospital,
      YYMC: hospitalName,
      YSID: doctorManage,
      FSYSBH1: doctor[1] ? doctor[1].id : null,
      FSYSBH2: doctor[2] ? doctor[2].id : null,
      FSYSBH3: doctor[3] ? doctor[3].id : null,
      SSRQ: operateTime,
      XSDB: saleManage,
      XSZL: saleAssistant,
      RL: operateIntoRoad,
      BW: operatePart,
      BLMS: null,
      BRXM: patientName,
      BRXB: sex,
      BRNL: null,
      BRDH: null,
      ZYH: inpatientNumber,
      CWH: bedNumber,
      TZNR: atMessage,
      BTZR: atSelect.map(o => o.id),
      DHRQ: sendTime,
      SP: submitProductionList.map(o => ({ GUID: o.id, SL: o.SL })),
      SSMC: operateName,
      SSMCID: operateId,
    })
  }

  /**
   * 销售类型
   */
  renderSellType() {
    const items = [{ id: 0, name: '直销订单' }, { id: 1, name: '分销订单' }];
    return (
      <SelectDropMenu
        title={'销售类型'}
        items={items}
        isSelectFirst
        onChange={this.handleSellTypeChange}
      />
    )
  }


  /**
   * 分销商
   */
  renderDistribution() {
    return (
      <SelectDropMenu
        title={'分销商'}
        items={this.props.createOrder.distributions}
        isClear={!this.state.organizationId}
        isShowError={this.state.verify && !this.state.organizationId}
        onChange={this.handleDistributionChange}
      />
    )
  }


  /**
   * 性别
   */
  renderSex() {
    return (
      <RadioButtonGroup name='sex' defaultSelected={this.state.sex} onChange={this.handleSexChange} style={{ float: 'left', width: '100%' }}>
        <RadioButton
          value='B' label='男' style={{ float: 'left', display: 'inline-block', width: '50%' }}
          className='RadioButton' labelStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: '#4D4D4D' }}
        />
        <RadioButton
          value='G' label='女' style={{ float: 'left', display: 'inline-block', width: '50%' }}
          className='RadioButton' labelStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: '#4D4D4D' }}
        />
      </RadioButtonGroup>
    )
  }

  /**
   * 选择医院
   */
  renderHospital() {
    return (
      <SelectDropMenu
        title={'医院名称'}
        items={this.props.createOrder.authorizeOrganization}
        onChange={this.handleHospitalChange}
        isClear={!this.state.hospitalString}
        isShowError={!!((this.state.verify && !this.validator('renderHospital')))}
      />
    )
  }

  /**
   * 选择产品类型
   */
  renderProductionType() {
    const items = this.props.createOrder.types.map(value => ({ id: value.type_id, price: value.type_money, name: value.type_name }));
    return (
      <SelectDropMenu
        title={'产品类型'}
        items={items}
        onChange={this.handleProductionTypeChange}
        backgroundColor={'#fdf9f5'}
        borderColor={'#ff9336'}
        isClear={this.state.type === '""'}
        isShowError={!!((this.state.verify && !this.validator('renderProductionType')))}
      />
    )
  }

  /**
   * 选择手术名称
   */
  renderOperate() {
    const items = this.props.createOrder.operateName.map(value => ({ id: value.GUID, name: value.SSMC }));
    return (
      <SelectDropMenu
        title={'手术名称'}
        items={items}
        onChange={this.handleOperateNameChange}
        backgroundColor={'#f7fbf7'}
        borderColor={'#67a374'}
        isClear={!this.state.operateId}
        isShowError={!!((this.state.verify && !this.validator('renderOperate')))}
      />
    )
  }

  /**
   * 选择手术模板
   */
  renderOperateTemplate() {
    const items = [{ id: '', name: '' }];
    this.props.createOrder.templets.map((value) => {
      items.push({ id: value.templet_id, price: value.templet_money, name: value.templet_name });
    });
    return (
      <SelectDropMenu
        title={'手术模板'}
        items={items}
        isClear={!this.state.operateTemplate}
        onChange={this.handleOperateTemplateChange}
        backgroundColor={'#fdf9f5'}
        borderColor={'#ff9336'}
      />
    )
  }

  /**
   * 选择手术部位
   */
  renderOperatePart() {
    const items = this.props.createOrder.operatePart.map(value => ({ id: value.GUID, name: value.BWMC }));
    return (
      <SelectDropMenu
        title={'手术部位'}
        items={items}
        isClear={!this.state.operatePart}
        onChange={this.handleOperatePartChange}
        backgroundColor={'#f7fbf7'}
        borderColor={'#67a374'}
        isShowError={!!((this.state.verify && !this.validator('renderOperatePart')))}
      />
    )
  }

  /**
   * 选择入路
   */
  renderIntoRoad() {
    const items = this.props.createOrder.operateIntoRoad.map(value => ({ id: value.GUID, name: value.RLMC }));
    return (
      <SelectDropMenu
        title={'入路'}
        items={items}
        isClear={!this.state.operateIntoRoad}
        onChange={this.handleIntoRoadChange}
        backgroundColor={'#f7fbf7'}
        borderColor={'#67a374'}
      />
    )
  }

  /**
   * 选择手术时间
   */
  renderOperateTime() {
    return (
      <div className='render-operate-time'>
        <img src='/CreateOrder/SurgeryTime.png' alt='' style={{ width: '25px', height: '25px', marginLeft: '16px' }} />
        <DatePicker
          autoOk
          textFieldStyle={{ height: '44px', width: 'auto', paddingLeft: '15px' }}
          onChange={(event, date) => { this.setState({ operateTime: new Date(date).getTime() }) }}
          hintText='手术时间' hintStyle={{ lineheight: '44px', width: 'inherit', color: '#979797', fontSize: '12px' }}
          disableYearSelection={false}
        />
      </div>
    )
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
   * 收货地址
   */
  renderReceiveAddress() {
    return (
      <SelectField
        errorStyle={{ bottom: '-2px' }}
        errorText={this.state.verify && !this.validator('renderReceiveAddress') && <div className='warning'>请选择收货地址</div>}
        value={this.state.receiveAddress} menuStyle={{ overflow: 'hidden' }} hintText=' ' labelStyle={{ lineHeight: '30px' }}
        onChange={this.handleReceiveAddressChange} maxHeight={200} style={{ marginRight: 15, height: 30, width: 'inherit' }}
      >
        {this.props.createOrder.receiveAddress.map(address =>
          <MenuItem value={JSON.stringify(address)} key={address.GUID} primaryText={`${address.CKMC}:${address.DZ}`} />
        )}
      </SelectField>
    )
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
   * 销售代表chip删除
   */
  handleChipRequestDelete = (data) => {
    this.setState({
      SaleManageChipData: [],
      saleManage: ''
    })
  };
  /**
   * IconMenu Request Change
   */
  handleIconMenuRequestChange = (open) => {
    this.setState({
      openSaleManage: open
    });
  }
  renderSaleManage() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{ color: this.state.verify && !this.validator('renderSaleManage') ? 'red' : '#979797',
            fontFamily: 'SourceHanSansCN-Regular',
            fontSize: '12px',
            paddingLeft: '16px' }}
        >销售代表:</span>
        <IconMenu
          maxHeight={150}
          iconButtonElement={
            this.state.saleManage ?
              <span style={{ width: '0px', height: '0px' }} /> :
              <img
                src='/CreateOrder/AddIcon.png' alt=''
                style={{ width: '30px',
                  height: '30px',
                  marginLeft: '15px',
                  cursor: 'pointer',
                  border: this.state.verify && !this.validator('renderSaleManage') ? '1px solid red' : 'none',
                  borderRadius: '15px' }}

              />
          }
          onChange={this.handleSaleManageChange}
          onRequestChange={this.handleIconMenuRequestChange}
          onItemTouchTap={() => { this.setState({ openSaleManage: false }) }}
          value={this.state.saleManage}
          open={this.state.openSaleManage}
          listStyle={{ width: '50px', height: 'auto', border: '1px solid #8e6cda' }}
        >
          {this.props.createOrder.saleManage.map(manage =>
            <MenuItem value={manage.XSRYID} key={manage.XSRYID} primaryText={manage.XSRYNAME} />
          )}
        </IconMenu>
        <div style={{ display: this.state.saleManage ? 'block' : 'none', marginLeft: '15px' }}>
          {this.state.SaleManageChipData.map(data => (
            <Chip
              key={data.XSRYID}
              onRequestDelete={this.handleChipRequestDelete}
              style={{ float: 'left', height: '30px' }}
              onTouchTap={() => { this.setState({ openSaleManage: true }) }}
            >
              {data.XSRYNAME}
            </Chip>
          ))}
        </div>
      </div>
    )
  }

  /**
   * 销售助理
   */
  handleSaleAssistantChange =(event, value) => {
    this.setState({
      saleAssistant: value,
      SaleAssistantChipData: [{
        XSRYID: value,
        XSRYNAME: event.target.innerText
      }]
    });
  }
  /**
   * IconMenu Request Change
   */
  handleAssistantIconMenuRequestChange = (open) => {
    this.setState({
      openSaleAssistant: open
    });
  }
  /**
   * 销售助理chip删除
   */
  handleAssistantChipRequestDelete = (data) => {
    this.setState({
      SaleAssistantChipData: [],
      saleAssistant: ''
    })
  };
  renderSaleAssistant() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{ color: '#979797',
            fontFamily: 'SourceHanSansCN-Regular',
            fontSize: '12px',
            paddingLeft: '16px' }}
        >销售助理:</span>
        <IconMenu
          maxHeight={150}
          iconButtonElement={
            this.state.saleAssistant ?
              <span style={{ width: '0px', height: '0px' }} /> :
              <img
                src='/CreateOrder/AddIcon.png' alt=''
                style={{ width: '30px', height: '30px', marginLeft: '15px', cursor: 'pointer', borderRadius: '15px' }}
              />
          }
          onChange={this.handleSaleAssistantChange}
          onRequestChange={this.handleAssistantIconMenuRequestChange}
          onItemTouchTap={() => { this.setState({ openSaleAssistant: false }) }}
          value={this.state.saleAssistant}
          open={this.state.openSaleAssistant}
          listStyle={{ width: '50px', height: 'auto', border: '1px solid #8e6cda' }}
        >
          {this.props.createOrder.saleAssistant.map(manage =>
            <MenuItem value={manage.XSRYID} key={manage.XSRYID} primaryText={manage.XSRYNAME} />
          )}
        </IconMenu>
        <div style={{ display: this.state.saleAssistant ? 'block' : 'none', marginLeft: '15px' }}>
          {this.state.SaleAssistantChipData.map(data => (
            <Chip
              key={data.XSRYID}
              onRequestDelete={this.handleAssistantChipRequestDelete}
              style={{ float: 'left' }}
              onTouchTap={() => { this.setState({ openSaleAssistant: true }) }}
            >
              {data.XSRYNAME}
            </Chip>
          ))}
        </div>
      </div>
      /* <SelectField
        value={this.state.saleAssistant} hintText=' ' labelStyle={{ lineHeight: '30px' }} menuStyle={{ overflow: 'hidden' }}
        onChange={this.handleSaleAssistantChange} maxHeight={200} style={{ marginRight: 15, height: 30, width: 'inherit' }}
      >
        {this.props.createOrder.saleAssistant.map(assistant =>
          <MenuItem value={assistant.XSRYID} key={assistant.XSRYID} primaryText={assistant.XSRYNAME} />
        )}
      </SelectField>*/
    )
  }

  /**
   * 医生
   */
  renderDoctor() {
    return (
      <div>
        {/* <div className='orderWidth col-lg-6 col-md-6 col-sm-12' style={{ display:'flex',alignItems:'center' }}>*/}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{ color: (this.state.verify && !this.validator('doctorManage')) ? 'red' : '#979797',
              fontSize: '12px',
              minWidth: '45px',
              marginLeft: '16px' }}
          >
            医生：
          </div>
          <AtSelect
            isClear={this.state.doctorManage === ''}
            isShowHeadIcon={false}
            isDoctor
            isShowOldSelect={false}
            isShowError={(this.state.verify && !this.validator('doctorManage'))}
            isShowAddIcon={false} errorStyle={{ bottom: '-17px' }}
            errorText={this.state.verify && !this.validator('doctorManage') && <div className='warning'>请选择主治医生</div>}
            inputStyle={{ height: '30px', lineHeight: '30px', width: 'inherit' }}
            style={{ lineHeight: '20px', width: '100%', marginTop: '-22px', paddingTop: '4px' }}
            dataSource={this.props.createOrder.doctorList} title=' '
            organizationId={this.state.hospital} callback={this.handleDoctorManageChange}
          />
        </div>
      </div>
    )
  }
  manageAddrDialogOpen = () => {
    this.setState({ manageAddrDialogOpen: true })
  }
  manageAddrDialogClose = () => {
    this.setState({ manageAddrDialogOpen: false })
  }

  chooseAddrDialog = () => {
    this.setState({ chooseAddrDialogOpen: true })
    // if(this.props.createOrder.receiveAddress.length > 0){
    //   this.setState({chooseAddrDialogOpen:true})
    // }
  }

  chooseAddrDialogClose = () => {
    this.setState({ chooseAddrDialogOpen: false })
  }
  chooseAddrDialogSure = () => {
    this.setState({
      LXSJ: JSON.parse(this.state.temptAddress).LXSJ,
      receiveAddress: JSON.parse(this.state.temptAddress),
      DZ: `${JSON.parse(this.state.temptAddress).CKMC}:${JSON.parse(this.state.temptAddress).DZ}`
    })
    this.setState({ chooseAddrDialogOpen: false, isSelectAdress: true })
  }
  handleCallback = (returnValue) => {
    this.setState({ inventoryName: returnValue.name, inventoryId: returnValue.id });
  };
  handleButtonClick = () => {
    this.setState({ DialogDepotOpen: !this.state.DialogDepotOpen });
  };

  handleAlertProductionType =() => {
    if (!(!!this.state.operateTemplate || this.dataSource.length < 1)) {
      this.setState({ alertProductionTypeOpen: !this.state.alertProductionTypeOpen })
    }
  }
  /* 获取光标*/
  myFocus = () => {
    this.setState({
      isFocus: !this.state.isFocus
    });
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
    this.state.storageDataSource.map((value) => {
      if (this.isSearchGoodsInfoLike(value)) {
        newDataSource.push(value);
      }
    })
    this.setState({
      fiterDataSource: newDataSource
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
        fiterDataSource: this.state.storageDataSource
      })
    }
    this.setState({
      searchText: this.state.searchText
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
   * 搜索框失去焦点
   */
  handleSearchInputBlur = () => {
    if (this.state.searchText === '') {
      this.setState({
        fiterDataSource: this.state.storageDataSource,
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
      fiterDataSource: []
    })
  }

  handleInputFocus = (event) => {
    event.target.select();
  }

  render() {
    const organizationId = this.state.organizationId
    const actions =
      (<nav>
        <GoBackButton /> &nbsp;
        <RaisedButton
          onTouchTap={this.handleSubmitOrder}
          label='提交订单' buttonStyle={{ backgroundColor: '#00A0FF', }}
          labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }}
        />
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
          return <EditCell
            onFocus={(event) => { this.handleInputFocus(event) }}
            value={num}
            onChange={value => this.handleNumberChange(row, value)}
          />
        }
      }]
    }
    const manageAddrActions = [
      <FlatButton
        label='返回'
        onTouchTap={this.manageAddrDialogClose}
      />
    ];
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
    return (
      <div style={{ height: '100%' }}>
        <StandardDataGrid
          title='创建手术订单'
          label={'手术'}
          message={'您当前正在手术下单'}
          actions={actions}
          iconPosition={'-120px -120px'}
          childrenStyle={{ overflow: 'hidden', paddingBottom: '0px' }}
        >
          <div className='create-order'>
            <div style={{ height: goodsKinds ? 'calc(100% - 48px)' : '100%', overflow: 'auto', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignContent: 'space-between', flexWrap: 'wrap', flexDirection: 'column' }} className='col-sm-12'>
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
                  <div className='col-lg-6 col-md-6 col-sm-12 createOrder'>
                    <div className={this.state.sellType === 0 ? 'orderWidth col-sm-12 ' : 'orderWidth col-lg-4 col-md-4 col-sm-12'}>
                      {this.renderSellType()}
                    </div>
                    <div
                      className={this.state.sellType === 0 ? 'orderWidth col-sm-12 ' : 'orderWidth col-lg-8 col-md-8 col-sm-12'}
                      style={this.state.sellType ? {} : { display: 'none' }}
                    >
                      {this.renderDistribution()}
                    </div>
                    <div className='orderWidth col-sm-12 '>
                      {this.renderHospital()}
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12' style={{ background: 'transparent' }}>
                      {this.renderSaleManage()}
                    </div>

                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12' style={{ background: 'transparent' }}>
                      {this.renderSaleAssistant()}
                    </div>

                    <div className='orderWidth col-sm-12 '>
                      <div>
                        <LOBSelect
                          newStyleFlag style={{ height: 30, width: 'inherit', overflow: 'inherit' }}
                          errorText={this.state.verify && !this.validator('LOBSelect') && <div className='warning'>请选择业务线</div>}
                          labelStyle={{ lineHeight: '30px' }} menuStyle={{ overflow: 'hidden' }}
                          buyerOrganizationId={this.state.hospital} sellerOrganizationId={organizationId}
                          contract_type={contract_type} callback={this.handleLOBSelectCallback}
                        />
                      </div>
                    </div>
                    <div className='orderWidth col-sm-12 '>
                      <div>
                        <BrandSelect
                          newStyleFlag style={{ height: 30, width: 'inherit', overflow: 'inherit' }}
                          errorText={this.state.verify && !this.validator('BrandSelect') && <div className='warning'>请选择品牌</div>}
                          labelStyle={{ lineHeight: '30px' }} menuStyle={{ overflow: 'hidden' }}
                          buyerOrganizationId={this.state.hospital} sellerOrganizationId={organizationId}
                          LOBId={this.state.lobId} contractType={contract_type} callback={this.handleBrandSelectChange}
                        />
                      </div>
                    </div>
                    <div className='orderWidth col-sm-12 '>
                      {this.renderProductionType()}
                    </div>
                    <div className='orderWidth col-sm-12 '>
                      {this.renderOperateTemplate()}
                    </div>
                    {/* <div className='orderWidth col-sm-12 '>
                     <div style={{ margin: '0 8px 0 -8px' }}>
                     联系人:
                     </div>
                     <div style={{ height: 30, width: 'inherit', lineHeight: '30px', marginTop: -4 }}>
                     {this.state.receiveAddress ?
                          <TextField value={JSON.parse(this.state.receiveAddress).LXR}
                                     inputStyle={{ height: 30, width: 'inherit', lineHeight: '30px', padding: 2 }}
                                    style={{ width: 'inherit', height: 35, lineHeight: '20px' }} /> :
                                  <TextField value='' style={{ width: 'inherit', height: 35, lineHeight: '20px' }} />}
                     </div>
                     </div>*/}

                    {/* <div className='orderWidth col-sm-12 '>
                     <div style={{ margin: '0 8px 0 -8px' }}>
                     联系电话:
                     </div>
                     <div style={{ height: 30, width: 'inherit', lineHeight: '30px', marginTop: -4 }}>
                     {this.state.LXSJ ? <TextField value={this.state.LXSJ} onChange={this.handleLXDHChange}
                        inputStyle={{ height: 30, width: 'inherit', lineHeight: '30px', padding: 2 }}
                        style={{ width: 'inherit', height: 35, lineHeight: '20px' }} /> :
                        <TextField value='' style={{ width: 'inherit', height: 35, lineHeight: '20px' }} />}
                     </div>
                     </div>*/}

                    <div className='orderWidth col-sm-12 '>
                      {this.renderSendTime()}
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
                              <span className='logisAddress'>{this.state.receiveAddress.CKMC}<br />{this.state.receiveAddress.DZ}</span>
                            </div>
                            <div className='creat__DZIphone'>
                              <span className='logWidth'>联系人：</span>
                              <span className='logPersonName'>{this.state.receiveAddress.LXR}<br />{this.state.LXSJ}</span>
                            </div>
                          </div>
                          <div className='addressIcon'>〉</div>
                        </div>
                      </div>
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12' style={{ diaplay: this.state.sellType ? 'block' : 'none' }}>
                      <div>
                        &nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 createOrder'>
                    <div className='orderWidth col-sm-12'>
                      {this.renderOperate()}
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      {this.renderOperatePart()}
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      {this.renderIntoRoad()}
                    </div>
                    <div>
                      <div className='orderWidth col-sm-12' style={{ background: 'transparent', height: 'auto' }}>
                        {this.renderDoctor()}
                      </div>
                      <div className='orderWidth col-sm-12' style={{ background: 'transparent' }}>
                        {this.renderOperateTime()}
                      </div>
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      <StandardTextField value={this.state.patientName} onChange={this.handlePatientNameChange} hintText=' ' name='病人姓名' />
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12' style={{ background: 'transparent' }}>
                      <div style={{ width: '80px', paddingLeft: '16px', fontSize: '12px' }}>
                        性别：
                      </div>
                      <div style={{ width: '70%', marginTop: '10px' }}>
                        {this.renderSex()}
                      </div>
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      <StandardTextField
                        isNumberLimited inputStyle={{ textAlign: 'right' }}
                        value={this.state.age} onChange={this.handleAgeChange} hintText=' ' name='年龄'
                      />
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      <StandardTextField value={this.state.bedNumber} onChange={this.handleBedNumberChange} hintText=' ' name='床位号' />
                    </div>
                    <div className='orderWidth col-lg-6 col-md-6 col-sm-12'>
                      <StandardTextField value={this.state.inpatientNumber} onChange={this.handleInpatientNumberChange} hintText=' ' name='住院号' />
                    </div>
                    <div className='orderWidth col-sm-12' style={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
                      <div className='who' style={{ minWidth: '48px', marginLeft: '16px' }}>@谁：</div>
                      <div style={{ position: 'relative' }}>
                        <AtSelect
                          isShowOldSelect={false} isClear={this.state.atSelect.length === 0}
                          isShowAddIcon={false} organizationId={organizationId}
                          callback={this.handleAtSelectChange} underlineStyle={{ width: '99%' }}
                          inputStyle={{ width: 'inherit' }}
                        />
                      </div>
                    </div>
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
                        callback={this.handleOrderAtMessageChange}
                        textFocus={this.OrderAtFocus}
                        id='OrderAtTextField' atMContent='订单备注'
                        Src='/CreateOrder/liuyanbeizhu.png'
                        isCreateOrder textareaStyle={{ marginTop: 0 }}
                      />
                    </div>
                  </div>
                </CardUI>
              </div>
              <div className='col-sm-12' style={{ paddingBottom: '16px', display: this.state.operateTemplate ? 'none' : 'block' }}>
                <div className='prestrainGoods'>
                  <AppBar
                    title={(!!this.state.operateTemplate || this.dataSource.length < 1) ?
                            `预加载商品清单，已加载符合产品类型的商品：${this.dataSource.length}种` : `已加载符合产品类型的商品${this.dataSource.length}种,前往查看进行添加`}
                    iconElementLeft={<img
                      src={(!!this.state.operateTemplate || this.dataSource.length < 1) ?
                                                '/CreateOrder/PreLoadedGoods.png' : '/CreateOrder/LoadedGoods.png'} alt=''
                    />}
                    iconElementRight={(!!this.state.operateTemplate || this.dataSource.length < 1) ?
                      <div /> : <img src={'/CreateOrder/RightArrowIcon.png'} alt='' />}
                    titleStyle={{ fontFamily: 'SourceHanSansCN-Medium',
                      fontSize: '14px',
                      color: (!!this.state.operateTemplate || this.dataSource.length < 1) ? '#4a4a4a' : '#fff',
                      height: '44px',
                      lineHeight: '44px' }}
                    style={{ height: '44px',
                      cursor: (!!this.state.operateTemplate || this.dataSource.length < 1) ? 'inherit' : 'pointer',
                      backgroundColor: (!!this.state.operateTemplate || this.dataSource.length < 1) ? '#d8d8d8' : '#00a0ff' }}
                    onTouchTap={this.handleAlertProductionType}
                  />
                </div>
                <div className='addMoreGoods'>
                  <AppBar
                    title={'添加更多其他商品'}
                    iconElementLeft={<img
                      src={(!!this.state.operateTemplate || !this.state.hospital) ?
                              '/CreateOrder/PreAddMoreGoods.png' : '/CreateOrder/AddMoreGoods.png'}
                      alt='' style={{ paddingTop: (!!this.state.operateTemplate || !this.state.hospital) ? '0px' : '8px' }}
                    />}
                    iconElementRight={(!!this.state.operateTemplate || !this.state.hospital) ?
                      <div /> : <img src={'/CreateOrder/RightArrowIcon.png'} alt='' />}
                    titleStyle={{ fontFamily: 'SourceHanSansCN-Medium',
                      fontSize: '14px',
                      color: (!!this.state.operateTemplate || !this.state.hospital) ? '#4a4a4a' : '#FFFFFF',
                      height: '44px',
                      lineHeight: '44px' }}
                    style={{ height: '44px',
                      cursor: (!!this.state.operateTemplate || !this.state.hospital) ? 'inherit' : 'pointer',
                      backgroundColor: (!!this.state.operateTemplate || !this.state.hospital) ? '#d8d8d8' : '#00bf9c' }}
                    onTouchTap={this.handleAddProductionDialogOpen}
                  />
                </div>
              </div>
              <div className='col-sm-12'>
                <DataGrid
                  options={options} dataSource={this.state.fiterDataSource}
                  dataGridStyle={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
                />
              </div>
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

          </div>
        </StandardDataGrid>
        <ChooseGoodsAuthDialog
          brandId={this.state.brandId}
          businessLineId={this.state.lobId}
          contractType={Number(contract_type)}
          haveBusinessLineIdAndBrandId={!!(!!this.state.brandId && !!this.state.lobId)}
          getSelectionCallback={this.handleChooseGoodsAuthDialogCallback}
          AuthorizeOrganizationId={organizationId}
          businessLineName={this.state.lobName}
          brandName={this.state.brandName}
          AuthorizedOrganizationId={this.state.hospital}
          open={this.state.addProductionDialogOpen}
          handleDialog={this.handleAddProductionDialogClose}
        />
        <ErrorSnackBar
          message={this.state.messageDialogMessage}
          open={this.state.messageDialogOpen}
          onRequestClose={this.handleRequestClose}
        />
        <AlertProductionType
          goodsKinds={goodsKinds} goodsTotal={goodsTotal}
          dataSourceLength={this.dataSource.length}
          open={this.state.alertProductionTypeOpen}
          $$dataSource={Immutable.fromJS(this.dataSource)}
          handleAlertProductionType={this.handleAlertProductionType}
        />
        <Dialog
          actions={addrActions}
          title={
            <div>
              <span>选择收货地址</span>
              <span onTouchTap={this.manageAddrDialogOpen} style={{ display: 'none' }} className='addTitle'>管理收货地址</span>
            </div>
          }
          titleStyle={{ height: 'auto' }}
          open={this.state.chooseAddrDialogOpen}
          onRequestClose={this.chooseAddrDialogClose}
        >
          <div>
            {
              this.props.createOrder.receiveAddress.map((address, index) => <div
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
          </div>
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
            this.props.createOrder.receiveAddress.map((address, index) => <div
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
      </div>
    );
  }
}
