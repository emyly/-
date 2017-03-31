/**
 * Created by wangming on 11/15/2016.
 */

import { connect } from 'react-redux';

import {
  getTableData,
  getSelectTableRowList,
} from '../modules/selectProduction';

import SelectProduction from '../components/SelectProduction';

const mapDispatchToProps = {
  getTableData,
  getSelectTableRowList,
};

const mapStateToProps = state => ({
  selectProduction: state.distributionOperation.selectProduction
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectProduction)

