/**
 * Created by NXQ on 10/21/2016.
 */

import { connect } from 'react-redux';

import {
  getCreditOrganizationToMeListData,
  getCreditQueryData
} from '../modules/creditGainTemp';

import CreditGainTemp from '../components/CreditGainTemp';

const mapDispatchToProps = {
  getCreditOrganizationToMeListData: id => getCreditOrganizationToMeListData(id),
  getCreditQueryData: ({
    AuthorizeOrganizationId, AuthorizedOrganizationId
  }) => getCreditQueryData({
    AuthorizeOrganizationId, AuthorizedOrganizationId
  })
};

const mapStateToProps = state => ({
  creditGainTemp: state.creditGainTemp,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditGainTemp)

