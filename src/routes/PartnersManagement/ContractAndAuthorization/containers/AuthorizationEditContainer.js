/**
 * Created by NXQ on 11/16/2016.
 */

import { connect } from 'react-redux';

import {
  postSingleNewContractData,
  putChangeCreateStatus
} from '../modules/contractAdd';

import AuthorizationEdit from '../components/AuthorizationEdit';

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationEdit)

