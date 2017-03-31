
/**
 * Created by NXQ on 2017/1/9.
 */
import FinancialOrderGoodsDetailsDateGrid from './FinancialOrderGoodsDetailsDateGrid';

import {
  connect
} from 'react-redux'
import {
  getFinancialOrderGoodsDetailDate
} from './modules/financialOrderGoodsDetailsDateGrid'
const mapDispatchToProps = {
  getFinancialOrderGoodsDetailDate
}

const mapStateToProps = state => ({
  financialOrderGoodsDetailsDateGrid: state.financialOrderGoodsDetailsDateGrid
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialOrderGoodsDetailsDateGrid)
