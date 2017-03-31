import { connect } from 'react-redux'

import AlertProductionType from '../components/AlertProductionType'

import { setChoosedAuthGoods as setChoosedAuthGood } from 'components/ChooseGoodsAuthDialog/modules/setChoosedAuthGoods'

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  setChoosedAuthGoods: state.setChoosedAuthGoodsReducer
})

export default connect(mapStateToProps, { setChoosedAuthGood })(AlertProductionType)
