/**
 * Created by NXQ on 2017/3/21.
 */

import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import './LoadingPage.scss'

export default class LoadingPage extends Component {

  static defaultProps = {
    isLoading: '0',                   // '0'表示加载中 '1'表示加载成功 '2'表示加载失败
    loadError: '数据加载失败!',        // 数据加载失败Message
    size: 60,                         // loading size
    thickness: 6,                     // loading 厚度
    transitionStyle: {},               // loading过渡页的style
    successStyle: {},                  // loading成功页的style
    failStyle: {},                     // loading错误页的style
  }

  static propTypes = {
    loading: PropTypes.string,
    loadError: PropTypes.node,
    size: PropTypes.number,
    thickness: PropTypes.number,
    children: PropTypes.node,
    transitionStyle: PropTypes.object,
    successStyle: PropTypes.object,
    failStyle: PropTypes.object,
  }
  renderContent = () => {
    if (this.props.isLoading === '0') {                          // 加载中...
      return (<div className='loading-transition-content' style={{ ...this.props.transitionStyle }}>
        <CircularProgress size={this.props.size} thickness={this.props.thickness} />
      </div>)
    } else if (this.props.isLoading === '1') {                    // 加载成功
      return <div className='loading-success-content' style={{ ...this.props.successStyle }}>{ this.props.children }</div>
    } else if (this.props.isLoading === '2') {                   // 加载失败
      return <div className='loading-fail-content' style={{ ...this.props.failStyle }}>{ this.props.loadError }</div>
    }
  }
  render() {
    return (
      <div className='loading-page'>
        {
          this.renderContent()
        }
      </div>
    )
  }
}
