/**
 * Created by NXQ on 10/22/2016.
 */

import { connect } from 'react-redux';

import {
  getCreditQueryData,
  changeCreditCurrentPage,
  changeNoCreditCurrentPage
} from './modules/creditQueryDataGrid';

import CreditQueryDataGrid from './CreditQueryDataGrid';

const mapDispatchToProps = {
  getCreditQueryData: id => getCreditQueryData(id),
  changeCreditCurrentPage,
  changeNoCreditCurrentPage
};

const mapStateToProps = state => ({
  creditQueryDataGrid: state.creditQueryDataGrid
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditQueryDataGrid)
