/**
 * Created by NXQ on 10/22/2016.
 */

import React, { Component, PropTypes } from 'react';

import './DepositImprestDataGrid.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import PageGrid from 'components/PageGrid';

import CardUI from 'components/StandardUI/StandardCard';

import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：押金/预付款列表
 */
export default class DepositImprestDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      depositOptions: {                                     // 押金options
        columnOptions: [
          {
            label: '付款方',
            attr: 'JGMC',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '当前押金总额',
            attr: 'JE',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '累计收款',
            attr: 'LJSKJE',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '累计退款',
            attr: 'LJTKJE',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          }
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false,
          onCellClick: (rowId) => {
            if (this.props.depositImprestDataGrid.depositImprestData.length) {
              this.context.router.push({
                pathname: '/deposit/details',
                state: this.props.depositImprestDataGrid.depositImprestData[rowId]
              });
            }
          }
        },
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: false,
        pagination: {
          currentPage: 1,
          totalCount: 0,
          prePageCount: 10,
          pageLength: 5,
          totalLabel: this.props.isShowDeposit ? '押金总数' : '预付款总数',
          pageFunc: (page) => {
            this.props.getDepositImprestData({
              Page: page,
              body: {
                JXSYJB: {
                  SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
                  YJLX: this.props.isShowDeposit ? '1' : '0'          // 押金类型 1表示押金,0表示预售金
                }
              }
            });
          }
        }
      },
      imprestOptions: {                                     // 预付款options
        columnOptions: [
          {
            label: '付款方',
            attr: 'JGMC',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '可用余额',
            attr: 'JE',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          }
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false,
          onCellClick: (rowId) => {
            if (this.props.depositImprestDataGrid.depositImprestData.length) {
              this.context.router.push({
                pathname: '/imprest/details',
                state: this.props.depositImprestDataGrid.depositImprestData[rowId]
              });
            }
          }
        },
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: false,
        pagination: {
          currentPage: 1,
          totalCount: 0,
          prePageCount: 10,
          pageLength: 5,
          totalLabel: this.props.isShowDeposit ? '押金总数' : '预付款总数',
          pageFunc: (page) => {
            this.props.getDepositImprestData({
              Page: page,
              body: {
                JXSYJB: {
                  SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
                  YJLX: this.props.isShowDeposit ? '1' : '0'          // 押金类型 1表示押金,0表示预售金
                }
              }
            });
          }
        }
      }

    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps = {
    isShowDeposit: true     // 默认显示押金列表
  };
  static propTypes = {
    /**
     * true表示显示押金列表,false表示显示预付款列表
     */
    isShowDeposit: PropTypes.bool
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.isShowDeposit) {
      this.state.depositOptions.dataSource = nextProps.depositImprestDataGrid.depositImprestData || [];
      this.state.depositOptions.pagination.currentPage = nextProps.depositImprestDataGrid.currentPage || 1,
      this.state.depositOptions.pagination.totalCount = nextProps.depositImprestDataGrid.totalCount || 0,
      this.setState({
        depositOptions: this.state.depositOptions
      });
    } else {
      this.state.imprestOptions.dataSource = nextProps.depositImprestDataGrid.depositImprestData || [];
      this.state.imprestOptions.pagination.currentPage = nextProps.depositImprestDataGrid.currentPage || 1,
      this.state.imprestOptions.pagination.totalCount = nextProps.depositImprestDataGrid.totalCount || 0,
      this.setState({
        imprestOptions: this.state.imprestOptions
      });
    }
  };
  componentWillMount = () => {
    this.props.getDepositImprestData({
      Page: 1,
      body: {
        JXSYJB: {
          SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
          YJLX: this.props.isShowDeposit ? '1' : '0'          // 押金类型 1表示押金,0表示预售金
        }
      }
    });
  };
  render() {
    return (
      <PageGrid
        dataGridStyle={{ height: '100%', width: '100%' }}
        options={this.props.isShowDeposit ? this.state.depositOptions : this.state.imprestOptions}
      />
    )
  }
}
