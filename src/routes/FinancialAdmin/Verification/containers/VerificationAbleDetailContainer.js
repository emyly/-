/**
 * Created by NXQ on 1/12/2017.
 */

import { connect } from 'react-redux';

import {
  postFinancialVerificationData,
  initFinancialVerificationSubmitPostState
} from '../modules/verification';

import VerificationAbleDetail from '../components/VerificationAbleDetail';

const mapDispatchToProps = {
  postFinancialVerificationData,
  initFinancialVerificationSubmitPostState
};

const mapStateToProps = state => ({
  verification: state.verification,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationAbleDetail)

