import { connect } from 'react-redux'

import Login from './Login'

import { actions } from './modules/login'

import { getToken } from 'layouts/components/GlobalStore/modules/globalStore'

const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps, { getToken, ...actions })(Login)
