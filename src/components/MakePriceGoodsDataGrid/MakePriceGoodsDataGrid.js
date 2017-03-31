/**
 * Created by NXQ on 10/23/2016.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'

import './MakePriceGoodsDataGrid.scss';

import ChineseDatePicker from 'components/ChineseDatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CurrencySelect from 'components/CurrencySelect';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LOBSelect from 'components/LOBSelect'
import BrandSelect from 'components/BrandSelect'
import ThreeCategorySelector from 'components/ThreeCategorySelector';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionGavel from 'material-ui/svg-icons/action/gavel';
import DataGrid from 'components/DataGrid';
import moment from 'moment';
import MakePriceSingleGoodsDialog from 'components/MakePriceSingleGoodsDialog';

/**
 * 使用场景：信用查询列表
 * 接口： 暂不清楚接口
 */
export default class MakePriceGoodsDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SelectShowGoodsTypeValue: 0,
      SelectEffectStateValue: 0,
      options: {
        columnOptions: [
          {
            label: '商品ID',
            attr: 'id',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品名称',
            attr: 'name',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '物料编号',
            attr: 'no',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品描述',
            attr: 'desc',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '生效日期',
            render: row => (
              <div>
                <ChineseDatePicker name={'stopPropagationTextField'} style={{ width: 120, overflow: 'hidden' }} hintText='生效日期' value={row.effective_start_date} onChange={this.handleDataPickerChange(row)} shouldDisableDate={this.handleShouldDisableDate} />
              </div>
            ),

            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '货币种类',
            render: row => (
              <CurrencySelect style={{ width: 100, height: 50 }} callback={this.handleCurrencySelectDataGridCallBack(row)} />
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '税率%',
            render: row => (
              <TextField
                type='number' name={'stopPropagationTextField'} value={row.tax_rate} max={100} min={0} style={{ overflow: 'hidden', width: 60 }}
                hintText='税率' onChange={this.handleTaxRateChange(row)}
              />
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '含税价',
            render: row => (
              <TextField
                type='number' name={'stopPropagationTextField'} value={row.price} style={{ overflow: 'hidden', width: 80 }} max={10000000000000000} min={0}
                hintText='含税价' onChange={this.handleTaxPriceChange(row)}
              />
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '操作',
            render: row => (
              <FlatButton
                label='定价'
                primary
                icon={<ActionGavel />}
                onTouchTap={this.handleMakePriceSingleGoods(row)}
              />
            ),
            style: { overflow: 'hidden', textAlign: 'center', paddingLeft: 10, paddingRight: 10 }
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: true,
          adjustForCheckbox: true,
          enableSelectAll: true
        },
        indexStyle: {
          paddingLeft: 20,
          paddingRight: 15,
          width: '60px'
        },
        tableAttrs: {
          selectable: true,
          multiSelectable: true,
          onRowSelection: (selectedRows) => {
            let goodsArray = [];
            if (selectedRows === 'all') {
              goodsArray = this.state.options.dataSource;
            } else if (selectedRows === 'none') {
              goodsArray = [];
            } else {
              selectedRows.map((value) => {
                goodsArray.push(this.state.options.dataSource[value]);
              })
            }
            this.state.batchMakePriceGoodsArray = goodsArray;
          }
        },

        tableBodyAttrs: {
          displayRowCheckbox: true,
          stripedRows: false,
          showRowHover: true,
          deselectOnClickaway: false
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      selectLineId: -1,
      selectBrandId: -1,
      searchSubmitObj: {
        contract_type: this.props.contractType, // 合同类型
        business_line_id: -1,          // 业务线id
        brand_id: -1,                  // 品牌id
        first_class_id: -1,            // 一级分类id
        second_class_id: -1,           // 二级分类id
        third_class_id: -1,            // 三级分类id
        authorize_organization_id: -1, // 授权经销商id -- 卖方经销商
        authorized_organization_id: -1, // 被授权授权经销商id -- 买方经销商
        for_pricing: true,             // 是否在定价筛选处调用此接口
        pricing_status: '',            // true表示已经定价,false表示未定价,不传代表此参数代表查询定价和未定价
        price_status: 'now',           // now代表当前生效,future代表未生效,past代表已经失效
        money_type: '',                // 货币种类ID
        min_price: -1,                 // 最小价格
        max_price: -1                  // 最大价格
      },
      makePriceDialogOpen: false,
      makePriceDialogRowData: {},
      batchMakePriceGoodsArray: []
    }
  }

  static defaultProps = {
    /**
     * 列表模式 '0'表示显示全部 '1'表示已定价 '2'表示未定价
     */
    dataGridType: '0',   // 默认为显示全部 后续此属性需要删除
    /**
     * 后期分页参数需要获取真实数据绑定store,默认值后期需删除
     */
    currentPage: 1,
    pageLength: 5,
    totalCount: 20,
    showGoodsType: [
      '全部商品', '已定价商品', '未定价商品'
    ],
    selectEffectState: [
      '正生效', '未生效'
    ]

  };
  static propTypes = {
    /**
     * 卖方经销商id
     */
    authorizeOrganizationId: PropTypes.number.isRequired,
    /**
     * 买方经销商id
     */
    authorizedOrganizationId: PropTypes.number.isRequired,
    /**
     * 列表模式
     */
    dataGridType: PropTypes.string.isRequired,
    /**
     * 当前第几页 (后期分页参数需要获取真实数据绑定store)
     */
    currentPage: React.PropTypes.number.isRequired,
    /**
     * 每页多少条
     */
    pageLength: React.PropTypes.number.isRequired,
    /**
     * 总个数
     */
    totalCount: React.PropTypes.number.isRequired,
    /**
     * 合同类型
     */
    contractType: React.PropTypes.string.isRequired
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.makePriceGoodsDataGrid.batchMakePriceStatus === '1') {
      this.props.initPutMakePriceGoodsData();
      this.props.getMakePriceGoodsData(this.state.searchSubmitObj);
    }
    this.state.options.tableAttrs.allRowsSelected = false;
    this.state.options.dataSource = nextProps.makePriceGoodsDataGrid.makePriceGoodsData;
    this.setState({
      options: this.state.options,
      batchMakePriceGoodsArray: []
    })
  }

  /**
   * 要显示的商品类型选择器事件
   */
  handleChangeSelectGoodsType = (event, index, value) => {
    switch (Number(value)) {
      case 0:
        this.state.searchSubmitObj.pricing_status = '';
        break;
      case 1:
        this.state.searchSubmitObj.pricing_status = true;
        break;
      case 2:
        this.state.searchSubmitObj.pricing_status = false;
        break;
      default:
        break;
    }
    this.state.searchSubmitObj.price_status = 'now';
    this.setState({
      SelectShowGoodsTypeValue: value,
      SelectEffectStateValue: 0,
      searchSubmitObj: this.state.searchSubmitObj
    });
  };
  /**
   * 生效状态选择器事件
   */
  handleChangeSelectEffectState = (event, index, value) => {
    this.state.searchSubmitObj.price_status = Number(value) === 0 ? 'now' : 'future';
    this.setState({
      SelectEffectStateValue: value,
      searchSubmitObj: this.state.searchSubmitObj
    });
  };
  /**
   * 批量定价
   */
  handleTouchTapSubmitMakePrice = () => () => {
      // 需要处理时间格式,及税率值转化,增加税后价
    const batchGoodsArray = this.state.batchMakePriceGoodsArray.map((value) => {
      if (Number(value.price) > 0) {
        value.JG = value.price / (1 + (value.tax_rate / 100));
        value.SE = value.price - value.JG;
        return {
          SPID: value.id, 							                      // 商品ID
          DDLX: this.props.contractType, 						      	  // 订单类型
          DJJXSID: this.props.authorizeOrganizationId,        // 定价经销商ID
          MRJXSID: this.props.authorizedOrganizationId,       // 买入经销商ID
          MCJXSID: this.props.authorizeOrganizationId,        // 卖出经销商ID
          JG: value.JG,                                       // 单价
          HBDM: value.money_type,                             // 货币代码
          SL: value.tax_rate,                        					// 税率
          SE: value.SE,                       							  // 税额
          HSJG: value.price,                     							// 含税价格
          SXRQ: new Date(value.effective_start_date).getTime()// 生效日期
        }
      }
    })
    if (batchGoodsArray.length) {
      this.props.putMakePriceGoodsData(batchGoodsArray)
    }     // 后期else中加入友善性验证
  };
  handleTouchTapCancelMakePrice = () => {
    alert('取消定价');
  };
  /**
   * 业务线选择公共组件callback
   */
  handleLOBSelectCallBack = () => (lineId) => {
    this.state.searchSubmitObj.business_line_id = lineId;
    this.state.searchSubmitObj.brand_id = -1;
    this.state.searchSubmitObj.first_class_id = -1;
    this.state.searchSubmitObj.second_class_id = -1;
    this.state.searchSubmitObj.third_class_id = -1;
    this.setState({
      selectLineId: lineId,
      selectBrandId: -1,    // 如果业务线重新选择需要把品牌ID重新置为-1,因为品牌选择器和三分类两公共组件方便判断
      searchSubmitObj: this.state.searchSubmitObj
    });
  }
  /**
   * 品牌选择器公共组件callback
   */
  handleBrandSelectCallBack = () => (brandId) => {
    this.state.searchSubmitObj.brand_id = brandId;
    this.state.searchSubmitObj.first_class_id = -1;
    this.state.searchSubmitObj.second_class_id = -1;
    this.state.searchSubmitObj.third_class_id = -1;
    this.setState({
      searchSubmitObj: this.state.searchSubmitObj,
      selectBrandId: brandId
    });
  }
  /**
   * 三分类公共组件CallBack
   */
  handleThreeCategorySelectorCallBack = () => ({ firstClassId, secondClassId, thirdClassId }) => {
    this.state.searchSubmitObj.first_class_id = firstClassId;
    this.state.searchSubmitObj.second_class_id = secondClassId;
    this.state.searchSubmitObj.third_class_id = thirdClassId;
    this.setState({
      searchSubmitObj: this.state.searchSubmitObj
    });
  }
  /**
   * 货币选择器公共组件callback
   */
  handleCurrencySelectCallBack = () => (currencyValue) =>　{
    this.state.searchSubmitObj.money_type = currencyValue;
    this.setState({ searchSubmitObj: this.state.searchSubmitObj });
  }
  /**
   * 最大价格/最小价格OnChange
   */
  handlePriceGoodsChange = type => (event) => {
    let inputValue = Number(event.target.value);
    if (inputValue > -1) {
      if (inputValue > 10000000000000000) {
        inputValue = 10000000000000000;
      }
    } else {
      inputValue = 1;
    }
    event.target.value = inputValue;

    type === 0 ? this.state.searchSubmitObj.min_price = inputValue : this.state.searchSubmitObj.max_price = inputValue;
    this.setState({ searchSubmitObj: this.state.searchSubmitObj });
  }
  /**
   * 单个商品定价
   */
  handleMakePriceSingleGoods = row => () => {
    this.setState({   // 会产生事件透传
      makePriceDialogOpen: !this.state.makePriceDialogOpen,
      makePriceDialogRowData: row
    });
  }
  /**
   * 搜索商品
   */
  handleSearchGoods = () => () => {
    if (Number(this.state.SelectShowGoodsTypeValue) !== 1) {
      this.state.searchSubmitObj.price_status = '';
    }
    this.state.searchSubmitObj.authorize_organization_id = this.props.authorizeOrganizationId;
    this.state.searchSubmitObj.authorized_organization_id = this.props.authorizedOrganizationId;
    this.setState({ searchSubmitObj: this.state.searchSubmitObj });
    this.props.getMakePriceGoodsData(this.state.searchSubmitObj);
  }
  /**
   * DataPickerDisableDate
   */
  handleShouldDisableDate = date => date < moment();
  /**
   * DataPickerOnChange
   */
  handleDataPickerChange = row => (n, date) => {
    row.effective_start_date = date;       // 商品生效日期
    this.setState({ options: this.state.options });
  }
  /**
   * DataGrid中货币选择器公共组件callback
   */
  handleCurrencySelectDataGridCallBack = row => (currencyValue) =>　{
    row.money_type = currencyValue;
    this.setState({ options: this.state.options });
  }
  /**
   * 税率%OnChange
   */
  handleTaxRateChange = row => (event) => {
    row.tax_rate = event.target.value;
    this.state.options.tableBodyAttrs.deselectOnClickaway = false;
    this.setState({ options: this.state.options });
  }
  /**
   * 含税价OnChange
   */
  handleTaxPriceChange = row => (event) => {
    row.price = event.target.value;
    this.setState({ options: this.state.options });
  }
  /**
   * 单个商品定价Dialog
   */
  handleTouchTapMakePriceDailogOpen = () => {
    this.setState({ makePriceDialogOpen: !this.state.makePriceDialogOpen });
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
      if (event.target.name === 'stopPropagationTextField' || event.target.textContent === '人民币元') {  // 后期此处增加其他币种待完善
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
  }
  render() {
    return (
      <div className='make-rice-goods-gatagrid'>
        <div style={{ borderBottom: '1px solid #bbb', padding: 20, marginBottom: 10, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, width: '100%', marginRight: 30, height: 40, lineHeight: '40px' }}>定价管理</div>
          <div style={{ paddingTop: 20, paddingBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <LOBSelect hintText='选择业务线' callback={this.handleLOBSelectCallBack()} buyerOrganizationId={Number(this.props.authorizedOrganizationId)} sellerOrganizationId={Number(this.props.authorizeOrganizationId)} />
            <BrandSelect hintText='选择品牌' callback={this.handleBrandSelectCallBack()} LOBId={Number(this.state.selectLineId)} buyerOrganizationId={Number(this.props.authorizedOrganizationId)} sellerOrganizationId={Number(this.props.authorizeOrganizationId)} />
            <ThreeCategorySelector callback={this.handleThreeCategorySelectorCallBack()} businessLineId={Number(this.state.selectLineId)} brandId={Number(this.state.selectBrandId)} buyerOrganizationId={Number(this.props.authorizedOrganizationId)} sellerOrganizationId={Number(this.props.authorizeOrganizationId)} />
            <SelectField
              labelStyle={{ lineHeight: '40px' }}
              value={this.state.SelectShowGoodsTypeValue}
              hintText='商品类型选择'
              onChange={this.handleChangeSelectGoodsType}
              maxHeight={200}
              style={{ marginRight: 15, height: 40, overflow: 'hidden' }}
            >
              {
                this.props.showGoodsType.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
              }
            </SelectField>
            <SelectField
              labelStyle={{ lineHeight: '40px' }}
              value={this.state.SelectEffectStateValue}
              hintText='生效状态选择'
              onChange={this.handleChangeSelectEffectState}
              maxHeight={200}
              style={{ marginRight: 15, height: 40, overflow: 'hidden', display: Number(this.state.SelectShowGoodsTypeValue) === 1 ? 'block' : 'none' }}
            >
              {
                this.props.selectEffectState.map((value, index) => <MenuItem key={`_selectCategoryItem3_${index}`} value={index} primaryText={value} />)
              }
            </SelectField>
            <CurrencySelect style={{ height: 40 }} labelStyle={{ lineHeight: '40px' }} callback={this.handleCurrencySelectCallBack()} />
            <div style={{ marginRight: 15, fontSize: 16, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{ height: 40, overflow: 'hidden', lineHeight: '40px' }} > 价格： </span>
              <TextField style={{ marginRight: 15, height: 40, overflow: 'hidden' }} type='number' max={10000000000000000} min={0} hintText='最小价格' onChange={this.handlePriceGoodsChange(0)} />
              <TextField style={{ height: 40, overflow: 'hidden' }} type='number' max={10000000000000000} min={0} hintText='最大价格' onChange={this.handlePriceGoodsChange(1)} />
            </div>
            <FlatButton
              label='搜索商品'
              primary
              icon={<ActionSearch />}
              onTouchTap={this.handleSearchGoods()}
            />
          </div>
        </div>
        {
          (() => {
            if (this.state.options.dataSource.length) {
              return (<div>
                <DataGrid options={this.state.options} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 100 }}>
                  <FlatButton
                    label='取消定价'
                    style={{ marginTop: 15, marginRight: 15, width: 60, display: 'none' }}
                    primary
                    onTouchTap={this.handleTouchTapCancelMakePrice}
                  />
                  <RaisedButton
                    label='批量定价'
                    style={{ marginTop: 15, marginRight: 15, width: 140 }}
                    primary
                    icon={<ActionGavel />}
                    onTouchTap={this.handleTouchTapSubmitMakePrice()}
                  />
                </div>
              </div>)
            }
          })()
        }
        <div>
          <MakePriceSingleGoodsDialog goodsData={this.state.makePriceDialogRowData} open={this.state.makePriceDialogOpen} handleMakePriceDailog={this.handleTouchTapMakePriceDailogOpen} contractType={this.props.contractType} authorizeOrganizationId={Number(this.props.authorizeOrganizationId)} authorizedOrganizationId={this.props.authorizedOrganizationId} />
        </div>
      </div>

    )
  }
}

