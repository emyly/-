import { connect } from 'react-redux'

import CreateOrder from '../components/CreateOrder'

import { actions } from '../modules/createOrder'

import { initStore as brandSelectInitStore } from 'components/BrandSelect/modules/brandSelect'

import { initStore as lobSelectInitStore } from 'components/LOBSelect/modules/lobSelect'

import { initStore as chooseGoodsInitStore, setChoosedAuthGoods as setChoosedAuthGood} from 'components/ChooseGoodsAuthDialog/modules/setChoosedAuthGoods'

import { postChangeAddress } from '../../WarehouseGeneral/components/ChooseReceiveAddress/modules/chooseReceiveAddress'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  createOrder: state.surgeryOrder.createOrder,
  postChangeLocationData: state.surgeryOrder.postChangeLocationData,
  setChoosedAuthGoods: state.setChoosedAuthGoodsReducer
})

export default connect(mapStateToProps, { postChangeAddress, brandSelectInitStore, lobSelectInitStore, chooseGoodsInitStore, setChoosedAuthGood, ...actions })(CreateOrder)
