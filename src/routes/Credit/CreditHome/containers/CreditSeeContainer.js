/**
 * Created by NXQ on 10/11/2016.
 */

import { connect } from 'react-redux';

import {
  getFixedCreditSeeData,
  getTempCreditTotalSeeData,
  deleteSingleFixedCreditData,
  createCredit,
  putChangeCreateStatus,
  changeDeleteSingleTempCreditStatus
} from '../modules/creditSee';

import {
  getTempCreditQueryData
} from 'components/TempCreditQueryDataGrid/modules/tempCreditQueryDataGrid'

import CreditSee from '../components/CreditSee';

const mapDispatchToProps = {
  getFixedCreditSeeData,
  getTempCreditTotalSeeData,
  deleteSingleFixedCreditData,
  createCredit,
  putChangeCreateStatus,
  getTempCreditQueryData,
  changeDeleteSingleTempCreditStatus
};

const mapStateToProps = state => ({
  creditSee: state.credit.creditSee,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditSee)

