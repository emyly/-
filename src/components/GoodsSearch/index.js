/**
 * Created by sjf on 2016/12/1.
 */
import {
  connect
} from 'react-redux'
import {

} from './modules/goodsSearchIndex'
import GoodsSearchIndex from './GoodsSearchIndex';

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  goodsFiltersReducer: state.goodsFiltersReducer,
  globalStore: state.globalStore
})
export default connect(mapStateToProps, mapDispatchToProps)(GoodsSearchIndex)
