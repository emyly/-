/**
 * Created by wangming on 11/18/2016.
 */

import { connect } from 'react-redux';

import StockOutDetailBeforeSelect from '../components/StockOutDetailBeforeSelect';

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
  stockOutDetailBefore: state.stockOut.stockOutDetailBefore
});

export default connect(mapStateToProps, mapDispatchToProps)(StockOutDetailBeforeSelect)

