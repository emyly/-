import {
  connect
} from 'react-redux'
import {
  fetchFirstClassSelection,
  fetchSecondClassSelection,
  fetchThirdClassSelection,
  fetchThreeCategorySelectorInitData
} from './modules/threeCategorySelector'

import ThreeCategorySelector from './ThreeCategorySelector';

/* TODO: same name confused */
const mapDispatchToProps = {
  fetchFirstClassSelection,
  fetchSecondClassSelection,
  fetchThirdClassSelection,
  fetchThreeCategorySelectorInitData
}

const mapStateToProps = state => ({
  threeCategorySelector: state.threeCategorySelector
})

export default connect(mapStateToProps, mapDispatchToProps)(ThreeCategorySelector)
