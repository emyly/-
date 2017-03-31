/**
 * Created by niexq on 17/3/26.
 */

import { connect } from 'react-redux';

import { actions } from '../modules/goodsTransferOperating';

import GoodsTransferOperating from '../components/GoodsTransferOperating';

const mapStateToProps = state => ({
  goodsTransferOperating: state.goodsTransfer.goodsTransferOperating,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, actions)(GoodsTransferOperating)

