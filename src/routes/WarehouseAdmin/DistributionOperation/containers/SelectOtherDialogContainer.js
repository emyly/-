/**
 * Created by wangming on 2/14/2017.
 */

import { connect } from 'react-redux';

import {
  getOtherStorage,
} from '../modules/selectOtherDialog';

import SelectOtherDialog from '../components/SelectOtherDialog';

const mapDispatchToProps = {
  getOtherStorage,
};

const mapStateToProps = state => ({
  selectOtherDialog: state.distributionOperation.selectOtherDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectOtherDialog)

