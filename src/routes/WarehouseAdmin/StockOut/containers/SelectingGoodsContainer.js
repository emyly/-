/**
 * Created by wangming on 11/16/2016.
 */

import { connect } from 'react-redux';

import {
	createOutStockData
} from '../modules/selectingGoods';

import SelectingGoods from '../components/SelectingGoods';

const mapDispatchToProps = {
  createOutStockData
};

const mapStateToProps = state => ({
  selectingGoods: state.stockOut.selectingGoods
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectingGoods)
