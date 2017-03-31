/**
 * Created by NXQ on 10/22/2016.
 */
import { connect } from 'react-redux';

import { getTempCreditQueryData, deleteSingleTempCreditData } from './modules/tempCreditQueryDataGrid';

import TempCreditQueryDataGrid from './TempCreditQueryDataGrid';

const mapDispatchToProps = {
  getTempCreditQueryData: ({ AuthorizeOrganizationId, AuthorizedOrganizationId }) => getTempCreditQueryData({ AuthorizeOrganizationId, AuthorizedOrganizationId }),
  deleteSingleTempCreditData: deleteObject => deleteSingleTempCreditData(deleteObject)
};

const mapStateToProps = state => ({
  tempCreditQueryDataGrid: state.tempCreditQueryDataGrid
});

export default connect(mapStateToProps, mapDispatchToProps)(TempCreditQueryDataGrid)

