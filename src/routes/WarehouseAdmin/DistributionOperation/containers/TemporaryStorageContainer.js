/**
 * Created by wangming on 2/16/2017.
 */

import { connect } from 'react-redux';

import {
  setTemporaryStorage,
} from '../modules/temporaryStorage';

import TemporaryStorage from '../components/TemporaryStorage';

const mapDispatchToProps = {
  setTemporaryStorage,
};

const mapStateToProps = state => ({
  temporaryStorage: state.distributionOperation.temporaryStorage
});

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryStorage)
