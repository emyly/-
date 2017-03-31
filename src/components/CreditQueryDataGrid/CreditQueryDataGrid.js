/**
 * Created by NXQ on 10/22/2016.
 */

import React, { Component, PropTypes } from 'react';

import './CreditQueryDataGrid.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import PageGrid from 'components/PageGrid';

import CardUI from 'components/StandardUI/StandardCard';

import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：信用查询列表
 * 接口： 信用.md --> 获取我授信的公司列表 --> /JXSXYB/:id/BSQ
 * 接口:  我还未授信的伙伴列表获取接口需新增
 */
export default class CreditQueryDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creditDataOptions: {
        columnOptions: [
          {
            label: '合作企业ID',
            attr: 'BSQJXSID',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '合作企业名称',
            attr: 'JGMC',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
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
            this.context.router.push({ pathname: '/homecredit/seeCredit', state: this.props.creditQueryDataGrid.creditQueryData[this.props.creditQueryDataGrid.creditCurrentPage - 1][rowId] });
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
          totalCount: this.props.creditQueryDataGrid.creditTotalCount || 0,
          prePageCount: 5,
          pageLength: 5,
          totalLabel: '授信总数',
          pageFunc: (page) => {
            this.props.changeCreditCurrentPage(page);
          }
        }
      },
      noCreditDataOptions: {
        columnOptions: [
          {
            label: '合作企业ID',
            attr: 'BSQJXSID',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              fontFamily: 'SourceHanSansCN-Regular',
              fontSize: '14px',
              color: '#53504F'
            }
          },
          {
            label: '合作企业名称',
            attr: 'JGMC',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px',
              fontFamily: 'SourceHanSansCN-Regular',
              fontSize: '14px',
              color: '#53504F'
            }
          },
          {
            label: '操作',
            render: row => (
              <FlatButton
                label='立即授信'
                primary
                backgroundColor='#01bd9c'
                style={{ marginTop: '5px' }}
                hoverColor={'#01ad9c'}
                labelStyle={{ color: '#ffffff', fontSize: '14px', fontFamily: 'SourceHanSansCN-Medium' }}
                onTouchTap={this.handleTouchTapCredit(row)}
              />
            ),
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '16px',
              color: '#5B83B4',
              background: '#eaecee',
              height: '3.1rem',
              fontWeight: 'bold'
            },
            style: {
              height: '40px'
            }
          }
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false,
          onCellClick: (rowId) => {
            // this.context.router.push({pathname: `/homecredit/seeCredit`, state: this.props.creditQueryDataGrid.creditQueryData[rowId]});
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
          totalCount: this.props.creditQueryDataGrid.noCreditTotalCount || 0,
          prePageCount: 5,
          pageLength: 5,
          totalLabel: '未授信总数',
          pageFunc: (page) => {
            this.props.changeNoCreditCurrentPage(page);
          }
        }
      },
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps = {

  };
  static propTypes = {
    /**
     * 买方经销商id
     */
    AuthorizedOrganizationId: PropTypes.number.isRequired
  };
  componentWillReceiveProps = (nextProps) => {
    this.state.creditDataOptions.pagination.totalCount = nextProps.creditQueryDataGrid.creditTotalCount;
    this.state.creditDataOptions.pagination.currentPage = nextProps.creditQueryDataGrid.creditCurrentPage;
    this.state.noCreditDataOptions.pagination.totalCount = nextProps.creditQueryDataGrid.noCreditTotalCount;
    this.state.noCreditDataOptions.pagination.currentPage = nextProps.creditQueryDataGrid.noCreditCurrentPage;
    this.setState({
      creditDataOptions: this.state.creditDataOptions,
      noCreditDataOptions: this.state.noCreditDataOptions
    });
  };
  componentWillMount = () => {
    this.props.getCreditQueryData(this.props.AuthorizedOrganizationId);
  };
  /**
   * 立即授信
   */
  handleTouchTapCredit = value => () => {
    this.context.router.push({ pathname: '/homecredit/seeCredit', state: value });
  };
  /**
   * 表格单行数据子路由跳转
   */
  handleCellClick = (e) => {
    const data = this.state.options.dataSource[e];
    this.context.router.push({ pathname: '/homecredit/seeCredit', state: data });
  };

  render() {
    return (
      <div className='temp-credit-query-datagrid'>
        <StandardDataGrid
          iconPosition={'-180px -60px'}
          title='我授予的信用'
          message='您可以从这里查看您已授信的合作伙伴授信详情及授信新的合作伙伴'
        >
          {
            (() => <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <CardUI
                  expanded topStyle={{ backgroundColor: '#384357' }}
                  title={'已授信'} iconStyleLeft={{ marginTop: '23px', marginRight: '23px', marginLeft: '0px' }}
                  avatar='/authorizedIcon.png' label='' CardTextStyle={{ height: '30rem', padding: 0, overflow: 'hidden' }}
                >
                  <PageGrid dataGridStyle={{width: '100%' }} style={{boxShadow:'none'}} options={this.state.creditDataOptions} dataSource={this.props.creditQueryDataGrid.creditQueryData[this.props.creditQueryDataGrid.creditCurrentPage - 1] || []} pagination={this.state.creditDataOptions.pagination} />
                </CardUI>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <CardUI
                  expanded topStyle={{ backgroundColor: '#384357' }}
                  title={'未授信'} iconStyleLeft={{ marginTop: '23px', marginRight: '23px', marginLeft: '0px' }}
                  avatar='/unauthorizeIcon.png' label='' CardTextStyle={{ height: '30rem', padding: 0, overflow: 'hidden' }}
                >
                  <PageGrid dataGridStyle={{width: '100%' }} style={{boxShadow:'none'}} options={this.state.noCreditDataOptions} dataSource={this.props.creditQueryDataGrid.noCreditQueryData[this.props.creditQueryDataGrid.noCreditCurrentPage - 1] || []} pagination={this.state.noCreditDataOptions.pagination} />
                </CardUI>
              </div>
            </div>)()
          }
        </StandardDataGrid>
      </div>

    )
  }
}
