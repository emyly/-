/**
 * Created by niexq on 17/3/26.
 */


import React, { Component, PropTypes } from 'react';

import './GoodsTransferOperating.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import GoBackButton from 'components/GoBackButton';

import HTML5Backend from 'react-dnd-html5-backend';

import { DragDropContext } from 'react-dnd';

import RaisedButton from 'material-ui/RaisedButton'

import { List, ListItem } from 'material-ui/List';

import SourceDataGrid from './SourceDataGrid';

import TargetDataGrid from '../containers/TargetDataGridContainer';

import DepotSelectDialog from 'components/DepotSelectDialog';

import BarCodeTextField from 'components/BarCodeTextField';

import Dialog from 'components/StandardUI/StandardDialog';

import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：商品转移操作区
 */

class GoodsTransferOperating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftOutlocations: [], // 移出库位集
      selectOpen: false,    // 仓库选择器Dialog开关
      shiftInLocations: [], // 移入库位集
      submitOpen: false,    // 提交确认Dialog
      scanCodeLocations: [], // 扫码出来的仓库
      searchLocations: [],  // 搜索出来的仓库
      curOperatingStatus: '0', // 当前操作区 '0'表示初始化状态 '1'表示搜索 '2'表示扫码
      searchGoodsNumber: '', // 搜索框输入的物料编号
      searchClick: false,   // 搜索按钮是否被点击
    }
  }
  static defaultProps = {

  };
  static propTypes = {
    location: PropTypes.object,
    getGoodsTransferOperatingData: PropTypes.func,
    getGoodsTransferLocationGoodsData: PropTypes.func,
    getSearchLocations: PropTypes.func,
    goodsTransferOperating: PropTypes.object,
    postOrder: PropTypes.func,
    globalStore: PropTypes.object,
    initSearchLocations: PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.goodsTransferOperating.postStatus === '1') {
      this.context.router.push({
        pathname: '/goodsTransfer'
      });
    }
    if (nextProps.goodsTransferOperating.locations.length) {
      this.setState({
        shiftOutlocations: nextProps.goodsTransferOperating.locations,
        KWID: nextProps.goodsTransferOperating.locations.map(o => o.GUID)
      })
    }
    if (this.state.searchClick) {
      const locations = nextProps.goodsTransferOperating.searchLocations.map(val => ({
        open: true,
        goods: val.SPXQ,
        ...val
      }))
      this.setState({
        searchLocations: locations,  // 搜索出来的仓库
        curOperatingStatus: '1', // 当前操作区 '0'表示初始化状态 '1'表示搜索 '2'表示扫码
      })
    }
  };
  componentWillMount = () => {
    if (this.props.location.state.id) this.props.getGoodsTransferOperatingData(this.props.location.state.id);
  };
  /**
   * 库位listItem点击事件
   */
  handleNestedListShiftOutToggle = item => () => {
    if (!item.open && item.goods.length <= 0 && this.state.curOperatingStatus === '0') {
      this.props.getGoodsTransferLocationGoodsData(item.GUID);
    }
    item.open = !item.open;
    this.setState({
      shiftOutlocations: this.state.shiftOutlocations, // 初始化进来时获取的仓库
      scanCodeLocations: this.state.scanCodeLocations, // 扫码出来的仓库
      searchLocations: this.state.searchLocations,    // 搜索出来的仓库
    })
  };
  /**
   * 库位listItem点击事件
   */
  handleNestedListShiftInToggle = item => () => {
    item.open = !item.open;
    this.setState({
      shiftInlocations: this.state.shiftInlocations
    })
  };
  /**
   * 仓库选择器Dialog开关状态选择
   */
  handleSelectDialogToggle = () => {
    this.setState({ selectOpen: !this.state.selectOpen });
  };
  /**
   * 物料编号onChange
   */
  handleSearchNumberChange = (event) => {
    this.setState({
      searchGoodsNumber: event.target.value
    })
  }
  /**
   * 根据商品物料编号搜索库位
   */
  handleSearchLocations = () => {
    if (this.state.searchGoodsNumber) {
      this.setState({
        searchClick: true
      })
      this.props.getSearchLocations({
        SPBH: this.state.searchGoodsNumber,
        CKID: this.props.location.state.id
      })
    } else {
      this.props.initSearchLocations();
      this.setState({
        curOperatingStatus: '0',
        searchClick: false
      })
    }
  }
  /**
   * 提交商品转移记录
   */
  handleSubmitOrder = () => {
    this.setState({
      submitOpen: true
    })
  }
  /**
   * 关闭确认提交Dialog
   */
  handleCloseSubmit = () => {
    this.setState({
      submitOpen: false
    })
  }
  /**
   * 提交确认
   */
  handleConfirmSubmit = () => {
    const { tranGoods } = this.props.goodsTransferOperating
    let goodsList = [];
    Object.keys(tranGoods).forEach((good) => {
      goodsList = goodsList.concat(tranGoods[good].map((o) => {
        delete o.GUID;
        return o;
      }))
    })
    goodsList.filter(val => Number(val.SL) > 0)
    this.props.postOrder(goodsList);
  }
  /**
   * 仓库选择器callback
   */
  handleWarehouseSelectCallback = (value) => {
    let pushFlag = true;
    this.state.shiftInLocations.map((val) => {
      if (val.GUID === value.GUID) pushFlag = false;
    })
    if (pushFlag) {
      this.state.shiftInLocations.push({
        open: true,
        goods: [],
        ...value,
        total: 0,                   // 多少种
        kinds: 0,                   // 多少件
      });
      this.setState({
        shiftInLocations: this.state.shiftInLocations
      })
    }
  };
  /**
   * 条码扫描callback
   */
  getBarCodeData = (value) => {
    this.state.searchClick = false;
    this.props.initSearchLocations();
    const locations = value.map(val => ({
      open: true,
      goods: val.SPXQ,
      ...val
    }))
    this.setState({
      searchClick: false,
      scanCodeLocations: locations,
      curOperatingStatus: '2'
    })
  }
  /**
   * 获取当前操作的库位集
   */
  getCurOutLocations = () => {
    switch (this.state.curOperatingStatus) {
      case '0':
        return this.state.shiftOutlocations;
      case '1':
        return this.state.searchLocations;
      case '2':
        return this.state.scanCodeLocations;
      default:
        return this.state.shiftOutlocations;
    }
  }
  /**
   * 商品总数量及种类
   */
  handleTotalKinds = item => (obj) => {
    item.total = obj.total;
    item.kinds = obj.kinds;
    this.setState({
      shiftInLocations: this.state.shiftInLocations
    })
  }
  render() {
    const actions = (
      <nav>
        <GoBackButton style={{ width: '95px', marginRight: '0px' }} />
        <RaisedButton
          onTouchTap={this.handleSubmitOrder}
          label='确认提交' buttonStyle={{ backgroundColor: '#00A0FF', }}
          labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }}
        />
      </nav>
    )
    const submitActions = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleCloseSubmit}
        style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#979797' }}
      />,
      <FlatButton
        label='确认'
        onTouchTap={this.handleConfirmSubmit}
        style={{ color: '#00A0FF', fontFamily: 'SourceHanSansCN-Regular' }}
      />
    ];
    const curOutLocations = this.getCurOutLocations();
    let total = 0;
    let kinds = 0;
    this.state.shiftInLocations.map((val) => {
      total += val.total;
      kinds += val.kinds
    })
    return (
      <StandardDataGrid
        title='商品转移'
        actions={actions}
        label={this.props.location.state.name ? '仓库路径' : ''}
        message={this.props.location.state.name || ''}
        iconPosition={'0px 0px'}
      >
        <div className='goods-transfer-operating'>
          <div className='goods-transfer-operating-left col-lg-6 GoodsCol-md-7 col-sm-12'>
            <div className='goods-transfer-left-title-content'>
              <span className='goods-transfer-flex'>
                <span className='goods-transfer-title'>商品转出</span>
                <span className='goods-transfer-total'>{`共${kinds}种, ${total}件`}</span>
                <span className='clearFlaot' />
              </span>
              <span className='barCodeTextField'>
                <i className='serchicon' onClick={this.handleSearchLocations} />
                <input type='number' placeholder='请输入要搜索的物料编号' onChange={this.handleSearchNumberChange} />
              </span>
              <span className='barCodeTextField' style={{ width: 240 }}>
                <BarCodeTextField
                  style={{ height: 'auto' }}
                  hintStyle={{ paddingLeft: '30px',
                    lineHeight: '20px',
                    paddingTop: '10px',
                    fontSize: '12px',
                    color: '#979797',
                    background: 'url(/surgeryRecovery/saomiao.png) no-repeat 5px 10px' }}
                  btnStyle={{ minWidth: '66px', marginLeft: 0, marginRight: 0, height: '38px' }}
                  labelStyle={{ marginLeft: 0, marginRight: 0, height: '40px', lineHeight: '40px' }}
                  inputStyle={{ background: 'rgba(229,232,237,0.5)', paddingLeft: 3, width: 175, borderRadius: '2px', height: '40px' }}
                  onChange={this.getBarCodeData} CKID={this.props.location.state.id}
                  KWID={this.state.KWID} transGoods
                /> </span>
            </div>
            <div className='goods-transfer-left-content'>
              <List style={{ padding: '0', height: '100%' }}>
                {
                  (() => {
                    if (curOutLocations.length) {
                      return curOutLocations.map((item, index) => {
                        return (<div
                          className='single-listItem-content'
                          style={{ marginBottom: item.open ? '15px' : '0px', border: item.open ? '1px solid #00a0ff' : 'none' }}
                        >
                          <ListItem
                            key={index} primaryText={item.KWMC}
                            open={item.open || false}
                            primaryTogglesNestedList
                            onNestedListToggle={this.handleNestedListShiftOutToggle(item)}
                            style={{ paddingLeft: '0px',
                              height: '44px',
                              width: '100%',
                              color: item.open ? '#fff' : '#808080',
                              backgroundColor: item.open ? '#00a0ff' : '#ffffff',
                              border: item.open ? 'none' : '1px solid #d8d8d8',
                              borderTop: index === 0 ? '1px solid #d8d8d8' : 'none'
                            }}
                            leftIcon={item.open ?
                              <img src='/WarehouseAdmin/locationIcon.png' alt='' style={{ width: '25px', height: '25px' }} /> :
                              <div />}
                            nestedListStyle={{ marginLeft: 0, background: item.open ? '#00a0ff' : '#ffffff' }}
                            innerDivStyle={{ marginLeft: 0 }}
                          />
                          {
                                    item.open ? <SourceDataGrid KWMC={item.KWMC} goods={item.goods} /> : <div />
                                  }
                        </div>)
                      })
                    } else {
                      return <div style={{ marginTop: '10px' }}>暂无匹配库位.</div>
                    }
                  })()
                }
              </List>
            </div>
          </div>
          <div className='goods-transfer-operating-right col-lg-6 GoodsCol-md-5 col-sm-12'>
            <div className='goods-transfer-right-title-content'>
              <span className='goods-transfer-title'>商品转入</span>
              {
                (() => {
                  if (this.state.shiftInLocations.length) {
                    return (<div onClick={() => { this.setState({ selectOpen: true }) }}>
                      <img src='/logistIcon/icon-11.png' alt='' className='goods-transfer-add-img' />
                    </div>)
                  }
                })()
              }
            </div>
            <div className='goods-transfer-right-content'>
              <List style={{ padding: '0', height: '100%' }}>
                {
                  (() => {
                    if (this.state.shiftInLocations.length) {
                      return this.state.shiftInLocations.map((item, index) => {
                        return (<div
                          className='single-listItem-content'
                          style={{ marginBottom: item.open ? '15px' : '0px', border: item.open ? '1px solid #00a0ff' : 'none' }}
                        >
                          <ListItem
                            key={index} primaryText={item.KWMC}
                            open={item.open || false}
                            primaryTogglesNestedList
                            onNestedListToggle={this.handleNestedListShiftInToggle(item)}
                            style={{ paddingLeft: '0px',
                              height: '44px',
                              width: '100%',
                              color: item.open ? '#fff' : '#808080',
                              backgroundColor: item.open ? '#00a0ff' : '#ffffff',
                              border: item.open ? 'none' : '1px solid #d8d8d8' }}
                            leftIcon={item.open ?
                              <img src='/WarehouseAdmin/locationIcon.png' alt='' style={{ width: '25px', height: '25px' }} /> :
                              <div />}
                            rightIcon={<span style={{ width: 'auto' }}>{`共${item.kinds}种, ${item.total}件`}</span>}
                            nestedListStyle={{ marginLeft: 0, background: item.open ? '#00a0ff' : '#ffffff' }}
                            innerDivStyle={{ marginLeft: 0 }}
                          />
                          {
                            item.open ? <TargetDataGrid CKID={item.id} handleTotalKinds={this.handleTotalKinds(item)} /> : <div />
                          }
                        </div>)
                      })
                    } else {
                      return <div className='goods-transfer-add' style={{ }} onClick={() => { this.setState({ selectOpen: true }) }}>＋</div>
                    }
                  })()

                }
              </List>
            </div>
          </div>
        </div>
        <DepotSelectDialog
          handleButtonClick={this.handleSelectDialogToggle} open={this.state.selectOpen}
          currentOrg={this.props.globalStore.organizationId} ifStorage
          ifChildDepotId callback={this.handleWarehouseSelectCallback}
          ifCanSelectDepotOrLocation='2'
        />
        <Dialog
          actions={submitActions}
          open={this.state.submitOpen}
          title='商品转移提交'
        >
          <p>您正在商品转移提交，请确认是否提交？</p>
        </Dialog>
      </StandardDataGrid>
    )
  }
}

export default DragDropContext(HTML5Backend)(GoodsTransferOperating);
