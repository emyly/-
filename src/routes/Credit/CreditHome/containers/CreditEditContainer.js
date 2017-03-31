/**
 * Created by NXQ on 10/11/2016.
 */

import { connect } from 'react-redux';

import {
  createCredit,
  putChangeCreateStatus
} from '../modules/creditEdit';

import {
  getTempCreditQueryData
} from 'components/TempCreditQueryDataGrid/modules/tempCreditQueryDataGrid'

import CreditEdit from '../components/CreditEdit';

const mapDispatchToProps = {
  createCredit,
  putChangeCreateStatus,
  getTempCreditQueryData
};

const mapStateToProps = state => ({
  creditEdit: state.credit.creditEdit,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditEdit)

