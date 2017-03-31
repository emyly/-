const HeaderInfo = [
  {
    title: '物料号',
    dataIndex: 'WLH'
  },
  {
    title: '商品描述',
    dataIndex: 'WLH'
  },
  {
    title: '批号',
    dataIndex: 'HWPH'
  },
  {
    title: '库存',
    dataIndex: 'SPSL'
  },
  {
    title: '已拣',
    dataIndex: 'SPSL'
  },
  {
    title: '未拣',
    dataIndex: 'SPSS'
  },
];

const HeaderInfoCheckBox = [
  {
    title: '',
    dataIndex: 'CK'
  },
  {
    title: '物料号',
    dataIndex: 'WLH'
  },
  {
    title: '数量',
    dataIndex: 'SPSL'
  }

];

/**
 * Product Selection DataSchema
 *
 * Hierarchy: ProductStockInfo -> StockPositions -> ProductListByMaterialID -> ProductListByBatchID
 * Each Node to its children is 1 to N
 *
 */
const ProductStockInfo = {
  StockPositions: [
    {
      ifActive: true,
      StockPositonName: '库位1',
      StockPositionID: '900000000003',
      orderByFlex: '库位显示位置',
      ProductListByMaterialID: [
        {
          MaterialID: '123',
          AlreadySelect: 10,
          LastNumber: 10, // SXSL - AlreadySelect 所需数量， 未拣初始值
          GoodsId: '123',
          SXSL: 10,
          checked: false,
          GoodsName: '商品名称',
          GoodsDestribution: '商品描述',
          UnselectNum: '未拣数量',
          TotalNum: '库存',
          flexible: '展开缩拢表格',
          ProductListByBatchID: [
            {
              AlreadySelect: 1,
              BatchID: '123',
              ProductionDate: '15.1.1',
              StockNumber: '20',
              kCSL: '10',
            },
            {
              BatchID: '150309',
              ProductionDate: '16.1.1',
              StockNumber: '5'
            }
          ]
        },
        {
          MaterialID: '60162021',
          ProductListByBatchID: [
            {
              BatchID: '1501301',
              ProductionDate: '15.1.1',
              StockNumber: '10'
            },
            {
              BatchID: '150319',
              ProductionDate: '16.1.1',
              StockNumber: '25'
            }
          ]
        }
      ]
    },
    {
      StockPositonName: '库位2',
      StockPositionID: '900000000023',
      ProductListByMaterialID: [
        {
          MaterialID: '60162001',
          ProductListByBatchID: [
            {
              BatchID: '1501001',
              ProductionDate: '15.1.1',
              StockNumber: '20'
            },
            {
              BatchID: '150309',
              ProductionDate: '16.1.1',
              StockNumber: '5'
            }
          ]
        },
        {
          MaterialID: '60162021',
          ProductListByBatchID: [
            {
              BatchID: '1501301',
              ProductionDate: '15.1.1',
              StockNumber: '10'
            },
            {
              BatchID: '150319',
              ProductionDate: '16.1.1',
              StockNumber: '25'
            }
          ]
        }
      ]
    }
  ]
}

/**
 * Product Selection Class by DataSchema of ProductStockInfo
 *
 */
