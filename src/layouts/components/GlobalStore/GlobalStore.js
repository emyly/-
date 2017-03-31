import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Login from '../Login'
import { GET_TOKEN_SUCCESS, TOKEN_INVALID } from './modules/globalStore'

class GlobalStore extends Component {
  constructor(props) {
    super(props);
    this.props.getToken();
    this.state = {
      logined: this.props.globalStore.status
    }
    this.sessionStorageListener()
  }

  static propTypes = {
    getToken: PropTypes.func.isRequired,
    globalStore: PropTypes.object,
    dispatch: PropTypes.func,
    children: PropTypes.element.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.globalStore.status !== this.props.globalStore.status) {
      this.setState({
        logined: nextProps.globalStore.status
      })
    }
  }

  /* add event listener on localStorage as intermediate cache */
  sessionStorageListener = () => {
    if (!sessionStorage.getItem('USER_INFO')) {
      localStorage.setItem('fetchUserInfo', Date.now())
    }

    /* When localStorage or sessionStorage being modified */
    window.addEventListener('storage', (event) => {
      if (event.key === 'fetchUserInfo' && sessionStorage.getItem('USER_INFO')) {
        /* trigger a event */
        localStorage.setItem('userInfo', JSON.stringify(sessionStorage.getItem('USER_INFO')))
        localStorage.removeItem('userInfo')
      } else if (event.key === 'userInfo' && !sessionStorage.getItem('USER_INFO')) {
        const tokenInfo = JSON.parse(event.newValue)
        if (tokenInfo) {
          sessionStorage.setItem('USER_INFO', tokenInfo)
          this.props.dispatch({
            type: GET_TOKEN_SUCCESS,
            response: JSON.parse(tokenInfo)
          })
        }
      } else if (event.key === 'removeUserInfo' && sessionStorage.getItem('USER_INFO')) {
        sessionStorage.removeItem('USER_INFO')
        this.props.dispatch({
          type: TOKEN_INVALID
        })
      }
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.state.logined ? this.props.children : <Login />}
      </div>
    )
  }
}

export default connect()(GlobalStore)
