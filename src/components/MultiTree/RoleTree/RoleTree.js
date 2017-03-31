/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/25.
 */
import React, { Component, PropTypes } from 'react';
import MultiTree from '../MultiTree';

const log = require('debug')('app:RoleTree');

export default class RoleTree extends Component {
  static propTypes = {
    getRoles: PropTypes.func,
    destroyRoles: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    checkedData: PropTypes.array,
    userId: PropTypes.number,
  }

  componentWillMount() {
    log('componentWillMount...');
    this.props.getRoles();
    this.props.getRoles(this.props.userId);
  }

  componentDidMount() {
    log('componentWillMount...');
    // this.props.getRoles(this.props.userId);
    // window.setInterval(() => {
    //   this.props.getRoles(this.props.userId);
    // }, 500);
  }

  componentWillReceiveProps(nextProps) {
    log('componentWillMount...');
    if (nextProps.userId !== this.props.userId) {
      this.props.getRoles(nextProps.userId);
    }
  }

  componentWillUnmount() {
    log('componentWillUnmount...');
    this.props.destroyRoles();
  }


  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.checkedData !== this.props.checkedData || nextProps.dataSource !== this.props.dataSource) {
  //     return true;
  //   }
  //   return false;
  // }

  /**
   * 获取被选中的数据,可以通过在父组件中指定该组件的ref属性(如ref="myRoleTree"),
   * 然后在父组件中通过this.refs.myTree.getCheckedData()来获取被选中的选项
   * @returns {*}
   */
  getCheckedData = () => this.refs.myRoleTree.getCheckedData();

  render() {
    log('render...');
    return (<MultiTree
      dataSource={this.props.dataSource}
      checkedData={this.props.checkedData}
      ref='myRoleTree'
      style={{ width: '100%', height: '100px' }}
      itemStyle={{ height: 40 }}
      labelAttr='JSMC'
      keyAttr='GUID'
    />);
  }

}