class ProductStockClass {
  constructor(rawData) {
    this.rawData = rawData;
    this.productStockData = [];
    this.stringFilter = '';
    this.storageFilter = true; // true :全局过滤, false: 单个库位过滤
    // this.curStockData = {}; //保存指定的当前操作库位

    // tranfer rawData to ProductStockData
    const dataObject = {};
    rawData.map((value) => {
      if (Object.prototype.toString.call(dataObject[String(value.KWID)]) !== '[object Array]') {
        dataObject[String(value.KWID)] = [];
      }
      dataObject[String(value.KWID)].push(value);
    });

    let index = 0;
    Object.keys(dataObject).map((key) => {
      const dataNode = dataObject[key];
      const dataObjectByStorage = {};
      const dataArrayByMartiral = [];
      dataObjectByStorage.ProductListByMaterialID = dataArrayByMartiral;
      dataObjectByStorage.UnselectNum = 0;
      dataObjectByStorage.LastNumber = 0;
      dataObjectByStorage.orderByFlex = index;
      dataNode.map((DO) => {
        const dataNodeByMartiral = {};
        dataNodeByMartiral.MaterialID = String(DO.SPBH);
        dataNodeByMartiral.GoodsId = DO.PHXQ[0].SPID;
        dataNodeByMartiral.GoodsName = DO.SPMC;
        dataNodeByMartiral.GoodsDestribution = DO.SPMS;
        dataNodeByMartiral.AlreadySelect = 0;
        dataNodeByMartiral.LastNumber = DO.SXSL;
        dataNodeByMartiral.UnselectNum = (() => {
          if (!isNaN(Number(DO.WJSL))) {
            return Number(DO.WJSL);
          } else if (!isNaN(Number(DO.SXSL))) {
            return Number(DO.SXSL);
          } else {
            return 0;
          }
        })();
        dataNodeByMartiral.TotalNum = DO.ZSL;
        dataNodeByMartiral.ProductListByBatchID = DO.PHXQ;
        dataNodeByMartiral.ProductListByBatchID.map((pb) => {
          pb.AlreadySelect = pb.YJSL || 0;
          dataNodeByMartiral.AlreadySelect += pb.AlreadySelect;
        })
        dataObjectByStorage.StockPositionID = DO.KWID;
        dataObjectByStorage.StockPositonName = DO.KWLJ;
        dataObjectByStorage.UnselectNum += Number(DO.WJSL || DO.SXSL);
        dataObjectByStorage.LastNumber += Number(DO.SXSL);

        // 预配套库位类型
        if (DO.YPTKW === '1') {
          dataNodeByMartiral.UnselectNum = 0;
          dataNodeByMartiral.ProductListByBatchID.map((pb) => {
            pb.AlreadySelect = pb.SL;
            dataNodeByMartiral.AlreadySelect += pb.AlreadySelect;
          })
          dataObjectByStorage.stockType = '1';
        }
        dataArrayByMartiral.push(dataNodeByMartiral);
      })
      this.productStockData.push(dataObjectByStorage);
      index++;
    })

    if (this.productStockData.length > 0) {
      this.productStockData[0].ifActive = true;
    }
    this.productStockFilterData = Object.assign([], this.productStockData);
  }

  // 刷新数据,过滤预配套的数据为正常填写数据,修改其他库位数据
  freshStockData = () => {
    this.productStockData.map((pd) => {
      if (pd.stockType === '1') {
        pd.ProductListByMaterialID.map((pm) => {
          let testNum = Number(pm.LastNumber);
          const oldAlreadySelectNums = this.getAllMatrialsTotalNum(
            pm.GoodsId,
            'AlreadySelect'
          );
          testNum -= oldAlreadySelectNums;
          // 设置未拣
          this.setAllMaterialsKeyByMaterialId(
              pm.GoodsId,
              'UnselectNum',
              testNum
          )
        })
      }
    })
  }

  materialFindSubstringByFilter = (strMaterial, strFilter) => {
    if (Object.prototype.toString.call(strMaterial) === '[object String]'
        && Object.prototype.toString.call(strFilter) === '[object String]') {
      return strMaterial.indexOf(strFilter);
    }
    return -1;
  }


  getProductStockByFilter = (strFilter) => {
    const stockData = [];
    this.productStockData.map((stock, stockIndex) => {
      const newStock = this.getMaterialsByStock(stock, strFilter);
      if (newStock.ProductListByMaterialID.length > 0) {
        stockData.push(newStock);
      }
    })

    return stockData;
  };

  // 根据key值获取一个库位
  getSingleProductStock = (key, value) => {
    let retValue = {};
    this.productStockData.some((stock, stockIndex) => {
      if (stock[String(key)] === value) {
        retValue = Object.assign({}, stock);
        return true;
      }
    })
    return retValue;
  }

  // 根据字符串过滤出传入库位下的商品
  getMaterialsByStock = (stock, strFilter) => {
    const materialData = [];
    const newStock = Object.assign({}, stock);
    if (Object.prototype.toString.call(stock.ProductListByMaterialID)
      === '[object Array]') {
      stock.ProductListByMaterialID.map((material) => {
        if (this.materialFindSubstringByFilter(material.MaterialID, strFilter) !== -1
          || this.materialFindSubstringByFilter(material.GoodsName, strFilter) !== -1
          || this.materialFindSubstringByFilter(material.GoodsDestribution, strFilter) !== -1) {
          materialData.push(material);
        }
      })
      // newStock.ProductListByMaterialID = materialData;
      newStock.ProductListByMaterialID = materialData;
    }
    return newStock;
  }

  // 根据库位索引设置库位对象的key值
  setStockKeyValueByIndex = (index, key, value) => {
    this.productStockData[index][key] = value;
  }

  // 根据索引获取库位对象下的key值
  getStockKeyValueByIndex = (index, key) => {
    return this.productStockData[index] ? this.productStockData[index][key] : null;
  }

  // 根据库位id获取库位索引
  getStockIndexByStockId = (stockId) => {
    let retVal = -1;
    this.productStockData.some((stock, index) => {
      if (Number(stock.StockPositionID) === Number(stockId)) {
        retVal = index;
        return true;
      }
      return false;
    })

    return retVal;
  }

