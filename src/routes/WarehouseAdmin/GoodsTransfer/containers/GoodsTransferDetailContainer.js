/**
 * Created by niexq on 17/3/25.
 */

import { connect } from 'react-redux';

import {

} from '../modules/goodsTransferDetail';

import GoodsTransferDetail from '../components/GoodsTransferDetail';

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
  goodsTransferDetail: state.goodsTransfer.goodsTransferDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsTransferDetail)

