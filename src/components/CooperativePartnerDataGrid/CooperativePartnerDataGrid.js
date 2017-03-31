/**
 * Created by NXQ on 10/23/2016.
 */

import React, { Component, PropTypes } from 'react';
import './CooperativePartnerDataGrid.scss';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContractTypeChooseDialog from 'components/ContractTypeChooseDialog';

import StandardDataGrid from 'components/StandardDataGrid';

import FilterTabs from 'components/FilterTabs';

/**
 * 使用场景：合作伙伴列表
 * 接口：1.新增获取我已签约的合作伙伴列表
 *       2.新增获取我未签约的合作伙伴列表
 */
export default class CooperativePartnerDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signContract: [],
      noSignContract: [],
      ContractTypeChooseDialogOpen: false,
      ContractTypeChooseDialogData: {},
      signMenuType: ['已签约', '未签约'],
      signType: '0'   // 列表模式 0'表示显示全部 '1'表示已签约 '2'表示未签约
    }
  }

  static defaultProps = {
    /**
     * 后期分页参数需要获取真实数据绑定store,默认值后期需删除
     */
    currentPage: 1,
    pageLength: 5,
    totalCount: 20

  };
  static propTypes = {
    /**
     * 买方经销商id 从globalStore中直接取值(暂不用此参数)
     */
    AuthorizedOrganizationId: PropTypes.number,
    /**
     * 当前第几页 (后期分页参数需要获取真实数据绑定store)
     */
    currentPage: React.PropTypes.number.isRequired,
    /**
     * 每页多少条
     */
    pageLength: React.PropTypes.number.isRequired,
    /**
     * 总个数
     */
    totalCount: React.PropTypes.number.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillMount = () => {
    this.props.getCooperativePartnerData(Number(this.props.globalStore.organizationId));
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      signContract: nextProps.cooperativePartnerDataGrid.signContractData,
      noSignContract: nextProps.cooperativePartnerDataGrid.noSignContractData
    })
  };
  /**
   * 立即签约 contractType合同类型 （手术为0，备货为1,后续如有需要再更改）
   */
  handleTouchTapSignContract = (value, contractType) => () => {
    this.context.router.push({ pathname: '/contractAndAuthorization/contractAdd', state: { ...value, type: contractType, currentOrganizationName: this.props.globalStore.organizationName } });
  };

  /**
   * 还没签约列表的立即签约按钮
   */
  handleTouchTapNoSignContract = data => () => {
    this.setState({
      ContractTypeChooseDialogOpen: !this.state.ContractTypeChooseDialogOpen,
      ContractTypeChooseDialogData: data
    })
  };
  /**
   * 关闭立即签约Dialog
   */
  handleTouchContractTypeChooseDialogOpen = () => {
    this.setState({
      ContractTypeChooseDialogOpen: !this.state.ContractTypeChooseDialogOpen
    })
  }
  /**
   * 已签约/未签约切换
   */
  handleSelectSignType = (value) => {
    this.setState({ signType: String(value) });
  };

  /**
   * 已签约直接跳转到授权详情
   */
  handleSignedClickToggle = (value, contractType) => () => {
    this.context.router.push({ pathname: '/contractAndAuthorization/authorizationEdit', state: { ...value, type: contractType, currentOrganizationName: this.props.globalStore.organizationName } });
  };
  render() {
    const filter = <FilterTabs tabs={['已签约', '未签约']} callback={this.handleSelectSignType} />;
    return (
      <div className='cooperative-partner-datagrid'>
        <StandardDataGrid
          iconPosition={'-90px -30px'}
          title='合同与授权管理'
          message=''
          filterTitle='按是否签约筛选列表：'
          filter={filter}
        >
          {
            (() => {
              if (this.state.signType === '0') {  // '0'表示显示已签约
                return (<div >
                  <div style={{ display: 'flex', padding: 10, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 15 }}>
                    {
                      (() => {
                        if (this.state.signContract.length) {
                          return this.state.signContract.map((value, index) => <div key={index} className='cooperativeAlreadySign col-lg-3 col-MMd-6 col-xs-12'>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                              <div className='cooperOrginized' style={{ width: '100%', lineHeight: '40px', overflow: 'hidden', textAlign: 'center' }}>{value.partnerName}</div>
                            </div>
                            <div
                              style={{ width: '100%', paddingLeft: 10, paddingRight: 10, height: '85%', paddingTop: 30, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
                            >
                              <div className='row'>
                                <div
                                  style={{ height: 35,
                                    padding: 8,
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 10 }}
                                  className='cooperOrginizedOrder cooperOrginizedOrderOne col-lg-10 col-md-10 col-xs-10'
                                >
                                  <div className='coperFontStyle'>手术:</div>
                                  {
                                    (() => {
                                      if (value.surgeryState === '未签约') {
                                        return (<div style={{ display: 'flex', flexDirection: 'row' }}>
                                          <div style={{ paddingRight: 8 }} className='coperFontStyle waitRenewBtn'>未签约</div>

                                        </div>)
                                      } else if (value.surgeryState.indexOf('已签约') !== -1) {
                                        return <div onClick={this.handleSignedClickToggle(value, 0)} className='coperFontStyle'>{value.surgeryState}</div>
                                      } else if (value.surgeryState.indexOf('待续约') !== -1) {
                                        return <div className='waitRenewBtn' onClick={this.handleSignedClickToggle(value, 0)} className='coperFontStyle waitRenewBtn'>{value.surgeryState}</div>
                                      } else if (value.surgeryState.indexOf('已失效') !== -1) {
                                        return <div onClick={this.handleTouchTapSignContract(value, 0)} className='coperFontStyle waitRenewBtn'>{value.surgeryState}</div>
                                      }
                                    })()
                                  }
                                </div>
                                <div className='col-lg-2 col-md-2 col-xs-2'>
                                  {
                                    (() => {
                                      if (value.surgeryState.indexOf('未签约') !== -1) {
                                        return (<span>
                                          <FlatButton
                                            label='签约'
                                            style={{ width: '30px', minWidth: 0 }}
                                            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                            primary
                                            onTouchTap={this.handleTouchTapSignContract(value, 0)}
                                          />
                                        </span>)
                                      } else if (value.surgeryState.indexOf('已签约') !== -1) {
                                        return <span className='CooperStokIcon' />
                                      } else if (value.surgeryState.indexOf('待续约') !== -1) {
                                        return (<span>
                                          <FlatButton
                                            label='签约'
                                            style={{ width: '30px', minWidth: 0 }}
                                            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                            primary
                                            onTouchTap={this.handleTouchTapSignContract(value, 0)}
                                          />
                                        </span>)
                                      } else if (value.surgeryState.indexOf('已失效') !== -1) {
                                        return (<span>
                                          <FlatButton
                                            label='签约'
                                            style={{ width: '30px', minWidth: 0 }}
                                            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                            primary
                                            onTouchTap={this.handleTouchTapSignContract(value, 0)}
                                          />
                                        </span>)
                                      }
                                    })()
                                  }
                                </div>
                              </div>
                              <div className='row'>
                                <div
                                  style={{ height: 35,
                                    padding: 8,
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 10 }}
                                  className='cooperOrginizedOrder cooperOrginizedOrderTow col-lg-10 col-md-10 col-xs-10'
                                >
                                  <div className='coperFontStyle'>备货:</div>
                                  {
                                    (() => {
                                      if (value.stockState === '未签约') {
                                        return (<div style={{ display: 'flex', flexDirection: 'row' }}>
                                          <div style={{ paddingRight: 8, }} className='coperFontStyle waitRenewBtn'>未签约</div>
                                        </div>)
                                      } else {
                                        const color = '';
                                        if (value.stockState.indexOf('已签约') !== -1) {
                                          return <div onClick={this.handleSignedClickToggle(value, 1)} className='coperFontStyle waitRenewBtn'>{value.stockState}</div>
                                        } else if (value.stockState.indexOf('待续约') !== -1) {
                                          return <div onClick={this.handleSignedClickToggle(value, 1)} className='coperFontStyle waitRenewBtn'>{value.stockState}</div>
                                        } else if (value.stockState.indexOf('已失效') !== -1) {
                                          return <div onClick={this.handleTouchTapSignContract(value, 1)} className='coperFontStyle'>{value.stockState}</div>
                                        }
                                      }
                                    })()
                                  }
                                </div>
                                <div className='col-lg-2 col-md-2 col-xs-2'>
                                  {
                                    (() => {
                                      console.log('value.surgeryState', value.surgeryState)
                                      if (value.stockState.indexOf('未签约') !== -1) {
                                        return (
                                          <span>
                                            <FlatButton
                                              label='签约'
                                              style={{ width: '30px', minWidth: 0 }}
                                              labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                              primary
                                              onTouchTap={this.handleTouchTapSignContract(value, 1)}
                                            />
                                          </span>
                                        )
                                      } else if (value.stockState.indexOf('已签约') !== -1) {
                                        return <span className='CooperStokIcon' />
                                      } else if (value.stockState.indexOf('待续约') !== -1) {
                                        return (<span>
                                          <FlatButton
                                            label='签约'
                                            style={{ width: '30px', minWidth: 0 }}
                                            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                            primary
                                            onTouchTap={this.handleTouchTapSignContract(value, 1)}
                                          />
                                        </span>)
                                      } else if (value.stockState.indexOf('已失效') !== -1) {
                                        return (<span>
                                          <FlatButton
                                            label='签约'
                                            style={{ width: '30px', minWidth: 0 }}
                                            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#009FFE', letterSpacing: '0.5px', paddingRight: 0, paddingLeft: 0 }}
                                            primary
                                            onTouchTap={this.handleTouchTapSignContract(value, 1)}
                                          />
                                        </span>)
                                      }
                                    })()
                                  }
                                </div>
                              </div>
                            </div>
                          </div>)
                        } else {
                          return <div>暂无数据.</div>
                        }
                      })()
                    }

                  </div>

                </div>)
              }
            })()
          }
          {
            (() => {
              if (this.state.signType === '1') {  // '1'表示显示未签约
                return (<div>
                  <div >
                    {
                      (() => {
                        if (this.state.noSignContract.length) {
                          return this.state.noSignContract.map((value, index) => <div
                            key={index} className='cooperativeNotSign cooperativeNotSignWidth' style={{ height: '5.7rem',
                              padding: 20,
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 10 }}
                          >
                            <div className='cooperativeNotFontStyle' style={{ height: '5.7rem', lineHeight: '5.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value.partnerName}</div>
                            <RaisedButton
                              label='立即签约'
                              style={{ height: 30 }}
                              buttonStyle={{ bordeRadius: 10 }}
                              primary
                              onTouchTap={this.handleTouchTapNoSignContract(value)}
                            />
                          </div>)
                        } else {
                          return <div>暂无数据.</div>
                        }
                      })()

                    }
                  </div>
                  <ContractTypeChooseDialog
                    open={this.state.ContractTypeChooseDialogOpen}
                    ContractData={this.state.ContractTypeChooseDialogData}
                    handleTouchContractTypeChooseDialogOpen={this.handleTouchContractTypeChooseDialogOpen}
                  />
                </div>)
              }
            })()
          }
        </StandardDataGrid>
      </div>

    )
  }
}