  // 根据库位索引设置库位下的所有商品对象的值
  setStockMaterialsKeyValueBystockIndex = (stockIndex, key, value) => {
    this.productStockData[stockIndex].ProductListByMaterialID.map((material, index) => {
      material[key] = value;
    })
  }

  // 设置所有库位的所有商品值
  setAllStockMaterialKeyValue = (key, value) => {
    this.productStockData.map((stock, index) => {
      stock.ProductListByMaterialID.map((material, index) => {
        material[key] = value;
      })
    })
  }

  // 获取指定库位下的指定商品及批号对象
  getBatchMaterialGoodsNode = (stockIndex, goodsId, batchId, outBatch, outMaterial) => {
    let retVal = false;
    this.productStockData[stockIndex].ProductListByMaterialID.some((material) => {
      if (Number(material.GoodsId) === Number(goodsId)) {
        return material.ProductListByBatchID.some((batch) => {
          if (Number(batch.SPPHID) === Number(batchId)) {
            Object.assign(outBatch, batch);
            Object.assign(outMaterial, material);
            retVal = true;
            return true;
          }
        })
      }
    })

    return retVal;
  }

  // 根据库位索引及商品id设置商品对象的key值
  setMaterialKeyValueById = (stockIndex, goodsId, key, value) => {
    this.productStockData[stockIndex].ProductListByMaterialID.some((material) => {
      if (Number(material.GoodsId) === Number(goodsId)) {
        material[key] = value;
        return true;
      }
    })
  }

  // 根据库位索引、商品id、批号id设置已检数量自加1
  materialAndBatchAlreadySelectAdd = (stockIndex, goodsId, batchId, counter) => {
    this.productStockData[stockIndex].ProductListByMaterialID.some((material) => {
      if (Number(material.GoodsId) === Number(goodsId)) {
        return material.ProductListByBatchID.some((batch) => {
          if (Number(batch.SPPHID) === Number(batchId)) {
            batch.AlreadySelect = Number(batch.AlreadySelect) + Number(counter);
            material.AlreadySelect = Number(material.AlreadySelect) + Number(counter);
            return true;
          }
        })
      }
    })
  }

  // 根据库位索引、商品id、批号id设置批号key值
  setBatchKeyValue = (stockIndex, goodsId, batchId, key, value) => {
    this.productStockData[stockIndex].ProductListByMaterialID.some((material) => {
      if (Number(material.GoodsId) === Number(goodsId)) {
        return material.ProductListByBatchID.some((batch) => {
          if (Number(batch.SPPHID) === Number(batchId)) {
            batch[key] = Number(value);
            return true;
          }
        })
      }
    })
  }

  // 根据库位索引、商品id获取库位下指定商品的key值
  getMartiralData = (stockIndex, goodsId, key) => {
    let tpMaterial = {};
    this.productStockData[stockIndex].ProductListByMaterialID.some((material) => {
      if (Number(material.GoodsId) === Number(goodsId)) {
        tpMaterial = material;
        return true;
      }
    })

    return tpMaterial[key];
  }

  // 根据商品id获取所有具有此商品的库位号
  getAllStocksByGoodsId = (goodsId) => {
    const retVal = [];
    this.productStockData.map((stock) => {
      stock.ProductListByMaterialID.some((material) => {
        if (Number(material.GoodsId) === goodsId) {
          retVal.push(stock.StockPositionID);
          return true;
        }
      })
    })
    return retVal;
  }

  // 选择其他库位时根据单库位下选择的索引数组设置批号对象key值,
  setBatchKeyBySelectIndexArray = (stockId, indexArray, key, value) => {
    let obStock = {};
    const arrayBatch = [];
    this.productStockData.some((st) => {
      if (Number(st.StockPositionID) === Number(stockId)) {
        obStock = st;
        return true;
      }
    });

    obStock.ProductListByMaterialID.map((material) => {
      material.ProductListByBatchID.map((batch) => {
        arrayBatch.push(batch);
      })
    })

    indexArray.map((index) => {
      arrayBatch[index][key] = value;
    })
  }

  // 设置指定库位下所有批号对象的key值
  setAllBatchKeyByStockId = (stockId, key, value) => {
    let obStock = {};
    this.productStockData.some((st) => {
      if (Number(st.StockPositionID) === Number(stockId)) {
        obStock = st;
        return true;
      }
    });

    obStock.ProductListByMaterialID.map((material) => {
      material.ProductListByBatchID.map((batch) => {
        batch[key] = value;
      })
    })
  }

