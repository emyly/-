/**
 * Created by NXQ on 1/4/2017.
 */

import { connect } from 'react-redux';

import {
  getDepositImprestData
} from './modules/depositImprestDataGrid';

import DepositImprestDataGrid from './DepositImprestDataGrid';

const mapDispatchToProps = {
  getDepositImprestData
};

const mapStateToProps = state => ({
  depositImprestDataGrid: state.depositImprestDataGrid,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositImprestDataGrid)
