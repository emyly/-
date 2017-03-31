/**
* Created by NXQ on 10/20/2016.
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

/* material-ui components */
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/* common components */
import DataGrid from 'components/DataGrid'

/* action creators */
import { getLOBData } from 'components/LOBSelect/modules/lobSelect'
import { getBrandData } from 'components/BrandSelect/modules/brandSelect'
import { fetchFirstClassSelection } from './modules/firstClassSelection'
import { fetchSecondClassSelection } from './modules/secondClassSelection'
import { fetchThirdClassSelection } from './modules/thirdClassSelection'
import {
  fetchAuthorizationSelectionGoods,
  fetchAuthorizationSelectionGoodsSuccess
} from './modules/authorizationSelectionGoods'
import {
  searchAuthorizedGoods,
  searchAuthorizedGoodsSuccess
 } from './modules/searchAuthorizedGoods'
import { setChoosedAuthGoods } from './modules/setChoosedAuthGoods'

import _ from 'lodash'

import './ChooseGoodsAuthDialog.scss'

/**
 * NOTE: Three use cases
 *
 * scenario 1:
 *   provide props: authorizeOrgId, authorizedOrgId
 *   property haveBusinessLineIdAndBrandId need to be set
 *
 * scenario 2:
 *   provide businessLineId, besides props required in scenario 1
 *   property haveBusinessLineId need to be set
 *
 * scenario 3:
 *   provide brandId, besides props required in scenario 2
 *
 */

