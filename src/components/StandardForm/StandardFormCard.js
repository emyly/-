/**
 * Created by zhanglei on 2016/11/1.
 */

import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';


import './StandardForm.scss';

export default class StandardFormCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  static defaultProps = {
    title: 'Default Title', // 头部-模块名称
    stepName: '', // 头部导航名称
    message: '', // 头部-模块引导描述
    avatar: null, // 头部-模块logo
    moreActions: '', // 控制条-更多命令
    showStep: true, // 是否在向导步骤栏中显示，默认显示，如果不显示，建议将expanded设置为true，否则将无法显示内容
    showContent: true, // 默认显示内容区
    expanded: false, // 是否展开内容区域
    completed: false, // 在向导步骤栏中是否完成当前步骤

    actions: [], // 右侧按钮

  };

  static propTypes = {
    /**
     * 头部-模块名称 必填
     */
    id:PropTypes.string,
    title: PropTypes.string.isRequired,
    message: PropTypes.node,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.title !== undefined) {
      this.setState({
        title: nextProps.title
      });
    }
    if (nextProps.expanded !== undefined) {
      this.setState({
        expanded: nextProps.expanded
      });
    }
  };

  render() {
    const stdCardHeader =
      {
        lineHeight: '30px',
        color: '#999999',
      }
    const stdCard =
      {
        height: '100%'
      }
    let heightContect = (this.props.actions || this.props.title) ? 'calc(100% - 120px)' : 'calc(100%-56px)';
    heightContect = this.props.otherActions ? 'calc(100% - 190px)' : heightContect;


    if (this.props.showContent) {
      return (
        <Card containerStyle={{ height: '100%' }} style={stdCard} expanded={this.props.expanded}>
          {/* <CardHeader*/}
          {/* title={this.props.title}*/}
          {/* subtitle={this.props.message}*/}
          {/* subtitleStyle={stdCardHeader}*/}
          {/* avatar={this.props.avatar}*/}
          {/* actAsExpander={this.props.activeStep}*/}
          {/* showExpandableButton={this.props.activeStep}*/}
          {/* />*/}
          {/* <CardActions style={{*/}
          {/* flexDirection: "row",*/}
          {/* justifyContent: "flex-end",*/}
          {/* display: "flex",*/}
          {/* }}>*/}
          {/* {this.props.actions}*/}
          {/* </CardActions>*/}
          <div id = {this.props.id} style={{ overflow: 'auto', height: heightContect, padding: '16px 1px', ...this.props.style, backgroundColor: '#f6f6f6' }}>
            {this.props.children}
          </div>
        </Card>

      );
    } else {
      return (<span />);
    }
  }

}
