/**
 * Created by wangming on 11/19/2016.
 */

import { connect } from 'react-redux';

import {
	getWarehouseBasicInfo,
	getWarehouseDetail
} from './modules/outBoundDetail';

import OutBoundDetail from './OutBoundDetail';

const mapDispatchToProps = {
  getWarehouseBasicInfo,
  getWarehouseDetail
};

const mapStateToProps = state => ({
  outBoundDetail: state.outBoundDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(OutBoundDetail)
