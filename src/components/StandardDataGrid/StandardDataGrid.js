import React, { Component, PropTypes } from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { Card, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import './StandardDataGrid.scss';

import { connect } from 'react-redux';
import {
  handleToggleDrawer
} from 'layouts/components/MenuBar/modules/menuBar';
import _ from 'lodash';

/*
 * 标准UI封装组件，建议所有非特殊业务需求的界面均使用本封装
 */
class StandardDataGrid extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    title: '', // 头部-模块名称
    label: '', // action区域-模块引导标签
    message: '', // action区域-模块引导描述
    avatar: '/fg-128.jpg', // 头部-模块logo
    moreActions: '', // 控制条-更多命令
    iconPosition: '0 0',         // 图标坐标
    isActionsElement: false,
    childrenStyle: {}
  };

  static propTypes = {
    /**
     * 头部-模块名称 必填
     */
    title: PropTypes.string.isRequired,
    /**
     * icon坐标
     */
    iconPosition: PropTypes.string,
    /**
     * 模块引导标签
     */
    label: PropTypes.string,
    /**
     * 模块引导描述
     */
    message: PropTypes.string,
    /**
     * actions是否是个element
     */
    isActionsElement: PropTypes.bool,
    /**
     * 切换侧边栏
     */
    handleToggleDrawer: PropTypes.func.isRequired,
    childrenStyle: PropTypes.object,
  }
  /**
   * 左侧导航菜单栏显示切换
   */
  handleNavBtnClick = () => () => {
    this.props.handleToggleDrawer(!this.props.menuBar.open);
  }
  /**
   * 是否传了title/message true表示传了, false表示没传
   */
  handleIsHaveTitleMessage = () => {
    const replaceMessage = _.camelCase(this.props.message);
    if ((this.props.label !== undefined && this.props.label !== '') &&
        (this.props.message !== undefined && this.props.message !== '' && this.props.message !== '...' && replaceMessage !== '')) {
      return true;
    }
    return false;
  }
  /**
   * 获取label背景颜色
   */
  getLabelBackgroundColor = () => {
    switch (this.props.label) {
      case '铺货':
        return {
          backgroundColor: 'pink'
        };
      case '备货':
        return {
          backgroundColor: '#00be9c'
        };
      case '手术':
        return {
          backgroundColor: '#ff625b'
        };
      case '借货':
        return {
          backgroundColor: '#58909c'
        };
      case '调货':
        return {
          backgroundColor: '#58909c'
        };
      case '铺货补货':
        return {
          backgroundColor: '#58909c'
        };
      case '铺货销售':
        return {
          backgroundColor: '#58909c'
        };
      case '调拨':
        return {
          backgroundColor: '#58909c'
        };
      default:
        return {
          backgroundColor: '#ff625b'
        };
    }
  };
  render() {
    const stdActionToolbar = { display: 'none', flexDirection: 'row', justifyContent: this.handleIsHaveTitleMessage() ? 'space-between' : 'flex-end', background: '#fff', height: '64px', alignItem: 'center', width: '100%', padding: this.props.isActionsElement ? '0px' : '0px 24px' };
    const stdfilterToolbar = { backgroundColor: 'transparent', display: 'none' };

    let stdSeparator = '';

    let showMoreActions = '';
    if (this.props.moreActions) {
      showMoreActions =
        (<IconMenu
          iconButtonElement={
            <IconButton touch>
              <NavigationExpandMoreIcon />
            </IconButton>
            }
        >
          {this.props.moreActions}
        </IconMenu>)
      ;
    }
    if (this.props.filter) {
      stdfilterToolbar.display = 'block';
    }
    if (
      this.props.actions ||
      this.props.moreActions ||
      this.handleIsHaveTitleMessage()
    ) {
      stdActionToolbar.display = 'flex';
    }
    if (
      this.props.actions &&
      this.props.moreAction
    ) {
      stdSeparator = <ToolbarSeparator />;
    }
    return (
      <Card style={{ height: '100%', boxShadow: 'none' }} containerStyle={{ height: '100%' }}>
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
            <Toolbar style={stdfilterToolbar}>
              <ToolbarGroup firstChild>
                {this.props.filter}
              </ToolbarGroup>
            </Toolbar>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '25px' }}>
              <img src={'/topNavSearchNormal.png'} style={{ width: '30px', height: '30px', marginRight: '25px' }} />
              <img src={'/topNavSetNormal.png'} style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
        </CardHeader>
        <Toolbar style={stdActionToolbar}>
          {
              (() => {
                if (this.handleIsHaveTitleMessage()) {
                  return (
                    <ToolbarGroup firstChild style={{ maxWidth: '45%' }}>
                      <div className='standard-datagrid-msg-content'>
                        <span className='label' style={{ background: this.getLabelBackgroundColor().backgroundColor }}>{this.props.label || ''}</span>
                        <span className='message' title={this.props.message || ''}>{this.props.message || ''}</span>
                      </div>
                    </ToolbarGroup>
                  )
                }
              })()
          }
          <ToolbarGroup firstChild={!this.handleIsHaveTitleMessage()} style={{ width: this.props.isActionsElement ? '100%' : 'auto' }}>
            <div className='std-datagrid-action-button'>
              {this.props.actions}
            </div>
            {stdSeparator}
            {showMoreActions}
          </ToolbarGroup>
        </Toolbar>
        <div id='moduleRight' style={{ padding: 16, overflow: 'auto', height: this.props.actions ? 'calc(100% - 128px)' : 'calc(100% - 64px)', ...this.props.childrenStyle }}>
          {this.props.children}
        </div>
      </Card>
    )
  }
}

const mapDispatchToProps = {
  handleToggleDrawer
};

const mapStateToProps = state => ({
  menuBar: state.menuBar
});

export default connect(mapStateToProps, mapDispatchToProps)(StandardDataGrid)
