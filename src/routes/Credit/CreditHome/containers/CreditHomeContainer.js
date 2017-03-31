/**
 * Created by NXQ on 10/11/2016.
 */

import { connect } from 'react-redux';

import CreditHome from '../components/CreditHome';

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditHome)