  // 插入一个批号对象到全局，过滤重复插入
  insertBatchToStock = (stock, material, batch, key, value, inPutMaterial) => {
    let batchFlag = false;
    let materialFlag = false;
    let stockFlag = false;
    let materialOb = {};
    let stockOb = {};

    this.productStockData.some((st) => {
      if (st.StockPositionID === stock.StockPositionID) {
        stockOb = st;
        stockFlag = true;
        st.ProductListByMaterialID.some((mt) => {
          if (mt.GoodsId === material.GoodsId) {
            materialOb = mt;
            materialFlag = true;
            mt.ProductListByBatchID.some((bt) => {
              if (bt.SPPHID === batch.SPPHID) {
                batchFlag = true;
              }
              return batchFlag;
            })
          }
          return materialFlag;
        })
      }
      return stockFlag;
    })

    // 找到相同库位相同商品相同批号
    if (materialFlag && !batchFlag) { // 找到相同库位相同商品
      return materialOb.ProductListByBatchID.push(Object.assign({}, batch));
    } else if (stockFlag && !batchFlag) { // 找到相同库位
      const tpMaterial = this.filterMaterialByBatchKey(material, key, value);
      return stockOb.ProductListByMaterialID.push(tpMaterial);
    } else if (!batchFlag) {
      const tpStock = this.filterStockByBatchKey(stock, key, value, inPutMaterial);
      tpStock.ifActive = false;
      tpStock.orderByFlex = this.productStockData.length;
      return this.productStockData.push(tpStock);
    }
  }

  // 根据批号key值过滤指定的库位对象
  filterStockByBatchKey = (stock, key, value, inPutMaterial) => {
    const tpStock = Object.assign({}, stock);
    tpStock.ProductListByMaterialID = [];
    stock.ProductListByMaterialID.map((mt) => {
      let tpMaterial = null;
      tpMaterial = this.filterMaterialByBatchKey(mt, key, value);
      if (tpMaterial) {
        tpMaterial.UnselectNum = inPutMaterial.UnselectNum;
        tpMaterial.LastNumber = inPutMaterial.LastNumber;
        tpStock.ProductListByMaterialID.push(tpMaterial);
      }
    })

    if (tpStock.ProductListByMaterialID.length > 0) {
      return tpStock;
    } else {
      return null;
    }
  }

  // 根据批号key值过滤指定的商品对象
  filterMaterialByBatchKey = (material, key, value) => {
    const tpMaterial = Object.assign({}, material);
    tpMaterial.ProductListByBatchID = [];
    material.ProductListByBatchID.map((bt) => {
      if (bt[key] === value) {
        tpMaterial.ProductListByBatchID.push(Object.assign({}, bt));
      }
    })

    if (tpMaterial.ProductListByBatchID.length > 0) {
      return tpMaterial;
    } else {
      return null;
    }
  }

  // 根据批号对象key值合并另一个库位class
  mergeFromOtherObjectByBatchKey = (stockObject, key, value, material) => {
    stockObject.productStockData.map((st) => {
      st.ProductListByMaterialID.map((mt) => {
        mt.ProductListByBatchID.map((bt) => {
          if (bt[key] === value) {
            this.insertBatchToStock(st, mt, bt, key, value, material);
          }
        })
      })
    })
  }

  // 所有库位下key值不等于VALUE的商品对象
  getMaterialsFromAllByKeyNotEqual = (key, value) => {
    const materials = [];
    this.productStockData.map((st) => {
      st.ProductListByMaterialID.map((mt) => {
        if (mt[key] !== value) {
          materials.push(Object.assign({}, mt));
        }
      })
    })

    return materials;
  }

  // 根据商品id获取所有库位下的商品key值的和
  getAllMatrialsTotalNum = (materialId, key) => {
    let totalNum = 0;
    this.productStockData.map((st) => {
      st.ProductListByMaterialID.some((mt) => {
        if (Number(mt.GoodsId) === Number(materialId)) {
          totalNum += mt[key];
          return true;
        }
      })
    })

    return totalNum;
  }

  // 根据商品id设置所有库位下的商品key值
  setAllMaterialsKeyByMaterialId = (materialId, key, value) => {
    this.productStockData.map((st) => {
      st.ProductListByMaterialID.some((mt) => {
        if (Number(mt.GoodsId) === Number(materialId)) {
          mt[key] = value;
          return true;
        }
      })
    })
  }

  // 将库位数据转换为暂存入参格式
  adaptToTemporaryObject = () => {
    const retVal = [];
    this.productStockData.map((st) => {
      st.ProductListByMaterialID.map((mt) => {
        mt.ProductListByBatchID.map((bt) => {
          const newBt = Object.assign({}, bt);
          newBt.YJSL = bt.AlreadySelect;
          newBt.WJSL = mt.UnselectNum;
          delete newBt.GUID;
          retVal.push(newBt);
        })
      })
    })

    return retVal;
  }

  // 获取指定库位下所有的商品对象
  getStockMaterials = stock => stock.ProductListByMaterialID
}

export {
  HeaderInfo,
  ProductStockInfo,
  HeaderInfoCheckBox,
  ProductStockClass
}
