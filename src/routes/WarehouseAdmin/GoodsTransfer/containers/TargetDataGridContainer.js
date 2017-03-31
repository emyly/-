
import { connect } from 'react-redux';

import { changeTranGoods } from '../modules/goodsTransferOperating';

import TargetDataGrid from '../components/TargetDataGrid';

const mapStateToProps = state => ({
  tranGoods: state.goodsTransfer.goodsTransferOperating.tranGoods,
});

export default connect(mapStateToProps, { changeTranGoods })(TargetDataGrid)
