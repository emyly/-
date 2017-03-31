import {
  connect
} from 'react-redux'
import {
  getBrandData,
  fetchbrandSelectInitData
} from './modules/brandSelect'

import BrandSelect from './BrandSelect';

/* TODO: same name confused */
const mapDispatchToProps = {
  getBrandData,
  fetchbrandSelectInitData
}

const mapStateToProps = state => ({
  brandSelect: state.brandSelect
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandSelect)
