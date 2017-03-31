/**
 * Created by NXQ on 1/5/2017.
 */

import { connect } from 'react-redux';

import {
  getDepositImprestDetailsData
} from './modules/depositImprestDetailsDataGrid';

import DepositImprestDetailsDataGrid from './DepositImprestDetailsDataGrid';

const mapDispatchToProps = {
  getDepositImprestDetailsData
};

const mapStateToProps = state => ({
  depositImprestDetailsDataGrid: state.depositImprestDetailsDataGrid,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositImprestDetailsDataGrid)
