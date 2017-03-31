/**
 * Created by NXQ on 11/25/2016.
 */


import { connect } from 'react-redux';

import {
  getMakePriceSingleGoodsDialogData,
  initMakePriceSingleGoodsDialogData,
  deleteMakePriceSingleGoodsDialogData,
  initDeleteMakePriceSingleGoodsDialogData,
  getMakePriceSingleGoodsLineChartData,
  initGetMakePriceSingleGoodsLineChartData
} from './modules/makePriceSingleGoodsDialog';

import MakePriceSingleGoodsDialog from './MakePriceSingleGoodsDialog';


const mapDispatchToProps = {
  getMakePriceSingleGoodsDialogData,
  initMakePriceSingleGoodsDialogData,
  deleteMakePriceSingleGoodsDialogData,
  initDeleteMakePriceSingleGoodsDialogData,
  getMakePriceSingleGoodsLineChartData,
  initGetMakePriceSingleGoodsLineChartData
};

const mapStateToProps = state => ({
  makePriceSingleGoodsDialog: state.makePriceSingleGoodsDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePriceSingleGoodsDialog)

