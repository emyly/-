/**
 * Created by NXQ on 10/23/2016.
 */

import AuthorizationAllContractDetailsDataGrid from './AuthorizationAllContractDetailsDataGrid';


import { connect } from 'react-redux';

import { getAllContractAuthorizedData } from './modules/authorizationAllContractDetailsDataGrid';


const mapDispatchToProps = {
  getAllContractAuthorizedData
};

const mapStateToProps = state => ({
  authorizationAllContractDetailsDataGrid: state.authorizationAllContractDetailsDataGrid,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationAllContractDetailsDataGrid)

