/**
 * Created by chenming on 2016/11/9.
 */

import { connect } from 'react-redux'

import {
  getSingleWareHouseChildData,
  getSingleLocationChildData
} from 'components/ChooseGoodsStoreDialog/modules/chooseGoodsStoreDialog';
import ChooseWarehouse from '../components/ChooseWarehouse'
import {
  patchForbidAndUseWarehouse,
  patchForbidAndUseWarehouseInit,
  getSingleLocationWarehouseProduction
} from '../modules/chooseWarehouse';
import {
  putEidtLocationStorageData,
  initEditLocationStoragelData
} from 'components/EditLocationStorageDialog/modules/editLocationStorageDialog'
import {
  inventorySee
} from './../../InventorySee/modules/inventorySee'
const mapDispatchToProps = {
  getSingleWareHouseChildData: id => getSingleWareHouseChildData(id),
  getSingleLocationChildData: id => getSingleLocationChildData(id),
  patchForbidAndUseWarehouse: params => patchForbidAndUseWarehouse(params),
  inventorySee: (page, id, params) => inventorySee(page, id, params),
  patchForbidAndUseWarehouseInit: params => patchForbidAndUseWarehouseInit(params),
  getSingleLocationWarehouseProduction: params => getSingleLocationWarehouseProduction(params),
  putEidtLocationStorageData: params => putEidtLocationStorageData(params),
  initEditLocationStoragelData: () => initEditLocationStoragelData()

}

const mapStateToProps = state => ({
  chooseGoodsStoreDialog: state.chooseGoodsStoreDialog,
  chooseWarehouseData: state.chooseWarehouseData,
  inventorySeeData: state.inventorySeeData,
  editLocationStorageDialog: state.editLocationStorageDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWarehouse)
