/**
 * Created by NXQ on 11/16/2016.
 */

import { connect } from 'react-redux';

import {
  postSingleNewContractData,
  putChangeCreateStatus
} from '../modules/contractAdd';

import ContractAdd from '../components/ContractAdd';

const mapDispatchToProps = {
  postSingleNewContractData,
  putChangeCreateStatus
};

const mapStateToProps = state => ({
  contractAdd: state.contractAndAuthorization.contractAdd,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractAdd)

