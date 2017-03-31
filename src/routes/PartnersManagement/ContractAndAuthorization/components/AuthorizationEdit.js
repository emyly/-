/**
 * Created by NXQ on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './AuthorizationEdit.scss';

import MakePriceGoodsDataGrid from 'components/MakePriceGoodsDataGrid';

import AuthorizationDetailsDataGrid from 'components/AuthorizationDetailsDataGrid';

import StandardDataGrid from 'components/StandardDataGrid';

import FilterTabs from 'components/FilterTabs';

import moment from 'components/Moment'

export default class AuthorizationEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageMenuType: ['授权管理', '定价管理'],
      pageType: 0   // 列表模式 0表示授权管理  1表示定价管理
    };
  }
  /**
   * 授权管理/定价管理切换
   */
  handleSelectPageType = (value) => {
    this.setState({ pageType: Number(value) });
  };
  /**
   * 获取合同有效期始/有效期止
   */
  handleGetContractTime(type) {
    if (type === 0) {           // 获取有效期始 后期如果加上了其他合同类型需要使用switch case方式获取
      return this.props.location.state.type ? moment(this.props.location.state['1'].start_time).format('YYYY-MM-DD') : moment(this.props.location.state['2'].start_time).format('YYYY-MM-DD')
    } else {                     // 获取有效期止
      return this.props.location.state.type ? moment(this.props.location.state['1'].stop_time).format('YYYY-MM-DD') : moment(this.props.location.state['2'].stop_time).format('YYYY-MM-DD')
    }
  }
  render() {
    const filter = <FilterTabs inkBarStyle={{ width: '6rem' }} tabs={this.state.pageMenuType} callback={this.handleSelectPageType} />;

    return (
      <div className='authorization-edit'>
        <StandardDataGrid
          iconPosition={'-90px -30px'}
          title='合同与授权管理'
          message={`您正在对：  ${this.props.location.state.partnerName} 进行${this.state.pageType ? '定价管理' : '授权管理'}`}
          filterTitle='按授权管理/定价管理筛选列表：'
          filter={filter}
        >
          <div style={{ border: '1px solid #bbb', padding: 20, marginTop: 30, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, width: '100%', marginRight: 30, height: 40, lineHeight: '40px' }}>合同基本信息</div>
            <div style={{ paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px', marginRight: 30 }}>合同甲方：                      {this.props.location.state.currentOrganizationName}</div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>合同乙方：                      {this.props.location.state.partnerName}</div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同类型： { this.props.location.state.type ? '备货' : '手术' }</span>
              </div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同期始： { this.handleGetContractTime(0) }</span>
              </div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同期止： { this.handleGetContractTime(1) }</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 30, display: this.state.pageType ? 'none' : 'flex', padding: 20, height: 'auto', width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #bbb' }}>
            <AuthorizationDetailsDataGrid dataGridType='0' locationState={this.props.location.state} bottonType />
          </div>
          <div style={{ marginTop: 30, display: this.state.pageType ? 'flex' : 'none', padding: 20, height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #bbb' }}>
            <MakePriceGoodsDataGrid contractType={this.props.location.state.type ? '1' : '2'} authorizeOrganizationId={Number(this.props.globalStore.organizationId)} authorizedOrganizationId={Number(this.props.location.state.partnerId)} dataGridType='0' />
          </div>
        </StandardDataGrid>
      </div>
    )
  }

}
