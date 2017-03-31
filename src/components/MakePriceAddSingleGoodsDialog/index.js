/**
 * Created by NXQ on 11/28/2016.
 */

import { connect } from 'react-redux';

import { putMakePriceAddSingleGoodsData, initMakePriceAddSingleGoodsData } from './modules/makePriceAddSingleGoodsDialog';

import MakePriceAddSingleGoodsDialog from './MakePriceAddSingleGoodsDialog';

import { getMakePriceSingleGoodsDialogData, getMakePriceSingleGoodsLineChartData } from 'components/MakePriceSingleGoodsDialog/modules/makePriceSingleGoodsDialog';


const mapDispatchToProps = {
  putMakePriceAddSingleGoodsData,
  initMakePriceAddSingleGoodsData,
  getMakePriceSingleGoodsDialogData,
  getMakePriceSingleGoodsLineChartData
};

const mapStateToProps = state => ({
  makePriceAddSingleGoodsDialog: state.makePriceAddSingleGoodsDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePriceAddSingleGoodsDialog)

