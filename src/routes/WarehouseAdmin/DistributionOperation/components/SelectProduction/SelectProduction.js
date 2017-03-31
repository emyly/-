/**
 * Component: ProductSelection
 * Description: ProductSelection holds a table list the recommanded
 * Product Selection List, and Provide a dialog to selecct more product
 * positions
 *
 * Structure:
 * {[ ProductSelectionTable ]}
 * { Dialog }
 *
 * Author: Yechen Huang huangyc@firstgrid.cn
 * modify by wangming for DistributionOperation
 */

import React from 'react'
import SelectProductionShowAll from './SelectProductionShowAll'
import { ProductStockClass } from './SelectProductionData'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

export default class SelectProduction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diaglogOpen: false,
      ifShowBar: false,
      barText: '条码输入区',
      tableData: [],
      StorageId: 0,
      ifShowBarText: false,
      otherData: [],
      otherFlag: false,
      goodsNum: 0,
      openError: false,
      CopyRowDialogTable: [],
      CopyRowDialogOpen: false,
      curCopyRow: {},
      curActiveIndex: 0,
      selectData: [],
      errorMessage: '',
      flexOrderIndex: [],
      productStockObject: new ProductStockClass([]), // 拣货单数据实例
      filterString: '',
      filterFlag: true, // true 表示全局搜索, false: 表示当前库位
    };

    this.ifCurrntStorage = false; // false 全局； true： 当前
  }

  static defaultProps = {
    storageId: []
  };

  static propTypes = {
    ifShowSelect: React.PropTypes.bool,
    orderId: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func,
    orderInfo: React.PropTypes.object,
    errorCallBack: React.PropTypes.func,
    storageId: React.PropTypes.array,
    nextCallBack: React.PropTypes.func,
    ifTemporary: React.PropTypes.bool,
    materialList: React.PropTypes.array,
    // selectProduction: React.PropTypes.object,
    // getSelectAdvice: React.PropTypes.func,
    // getTemporaryStorage: React.PropTypes.func,
    storageData: React.PropTypes.array,
  };

  componentWillMount = () => {
    // if (this.props.ifTemporary) { // 获取暂存数据
    //   // const prObject = new ProductStockClass(this.props.selectProduction.temporaryData);
    //   // this.setState({ productStockObject: prObject });
    //   // this.props.callback(prObject.getProductStockByFilter(''));
    //   this.props.getTemporaryStorage(this.props.orderId);
    // } else {
    //   this.props.getSelectAdvice(this.props.orderId, { KWID: this.props.storageId });
    // }

    const prObject = new ProductStockClass(this.props.storageData);
    prObject.freshStockData();
    this.setState({ productStockObject: prObject });
    this.props.callback(prObject.getProductStockByFilter(''));
    this.refreshNextStep(prObject);
  };

  componentWillReceiveProps = (nextProps) => {
    // if (Object.prototype.toString.call(nextProps.selectProduction.errorData.response) !== '[object Undefined]') {
    //   this.props.errorCallBack(nextProps.selectProduction.errorData.response.Message);
    // } else if (this.props.ifTemporary) {
    //   if (Object.prototype.toString.call(nextProps.selectProduction.temporaryData) === '[object Array]'
    //     && nextProps.selectProduction.temporaryData.length === 0) {
    //     this.alertError('暂存数据不存在!');
    //   }
    //   const prObject = new ProductStockClass(nextProps.selectProduction.temporaryData);
    //   this.setState({ productStockObject: prObject });
    //   this.props.callback(prObject.getProductStockByFilter(''));
    //   this.refreshNextStep(prObject);
    // } else {
    //   if (Object.prototype.toString.call(nextProps.selectProduction.selectData) === '[object Array]'
    //     && nextProps.selectProduction.selectData.length === 0) {
    //     this.alertError('目前暂无商品可供拣货!');
    //   }
    //   const prObject = new ProductStockClass(nextProps.selectProduction.selectData);
    //   this.setState({ productStockObject: prObject });
    //   this.props.callback(prObject.getProductStockByFilter(''));
    //   this.refreshNextStep(prObject);
    // }
  };

  toolBarHandleChangeFilter = (value) => {
    this.setState({ filterString: value });
  }

  toolBarHandleChangeToggle = (value) => {
    this.ifCurrntStorage = !value;
    this.setState({ filterFlag: value });
  }

  setFilter = (filter, flag) => {
    this.setState({ filterString: filter, filterFlag: flag });
  }

  getStockDataByFilter = () => {
    if (this.state.filterFlag) {
      return this.getStockDataByFilterString(this.state.filterString);
    } else {
      const retValue = [];
      const curStock = this.getCurStockByFilter(this.state.filterString);
      if (curStock.ProductListByMaterialID) {
        retValue.push(curStock);
      }
      return retValue;
    }
  }

  getStockDataByFilterString = str => (
    this.state.productStockObject.getProductStockByFilter(str)
  )

  getCurStockByFilter = (str) => {
    const curActiveStock = this.state.productStockObject.getSingleProductStock('ifActive', true);
    return this.state.productStockObject.getMaterialsByStock(curActiveStock, str);
  }

  toolBarHandleBarOnChange = (value) => {
    const batchNode = {};
    const materialNode = {};
    const selectNumber = Number(value.SL);

    if (!selectNumber) {
      this.alertError('返回拣货数量异常');
      return;
    }

    if (this.state.productStockObject.getBatchMaterialGoodsNode(
      this.state.curActiveIndex,
      value.SPID,
      value.SPPHID,
      batchNode,
      materialNode)) {
      // 表单验证
      let testNum = Number(materialNode.LastNumber);
      // const oldAlreadySelectNums = materialNode.AlreadySelect;
      const oldAlreadySelectNums = this.state.productStockObject.getAllMatrialsTotalNum(
        materialNode.GoodsId,
        'AlreadySelect'
      );

      testNum = testNum - Number(oldAlreadySelectNums) - selectNumber;

      if (testNum < 0) {
        this.alertError('商品数量已足够');
        return;
      }

      // 设置已拣
      this.state.productStockObject.materialAndBatchAlreadySelectAdd(
        this.state.curActiveIndex,
        value.SPID,
        value.SPPHID,
        selectNumber,
      );

      // 设置选中节点标志
      this.state.productStockObject.setBatchKeyValue(
        this.state.curActiveIndex,
        value.SPID,
        value.SPPHID,
        'match',
        true,
      );

      this.state.productStockObject.setMaterialKeyValueById(
        this.state.curActiveIndex,
        value.SPID,
        'match',
        true,
      );

      // 设置未拣
      this.state.productStockObject.setAllMaterialsKeyByMaterialId(
          value.SPID,
          'UnselectNum',
          testNum
       )
    } else {
      this.alertError('未找到匹配商品');
    }

    // 判断是否可提交， 当有已拣数据才可提交
    this.refreshNextStep();

    // 刷新页面
    this.setState({ productStockObject: this.state.productStockObject });

    // 返回数据
    this.props.callback(this.getStockDataByFilterString(''));
  }

  toolHandleSelect = (stock) => {
      // 设置active
    const stockIndex = this.state.productStockObject.getStockIndexByStockId(stock.StockPositionID);
    if (stockIndex === this.state.curActiveIndex) {
      return;
    }
    this.state.productStockObject.setStockKeyValueByIndex(stockIndex, 'ifActive', true);
    this.state.productStockObject.setStockKeyValueByIndex(this.state.curActiveIndex, 'ifActive', false);

      // 缩拢所有库位表格
    this.state.productStockObject.setAllStockMaterialKeyValue(
        'flexible',
        false
      );

      // 设置库位显示位置
    const oldIndex = this.state.productStockObject.getStockKeyValueByIndex(this.state.curActiveIndex, 'orderByFlex');
    const newIndex = this.state.productStockObject.getStockKeyValueByIndex(stockIndex, 'orderByFlex');
    this.state.productStockObject.setStockKeyValueByIndex(this.state.curActiveIndex, 'orderByFlex', newIndex);
    this.state.productStockObject.setStockKeyValueByIndex(stockIndex, 'orderByFlex', oldIndex);

      // 设置焦点到 扫码框
    document.getElementById('barCodeTextField').focus();

      // 刷新state
    this.setState({ curActiveIndex: stockIndex });

      // 返回数据
    this.props.callback(this.getStockDataByFilterString(''));
  }

  storageListHandleSelectProduction = stock => (
    () => {
      // 设置active
      const stockIndex = this.state.productStockObject.getStockIndexByStockId(stock.StockPositionID);
      if (stockIndex === this.state.curActiveIndex) {
        return;
      }
      this.state.productStockObject.setStockKeyValueByIndex(stockIndex, 'ifActive', true);
      this.state.productStockObject.setStockKeyValueByIndex(this.state.curActiveIndex, 'ifActive', false);

      // 缩拢所有库位表格
      this.state.productStockObject.setAllStockMaterialKeyValue(
        'flexible',
        false
      );

      // 设置库位显示位置
      // const oldIndex = this.state.productStockObject.getStockKeyValueByIndex(this.state.curActiveIndex, 'orderByFlex');
      // const newIndex = this.state.productStockObject.getStockKeyValueByIndex(stockIndex, 'orderByFlex');
      // this.state.productStockObject.setStockKeyValueByIndex(this.state.curActiveIndex, 'orderByFlex', newIndex);
      // this.state.productStockObject.setStockKeyValueByIndex(stockIndex, 'orderByFlex', oldIndex);

      // 设置焦点到 扫码框
      document.getElementById('barCodeTextField').focus();

      // 刷新state
      this.setState({ curActiveIndex: stockIndex });

      // 返回数据
      this.props.callback(this.getStockDataByFilterString(''));
    }
  )

  refreshNextStep = (stockClass = this.state.productStockObject) => {
    const materials = stockClass.getMaterialsFromAllByKeyNotEqual(
      'AlreadySelect',
        0
    );

    if (materials.length > 0) {
      this.props.nextCallBack(true);
    } else {
      this.props.nextCallBack(false);
    }
  }

  storageListBatchTextChange = (material, batch) => (event) => {
      // 设置已拣数据
    const tpData = Number(event.target.value);
    const oldBatchData = batch.AlreadySelect;
    const oldMaterialData = material.AlreadySelect;
    const materialLastNum = material.LastNumber;

      // 表单验证,未拣数量不能小于0，仓库数量可以小于0
    const oldAlreadySelectNums = this.state.productStockObject.getAllMatrialsTotalNum(
        material.GoodsId,
        'AlreadySelect'
      );

      // 未拣数量不能小于0
    let testNum = materialLastNum;
    testNum -= oldAlreadySelectNums;
    testNum += oldBatchData;
    testNum -= tpData;

    if (testNum < 0) {
      this.alertError('商品数量已足够');
      return;
    }

      // 1.设置批号对象已检数量
    this.state.productStockObject.setBatchKeyValue(
        this.state.curActiveIndex,
        material.GoodsId,
        batch.SPPHID,
        'AlreadySelect',
        tpData
      );

      // this.state.productStockObject
      // .productStockData[1].ProductListByMaterialID[0]
      // .ProductListByBatchID[0]
      // .AlreadySelect = 1;
      // this.state.productStockObject.setBatchKeyValue(
      //   this.state.curActiveIndex,
      //   material.GoodsId,
      //   batch.SPPHID,
      //   'AlreadySelect',
      //   1
      // );

    let setData = oldMaterialData;
    setData -= oldBatchData;
    setData += tpData;

      // 2.设置商品已拣数量
    this.state.productStockObject.setMaterialKeyValueById(
        this.state.curActiveIndex,
        material.GoodsId,
        'AlreadySelect',
       setData
      );

      // 设置未拣，未拣数量不能小于0，
    this.state.productStockObject.setAllMaterialsKeyByMaterialId(
      material.GoodsId,
      'UnselectNum',
      testNum
    )
      // 设置仓库数量, 仓库数量可以小于0

      // 返回数据
    this.props.callback(this.getStockDataByFilterString(''));

      // 判断是否可提交， 当有已拣数据才可提交
    this.refreshNextStep();

      // 刷新页面
    this.setState({ productStockObject: this.state.productStockObject });
  }

  storageListGetAllStockByGoodsId = goodsId => this.state.productStockObject.getAllStocksByGoodsId(goodsId)

  storageListOtherStockCallback = (stockObject, material) => {
    // 1、合并两个库位class
    this.state.productStockObject.mergeFromOtherObjectByBatchKey(
      stockObject,
      'selected',
      true,
      material
    )
    // 2、刷新对象
    this.setState({ productStockObject: this.state.productStockObject });

    // 3、返回数据
    this.props.callback(this.getStockDataByFilterString(''));
  }

  adaptToTemporaryObject = () => {
    const stockData = this.state.productStockObject.adaptToTemporaryObject();
    return {
      DDID: this.props.orderId,
      DDLX: this.props.orderInfo.DDLX,
      JHZCB: stockData,
    }
  }

  // 获取拣货数据汇总
  getFilterSummary = () => {
    const tpMaterialList = this.props.materialList;

    const retObject = {
      allTypes: 0, // 需拣货种类
      allItems: 0,  // 需拣货件数
      alreadyTypes: 0, // 已拣货种类
      alreadyItems: 0, // 已拣货数量
      shouldTypes: 0, // 应拣货
      shouldItems: 0,
      currentTypes: 0, // 当前拣货
      currentItems: 0,
    }

    // 需拣货
    retObject.allTypes = tpMaterialList.length;
    tpMaterialList.map((ml) => {
      retObject.allItems += Number(ml.DGSL);
      // 已拣货
      if (Number(ml.YJHSL) > 0) {
        retObject.alreadyTypes += 1;
      }
      retObject.alreadyItems += Number(ml.YJHSL);
    });

    if (this.state.filterFlag) { // 所有库位
      tpMaterialList.map((ml) => {
        // 应拣货
        const materialsNum = this.state.productStockObject.getAllMatrialsTotalNum(
          ml.SPID,
          'AlreadySelect'
        );

        const totalMaterialsNum = Number(ml.YJHSL) + materialsNum;
        const shouldNum = Number(ml.DGSL) - totalMaterialsNum;
        if (shouldNum > 0) {
          retObject.shouldTypes += 1;
          retObject.shouldItems += shouldNum;
        }

        // 当前拣货
        if (materialsNum > 0) {
          retObject.currentTypes += 1;
          retObject.currentItems += materialsNum;
        }
      })
    } else { // 当前库位
      const curActiveStock = this.state.productStockObject.getSingleProductStock('ifActive', true);
      const stockMaterials = this.state.productStockObject.getStockMaterials(curActiveStock);
      stockMaterials.map((sm) => {
        tpMaterialList.some((ml) => {
          if (ml.SPID === sm.GoodsId) {
            const totalMaterialsNum = Number(ml.YJHSL) + Number(sm.AlreadySelect);
            const shouldNum = Number(ml.DGSL) - totalMaterialsNum;
            if (shouldNum > 0) {
              retObject.shouldTypes += 1;
              retObject.shouldItems += shouldNum;
            }

            // 当前拣货
            if (Number(sm.AlreadySelect) > 0) {
              retObject.currentTypes += 1;
              retObject.currentItems += Number(sm.AlreadySelect);
            }
          }
        })
      })
    }

    return retObject;
  }

  handleRequestClose = () => {
    this.setState({
      openError: false,
      errorMessage: ''
    });
  };

  alertError = (msg) => {
    this.setState({
      openError: true,
      errorMessage: msg
    });
  };


  render() {
    const toolBarPropsObject = {
      handleChangeFilter: this.toolBarHandleChangeFilter,
      handleChangeToggle: this.toolBarHandleChangeToggle,
      handleBarOnChange: this.toolBarHandleBarOnChange,
      handleSelect: this.toolHandleSelect,
      storageId: Number(this.state.productStockObject.getStockKeyValueByIndex(
                          this.state.curActiveIndex,
                          'StockPositionID') || 0),
    };

    const storageListPropsObject = {
      handleSelectProduction: this.storageListHandleSelectProduction,
      ifShowOtherStock: this.props.ifShowSelect,
      batchAlreadySelectTextChange: this.storageListBatchTextChange,
      outBandStockId: this.props.orderInfo.CKCK,
      orderId: this.props.orderId,
      getAllStockByGoodsId: this.storageListGetAllStockByGoodsId,
      otherStockCallback: this.storageListOtherStockCallback,
    };

    const messageBarPropsObject = {
      temporaryData: this.adaptToTemporaryObject(),
      filterSummaryData: this.getFilterSummary(),
      ifCurrntStorage: this.ifCurrntStorage,
    };

    return (
      <div style={{ height: '100%' }}>
        <SelectProductionShowAll
          stockDataList={this.getStockDataByFilter()}
          toolBarProps={toolBarPropsObject}
          storageListProps={storageListPropsObject}
          messageBarProps={messageBarPropsObject}
        />
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    )
  }
}

