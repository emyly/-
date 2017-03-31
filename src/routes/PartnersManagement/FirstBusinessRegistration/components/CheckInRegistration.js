/**
 * Created by liuyali on 2016/12/30.
 */

import './FirstBusinessRegistration.scss'
import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import GoBackButton from 'components/GoBackButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

/* 公共组件*/
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import './CheckInRegistration.scss'

const checkPending = '待审核';
export default class CheckInRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      dialog_open: false,
      title: '',
      message: '',
      imgSrc: ''
    };
  }
  static propTypes={
    getEnterpriseInformation: PropTypes.func.isRequired,
    getOrgCertificate: PropTypes.func,

    getOrgCertificateData: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,

  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  componentWillMount() {
    this.props.getOrgCertificate(this.props.params.id);
    if (this.props.location.state.status !== checkPending) {
      this.props.getEnterpriseInformation(this.props.params.id)
    }
  }
  componentWillReceiveProps(props) {
  }
  handleClose = () => {
    this.setState({
      dialog_open: !this.state.dialog_open
    })
  };
  handleMagnifyPic = data => () => {
    this.setState({
      dialog_open: !this.state.dialog_open,
      title: `企业${data.WDMC}`,
      imgSrc: data.GUID
    })
  };
  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      slide: {
        padding: 10,
      },
    };
    const actions = [
      <FlatButton
        label='关闭'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#979797' }}
        onTouchTap={this.handleClose}
      />
    ];
    const backButton = (<nav style={{ display: 'flex', alignItems: 'center' }}>
      <GoBackButton style={{ marginRight: 0 }} />
    </nav>);
    const InformationData = this.props.getOrgCertificateData.getEnterpriseInformation.InformationData ? this.props.getOrgCertificateData.getEnterpriseInformation.InformationData : {};
    return (
      <StandardForm
        iconPosition='-120px -30px'
        title='首次经营登记'
      >
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='查看证件照' message={<span><span>当前正在查看{this.props.params.id}企业的证照信息</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'red' }}>{this.props.location.state.status === checkPending ? '(该企业尚未通过平台审核)' : ''}</span></span>} completed showContent showStep={false} expanded={false} actions={backButton} >
            <div className='businessForm'>
              <div className='cardBusiness'>
                <div className='cardTitle'>
                  已上传的证照图片
              </div>
                <div className='cardCont'>
                  {
                  this.props.getOrgCertificateData.getOrgCertificate.data.length ? this.props.getOrgCertificateData.getOrgCertificate.data.map((data, index) => <div className='businessImg' key={index}>
                    <div className='imgBorder' onClick={this.handleMagnifyPic(data)}>
                      <img src={data.GUID ? data.GUID : '/emptyState.jpg'} alt='' width='100%' height='100%' />
                    </div>
                    <div className='picName'>
                                  企业{data.WDMC}
                    </div>
                  </div>) : <div className='noData'>暂无缩略图.</div>
                }
                </div>
              </div>
              <div className='cardBusiness tabBusiness'>
                <div className='cardTitle tabTitle'>
                  <div>
                    <Tabs
                      onChange={this.handleChange}
                      value={this.state.slideIndex}
                      tabItemContainerStyle={{ backgroundColor: 'transparent', fontSize: '1.43rem', position: 'absolute', zIndex: '999' }}
                      inkBarStyle={{ height: '48px', marginTop: '-48px', backgroundColor: '#00A0FF', position: 'absolute', zIndex: '1', transition: 'none' }}
                    >
                      <Tab label='企业工商基本信息' value={0} style={{ fontSize: '1.43rem' }} />
                      <Tab label='国家药监许可信息' value={1} style={{ fontSize: '1.43rem' }} />
                      <Tab label='企业违约失信记录' value={2} style={{ fontSize: '1.43rem' }} />
                      <Tab label='企业经营异常信息' value={3} style={{ fontSize: '1.43rem' }} />
                      <Tab label='行政违规处理信息' value={4} style={{ fontSize: '1.43rem' }} />
                    </Tabs>
                  </div>
                </div>
                <div className='cardCont tabContent'>
                  <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                  >
                    <div>
                      {
                        this.props.location.state.status !== checkPending ? <div>
                          <ul className='companyCommerce'>
                            <li>统一社会信用代码:{InformationData.CreditCode ? InformationData.CreditCode : '--'}</li>
                            <li>企业名称：{InformationData.Name ? InformationData.Name : '--'}</li>
                            <li>类型：{InformationData.EconKind ? InformationData.EconKind : '--'}</li>
                            <li>法定代表人：{InformationData.OperName ? InformationData.OperName : '--'}</li>
                            <li>营业期限自:{InformationData.TermStart ? InformationData.TermStart : '--'}</li>
                            <li>营业期限至：{InformationData.TeamEnd ? InformationData.TeamEnd : '--'}</li>
                            <li>注册资本：{InformationData.RegistCapi ? InformationData.RegistCapi : '--'}</li>
                            <li>核准日期：{InformationData.CheckDate ? InformationData.CheckDate : '--'}</li>
                            <li>注册住所：{InformationData.Address ? InformationData.Address : '--'}</li>
                            <li>状态：{InformationData.Status ? InformationData.Status : '--'}</li>
                            <li className='businessScope'>经营范围：{InformationData.Scope ? InformationData.Scope : '--'}</li>
                          </ul>
                          <div className='companyCommerceTableStyle'>
                            <p className='tableTitle'>
                            股东及出资信息
                          </p>
                            <Table>
                              <TableHeader displaySelectAll={false} selectable={false} adjustForCheckbox={false}>
                                <TableRow>
                                  <TableHeaderColumn>股东名称</TableHeaderColumn>
                                  <TableHeaderColumn>股东类型</TableHeaderColumn>
                                  <TableHeaderColumn>认缴金额</TableHeaderColumn>
                                  <TableHeaderColumn>认缴出资日期</TableHeaderColumn>
                                  <TableHeaderColumn>实缴金额</TableHeaderColumn>
                                  <TableHeaderColumn>实缴出资日期</TableHeaderColumn>
                                </TableRow>
                              </TableHeader>
                              <TableBody displayRowCheckbox={false}>
                                {
                                this.props.getOrgCertificateData.getEnterpriseInformation.status ? InformationData.Partners.map((val, index) => <TableRow>
                                  <TableRowColumn key={`InformationData${index}`}>{val.StockName ? val.StockName : '--'}</TableRowColumn>
                                  <TableRowColumn key={`InformationData${index}`}>{val.StockType ? val.StockType : '--'}</TableRowColumn>
                                  <TableRowColumn key={`InformationData${index}`}>{val.ShouldCapi ? val.ShouldCapi : '--'}</TableRowColumn>
                                  <TableRowColumn key={`InformationData${index}`}>{val.CapiDate ? val.CapiDate : '--'}</TableRowColumn>
                                  <TableRowColumn key={`InformationData${index}`}>{val.RealCapi ? val.RealCapi : '--'}</TableRowColumn>
                                  <TableRowColumn key={`InformationData${index}`}>{val.CapiDate ? val.CapiDate : '--'}</TableRowColumn>
                                </TableRow>) : <TableRow>
                                  <TableRowColumn>暂无数据.</TableRowColumn>
                                </TableRow>
                              }
                              </TableBody>
                            </Table>
                          </div>
                          <div className='companyCommerceTableStyle'>
                            <p className='tableTitle'>
                          成员信息
                        </p>
                            <Table>
                              <TableHeader displaySelectAll={false} selectable={false} adjustForCheckbox={false}>
                                <TableRow>
                                  <TableHeaderColumn>成员名称</TableHeaderColumn>
                                  <TableHeaderColumn>成员职务</TableHeaderColumn>
                                </TableRow>
                              </TableHeader>
                              <TableBody displayRowCheckbox={false}>
                                {
                              this.props.getOrgCertificateData.getEnterpriseInformation.status ? InformationData.Employees.map((val, index) => <TableRow>
                                <TableRowColumn key={`InformationData${index}`}>{val.Name ? val.Name : '--'}</TableRowColumn>
                                <TableRowColumn key={`InformationData${index}`}>{val.Job ? val.Job : '--'}</TableRowColumn>
                              </TableRow>) : <TableRow>
                                <TableRowColumn>暂无数据.</TableRowColumn>
                              </TableRow>
                            }
                              </TableBody>
                            </Table>
                          </div>
                        </div> : <div>企业工商基本信息模块暂无数据.</div>
                      }
                    </div>
                    <div style={styles.slide}>
                      国家药监许可信息模块暂无数据.
                  </div>
                    <div style={styles.slide}>
                      企业违约失信记录模块暂无数据.
                  </div>
                    <div style={styles.slide}>
                      企业经营异常信息模块暂无数据.
                  </div>
                    <div style={styles.slide}>
                      行政违规处理信息模块暂无数据.
                  </div>
                  </SwipeableViews>
                </div>
              </div>
              <Dialog
                title={this.state.title}
                actions={actions}
                modal={false}
                open={this.state.dialog_open}
              >
                <div style={{ height: 'inherit' }}>
                  <img src={this.state.imgSrc} width='100%' height='100%' alt='' />
                </div>
              </Dialog>
            </div>
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>)
  }
}
