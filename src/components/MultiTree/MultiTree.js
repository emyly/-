/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { grey500 } from 'material-ui/styles/colors';
import './MultiTree.scss'
// import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
const log = require('debug')('app:MultiTree');

/**
 * 这是一颗3态树的公共组件
 */
export default class MultiTree extends Component {
  static children = Symbol('children');
  static checked = Symbol('checked');
  static leakChecked = Symbol('leakChecked');
  static parentNode = Symbol('parentNode');

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    keyAttr: PropTypes.string.isRequired,
    parentAttr: PropTypes.string,
    title: PropTypes.string,
    labelAttr: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    leftAvatar: PropTypes.func,
    checkedData: PropTypes.array,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    sortAttr: PropTypes.string || PropTypes.func,
  };

  static defaultProps = {
    checkedData: [],
    itemStyle: { height: 50 }
  };

  /**
 * 遍历父节点，确定check状态
 * @static
 * @memberOf MultiTree
 */
  static checkParent = (item) => {
    const parent = item[MultiTree.parentNode];
    if (parent) {
      parent[MultiTree.checked] = parent[MultiTree.children].some(sub => sub[MultiTree.checked]);
      parent[MultiTree.leakChecked] = parent[MultiTree.children].some(sub => parent[MultiTree.checked] && !sub[MultiTree.checked]);
      MultiTree.checkParent(parent);
    }
  };

/**
 * 遍历子节点，确定check状态
 * @static
 * @memberOf MultiTree
 */
  static checkChildren = (item) => {
    const children = item[MultiTree.children];
    if (children) {
      children.map((sub) => {
        sub[MultiTree.checked] = item[MultiTree.checked];
        MultiTree.checkChildren(sub);
      });
    }
  };

/**
 * 判断是否是弱选中
 * @static
 * @memberOf MultiTree
 */
  static isLeakChecked = item => item[MultiTree.checked] &&
    item[MultiTree.children] &&
    item[MultiTree.children].some(child => !child[MultiTree.checked] || child[MultiTree.leakChecked])

/**
 * 获取checkbox选中样式
 * @static
 * @memberOf MultiTree
 */
  static getCheckboxStyle = item => (MultiTree.isLeakChecked(item) || !item[MultiTree.checked]) ? { fill: grey500 } : undefined

  // constructor (props) {
  //   super(props);
  //   MultiTree.children = Symbol();
  //   MultiTree.checked = Symbol();
  //   MultiTree.parentNode = Symbol();
  // }

  componentWillMount() {
    log('componentWillMount...');
    this.cancelCheckedAll();
    const dataSource = this.buildTree(this.props.dataSource, true)[MultiTree.children];
    this.setState({ dataSource });
  }

  componentDidMount() {
    log('componentDidMount...');
  }

  componentWillReceiveProps(nextProps) {
    log('componentWillReceiveProps...');
    this.props = nextProps;
    this.cancelCheckedAll();
    const dataSource = this.buildTree(nextProps.dataSource, true)[MultiTree.children];
    this.setState({ dataSource });
  }

  componentWillUnmount() {
    log('componentWillUnmount...');
  }

  /**
   * 递归渲染子树
   * @param item
   * @param index
   * @param key
   * @returns {XML}
   */
  renderChildren = (item, index = 0, key = 'item') => {
    const myKey = `${key}_${index}`;
    return (<ListItem
      style={{ ...this.props.itemStyle, fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: 'rgba(0,0,0,0.54)' }}
      key={myKey}
      primaryText={this.renderPrimaryText(item)}
      leftCheckbox={this.renderCheckbox(item)}
      primaryTogglesNestedList
      leftAvatar={this.renderLeftAvatar(item)}
      nestedItems={
        (item[MultiTree.children] || []).map((subItem, ind) => this.renderChildren(subItem, ind, myKey))}
    />);
  };

  renderPrimaryText = (item) => {
    switch (Object.prototype.toString.call(this.props.labelAttr)) {
      case '[object String]':
        return item[this.props.labelAttr];
      case '[object Function]':
        return this.props.labelAttr(item);
      default:
        return undefined;
    }
  };

  renderLeftAvatar = (item) => {
    if (!this.props.leftAvatar) {
      return undefined;
    }
    return this.props.leftAvatar(item);
  };

  renderCheckbox = item => <Checkbox
    checked={item[MultiTree.checked] || false}
    onCheck={this.generatorCheckHandle(item)}
    iconStyle={MultiTree.getCheckboxStyle(item)}
  />;

  generatorCheckHandle = item =>
    // return ()=>this.props.onCheck(guid);
     () => {
       item[MultiTree.checked] = !item[MultiTree.checked];
       MultiTree.checkParent(item);
       MultiTree.checkChildren(item);
       const dataSource = this.buildTree(this.props.dataSource)[MultiTree.children];
       this.setState({ dataSource });
     };

  /**
   * 排序
   *
   * @memberOf MultiTree
   */
  sort = (objArray) => {
    switch (Object.prototype.toString.call(this.props.sortAttr)) {
      case '[object String]':
        return objArray.sort(this.simpleSort);
      case '[object Function]':
        return objArray.sort(this.props.sortAttr);
      default:
        return objArray;
    }
  };

  simpleSort = (a, b) => a[this.props.sortAttr] - b[this.props.sortAttr];

  /**
   * 根据dataSource和checkedData来组件这颗3态树
   * @param roles
   * @param withState
   * @param root
   * @returns {{}}
   */
  buildTree = (roles, withState = false, root = {
    [this.props.labelAttr]: 'root', [this.props.keyAttr]: 0 }) => {
    root[MultiTree.children] = roles.filter((role) => {
      if (!this.props.parentAttr) {
        role[MultiTree.parentNode] = root;
        return true;
      }
      if (String(role[this.props.parentAttr]) === String(root[this.props.keyAttr])) {
        role[MultiTree.parentNode] = root;
        return true;
      }
      return false;
    });

    // 增加排序功能
    this.sort(root[MultiTree.children]);

    if (this.props.parentAttr) {
      root[MultiTree.children].map(child => this.buildTree(roles, withState, child));
    }

    const matched = this.props.checkedData.find(sub => root[this.props.keyAttr] === sub[this.props.keyAttr]);

    if (matched && withState) {
      root[MultiTree.checked] = true;
      MultiTree.checkParent(root);
      MultiTree.checkChildren(root);
    }

    // 一维数组，特殊处理
    if (!this.props.parentAttr && withState) {
      root[MultiTree.children].map((row) => {
        row[MultiTree.checked] = this.props.checkedData.some(
          crow => crow[this.props.keyAttr] === row[this.props.keyAttr]);
      });
    }

    return root;
  };

  cancelCheckedAll = () => {
    this.props.dataSource.forEach((sub) => { sub[MultiTree.checked] = false });
  }

  /**
   * 获取被选中的数据,可以通过在父组件中指定该组件的ref属性(如ref="myTree"),
   * 然后在父组件中通过this.refs.myTree.getCheckedData()来获取被选中的选项
   * @returns {*}
   */
  getCheckedData = () => this.props.dataSource.filter(sub => sub[MultiTree.checked]);

  render() {
    log('render...');
    return (<List style={{ ...this.props.style }} className='Tree'>
      <Subheader> {this.props.title} </Subheader> {
      this.state.dataSource.map((item, index) => (
        this.renderChildren(item, index)
      ))
    }
    </List>);
  }
}
