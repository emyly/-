/**
 * Author: wangming 2017/2/20
 */
import React from 'react'
import {
Table,
TableBody,
TableRow,
TableRowColumn,
} from 'material-ui/Table'
import SelectProductionCss from './SelectProduction.scss'
import BarCodeTextField from 'components/BarCodeTextField'
import SelectProductionSearchBar from './SelectProductionSearchBar'

export default class SelectProductionToolBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
  };

  static propTypes = {
    stockDataList: React.PropTypes.array,
    handleChangeFilter: React.PropTypes.func,
    handleChangeToggle: React.PropTypes.func,
    handleBarOnChange: React.PropTypes.func.isRequired,
    handleSelect: React.PropTypes.func,
    storageId: React.PropTypes.number,
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {
  };

  handleSelect = (value, index) => () => {
    this.props.handleSelect(value);
  };

  getStockFistLineName = (value) => {
    const data = value.split('-');
    const datat = data[data.length - 1];
    return datat.slice(0, 5);
  };

  getStockSecondLineName = (value) => {
    const data = value.split('-');
    const datat = data[data.length - 1];
    if (datat.length > 5) {
      return datat.slice(5);
    }
    return '';
  };


  showStockFistLineName = (value, index) => {
    const data = value.StockPositonName.split('-');
    const datat = data[data.length - 1];
    // const datat = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试';

    const unActiveStyle = { width: '90px',
      height: '2.3rem',
      lineHeight: '2.3rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#4A4A4A',
      letterSpacing: '0px',
      textAlign: 'center',
      cursor: 'pointer',
      padding: '0',
      minWidth: '112px',
      background: '#EEEEEE',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    };

    // value.StockPositonName = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试';

    let borderBottom = '';
    if (datat.length <= 5) {
      borderBottom = '2px solid #00A0FF';
    }

    const activeStyle = { width: '90px',
      height: '2.3rem',
      lineHeight: '2.3rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#00A0FF',
      letterSpacing: '0px',
      textAlign: 'center',
      cursor: 'pointer',
      borderBottom: `${borderBottom}`,
      padding: '0',
      minWidth: '112px',
      background: '#EEEEEE',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    };


    let divStyle = unActiveStyle;
    if (value.ifActive) {
      divStyle = activeStyle;
    } else {
      divStyle = unActiveStyle;
    }

    return (<div style={divStyle} onClick={this.handleSelect(value, index)}>
      {datat.slice(0, 5)}
    </div>)
  }

  // value.StockPositonName
  showStockSecondLineName = (value, index) => {
    const data = value.StockPositonName.split('-');
    const datat = data[data.length - 1];
    // const datat = '测试测试测试测试测试测试测试测试测试测试';

    const unActiveStyle = { width: '90px',
      height: '2.3rem',
      lineHeight: '2.3rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#4A4A4A',
      letterSpacing: '0px',
      textAlign: 'left',
      cursor: 'pointer',
      padding: '0',
      paddingLeft: 10,
      minWidth: '112px',
      background: '#EEEEEE',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    };


    // let borderBottom = '';
    // if (datat.length > 4) {
    //   borderBottom = '2px solid #00A0FF';
    // }

    const activeStyle = { width: '90px',
      height: '2.3rem',
      lineHeight: '2.3rem',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '18px',
      color: '#00A0FF',
      letterSpacing: '0px',
      textAlign: 'left',
      cursor: 'pointer',
      borderBottom: '2px solid #00A0FF',
      padding: '0',
      paddingLeft: 10,
      minWidth: '112px',
      background: '#EEEEEE',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    };

    let divStyle = {};
    if (value.ifActive && datat.length > 5) {
      divStyle = activeStyle;
    } else if (datat.length > 5) {
      divStyle = unActiveStyle;
    }

    return (<div style={divStyle} onClick={this.handleSelect(value, index)}>
      {datat.slice(5)}
    </div>)
  }

  scrollRight = () => {
    const div = document.getElementById('DS_Scroll_Bar');
    div.scrollLeft += 168;
  };

  scrollLeft = () => {
    const div = document.getElementById('DS_Scroll_Bar');
    div.scrollLeft -= 168;
  };

  render() {
    const conMinWidth = `${String(this.props.stockDataList.length * 146)}px`;
    return (<div
      style={{ height: '69px',
        lineHeight: '69px',
        background: '#EEEEEE',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.30)',
        marginTop: '-16px',
        marginLeft: '0',
        marginRight: '0' }} className={'row'}
    >
      <div
        className={'col-xs-5'}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}
      >
        <img src='/WarehouseAdmin/DistributionOperation/kuwei_left.png' onClick={this.scrollLeft} style={{ cursor: 'pointer' }} alt={'向左移'} />
        <div style={{ width: '100%', overflow: 'hidden' }} id='DS_Scroll_Bar'>
          <div style={{ minWidth: conMinWidth, width: conMinWidth }}>
            <Table selectable={false} style={{ backgroundColor: '#EEEEEE' }}>
              <TableBody displayRowCheckbox={false} stripedRows={false}>
                <TableRow style={{ background: '#EEEEEE' }}>
                  {
                      this.props.stockDataList.map((value, index) => {
                        return (<TableRowColumn
                          key={index} style={{ minWidth: '146px', background: '#EEEEEE' }}
                          className={SelectProductionCss.Ds_table}
                        >
                          {
                            this.showStockFistLineName(value, index)
                          }
                          {
                            this.showStockSecondLineName(value, index)
                          }

                        </TableRowColumn>)
                      })
                    }
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <img src='/WarehouseAdmin/DistributionOperation/kuwei_right.png' onClick={this.scrollRight} style={{ cursor: 'pointer' }} alt={'向右移'} />
      </div>
      <div className={'col-xs-4'} style={{ paddingTop: '12px' }}>
        <SelectProductionSearchBar
          handleChangeFilter={this.props.handleChangeFilter}
          handleChangeToggle={this.props.handleChangeToggle}
        />
      </div>
      <div className={'col-xs-3'} style={{ paddingTop: '12px' }}>
        <BarCodeTextField hintText={'选定库位后'} StorageId={this.props.storageId} inOut onChange={this.props.handleBarOnChange} />
      </div>
    </div>)
  }
}
