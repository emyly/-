/**
 * Created by qyf on 2016/11/10.
 */
import {
  connect
} from 'react-redux'

import OrderCheck from '../components/OrderCheck'
import {
  getDistriButionOrganization,
  getDistriButionAddress,
  getDisSearchContracts,
  submitDistriButionOrder,
  getDisSearchContractsrGanization_id,
  failStore
} from '../modules/disorderCheck'


import { initStore as chooseGoodsInitStore,
         setChoosedAuthGoods as setChoosedAuthGood
} from 'components/ChooseGoodsAuthDialog/modules/setChoosedAuthGoods'

const mapDispatchToProps = {
  getDistriButionOrganization: (contract_type, id) => getDistriButionOrganization(contract_type, id),
  getDistriButionAddress: JXSID => getDistriButionAddress(JXSID),
  getDisSearchContracts: (contract_type, authorize, another_organization_id, valid, distribution) =>
    getDisSearchContracts(contract_type, authorize, another_organization_id, valid, distribution),
  submitDistriButionOrder: params => submitDistriButionOrder(params),
  getDisSearchContractsrGanization_id: id => getDisSearchContractsrGanization_id(id),
  failStore: () => failStore()
}
const mapStateToProps = state => ({
  disorderCheck: state.disorderCheck,
  globalStore: state.globalStore,
  setChoosedAuthGoods: state.setChoosedAuthGoodsReducer
})

export default connect(mapStateToProps, { chooseGoodsInitStore, setChoosedAuthGood, ...mapDispatchToProps })(OrderCheck)
