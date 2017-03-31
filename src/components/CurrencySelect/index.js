import { connect } from 'react-redux'

import { getCurrency } from './modules/currencySelect'

import CurrencySelect from './CurrencySelect';

const mapDispatchToProps = { getCurrency }

const mapStateToProps = state => ({
  currencySelect: state.currencySelect
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect)
