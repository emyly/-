/**
 * Created by NXQ on 10/20/2016.
 */

import React, { Component, PropTypes } from 'react';

import './ChooseGoodsStoreDialog.scss';

import Dialog from 'material-ui/Dialog';
import DataGrid from 'components/DataGrid';
import FlatButton from 'material-ui/FlatButton';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import ActionRemoveShoppingCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Checkbox from 'material-ui/Checkbox';
import PageGrid from 'components/PageGrid';

import _ from 'lodash';

/**
 * 使用场景：仓库商品选择器
 * 接口： 仓库.md --> 查询单个仓库的子仓库列表 --> /CKB/:id/CKB
 *        仓库.md --> 查询单个仓库的库位列表 --> /CKB/:id/KWB
 *        仓库.md --> 查询单个库位的子库位列表 --> /KWB/:id/KWB
 *        仓库.md --> 仓库概况——根据商品分类查看库位下相应商品 --> /KWB/:kwid/SPSPFLB/KWSPGLB
 */
export default class ChooseGoodsStoreDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WareHousePath: [],
      BoxesData: [],
      isNoChildLocation: false,        // 是没有子库位
      choosedOpen: false,
      kindsOfGoods: 0,                 // 商品种类
      totalGoods: 0,                   // 商品总数量
      chooseAmount: 0,
      options: {
        columnOptions: [
          {
            label: '物料号',
            attr: 'SPBH',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品名称',
            attr: 'SPMC',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品规格',
            attr: 'SPMS',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品批号',
            attr: 'SPPH',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '总数量',
            attr: 'SL',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, width: '80px' },
            tableHeaderColumnStyle: { width: '80px' }
          },
          {
            label: '剩余数量',
            attr: 'SYSL',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, width: '80px' },
            tableHeaderColumnStyle: { width: '80px' }
          },
          {
            label: '选择数量',
            render: row => (
              <input
                type='number' value={row.XZSL === -1 ? '' : row.XZSL} style={{ width: 50 }} min={0}
                onChange={this.handleChooseAmountChange(row)}
                onBlur={this.handleChooseAmountBlurAddToShoppingCart(row)}
              />
            ),
            style: {
              overflow: 'hidden',
              paddingLeft: 10,
              paddingRight: 10,
              width: '80px',
              textAlign: 'center'
            },
            tableHeaderColumnStyle: { width: '80px' }
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableAttrs: {
          selectable: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 0,
          prePageCount: 5,
          pageLength: 5,
          totalLabel: '商品总数',
          pageFunc: (page) => {
            if (this.props.chooseGoodsStoreDialog.goodsDataSource.length) {
              this.props.getSingleLocationGoodsData(this.props.chooseGoodsStoreDialog.chooseLocationId, page);
            }
          }
        }
      },
      choosedOptions: {
        columnOptions: [
          {
            label: '物料编号',
            attr: 'SPBH',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '商品名称',
            attr: 'SPMC',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '商品规格',
            attr: 'SPMS',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '商品批号',
            attr: 'SPPH',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '总数量',
            attr: 'SL',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '已选数量',
            attr: 'XZSL',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, width: 60, textAlign: 'center' }
          },
          {
            label: '操作',
            render: row => (
              <FlatButton
                label='删除'
                primary
                icon={<ActionRemoveShoppingCart />}
                onTouchTap={this.handleTouchTapDeleteToShoppinCart(row)}
              />
            ),
            style: { paddingLeft: 0, paddingRight: 0, textAlign: 'center' }
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      willMountFlag: false,
      resultArray: []
    }
  }

  static defaultProps = {
    /**
     * 起始仓库/库位对象
     */
    beginWareHouseObj: {}      // { isWareHouse: true,     // true表示是仓库false表示是库位, 必传
                               //   GUID:  9000***1,       // GUID表示仓库或库位GUID 必传
                               //   name: '仓库或库位名称'  // 必传
                               // }
  };
  static propTypes = {
    /**
     * 父级仓库id
     */
    ParentWareHouseId: PropTypes.number.isRequired,
    /**
     * 弹出根据授权选择商品Dialog标志位
     */
    open: PropTypes.bool.isRequired,
    /**
     * 切换根据授权选择商品Dialog函数
     */
    handleDailog: PropTypes.func.isRequired,
    /**
     * 起始仓库/库位对象
     */
    beginWareHouseObj: PropTypes.object,
    chooseGoodsStoreDialog: PropTypes.object.isRequired,
    getSingleWareHouseChildData: PropTypes.func.isRequired,
    getSingleLocationChildData: PropTypes.func.isRequired,
    getSingleLocationGoodsData: PropTypes.func.isRequired,
    callback: PropTypes.func,
    initChooseGoodsStoreDialogData: PropTypes.func.isRequired,
  };
  componentWillMount = () => {
    this.props.getSingleWareHouseChildData(this.props.ParentWareHouseId);
    this.setState({ willMountFlag: true });
  };
  componentWillReceiveProps = (nextProps) => {
    if (_.has(nextProps.beginWareHouseObj, 'GUID') && (nextProps.beginWareHouseObj.GUID || -1) !== (this.props.beginWareHouseObj.GUID || -1)) {
      if (nextProps.beginWareHouseObj.isWareHouse) {  // 是仓库,获取仓库子仓库
        this.props.getSingleWareHouseChildData(nextProps.beginWareHouseObj.GUID);
      } else {                // 不是仓库,获取库位中子库位
        this.props.getSingleLocationChildData(nextProps.beginWareHouseObj.GUID);
      }
    }

    if (nextProps.chooseGoodsStoreDialog.goodsDataSource.length) {
      const newGoodsDataSource = nextProps.chooseGoodsStoreDialog.goodsDataSource;
      if (this.state.choosedOptions.dataSource.length) {
        newGoodsDataSource.map((goodsObj) => {
          // 说明当前是当前所在库位,改变后台获取的数据newGoodsDataSource,更新options的dataSouce(主要更新剩余数量SYSL)
          if (goodsObj.SSCKID === this.state.WareHousePath[this.state.WareHousePath.length - 1].GUID) {
            const index = _.findIndex(this.state.choosedOptions.dataSource,
                                      value => (value.SPBH === goodsObj.SPBH &&
                                                value.SPPH === goodsObj.SPPH &&
                                                value.SL === goodsObj.SL &&
                                                value.CJSJ === goodsObj.CJSJ &&
                                                value.SSCKID === goodsObj.SSCKID));
            if (index >= 0) {         // 找到了,需要更新剩余数量
              goodsObj.SYSL -= this.state.choosedOptions.dataSource[index].XZSL;  // 更新商品列表的剩余数量
              goodsObj.XZSL = this.state.choosedOptions.dataSource[index].XZSL;   // 更新商品列表的选择数量
            }
          }
        });
      }
      this.state.options.pagination.currentPage = nextProps.chooseGoodsStoreDialog.currentPage;
      this.state.options.pagination.totalCount = nextProps.chooseGoodsStoreDialog.goodsDataTotal;
      this.state.options.dataSource = newGoodsDataSource;
      this.setState({
        options: this.state.options,
        BoxesData: [],
        willMountFlag: true,
        isNoChildLocation: true
      })
    } else {
      const arrayBoxesData = nextProps.chooseGoodsStoreDialog.BoxesData;
      arrayBoxesData.map((value) => {
        value.isChecked = false;
        value.isHovered = false;
      });
      this.setState({
        willMountFlag: true,
        isNoChildLocation: false,
        BoxesData: arrayBoxesData
      });
    }

    if (nextProps.open === false) {
      this.setState({
        options: Object.assign({}, this.state.options, { dataSource: [] }),
        BoxesData: [],
        WareHousePath: [],
        isNoChildLocation: false,
        choosedOpen: false,
        willMountFlag: false,
        choosedOptions: Object.assign({}, this.state.choosedOptions, { dataSource: [] }),
        kindsOfGoods: 0,                 // 商品种类
        totalGoods: 0,                   // 商品总数量
        resultArray: []
      })
    } else if (nextProps.open === true && nextProps.open !== this.props.open) {
      if (_.has(nextProps.beginWareHouseObj, 'GUID')) {
        const name = nextProps.beginWareHouseObj.isWareHouse ?
                      { CKMC: nextProps.beginWareHouseObj.name } : { KWMC: nextProps.beginWareHouseObj.name };
        const beginWareHouseObj = {
          GUID: nextProps.beginWareHouseObj.GUID,
          isWareHouse: nextProps.beginWareHouseObj.isWareHouse || false,
          isChecked: false,
          ...name,
          isHovered: false
        };
        this.state.WareHousePath.push(beginWareHouseObj);
        this.setState({
          WareHousePath: this.state.WareHousePath, // 更新仓库库位路径
          willMountFlag: true
        });
      } else if (this.state.willMountFlag === false) {
        this.props.getSingleWareHouseChildData(this.props.ParentWareHouseId);
        this.setState({ willMountFlag: true });
      }
    }
  };

  /**
   * 确定添加商品
   */
  handleAddGoodsSubmit = () => {
    this.props.callback(this.state.resultArray);
    this.props.initChooseGoodsStoreDialogData();
    if (_.has(this.props.beginWareHouseObj, 'GUID')) {
      if (this.props.beginWareHouseObj.isWareHouse) {  // 是仓库,获取仓库子仓库
        this.props.getSingleWareHouseChildData(this.props.beginWareHouseObj.GUID);
      } else {                // 不是仓库,获取库位中子库位
        this.props.getSingleLocationChildData(this.props.beginWareHouseObj.GUID);
      }
    } else {
      this.props.getSingleWareHouseChildData(this.props.ParentWareHouseId);
      this.setState({ willMountFlag: true });
    }
    this.props.handleDailog();
  };
  /**
   * 输入框失去焦点时添加商品 obj商品信息对象
   */
  handleChooseAmountBlurAddToShoppingCart = obj => () => {
    if (obj.XZSL > 0) {
      const mergeObj = _.merge({}, obj);
      const indexArr = _.findIndex(this.state.resultArray, value => value.GUID === mergeObj.SSCKID);
      if (indexArr < 0) {       // 没找到,说明resultArray中没有库位ID信息
        const newObj = this.state.WareHousePath[this.state.WareHousePath.length - 1];
        newObj.dataSource = [];
        newObj.dataSource.push(mergeObj);
        this.state.resultArray.push(newObj);
      } else {                  // 找到了resultArray中已有库位ID信息
        const indexGoods = _.findIndex(this.state.resultArray[indexArr].dataSource,
                                        value => (value.SPBH === mergeObj.SPBH &&
                                                  value.SPPH === mergeObj.SPPH &&
                                                  value.SL === mergeObj.SL &&
                                                  value.CJSJ === mergeObj.CJSJ));
        if (indexGoods < 0) {    // 没找到，说明resultArray的库位dataSource中没添加过该商品
          this.state.resultArray[indexArr].dataSource.push(mergeObj);
        } else {                  // 找到了，说明resultArray的库位dataSource中有添加过该商品,更新对应数据
          this.state.resultArray[indexArr].dataSource[indexGoods].XZSL = mergeObj.XZSL;
          this.state.resultArray[indexArr].dataSource[indexGoods].SYSL = mergeObj.SL - mergeObj.XZSL;
        }
      }
        // 调整已选商品列表界面数量
      let newDataSource = [];
      let totalGoods = 0;
      this.state.resultArray.map((value) => {
        newDataSource = _.union(newDataSource, value.dataSource);
        value.dataSource.map((val) => {
          totalGoods += val.XZSL;
        })
      });
      this.setState({
        resultArray: this.state.resultArray,
        choosedOptions: Object.assign({}, this.state.choosedOptions, { dataSource: newDataSource }),
        BoxesData: [],
        willMountFlag: true,
        isNoChildLocation: true,
        kindsOfGoods: newDataSource.length,                 // 商品种类
        totalGoods                              // 商品总数量
      });
        // 调整商品列表界面数量
      const index = _.findIndex(this.state.options.dataSource,
                                value => (value.SPBH === mergeObj.SPBH &&
                                          value.SPPH === mergeObj.SPPH &&
                                          value.SL === mergeObj.SL &&
                                          value.CJSJ === mergeObj.CJSJ));
      if (index >= 0) {
        this.state.options.dataSource[index].SYSL = this.state.options.dataSource[index].SL - mergeObj.XZSL;
        this.state.options.dataSource[index].XZSL = mergeObj.XZSL;
        this.setState({
          options: Object.assign({}, this.state.options, { dataSource: this.state.options.dataSource })
        });
      }
    }
  };
  /**
   * 删除商品
   */
  handleTouchTapDeleteToShoppinCart = obj => () => {
    _.remove(this.state.choosedOptions.dataSource, obj);
    if (obj.SSCKID === this.state.WareHousePath[this.state.WareHousePath.length - 1].GUID) {     // 说明当前是当前所在库位,更新options的dataSouce
      const index = _.findIndex(this.state.options.dataSource,
                                value => (value.SPBH === obj.SPBH &&
                                          value.SPPH === obj.SPPH &&
                                          value.SL === obj.SL &&
                                          value.CJSJ === obj.CJSJ &&
                                          value.SSCKID === obj.SSCKID));
      if (index >= 0) {         // 找到了,这步一般都会找到
        this.state.options.dataSource[index].SYSL += obj.XZSL;          // 更新商品列表的剩余数量
      }
    }
    const indexArr = _.findIndex(this.state.resultArray, value => value.GUID === obj.SSCKID);
    if (indexArr > -1) {       // 找到了resultArray中已有库位ID信息
      _.remove(this.state.resultArray[indexArr].dataSource, obj);   // 直接移除resultArray的库位dataSource中有该商品
    }
    this.setState({
      resultArray: this.state.resultArray,
      choosedOptions: this.state.choosedOptions,
      BoxesData: [],
      willMountFlag: true,
      isNoChildLocation: true,
      kindsOfGoods: --this.state.kindsOfGoods,                   // 商品种类
      totalGoods: this.state.totalGoods - obj.XZSL               // 商品总数量
    });
  };
  /**
   * 切换已添加的商品列表Dialog
   */
  handleTouchTapChoosedGoodsDialog = () => {
    this.setState({ choosedOpen: !this.state.choosedOpen });
  };
  /**
   * 确认已添加的商品列表
   */
  handleChooseGoodsSubmit = () => {
    this.setState({ choosedOpen: !this.state.choosedOpen });
  };
  /**
   * 仓库/库位点击,请求后台数据
   */
  handleBoxesClick = obj => () => {
    if (this.state.WareHousePath.findIndex(value => value.GUID === obj.GUID &&
                                            (value.isWareHouse ? value.CKMC : value.KWMC) ===
                                            (obj.isWareHouse ? obj.CKMC : obj.KWMC)) === -1) { // 判断之前是否点击过
      this.state.WareHousePath.push(obj);
      this.setState({ WareHousePath: this.state.WareHousePath });  // 更新仓库库位路径
      if (obj.isWareHouse) {  // 是仓库,获取仓库子仓库
        this.props.getSingleWareHouseChildData(obj.GUID);
      } else {                // 不是仓库,获取库位中字库位
        this.props.getSingleLocationChildData(obj.GUID);
      }
    }
  };
  /**
   * checkbox div onclick事件
   */
  handleCheckBoxClick = obj => (event) => {
    if (!obj.isChecked) {
      this.state.BoxesData.map((value) => {
        value.isChecked = false;
        value.isHovered = false;
      });
    }
    obj.isChecked = !obj.isChecked;
    this.setState({ BoxesData: this.state.BoxesData });
    event.preventDefault();
    event.stopPropagation();
  }
  /**
   * 库位路径点击
   */
  handleWareHouseClick = obj => () => {
    this.setState({
      WareHousePath: this.state.WareHousePath.slice(0,
                        this.state.WareHousePath.findIndex(value => value.GUID === obj.GUID &&
                                                          (value.isWareHouse ? value.CKMC : value.KWMC) ===
                                                          (obj.isWareHouse ? obj.CKMC : obj.KWMC)) + 1) });
    if (obj.isWareHouse) {
      this.props.getSingleWareHouseChildData(obj.GUID);
    } else {
      this.props.getSingleLocationChildData(obj.GUID);
    }
    this.setState({
      options: Object.assign({}, this.state.options, { dataSource: [] }),
      BoxesData: [],
      isNoChildLocation: false,
      choosedOpen: false,
      willMountFlag: true
    })
  };

  /**
   * 选择数量input--onChange
   */
  handleChooseAmountChange = row => (event) => {
    if (event.target.value === '') {
      row.XZSL = -1;
    } else {
      row.XZSL = Number(event.target.value);
    }
    this.setState({
      options: this.state.options
    });
  };

  /**
   * 一键清空购物车
   */
  handleClearChooseGoods = () => {
    if (this.state.choosedOptions.dataSource.length && this.state.resultArray.length) {
      this.state.choosedOptions.dataSource.map((goodsObj) => {
        if (goodsObj.SSCKID === this.state.WareHousePath[this.state.WareHousePath.length - 1].GUID) {     // 说明当前是当前所在库位,更新options的dataSouce
          const index = _.findIndex(this.state.options.dataSource,
                                    value => (value.SPBH === goodsObj.SPBH &&
                                              value.SPPH === goodsObj.SPPH &&
                                              value.SL === goodsObj.SL &&
                                              value.CJSJ === goodsObj.CJSJ &&
                                              value.SSCKID === goodsObj.SSCKID));
          if (index >= 0) {         // 找到了,这步一般都会找到
            this.state.options.dataSource[index].SYSL += goodsObj.XZSL;          // 更新商品列表的剩余数量
          }
        }
      });
      this.state.choosedOptions.dataSource = [];
      this.setState({
        resultArray: [],                            // 清空返回值
        choosedOptions: this.state.choosedOptions, // 清空已选商品
        kindsOfGoods: 0,                            // 商品种类
        totalGoods: 0                               // 商品总数量
      })
    }
  };
  /**
   * RaiseButton onMouseEnter 事件
   */
  handleRaiseButtonMouseEnter = value => () => {
    if (!value.isHovered) {
      value.isHovered = true;
      this.setState({ BoxesData: this.state.BoxesData });
    }
  };

  /**
   *RaiseButton onMouseLeave 事件
   */
  handleRaiseButtonMouseLeave = value => () => {
    if (value.isHovered) {
      value.isHovered = false;
      this.setState({ BoxesData: this.state.BoxesData });
    }
  };

  /**
   * Dialog close
   */
  handleDialogClose = () => {
    this.props.initChooseGoodsStoreDialogData();
    if (_.has(this.props.beginWareHouseObj, 'GUID')) {
      if (this.props.beginWareHouseObj.isWareHouse) {  // 是仓库,获取仓库子仓库
        this.props.getSingleWareHouseChildData(this.props.beginWareHouseObj.GUID);
      } else {                // 不是仓库,获取库位中子库位
        this.props.getSingleLocationChildData(this.props.beginWareHouseObj.GUID);
      }
    } else {
      this.props.getSingleWareHouseChildData(this.props.ParentWareHouseId);
      this.setState({ willMountFlag: true });
    }
    this.props.handleDailog();
  };
  /**
   * 获取背景颜色
   */
  getBackgroundColor = (value) => {
    const itemColor = value.isWareHouse ? '#364356' : '#a8ade3';
    return (value.isHovered || value.isChecked) ? '#41A1FF' : itemColor;
  }
  render() {
    const actions = [
      <FlatButton
        label={`共${this.state.kindsOfGoods}种商品,合计${this.state.totalGoods}件`}
        style={{ margin: 10, float: 'left', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', color: '#00A0FF' }}
        primary
        icon={<ActionShoppingCart />}
        onTouchTap={this.handleTouchTapChoosedGoodsDialog}
      />,
      <FlatButton
        label='关闭'
        style={{ margin: 10, color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label='确定'
        style={{ margin: 10,
          color: '#00A0FF',
          fontFamily: 'SourceHanSansCN-Medium',
          fontSize: '16px',
          opacity: this.state.isNoChildLocation ? '1' : '0.5' }}
        primary
        onTouchTap={this.handleAddGoodsSubmit}
        disabled={!this.state.isNoChildLocation}
      />
    ];
    const choosedActions = [
      <FlatButton
        label='一键清空'
        style={{ margin: 10, color: '#E64C4C', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        icon={<ActionDeleteForever />}
        onTouchTap={this.handleClearChooseGoods}
      />,
      <FlatButton
        label={`共${this.state.kindsOfGoods}种商品,合计${this.state.totalGoods}件`}
        style={{ margin: 10, float: 'left', color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        icon={<ActionShoppingCart />}
      />,
      <FlatButton
        label='关闭'
        style={{ margin: 10, color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        onTouchTap={this.handleTouchTapChoosedGoodsDialog}
      />,
      <FlatButton
        label='确定'
        style={{ margin: 10, color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        onTouchTap={this.handleChooseGoodsSubmit}
      />
    ];
    const pathPoint = '>';
    return (
      <div className='choose-goods-store-dialog'>
        <Dialog
          title='根据库位选择商品'
          titleClassName='dialog-title'
          actions={actions}
          modal
          autoScrollBodyContent
          titleStyle={{ height: '70px', padding: 0, paddingLeft: '25px', lineHeight: '70px', border: 'none' }}
          actionsContainerStyle={{ height: '55px', paddingTop: '0px', border: 'none' }}
          open={this.props.open}
          contentStyle={{ maxWidth: '900px' }}
        >
          <div className='ware-house-path'>
            {
              this.state.WareHousePath.map((value, index) => {
                if (index === 0) {
                  return (<div key={index} ><a
                    className='path-name'
                    onClick={this.handleWareHouseClick(value)}
                  > {value.isWareHouse ? value.CKMC : value.KWMC} </a></div>)
                } else {
                  return (<div key={index} >
                    <span className='path-point'> {pathPoint} </span>
                    <a
                      className='path-name'
                      onClick={this.handleWareHouseClick(value)}
                    > {value.isWareHouse ? value.CKMC : value.KWMC} </a>
                  </div>)
                }
              })
            }
          </div>
          {
            (() => {
              if (this.state.isNoChildLocation) {
                return (<div className='ware-house-choosed-goods-content'>
                  <PageGrid options={this.state.options} pagination={this.state.options.pagination} dataGridStyle={{ height: '300〉px' }} />
                </div>)
              } else {
                return (<div className='ware-house-choose-content'>
                  <div className='choose-boxes-data-content'>
                    {
                      this.state.BoxesData.map((value, index) =>
                        <div
                          key={index} className='single-ware-house'
                          style={{ border: (value.isHovered || value.isChecked) ? '1px solid #41A1FF' : '1px solid transparent',
                            boxShadow: value.isHovered ? '0 0 8px rgba(65, 161, 255, .5)' : 'none' }}
                          onClick={this.handleBoxesClick(value)}
                          onMouseEnter={this.handleRaiseButtonMouseEnter(value)}
                          onMouseLeave={this.handleRaiseButtonMouseLeave(value)}
                        >
                          <div
                            className='single-ware-house-top-area'
                            style={{ backgroundColor: this.getBackgroundColor(value) }}
                          >
                            <img
                              style={{ width: value.isWareHouse ? '20px' : '17px', height: value.isWareHouse ? '16px' : '20px' }}
                              alt='' src={value.isWareHouse ? '/warehouseGeneralIcon/warehouse.png' : '/warehouseGeneralIcon/locationStorage.png'}
                            />
                            <span
                              className='single-ware-house-title'
                              title={value.isWareHouse ? value.CKMC : value.KWMC}
                            >{value.isWareHouse ? value.CKMC : value.KWMC}</span>
                          </div>
                          <div className='single-ware-house-bottom-area'>
                            <div className='ware-house-checkbox-div' onClick={this.handleCheckBoxClick(value)}>
                              <Checkbox
                                style={{ width: '100%', height: '100%' }}
                                inputStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
                                labelStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
                                disabled={false}
                                checked={value.isChecked}
                                iconStyle={{ display: 'inline-block',
                                  color: '#979797',
                                  fill: (value.isHovered || value.isChecked) ? '#41A1FF' : '#979797',
                                  width: '100%',
                                  height: '100%',
                                  userSelect: 'none' }}
                              />
                            </div>
                            <div className='ware-house-goods-statistics-div'>
                              <span className='goods-statistics-word'>种类：{value.goodsTypes}</span>
                              <span className='goods-statistics-word'>数量：{value.goodsTotals}</span>
                            </div>
                          </div>
                        </div>)
                      }
                  </div>
                </div>)
              }
            })()
          }
        </Dialog>
        <Dialog
          title='已选商品列表'
          titleClassName='dialog-title'
          modal
          actions={choosedActions}
          autoScrollBodyContent
          titleStyle={{ height: '4.64rem', padding: 0, paddingLeft: '25px', lineHeight: '4.64rem', border: 'none' }}
          actionsContainerStyle={{ height: '4.4rem', paddingTop: '0px', border: 'none' }}
          open={this.state.choosedOpen}
        >
          <div style={{ width: '100%', height: '550px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <DataGrid options={this.state.choosedOptions} />
          </div>
        </Dialog>
      </div>
    )
  }
}
