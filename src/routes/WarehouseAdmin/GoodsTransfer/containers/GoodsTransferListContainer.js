/**
 * Created by niexq on 17/3/25.
 */

import { connect } from 'react-redux';

import {
  getGoodsTransferListData
} from '../modules/goodsTransferList';
import { initPostOrder } from '../modules/goodsTransferOperating';


import GoodsTransferList from '../components/GoodsTransferList';

const mapDispatchToProps = {
  getGoodsTransferListData,
  initPostOrder
};

const mapStateToProps = state => ({
  goodsTransferList: state.goodsTransfer.goodsTransferList,
  globalStore: state.globalStore,
  goodsTransferOperating: state.goodsTransfer.goodsTransferOperating,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsTransferList)

