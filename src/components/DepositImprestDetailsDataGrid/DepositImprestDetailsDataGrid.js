/**
 * Created by NXQ on 10/22/2016.
 */

import React, { Component, PropTypes } from 'react';

import './DepositImprestDetailsDataGrid.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import PageGrid from 'components/PageGrid';

import CardUI from 'components/StandardUI/StandardCard';

import FlatButton from 'material-ui/FlatButton';

import moment from 'components/Moment'

/**
 * 使用场景：押金/预付款明细列表
 */
export default class DepositImprestDetailsDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [
          {
            label: '收支类型',
            style: {
              height: '40px',
              width: '80px'
            },
            tableHeaderColumnStyle: {
              height: '40px',
              width: '80px'
            },
            render: row => (
              <button className='typeBtn' style={{ backgroundColor: this.RevenueExpenditureTypeJudge(row.SZLX).backgroundColor }}>{this.RevenueExpenditureTypeJudge(row.SZLX).type}</button>
            )
          },
          {
            label: '收据编号',
            attr: 'SJBH',
            style: {
              height: '40px'
            },
            render: (row) => {
              if (row.SJBH) {
                return <div>{row.SJBH}</div>
              } else {
                return <div>-</div>
              }
            }
          },
          {
            label: '收款金额',
            attr: 'JE',
            style: {
              height: '40px'
            },
            render: (row) => {
              if (Number(row.SZLX) === 1) {    // 收
                return <div>{row.JE}</div>
              } else {
                return <div>-</div>
              }
            }
          },
          {
            label: '退款金额',
            attr: 'LJSKJE',
            style: {
              height: '40px'
            },
            render: (row) => {
              if (Number(row.SZLX) === 0) {    // 支
                return <div>{row.JE}</div>
              } else {                          // 收
                return <div>-</div>
              }
            }
          },
          {
            label: '办理日期',
            attr: 'CJSJ',
            style: {
              height: '40px'
            },
            formater: (value) => {
              if (value !== null) {
                return moment(value).format('YYYY-MM-DD HH:mm');
              }
            }
          },
          {
            label: '经办人',
            attr: 'YHXM',
            style: {
              height: '40px'
            }
          },
          {
            label: '备注',
            attr: 'MS',
            style: {
              height: '40px'
            },
            render: (row) => {
              if (row.MS) {
                return <div>{row.MS}</div>
              } else {
                return <div>-</div>
              }
            }
          },
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false
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
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 0,
          prePageCount: 10,
          pageLength: 5,
          totalLabel: this.props.isShowDeposit ? '押金明细总数' : '预付款明细总数',
          pageFunc: (page) => {
            this.props.getDepositImprestDetailsData({
              Page: page,
              body: {
                YJMXB: {
                  SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
                  ZJXSID: this.props.location.state.ZJXSID,          // 支经销商ID（组织机构ID）
                  YJLX: this.props.isShowDeposit ? '1' : '0'          // 押金类型 1表示押金,0表示预售金
                }
              }
            });
          }
        }
      },
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps = {
    isShowDeposit: true     // 默认显示押金明细列表
  };
  static propTypes = {
    /**
     * true表示显示押金明细列表,false表示显示预付款明细列表
     */
    isShowDeposit: PropTypes.bool
  };
  componentWillReceiveProps = (nextProps) => {
    this.state.options.dataSource = nextProps.depositImprestDetailsDataGrid.depositImprestDetailsData || [];
    this.state.options.pagination.currentPage = nextProps.depositImprestDetailsDataGrid.currentPage || 1,
    this.state.options.pagination.totalCount = nextProps.depositImprestDetailsDataGrid.totalCount || 0,
    this.setState({
      options: this.state.options
    });
  };
  componentWillMount = () => {
    this.props.getDepositImprestDetailsData({
      Page: 1,
      body: {
        YJMXB: {
          SJXSID: this.props.globalStore.organizationId,      // 收经销商ID（组织机构ID）
          ZJXSID: this.props.location.state.ZJXSID,          // 支经销商ID（组织机构ID）
          YJLX: this.props.isShowDeposit ? '1' : '0'          // 押金类型 1表示押金,0表示预售金
        }
      }
    });
  };
  /**
   * 收支类型判断
   */
  RevenueExpenditureTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return {
          type: this.props.isShowDeposit ? '退款' : '转结算款',
          backgroundColor: '#ff625b'
        };
      case 1:
        return {
          type: '收款',
          backgroundColor: '#00be9c'
        };
      default:
        return {
          type: '',
          backgroundColor: '#ffffff'
        };
    }
  };
  render() {
    return (
      <PageGrid
        dataGridStyle={{ height: '100%', width: '100%' }}
        options={this.state.options}
      />
    )
  }
}
