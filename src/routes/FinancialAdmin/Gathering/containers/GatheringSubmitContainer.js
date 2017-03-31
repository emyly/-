/**
 * Created by NXQ on 2/14/2017.
 */

import { connect } from 'react-redux';

import {
  postGatheringSubmitData,
  initFinancialgatheringSubmitPostState,
  getGatheringOneDepositData
} from '../modules/gatheringSubmit';

import GatheringSubmit from '../components/GatheringSubmit';

const mapDispatchToProps = {
  initFinancialgatheringSubmitPostState,
  postGatheringSubmitData,
  getGatheringOneDepositData
};

const mapStateToProps = state => ({
  gatheringSubmit: state.gathering.gatheringSubmit,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(GatheringSubmit)

