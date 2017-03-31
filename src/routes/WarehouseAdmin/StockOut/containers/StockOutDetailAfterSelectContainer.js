/**
 * Created by wangming on 11/18/2016.
 */

import { connect } from 'react-redux';

import StockOutDetailAfterSelect from '../components/StockOutDetailAfterSelect';

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
  stockOutDetailAfter: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(StockOutDetailAfterSelect)

