/**
 * Created by NXQ on 2017/3/4.
 */

import React, { Component, PropTypes } from 'react';
import './SelectDropMenu.scss';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class SelectDropMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isSelectFirstFlag: true,        //第一次进入时有效
    }
  }
  static defaultProps = {
    title: '',
    items: [],
    isShowError: false,          // 是否显示错误
    style: {},
    backgroundColor: '#f8f5fd',  // 背景颜色
    borderColor: '#8e6cda',       // 边框颜色
    isSelectFirst: false,        // 是否选中第一个
    isClear: false,              // 是否清空数据
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,       // MenuItem数据
    onChange: PropTypes.func.isRequired,     // 数据回调 onChange
    isShowError: PropTypes.bool,             // 是否显示错误
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    isSelectFirst: PropTypes.bool,
    isClear: PropTypes.bool
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.items.length && this.state.isSelectFirstFlag && this.props.isSelectFirst) {
      this.setState({
        value: JSON.stringify(nextProps.items[0]),    // 选中第一个
        isSelectFirstFlag: false
      })
    }
    if (!nextProps.items.length) {
      this.setState({
        value: ''
      })
    }
    if (nextProps.items.length && this.props.items.length) {
      if (nextProps.items[0].id !== this.props.items[0].id) {  // 为了清除重新选择的数据
        this.setState({
          value: ''
        })
      }
    }
    if (nextProps.isClear && nextProps.isClear !== this.props.isClear) {
      this.setState({
        value: ''
      })
    }
  }
  /**
   * SelectField onChange
   */
  handleChange = (event, index, value) => {
    this.props.onChange(event, index, JSON.parse(value));
    this.setState({
      value
    })
  };
  render() {
    return (
      <div className='select-drop-menu' style={{ border: this.props.isShowError ? '1px solid red' : 'none' }}>
        <span
          className='select-title'
          style={{ backgroundColor: this.props.backgroundColor,
            height: '44px',
            lineHeight: '44px',
            color: this.props.isShowError ? 'red' : '' }}
        >{this.props.title}:</span>
        <SelectField
          value={this.state.value}
          hintText=''
          onChange={this.handleChange}
          style={{ backgroundColor: this.props.backgroundColor, height: '44px', width: '100%', ...this.props.style }}
          iconStyle={{ marginRight: '0px', marginTop: '10px' }}                                     // marginTop((height-24)/2)跟Style高有关
          labelStyle={{ paddingLeft: '24px',
            lineHeight: '44px',
            top: '0px',
            fontFamily: 'SourceHanSansCN-Regular',
            display: 'flex',
            fontSize: '12px',
            color: '#808080' }}                       // lineHeight跟Style高有关
          menuStyle={{ overflow: 'hidden', width: 'calc(100% - 10px)' }}
          menuItemStyle={{ backgroundColor: '#fafafa' }}
          selectedMenuItemStyle={{ color: 'green' }}
          listStyle={{ border: `1px solid ${this.props.borderColor}`, boxShadow: '0 0 8px rgba(255, 0, 0, .8)', width: '100%' }}
          underlineStyle={{ display: 'none' }}
          maxHeight={200}
        >
          {this.props.items.map((item, index) =>
            <MenuItem value={JSON.stringify(item)} key={index} primaryText={item.name} />
          )}
        </SelectField>
      </div>
    )
  }
}

