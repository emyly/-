/**
 * Author: wangming 2017/2/20
 */
import React from 'react'
import TemporaryStorage from '../../containers/TemporaryStorageContainer'

export default class SelectProductionMessageBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
    ifCurrntStorage: false,
  };

  static propTypes = {
    temporaryData: React.PropTypes.object.isRequired,
    filterSummaryData: React.PropTypes.object.isRequired, // 拣货数据
    ifCurrntStorage: React.PropTypes.bool, //true 当前库位， false： 所有库位
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {

  };

  render() {
    if (this.props.ifCurrntStorage) {
      return (<div
        style={{ height: '69px',
          background: '#00A0FF',
          width: '100%',
          fontFamily: 'SourceHanSansCN-Regular',
          fontSize: '20px',
          color: '#ffffff',
          marginLeft: '0',
          marginRight: '0',
          marginBottom: '-16px',
          position: 'absolute',
          bottom: '0' }} className={'row'}
      >
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', color: '#000000' }} >
            应拣货：<span style={{ color: '#000000' }}>{this.props.filterSummaryData.shouldTypes}</span>种
            <span style={{ color: '#000000' }}>{this.props.filterSummaryData.shouldItems}件</span>
        </div>
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', color: '#000000' }} >
            当前拣货：<span style={{ color: '#000000' }}>{this.props.filterSummaryData.currentTypes}</span>种
            <span style={{ color: '#000000' }}>{this.props.filterSummaryData.currentItems}</span>件
          </div>
        <div className={'col-xs-offset-6 col-xs-2'} style={{ paddingRight: '0', height: '100%' }}>
          <TemporaryStorage temporaryData={this.props.temporaryData} />
        </div>
      </div>)
    } else {
      return (<div
        style={{ height: '69px',
          background: '#00A0FF',
          width: '100%',
          fontFamily: 'SourceHanSansCN-Regular',
          fontSize: '20px',
          color: '#ffffff',
          marginLeft: '0',
          marginRight: '0',
          marginBottom: '-16px',
          position: 'absolute',
          bottom: '0' }} className={'row'}
      >
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', fontSize: '18px' }} >
            订购商品：{this.props.filterSummaryData.allTypes}种 {this.props.filterSummaryData.allItems}件
          </div>
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', fontSize: '18px' }} >
            历次拣货：{this.props.filterSummaryData.alreadyTypes}种 {this.props.filterSummaryData.alreadyItems}件
          </div>
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', color: '#000000' }} >
            待拣商品：<span style={{ color: '#000000' }}>{this.props.filterSummaryData.shouldTypes}</span>种
            <span style={{ color: '#000000' }}>{this.props.filterSummaryData.shouldItems}件</span>
        </div>
        <div className={'col-xs-2'} style={{ height: '100%', lineHeight: '69px', color: '#000000' }} >
            当前拣货：<span style={{ color: '#000000' }}>{this.props.filterSummaryData.currentTypes}</span>种
            <span style={{ color: '#000000' }}>{this.props.filterSummaryData.currentItems}</span>件
          </div>
        <div className={'col-xs-offset-2 col-xs-2'} style={{ paddingRight: '0', height: '100%' }}>
          <TemporaryStorage temporaryData={this.props.temporaryData} />
        </div>
      </div>)
    }
  }
}
