/**
 * Created by wangming on 11/15/2016.
 */

import { connect } from 'react-redux';

import {
	getSelectAdvice,
	getTableData,
	getOtherStorage,
	getSelectTableRowList
} from '../modules/selectProduction';

import SelectProduction from '../components/SelectProduction';

const mapDispatchToProps = {
  getSelectAdvice,
  getTableData,
  getOtherStorage,
  getSelectTableRowList
};

const mapStateToProps = state => ({
  selectProduction: state.stockOut.selectProduction
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectProduction)

