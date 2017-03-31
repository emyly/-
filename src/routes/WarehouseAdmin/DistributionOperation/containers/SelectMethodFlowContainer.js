/**
 * Created by wangming on 11/18/2016.
 */

import { connect } from 'react-redux';

import SelectMethodFlow from '../components/SelectMethodFlow';

import {
  getTemporaryStorage,
  getSelectAdvice,
} from '../modules/selectMethodFlow';

const mapDispatchToProps = {
  getTemporaryStorage,
  getSelectAdvice,
};

const mapStateToProps = state => ({
  selectMethodFlow: state.distributionOperation.selectMethodFlow
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectMethodFlow)

