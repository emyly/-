import { connect } from 'react-redux'

import CreateStockOrder from '../components/CreateStockOrder'

import { actions } from '../modules/createStockOrder'

import { initStore as brandSelectInitStore } from 'components/BrandSelect/modules/brandSelect'

import { initStore as lobSelectInitStore } from 'components/LOBSelect/modules/lobSelect'

import { initStore as chooseGoodsInitStore, setChoosedAuthGoods as setChoosedAuthGood } from 'components/ChooseGoodsAuthDialog/modules/setChoosedAuthGoods'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  createStockOrder: state.stockOrder.createStockOrder,
  setChoosedAuthGoods: state.setChoosedAuthGoodsReducer
})

export default connect(mapStateToProps, { lobSelectInitStore, brandSelectInitStore, chooseGoodsInitStore, setChoosedAuthGood, ...actions })(CreateStockOrder)
