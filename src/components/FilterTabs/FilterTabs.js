/**
 * Created by 123 on 12/7/2016.
 */

import React, { Component, PropTypes } from 'react';

import './FilterTabs.scss';

import { Tabs, Tab } from 'material-ui/Tabs';

/**
 * 使用场景说明：顶部筛选/切换器
 */
export default class FilterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    }
  }
  static propTypes = {
    /**
     * tabs数组
     */
    tabs: PropTypes.array.isRequired,
    /**
     * callback带出value
     */
    callback: PropTypes.func.isRequired,
    /**
     * inkBarStyle
     */
    inkBarStyle: PropTypes.object.isRequired
  };
  static defaultProps ={
    inkBarStyle: {}
  };
  /**
   *  Tabs onChange
   */
  handleTabsChange = () => (value) => {
    this.setState({ tabValue: value });
    this.props.callback(value);
  };
  render() {
    return (
      <Tabs
        className='filterTabs'
        tabItemContainerStyle={{ backgroundColor: 'transparent' }}
        inkBarStyle={{ marginLeft: '0.8rem', marginRight: '0.8rem', width: '5rem', height: '0.35rem', marginTop: '-0.35rem', background: '#00A0FF', ...this.props.inkBarStyle }}
        value={this.state.tabValue}
        onChange={this.handleTabsChange()}
      >
        {
          this.props.tabs.map((value, index) => <Tab key={`tabs_${index}`} style={{ whiteSpace: 'nowrap', textOverflow: 'hidden', overflow: 'hidden', width: '5rem', height: '4.2rem', marginLeft: '0.8rem', marginRight: '0.8rem', fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: this.state.tabValue === index ? '#00A0FF' : ' #4A4A4A', ...this.props.inkBarStyle }} value={index} label={value} />)
        }
      </Tabs>
    )
  }
}