/**
* 使用场景：根据授权选择商品
*/
class ChooseGoodsAuthDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /* base selection dialog options */
      options: {
        columnOptions: [
          {
            label: '物料编号',
            attr: 'no',
            style: { width: '10%', paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
            tableHeaderColumnStyle: { width: '10%' }
          },
          {
            label: '商品名称',
            attr: 'name',
            style: { width: '30%', overflow: 'hidden', paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
            tableHeaderColumnStyle: { width: '30%' }
          },
          {
            label: '商品规格',
            attr: 'desc',
            style: { width: '30%', paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
            tableHeaderColumnStyle: { width: '30%' }
          },
          {
            label: '商品价格',
            attr: 'price',
            style: { width: '15%', paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
            tableHeaderColumnStyle: { width: '15%' }
          },
          {
            label: '数量',
            style: { width: '15%', paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
            tableHeaderColumnStyle: { width: '15%' },
            render: row => (
              <div className='symbol'>
                <button tabIndex={-1} type='button' className='decrease' onClick={this.handleIncreaseAmount(row, -1)}>-</button>
                <input
                  type='number' value={row.SL} style={{ width: 30, textAlign: 'center', borderBottom: '1px solid #00A0FF' }} min={0}
                  onChange={this.handleChoosedAmountChange(row)}
                  onFocus={event => event.target.select()}
                  onBlur={event => this.handleInputNumberBlur(row)}
                />
                <button tabIndex={-1} type='button' className='increase' onClick={this.handleIncreaseAmount(row, 1)}>+</button>
              </div>
            ),
          },
        ],
        tableAttrs: {
          selectable: false,
          fixedHeader: true,
          height: '336px'
        },
        bodyStyle: {
          overflow: 'auto',
        },
        tableHeaderAttrs: { displaySelectAll: false, adjustForCheckbox: false },
        tableBodyAttrs: { displayRowCheckbox: false, stripedRows: true, showRowHover: true },
        showIndex: true
      },

      /* choosed Goods */
      // selectedGoods: JSON.parse(JSON.stringify(this.props.choosedAuthGoods)),
      selectedGoods: this.props.choosedAuthGoods,
      goodsList: [],
      searchText: '',
      searchErrorText: '',
      totalGoods: this.props.choosedAuthGoods.reduce((acc, current) => acc + parseInt(current.SL, 10), 0),
      kindsOfGoods: this.props.choosedAuthGoods.length,

      /* variables */
      contractType: this.props.contractType,
      authorizeOrgId: this.props.AuthorizeOrganizationId || null,
      authorizedOrgId: this.props.AuthorizedOrganizationId || null,
      businessLineId: this.props.businessLineId || null,
      brandId: this.props.brandId || null,
      firstClassId: null,
      secondClassId: null,
      thirdClassId: null,
    }
  }

  handleDataFetch = () => {
    if (this.props.haveBusinessLineIdAndBrandId) {
      this.props.fetchFirstClassSelection({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        brandId: this.state.brandId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    } else if (this.props.haveBusinessLineId && this.props.businessLineId) {
      this.props.getBrandData({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    } else {
      this.props.getLOBData(
        this.state.contractType,
        this.state.authorizeOrgId,
        this.state.authorizedOrgId
      )
    }
  }

  constructGoodsList = goodsList => (
    goodsList.map((item) => {
      const choosedItem = this.state.selectedGoods.find(it => it.id === item.id)
      return {
        ...item,
        SL: choosedItem ? parseInt(choosedItem.SL, 10) : 0
      }
    })
  )

  componentWillMount() {
    if (this.props.iSNeedFetchApi) {
      this.handleDataFetch();
    }
    this.setState({
      goodsList: this.constructGoodsList(this.props.authGoods),
      options: this.state.options
    })
  }

  componentWillReceiveProps(nextProps) {
    /* Update search goods list when data changed */
    if (!_.isEqual(this.props.searchGoods, nextProps.searchGoods)) {
      this.setState({
        goodsList: this.constructGoodsList(nextProps.searchGoods)
      })
    }

    /* update authGoods list when data changed */
    if (!_.isEqual(this.props.authGoods, nextProps.authGoods)) {
      this.setState({
        goodsList: this.constructGoodsList(nextProps.authGoods)
      })
    }

    /* update authorizeOrgId when needed */
    if (nextProps.AuthorizeOrganizationId !== this.props.AuthorizeOrganizationId) {
      this.setState({
        authorizeOrgId: nextProps.AuthorizeOrganizationId,
        goodsList: [],
      }, () => {
        this.handleDataFetch()
      })
    }

    /* update authorizedOrgId when needed */
    if (nextProps.AuthorizedOrganizationId !== this.props.AuthorizedOrganizationId) {
      this.setState({
        authorizedOrgId: nextProps.AuthorizedOrganizationId,
        goodsList: [],
      })
    }
    // /* update choosedAuthGoods when needed */
    if (nextProps.choosedAuthGoods !== this.state.selectedGoods) {
      this.setState({
        selectedGoods: nextProps.choosedAuthGoods,
        totalGoods: nextProps.choosedAuthGoods.reduce((acc, current) => acc + parseInt(current.SL, 10), 0),
        kindsOfGoods: nextProps.choosedAuthGoods.reduce((acc, current) => (parseInt(current.SL, 10) > 0 ? acc + 1 : acc), 0),
      }, () => {
        this.setState({
          /* force update goodsList to show correct amount electedGoods selectedGoodschanged */
          goodsList: this.constructGoodsList(this.state.goodsList),
        })
      })
    }

    /* update state data when businessLineId changed */
    if (nextProps.haveBusinessLineIdAndBrandId !== this.props.haveBusinessLineIdAndBrandId ||
      nextProps.businessLineId !== this.props.businessLineId) {
      this.setState({
        haveBusinessLineIdAndBrandId: nextProps.haveBusinessLineIdAndBrandId,
        businessLineId: nextProps.businessLineId,
        brandId: nextProps.brandId,
        goodsList: [],
        firstClassId: null,
        secondClassId: null,
        thirdClassId: null,
      }, this.handleDataFetch)
    }

    /* clear selection if necessary when dialog request close */
    if (this.props.open === true && nextProps.open === false) {
      this.handleClearSelection()
    }
  }

  static defaultProps = {
    lobSelect: [],
    brandSelect: [],
    firstClassSelectors: [],
    secondClassSelectors: [],
    thirdClassSelectors: [],
    authGoods: [],
    iSNeedFetchApi: true
  }

  static propTypes = {
    iSNeedFetchApi: PropTypes.bool, // 是否请求API
    contractType: PropTypes.number.isRequired,
    AuthorizeOrganizationId: PropTypes.number.isRequired, /* 卖方经销商id */
    AuthorizedOrganizationId: PropTypes.number.isRequired, /* 买方经销商id */
    handleDialog: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    haveBusinessLineIdAndBrandId: PropTypes.bool.isRequired,    /* if props have businessLineId and brandId */
    haveBusinessLineId: PropTypes.bool, /* provide business line id */
    businessLineId: PropTypes.number,
    businessLineName: PropTypes.string,
    brandId: PropTypes.number,
    brandName: PropTypes.string,

    /* callback function to get choosed goods */
    getSelectionCallback: PropTypes.func,

    /* selector props */
    lobSelect: PropTypes.array.isRequired,
    brandSelect: PropTypes.array.isRequired,
    firstClassSelectors: PropTypes.array.isRequired,
    secondClassSelectors: PropTypes.array.isRequired,
    thirdClassSelectors: PropTypes.array.isRequired,
    authGoods: PropTypes.array.isRequired,
    searchGoods: PropTypes.array.isRequired,
    choosedAuthGoods: PropTypes.array.isRequired,

    /* action creator */
    getLOBData: PropTypes.func.isRequired,
    getBrandData: PropTypes.func.isRequired,
    fetchFirstClassSelection: PropTypes.func.isRequired,
    fetchSecondClassSelection: PropTypes.func.isRequired,
    fetchThirdClassSelection: PropTypes.func.isRequired,
    fetchAuthorizationSelectionGoods: PropTypes.func.isRequired,
    fetchAuthorizationSelectionGoodsSuccess: PropTypes.func.isRequired,
    searchAuthorizedGoods: PropTypes.func.isRequired,
    searchAuthorizedGoodsSuccess: PropTypes.func.isRequired,
    setChoosedAuthGoods: PropTypes.func.isRequired,
  }

  handleInputNumberBlur = (row) => {
    const choosedItem = this.state.goodsList.find(item => item.id === row.id)
    if (isNaN(choosedItem.SL)) return
    if (choosedItem) {
      const newAmount = parseInt(choosedItem.SL, 10)
      const index = _.findIndex(this.state.selectedGoods, item => item.id === choosedItem.id)
      if (index >= 0) {
        this.state.selectedGoods[index].SL = newAmount
      } else {
        this.state.selectedGoods.push(_.merge({}, choosedItem))
      }

      this.setState({
        selectedGoods: this.state.selectedGoods,
        totalGoods: this.state.selectedGoods.reduce((acc, current) => acc + parseInt(current.SL, 10), 0),
        kindsOfGoods: this.state.selectedGoods.reduce((acc, current) => (parseInt(current.SL, 10) > 0 ? acc + 1 : acc), 0),
        options: this.state.options,
      })
    }
  }

  handleIncreaseAmount = (row, amount) => () => {
    const item = this.state.goodsList.find(it => it.id === row.id)
    if (item) {
      const newAmount = parseInt(item.SL, 10) + parseInt(amount, 10)
      item.SL = newAmount < 0 ? 0 : newAmount
    }
    this.setState({
      goodsList: this.state.goodsList
    })
    this.handleInputNumberBlur(row)
  }

  handleChoosedAmountChange = row => (event) => {
    const item = this.state.goodsList.find(it => it.id === row.id)
    if (item) {
      item.SL = parseInt(event.target.value, 10)
    }
    this.setState({
      goodsList: this.state.goodsList,
    })
  }

  handleSubmitGoodsSubmit = () => {
    this.setState({
      selectedGoods: this.state.selectedGoods.filter(item => item.SL > 0)
    }, () => {
      if (_.isFunction(this.props.getSelectionCallback)) {
        this.props.getSelectionCallback(this.state.selectedGoods)
      }
      this.props.setChoosedAuthGoods(this.state.selectedGoods)
      this.props.handleDialog()   /* close choose goods dialog */
    })
  }

  /* clear selection if goodsList is empty */
  handleClearSelection = () => {
    if (this.state.goodsList.length === 0) {
      this.setState({
        businessLineId: this.props.businessLineId || null,
        brandId: this.props.brandId || null,
        firstClassId: null,
        secondClassId: null,
        thirdClassId: null,
        searchText: '',
      })
    }
  }

  /**
  * LOB Selector
  */
  handleLOBChange = (event, index, value) => {
    /* clear authorizationSelectionGoods */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    /* As setState is asynchronous function */
    this.setState({
      searchErrorText: '',
      businessLineId: value,
      brandId: null,
      firstClassId: null,
      secondClassId: null,
      thirdClassId: null,
    }, () => {
      this.props.getBrandData({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    })
  }

  getLOBSelector = () => (
    <SelectField
      iconStyle={{ fill: '#000' }}
      underlineStyle={{ display: 'none' }}
      hintStyle={{ top: '20px',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '15px',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'left',
        paddingLeft: '1rem'
      }}
      labelStyle={{ top: '0px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '1rem' }}
      maxHeight={200} style={{ height: 60, overflow: 'hidden' }}
      value={this.state.businessLineId} hintText={'选择业务线'} onChange={this.handleLOBChange}
    >
      {
        (() => (
          this.props.haveBusinessLineIdAndBrandId ?
            <MenuItem value={this.props.businessLineId} key={this.props.businessLineId} primaryText={this.props.businessLineName} /> :
            this.props.lobSelect.map(line =>
              <MenuItem value={line.business_line_id} key={line.business_line_id} primaryText={line.business_line_name} />
            )
        ))()
      }
    </SelectField>
  )

  /**
  * Brand Selector
  */
  handleBrandChange = (event, index, value) => {
    /* clear authorizationSelectionGoods */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    this.setState({
      searchErrorText: '',
      brandId: value,
      firstClassId: null,
      secondClassId: null,
      thirdClassId: null,
    }, () => {
      this.props.fetchFirstClassSelection({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        brandId: this.state.brandId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    })
  }

  getBrandSelector = () => (
    <SelectField
      iconStyle={{ fill: '#000' }}
      underlineStyle={{ display: 'none' }}
      hintStyle={{ top: '20px',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '15px',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'left',
        paddingLeft: '1rem'
      }}
      labelStyle={{ top: '0px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '1rem' }}
      maxHeight={200} style={{ height: 60, overflow: 'hidden' }}
      value={this.state.brandId} hintText={'选择品牌'} onChange={this.handleBrandChange}
    >
      {
        (() => (
          this.props.haveBusinessLineIdAndBrandId ?
            <MenuItem value={this.props.brandId} key={this.props.brandId} primaryText={this.props.brandName} /> :
            this.props.brandSelect.map(brand =>
              <MenuItem value={brand.brand_id} key={brand.brand_id} primaryText={brand.brand_name} />
            )
          )
        )()
      }
    </SelectField>
  )

  /**
   *  first class selector
   */
  firstClassChange = (event, index, value) => {
    /* clear authorizationSelectionGoods */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    this.setState({
      firstClassId: value,
      secondClassId: null,
      thirdClassId: null,
    }, () => {
      this.props.fetchSecondClassSelection({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        brandId: this.state.brandId,
        firstClassId: this.state.firstClassId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    })
  }

  getFirstClassSelector = itemList => (
    <SelectField
      iconStyle={{ fill: '#000' }}
      underlineStyle={{ display: 'none' }}
      hintStyle={{ top: '20px',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '15px',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'left',
        paddingLeft: '1rem'
      }}
      labelStyle={{ top: '0px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '1rem' }}
      maxHeight={200} style={{ height: 60, overflow: 'hidden' }}
      value={this.state.firstClassId} hintText={'一级分类'}
      onChange={this.firstClassChange}
    >
      {itemList.map((select, index) =>
        <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
      )}
    </SelectField>
  )

  /**
   *  second class selector
   */
  secondClassChange = (event, index, value) => {
    /* clear authorizationSelectionGoods */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    this.setState({
      secondClassId: value,
      thirdClassId: null,
    }, () => {
      this.props.fetchThirdClassSelection({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        brandId: this.state.brandId,
        firstClassId: this.state.firstClassId,
        secondClassId: this.state.secondClassId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    })
  }

  getSecondClassSelector = itemList => (
    <SelectField
      iconStyle={{ fill: '#000' }}
      underlineStyle={{ display: 'none' }}
      hintStyle={{ top: '20px',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '15px',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'left',
        paddingLeft: '1rem'
      }}
      labelStyle={{ top: '0px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '1rem' }}
      maxHeight={200} style={{ height: 60, overflow: 'hidden' }}
      value={this.state.secondClassId} hintText={'二级分类'}
      onChange={this.secondClassChange}
    >
      {itemList.map((select, index) =>
        <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
      )}
    </SelectField>
  )

  /**
   *  third class selector
   */
  thirdClassChange = (event, index, value) => {
    /* clear authorizationSelectionGoods */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    this.setState({ thirdClassId: value }, () => {
      this.props.fetchAuthorizationSelectionGoods({
        contractType: this.state.contractType,
        businessLineId: this.state.businessLineId,
        brandId: this.state.brandId,
        firstClassId: this.state.firstClassId,
        secondClassId: this.state.secondClassId,
        thirdClassId: this.state.thirdClassId,
        authorizeOrgId: this.state.authorizeOrgId,
        authorizedOrgId: this.state.authorizedOrgId
      })
    })
  }

  getThirdClassSelector = itemList => (
    <SelectField
      iconStyle={{ fill: '#000' }}
      underlineStyle={{ display: 'none' }}
      hintStyle={{ top: '20px',
        fontFamily: 'PingFangSC-Regular',
        fontSize: '15px',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'left',
        paddingLeft: '1rem'
      }}
      labelStyle={{ top: '0px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '1rem' }}
      maxHeight={200} style={{ height: 60, overflow: 'hidden' }}
      value={this.state.thirdClassId} hintText={'三级分类'}
      onChange={this.thirdClassChange}
    >
      {itemList.map((select, index) =>
        <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
      )}
    </SelectField>
  )

  getSelectors = () => {
    if (this.props.businessLineId && this.props.haveBusinessLineId) {
      /* if businessLineId provided */
      return (<div className='selector'>
        {this.getBrandSelector()}
        <div className='verticalLine' />
        {this.getFirstClassSelector(this.props.firstClassSelectors)}
        <div className='verticalLine' />
        {this.getSecondClassSelector(this.props.secondClassSelectors)}
        <div className='verticalLine' />
        {this.getThirdClassSelector(this.props.thirdClassSelectors)}
      </div>)
    }

    return (
      <div className='selector'>
        {this.getLOBSelector()}
        <div className='verticalLine' />
        {this.getBrandSelector()}
        <div className='verticalLine' />
        {this.getFirstClassSelector(this.props.firstClassSelectors)}
        <div className='verticalLine' />
        {this.getSecondClassSelector(this.props.secondClassSelectors)}
        <div className='verticalLine' />
        {this.getThirdClassSelector(this.props.thirdClassSelectors)}
      </div>
    )
  }

  handleKeyPress = (event) => {
    /* Listen on 'enter' key press */
    if (event.keyCode === 13) {
      this.handleSearchAction()
    }
  }

  handleSearchInput = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  handleSearchAction = () => {
    let error = false
    if (!this.state.businessLineId) {
      this.setState({ searchErrorText: '请选择业务线' })
      error = true
    } else if (!this.state.brandId) {
      this.setState({ searchErrorText: '请选择品牌' })
      error = true
    } else if (!this.state.searchText) {
      this.setState({ searchErrorText: '请输入搜索的物料号或商品名称' })
      error = true
    } else {
      this.setState({ searchErrorText: '', })
    }

    /* clear error text */
    setTimeout(() => {
      this.setState({
        searchErrorText: ''
      })
    }, 3000)

    if (error) return

    const params = {
      contract_type: this.state.contractType,
      business_line_id: this.state.businessLineId,
      brand_id: this.state.brandId,
      authorize_organization_id: this.state.authorizeOrgId,
      authorized_organization_id: this.state.authorizedOrgId,
      key: this.state.searchText
    }

    /* clear state goodsList data */
    this.props.fetchAuthorizationSelectionGoodsSuccess([])
    this.props.searchAuthorizedGoodsSuccess([])
    this.props.searchAuthorizedGoods(params)
  }

  getBaseDialog = () => {
    const actions = [
      <FlatButton
        label={`已加入购物车：${this.state.kindsOfGoods}种, ${this.state.totalGoods}件`}
        style={{ float: 'left' }} primary
      />,
      // <FlatButton label='取消' style={{ margin: 10, color: '#A3A3A3' }} onTouchTap={this.props.handleDialog} />,
      <FlatButton label='确定' primary style={{ color: '#A3A3A3' }} onTouchTap={this.handleSubmitGoodsSubmit} />
    ]
    const searchBar = (
      <div className='searchWrapperDiv'>
        <img onClick={this.handleSearchAction} src='/topNavSearchNormal.png' alt='' />
        <TextField
          inputStyle={{
            height: '35px',
          }}
          underlineShow={false}
          hintText={'请输入要搜索的物料编号'} hintStyle={{ height: '35px',
            bottom: 'inherit',
            fontFamily: 'PingFangSC-Regular',
            fontSize: '12px',
            color: '#979797', }}
          style={{ width: '80%', height: '35px', marginRight: '1%', lineHeight: '33px' }}
          onKeyDown={this.handleKeyPress}
          onChange={this.handleSearchInput} errorText={this.state.searchErrorText} value={this.state.searchText}
        />
      </div>
    )

    /* return a dialog showing list of goods */
    return (
      <Dialog
        bodyStyle={{ paddingTop: '35px' }}
        title={<div>
          <span className='bigTitle'>添加更多商品 &nbsp;&nbsp;</span>
          <span className='smallTitle'> 请修改商品数量添加至购物车</span>
          {searchBar}
        </div>}
        actions={actions} modal autoScollBodyContent
        open={this.props.open} onRequestClose={this.props.handleDialog}
        contentStyle={{ width: '90%', maxWidth: 'none', maxHeight: 'none' }}
      >
        <div style={{ height: '452px', overflow: 'hidden', display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
          <div style={{ height: '60px', width: '100%' }}>
            {this.getSelectors()}
          </div>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <DataGrid
              options={this.state.options} dataSource={this.state.goodsList}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  render() {
    return (
      <div className='choose-goods-auth-dialog'>
        {this.getBaseDialog()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lobSelect: state.lobSelect.lobData,
  brandSelect: state.brandSelect.brandData,
  firstClassSelectors: state.firstClassSelection.selectorList,
  secondClassSelectors: state.secondClassSelection.selectorList,
  thirdClassSelectors: state.thirdClassSelection.selectorList,
  authGoods: state.authorizationSelectionGoods.authGoods,
  searchGoods: state.searchAuthorizedGoodsReducer.goodsList,
  choosedAuthGoods: state.setChoosedAuthGoodsReducer.choosedGoods,
})

const mapDispatchToProps = {
  getLOBData,
  getBrandData,
  fetchFirstClassSelection,
  fetchSecondClassSelection,
  fetchThirdClassSelection,
  fetchAuthorizationSelectionGoods,
  fetchAuthorizationSelectionGoodsSuccess,
  searchAuthorizedGoods,
  searchAuthorizedGoodsSuccess,
  setChoosedAuthGoods,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGoodsAuthDialog)
