/**
 * Author: wangming 2017/2/3
 */

import React from 'react'
import SelectProductionToolBar from './SelectProductionToolBar'
import SelectProductionStorageList from './SelectProductionStorageList'
import SelectProductionMessageBar from './SelectProductionMessageBar'

export default class SelectProductionShowAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
    toolBarProps: {}
  };

  static propTypes = {
    stockDataList: React.PropTypes.array.isRequired,
    toolBarProps: React.PropTypes.object,
    storageListProps: React.PropTypes.object,
    messageBarProps: React.PropTypes.object,
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {
  };

  render() {
    return (<div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SelectProductionToolBar stockDataList={this.props.stockDataList} {...this.props.toolBarProps} />
      <SelectProductionStorageList stockDataList={this.props.stockDataList} {...this.props.storageListProps} />
      <SelectProductionMessageBar {...this.props.messageBarProps} />
    </div>)
  }
}
