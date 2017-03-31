/**
 * Created by NXQ on 10/23/2016.
 */


import { connect } from 'react-redux';

import {
  getMakePriceGoodsData,
  putMakePriceGoodsData,
  initPutMakePriceGoodsData
} from './modules/makePriceGoodsDataGrid';

import MakePriceGoodsDataGrid from './MakePriceGoodsDataGrid';

const mapDispatchToProps = {
  getMakePriceGoodsData,
  putMakePriceGoodsData,
  initPutMakePriceGoodsData
};

const mapStateToProps = state => ({
  makePriceGoodsDataGrid: state.makePriceGoodsDataGrid
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePriceGoodsDataGrid)

