/**
 * Created by NXQ on 10/21/2016.
 */

import { connect } from 'react-redux';

import {
  initChooseGoodsStoreDialogData,
  getSingleWareHouseChildData,
  getSingleLocationChildData,
  getSingleLocationGoodsData
} from './modules/chooseGoodsStoreDialog';

import ChooseGoodsStoreDialog from './ChooseGoodsStoreDialog';


const mapDispatchToProps = {
  initChooseGoodsStoreDialogData,
  getSingleWareHouseChildData,
  getSingleLocationChildData,
  getSingleLocationGoodsData
};

const mapStateToProps = state => ({
  chooseGoodsStoreDialog: state.chooseGoodsStoreDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGoodsStoreDialog)

