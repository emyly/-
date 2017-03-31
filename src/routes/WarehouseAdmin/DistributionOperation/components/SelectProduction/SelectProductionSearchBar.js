/**
 * Author: wangming 2017/2/20
 */
import React from 'react'
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

export default class SelectProductionSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
    style: {
      height: '47px',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#555251',
      letterSpacing: '0px',
      lineHeight: '47px',
      borderRight: '1px solid #d8d8d8'
    },
    labelStyle: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#555251',
      fontWeight: '100',
    }
  };

  static propTypes = {
    style: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    handleChangeFilter: React.PropTypes.func,
    handleChangeToggle: React.PropTypes.func,
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {

  };

  handleChangeFilter = (event) => {
    this.props.handleChangeFilter(event.target.value);
  };

  handleChangeToggle = (event, toggled) => {
    this.props.handleChangeToggle(toggled);
  };

  render() {
    return (<div
      style={this.props.style}
    >
      <div className={'col-xs-4'} style={{ paddingRight: 0 }}>
        <Toggle
          label='所有库位'
          defaultToggled
          disabled={false}
          labelStyle={this.props.labelStyle}
          style={{ paddingTop: '11px' }}
          onToggle={this.handleChangeToggle}
        />
      </div>
      <div className={'col-xs-8'} style={{ paddingLeft: '30px' }}>
        <TextField
          hintText='输入关键词快速查找'
          style={{ width: '162px', marginRight: '8px' }}
          hintStyle={{ fontFamily: 'SourceHanSansCN-Regular',
            fontSize: '18px',
            color: '#808080',
            letterSpacing: '0px' }}
          underlineStyle={{ border: '1px solid #979797' }}
          onChange={this.handleChangeFilter}
        />
        <img src='/WarehouseAdmin/DistributionOperation/search.png' alt={'搜索'} />
      </div>
    </div>)
  }
}
