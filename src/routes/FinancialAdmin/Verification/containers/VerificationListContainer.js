/**
 * Created by NXQ on 1/12/2017.
 */

import { connect } from 'react-redux';

import {
  postFinancialVerificationData,
  initFinancialVerificationSubmitPostState
} from '../modules/verification';

import{
  getFinancialListData
} from 'components/FinancialDataGrid/modules/financialDataGrid'

import VerificationList from '../components/VerificationList';

const mapDispatchToProps = {
  postFinancialVerificationData,
  initFinancialVerificationSubmitPostState,
  getFinancialListData
};

const mapStateToProps = state => ({
  verification: state.verification,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationList)

