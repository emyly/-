/**
 * Created by NXQ on 2/14/2017.
 */

import { connect } from 'react-redux';

import {
  initFinancialBillingSubmitPostState,
  postBillingBatchSubmitData
} from '../modules/billingBatchSubmit';

import BillingSubmit from '../components/BillingSubmit';

const mapDispatchToProps = {
  initFinancialBillingSubmitPostState,
  postBillingBatchSubmitData
};

const mapStateToProps = state => ({
  billingBatchSubmit: state.billing.billingBatchSubmit
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingSubmit)

