/**
 * Created by zhanglei on 2016/10/31.
 */


import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import './StandardForm.scss';

import { connect } from 'react-redux';
import {
  handleToggleDrawer
} from 'layouts/components/MenuBar/modules/menuBar';

class StandardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded1: false,
    };
  }

  static defaultProps = {
    title: 'Default Title', // 头部-模块名称
    avatar: '/fg-128.jpg', // 头部-模块logo
    moreActions: '', // 控制条-更多命令
    showCardContent: true,  // card
    iconPosition: '0 0'         // 图标坐标
  };

  static propTypes = {
    /**
     * 头部-模块名称 必填
     */
    title: PropTypes.string.isRequired,
     /**
     * icon坐标
     */
    iconPosition: PropTypes.string
  }
  /**
   * 左侧导航菜单栏显示切换
   */
  handleNavBtnClick = () => () => {
    this.props.handleToggleDrawer(!this.props.menuBar.open);
  }
  render() {
    const stdCardHeader =
      {
        lineHeight: '30px',
        color: '#999999',
      }

    return (
      <Card style={{ height: this.props.showCardContent ? '100%' : 'auto', boxShadow: 'none' }} containerStyle={{ height: '100%' }}>
        <CardHeader
          style={{ background: '#eee', height: '64px', width: '100%', padding: '0rem' }}
          subtitleStyle={{ display: 'none' }}
          textStyle={{ display: 'none' }}
          titleStyle={{ display: 'none' }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <IconButton touch iconStyle={{ width: '40px', height: '40px' }} style={{ minWidth: '64px', width: '64px', height: '64px', boxShadow: 'none', background: '#00a0ff', display: 'flex', justifyContent: 'center' }} onClick={this.handleNavBtnClick()}>
                <img src={this.props.menuBar.open ? '/topNavCloseIcon.png' : '/topNavOpenIcon.png'} />
              </IconButton>
              <span style={{ background: `${this.props.iconPosition} url(/top-public-icon.png) no-repeat`, width: '2.1rem', height: '2.1rem', marginLeft: '20px' }} />
              <span style={{ fontFamily: 'SourceHanSansCN-Medium', marginLeft: '12px', fontSize: '20px', color: '#4A4A4A' }}>{this.props.title}</span>
            </div>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '25px' }}>
              <img src={'/topNavSearchNormal.png'} style={{ width: '30px', height: '30px', marginRight: '25px' }} />
              <img src={'/topNavSetNormal.png'} style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
        </CardHeader>
        {this.props.children}
      </Card>
    )
  }
}

const mapDispatchToProps = {
  handleToggleDrawer
}

const mapStateToProps = state => ({
  menuBar: state.menuBar
})

export default connect(mapStateToProps, mapDispatchToProps)(StandardForm)
