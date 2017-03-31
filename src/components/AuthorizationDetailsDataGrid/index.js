/**
 * Created by NXQ on 10/23/2016.
 */

import AuthorizationDetailsDataGrid from './AuthorizationDetailsDataGrid';


import { connect } from 'react-redux';

import { getCurrentContractAuthorizedData } from './modules/authorizationDetailsDataGrid';


const mapDispatchToProps = {
  getCurrentContractAuthorizedData
};

const mapStateToProps = state => ({
  authorizationDetailsDataGrid: state.authorizationDetailsDataGrid,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationDetailsDataGrid)

