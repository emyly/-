/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/25.
 */
import React, { Component, PropTypes } from 'react';
import MultiTree from '../MultiTree';

const log = require('debug')('app:AuthorityTree');

export default class AuthorityTree extends Component {
  static propTypes = {
    destoryAuthority: PropTypes.func,
    getAuthority: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    checkedData: PropTypes.array,
    jsId: PropTypes.number,
  }

  componentWillMount() {
    log('componentWillMount...');
    this.props.getAuthority();
    this.props.getAuthority(this.props.jsId);
  }

  componentDidMount() {
    log('componentDidMount...');
    // this.props.getAuthority(this.props.jsId);
    // window.setInterval(() => {
    //   this.props.getAuthority(this.props.jsId);
    // }, 500);
  }

  componentWillUnmount() {
    log('componentWillUnmount...');
    this.props.destoryAuthority();
  }


  // componentWillReceiveProps (nextProps) {
  //   log('componentWillReceiveProps...');
  //   if (nextProps.jsId !== this.props.jsId) {
  //     this.props.getAuthority(nextProps.jsId);
  //   }
  // }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.jsId === this.props.jsId) {
  //     return false;
  //   }
  //   return true;
  // }

  /**
   * 获取被选中的数据,可以通过在父组件中指定该组件的ref属性(如ref="myTree"),
   * 然后在父组件中通过this.refs.myTree.getCheckedData()来获取被选中的选项
   * @returns {*}
   */
  getCheckedData = () => this.refs.myAuthorityTree.getCheckedData().filter(sub => Number(sub.MKFLLX) === 1);

  render() {
    log('render...');
    return (<MultiTree
      dataSource={this.props.dataSource}
      checkedData={this.props.checkedData}
      ref='myAuthorityTree'
      style={{ height: '100px' }}
      itemStyle={{ height: 50 }}
      labelAttr='MKFLMC'
      keyAttr='GUID'
      parentAttr='FJMKFLID'
    />);
  }

}
