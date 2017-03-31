/**
 * Created by wangming on 11/15/2016.
 */

import { connect } from 'react-redux';

import {
  getWarehouseInOutGoodsSummary
} from '../modules/distributionSummary';

import DistributionSummary from '../components/DistributionSummary';

const mapDispatchToProps = {
  getWarehouseInOutGoodsSummary
};

const mapStateToProps = state => ({
  distributionSummary: state.distributionOperation.distributionSummary
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributionSummary)

