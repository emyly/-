import { connect } from 'react-redux'

import { actions } from './modules/atSelect'

import AtSelect from './AtSelect';

const mapStateToProps = state => ({
  atSelect: state.atSelect,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, actions)(AtSelect)
