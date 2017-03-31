import { connect } from 'react-redux'

import CreateConsignmentOrder from '../components/CreateConsignmentOrder'

import { actions } from '../modules/createConsignmentOrder'

import { initStore as brandSelectInitStore } from 'components/BrandSelect/modules/brandSelect'

import { initStore as lobSelectInitStore } from 'components/LOBSelect/modules/lobSelect'

import { initStore as chooseGoodsInitStore, setChoosedAuthGoods as setChoosedAuthGood } from 'components/ChooseGoodsAuthDialog/modules/setChoosedAuthGoods'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  createConsignmentOrder: state.consignmentOrder.createConsignmentOrder,
  setChoosedAuthGoods: state.setChoosedAuthGoodsReducer
})

export default connect(mapStateToProps, { lobSelectInitStore, brandSelectInitStore, chooseGoodsInitStore, setChoosedAuthGood, ...actions })(CreateConsignmentOrder)
