import { connect } from 'react-redux'

import { changeUser } from './modules/userList'

import UserList from './UserList';

const mapDispatchToProps = { changeUser }

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
