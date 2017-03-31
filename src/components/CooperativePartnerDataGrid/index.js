/**
 * Created by NXQ on 10/23/2016.
 */

import { connect } from 'react-redux';

import { getCooperativePartnerData } from './modules/cooperativePartnerDataGrid';

import CooperativePartnerDataGrid from './CooperativePartnerDataGrid';


const mapDispatchToProps = {
  getCooperativePartnerData
};

const mapStateToProps = state => ({
  cooperativePartnerDataGrid: state.cooperativePartnerDataGrid,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(CooperativePartnerDataGrid)

