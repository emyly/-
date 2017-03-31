/**
 * Created by NXQ on 2/14/2017.
 */

import { connect } from 'react-redux';

import {
  postGatheringSubmitData,
  initFinancialgatheringSubmitPostState,
  getGatheringOneDepositData,
  getGatheringBatchSalesOrderData
} from '../modules/gatheringSubmit';

import GatheringBatchSubmit from '../components/GatheringBatchSubmit';

const mapDispatchToProps = {
  initFinancialgatheringSubmitPostState,
  postGatheringSubmitData,
  getGatheringOneDepositData,
  getGatheringBatchSalesOrderData
};

const mapStateToProps = state => ({
  gatheringSubmit: state.gathering.gatheringSubmit,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(GatheringBatchSubmit)

