/**
 * Created by NXQ on 17/1/19.
 */

import { connect } from 'react-redux';

import {
  getWarehouseOutStockGoodsData,
  initWarehouseOutStockGoodsData
} from './modules/warehouseOutStockGoodsDialog';

import WarehouseOutStockGoodsDialog from './WarehouseOutStockGoodsDialog';

const mapDispatchToProps = {
  getWarehouseOutStockGoodsData,
  initWarehouseOutStockGoodsData
};

const mapStateToProps = state => ({
  warehouseOutStockGoodsDialog: state.warehouseOutStockGoodsDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseOutStockGoodsDialog)
