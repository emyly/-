const HeaderInfo = [
  {
    title: '物料号',
    dataIndex: 'WLH'
  },
  {
    title: '已拣/未拣',
    dataIndex: 'SPSL'
  },
  {
    title: '批号',
    dataIndex: 'HWPH'
  },
  {
    title: '生产日期',
    dataIndex: 'SCRQ'
  },
  {
    title: '数量',
    dataIndex: 'SPSL'
  }

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
    title: '批号',
    dataIndex: 'HWPH'
  },
  {
    title: '生产日期',
    dataIndex: 'SCRQ'
  },
  {
    title: '数量',
    dataIndex: 'SPSL'
  }

];

const StockData = {
  warehouseId: 900000000003,
  Items: [
    {
      KWID: 900000000003,
      YXQZ: null,
      SCRQ: 1420041600000,
      WQJXSID: 900000000206,
      KCSL: 20,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-默认库位',
      SPLX: '0',
      SPBH: '60162001',
      SPPH: '1501001'
    },
    {
      KWID: 900000000003,
      YXQZ: null,
      SCRQ: 1420041600000,
      WQJXSID: 900000000206,
      KCSL: 13,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-默认库位',
      SPLX: '0',
      SPBH: '60162001',
      SPPH: '150309'
    },
    {
      KWID: 900000000003,
      YXQZ: null,
      SCRQ: 1420041600000,
      WQJXSID: 900000000206,
      KCSL: 25,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-默认库位',
      SPLX: '0',
      SPBH: '60162001',
      SPPH: '160902'
    },
    {
      KWID: 900000000034,
      YXQZ: 1477929600000,
      SCRQ: null,
      WQJXSID: 900000000206,
      KCSL: 30,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-库位2',
      SPLX: '0',
      SPBH: '660861080',
      SPPH: '1411005'
    },
    {
      KWID: 900000000034,
      YXQZ: 1477929600000,
      SCRQ: null,
      WQJXSID: 900000000206,
      KCSL: 10,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-库位2',
      SPLX: '0',
      SPBH: '660861080',
      SPPH: '140908'
    },
    {
      KWID: 900000000034,
      YXQZ: null,
      SCRQ: 1420041600000,
      WQJXSID: 900000000206,
      KCSL: 33,
      KWLJ: '杭州鼎盛医疗器械有限公司-默认仓库-默认库位',
      SPLX: '0',
      SPBH: '60162001',
      SPPH: '1501001'
    }
  ]
};

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
      StockPositonName: '库位1',
      StockPositionID: '900000000003',
      ProductListByMaterialID: [
        {
          MaterialID: '123',
          AlreadySelect: 0,
          LastNumber: 10,
          GoodsId: '123',
          ProductListByBatchID: [
            {
              AlreadySelect: 1,
              BatchID: '123',
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

export {
	HeaderInfo,
	ProductStockInfo,
	HeaderInfoCheckBox
}
