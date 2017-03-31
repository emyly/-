/**
 * Created by NXQ on 17/1/7.
 */

import { connect } from 'react-redux';

import {
  getDepositImprestPartnerData,
  postDepositImprestData
} from './modules/depositImprestRegisterDialog';

import DepositImprestRegisterDialog from './DepositImprestRegisterDialog';

const mapDispatchToProps = {
  getDepositImprestPartnerData,
  postDepositImprestData
};

const mapStateToProps = state => ({
  depositImprestRegisterDialog: state.depositImprestRegisterDialog,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositImprestRegisterDialog)
