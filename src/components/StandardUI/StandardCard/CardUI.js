

import React, { Component, PropTypes } from 'react';
import './CardUI.scss';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';

export default class CardUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actAsExpander: false,
      title: '',
      lable: '',
      labelRight: '',
      expanded: true

    }
  }
  static defaultProps = {
    /**
     * 注:常用属性和默认属性，请选择使用
     */
    expandable: false, // 是否默认展开
    expanded: true, // 该组件内容是否为空
    initiallyExpanded: false,
    showExpandableButton: false,
    actAsExpander: true,
    subtitleColor: '',
    titleColor: '',
    titleStyle: {},
    textStyle: PropTypes.object, // 覆盖文本的内敛样式
    onExpandChange: () => {},
    /* CardHeader常用属性*/
    title: '', // 头部-模块名称
    message: 'Default Message', // 头部-模块引导描述
    moreActions: '', // 控制条-更多命令
    label: ' ',
    actions: [], // cardHeder的title信息
    labelRight: 'wwwwwww', // cardHeder头部右边信息，可不传
    avatar: '',
    topStyle: {}, // cardHeder头部背景颜色可传参
    hoverColor: 'none',
    disabled: true,
    style: PropTypes.object,
    iconStyleRight: {
      fontSize: '20px'
    },
    containerStyle: {
    },
    iconStyleLeft: {
    },
    onElementRightTouchTap: () => {},
    labelStyle: {},

  };
  static propTypes = {
    /**
     * 头部-模块名称 必填
     */
    title: PropTypes.string.isRequired,
    dropMenuTitle: PropTypes.element,
    CardTextStyle: PropTypes.object,
    topStyle: PropTypes.object,
    CardStyle: PropTypes.object,
    onElementRightTouchTap: PropTypes.func
  }
  render() {
    const CardTitle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    const styles = {
      title: {
        fontSize: '20px',
        fontFamily: 'SourceHanSansCN-Medium',
        color: '#FFFFFF',
        letterSpacing: '0.71px',
        position: 'absolute',
        zIndex: '99999',
        marginLeft: '-10px'
      }
    };

    return (
      <div>
        <Card
          containerStyle={{ ...this.props.containerStyle }}
          expanded={this.props.expanded}
          style={{ width: 'auto', marginBottom: '28px', ...this.props.CardStyle }}
        >
          <AppBar
            titleStyle={this.props.titleStyle} style={{ backgroundColor: '#364356', position: 'relative', ...this.props.topStyle }}
            title={this.props.title ? <span style={{ ...styles.title, ...this.props.titleStyle }}>{this.props.title}</span> : this.props.dropMenuTitle}
            iconElementLeft={<img src={this.props.avatar} />}
            iconStyleLeft={this.props.iconStyleLeft}
            iconStyleRight={this.props.iconStyleRight}
            iconElementRight={<FlatButton label={this.props.label ? this.props.label : ' '} onTouchTap={this.props.onElementRightTouchTap} labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', ...this.props.labelStyle }} hoverColor={this.props.hoverColor} disabled={this.props.disabled} />}
          />
          <CardText expandable style={{ padding: '0', height: '23.4rem', overflow: 'auto', overflowX: 'hidden', ...this.props.CardTextStyle }} id='cartTextscroll'>
            {this.props.children}
          </CardText>
        </Card>
      </div>
    )
  }
}
