/**
 * Created by NXQ on 11/18/2016.
 */
import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import './WelcomeHome.scss';
import { connect } from 'react-redux';
import { getHostName } from 'lib/utils'
import {
  handleToggleDrawer
} from 'layouts/components/MenuBar/modules/menuBar';

const hostname = getHostName();
class WelcomeHome extends Component {
  /**
   * 临时Click方式
   */
  handleToggleDrawer = () => () => {
    this.props.handleToggleDrawer(!this.props.menuBar.open);
  }

  renderButton = () => {
    switch (hostname) {
      case ('sanyou'):
        return (
          <div>
            <div className='headquarters-address'>总部地址：上海市浦东新区张江高科产业东区仁庆路356号3幢2层</div>
          </div>
        )
      default:
        return (
          <div>
            <div className='headquarters-address'>上海总部：上海市杨浦区殷行路1280号嘉誉都汇广场O1栋506室</div>
            <div className='development-center-address'>杭州研发中心：杭州市文一路115号实验楼419号</div>
          </div>
        )
    }
  }

  render() {
    const background = `url(/${hostname}welcomeSmallLogo.png) no-repeat center right`;
    return (
      <div className='welcome-home'>
        <Card style={{ width: '100%', height: '100%', paddingBottom: 20 }} containerStyle={{ width: '100%', height: '100%' }}>
          <div className='container' style={{ background: 'url(welcomeBk.png)' }}>
            <div className='top-context' onClick={this.handleToggleDrawer()}>
              <div className='top-logo' style={{ background }} />
            </div>
            <div className='middle-context'>
              <div>
                <img alt='欢迎登录' src='/welcomeMiddleLogo.png' />
                <div className='up-word' style={{ display: 'none' }}>你的企业好管家</div>
                <div className='down-word' style={{ display: 'none' }}>优管理 提业绩 增收益</div>
              </div>
            </div>
            <div className='bottom-context'>
              {this.renderButton()}
            </div>
          </div>
        </Card>
      </div>
    )
  }

}

const mapDispatchToProps = {
  handleToggleDrawer
}

const mapStateToProps = state => ({
  menuBar: state.menuBar
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeHome)
