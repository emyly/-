/**
 * Created by NXQ on 10/22/2016.
 */

import React, { Component, PropTypes } from 'react';

import './DataGridComponentsDemo.scss';

import TempCreditQueryDataGrid from 'components/TempCreditQueryDataGrid'

import CreditQueryDataGrid from 'components/CreditQueryDataGrid';

import MakePriceGoodsDataGrid from 'components/MakePriceGoodsDataGrid';

import CooperativePartnerDataGrid from 'components/CooperativePartnerDataGrid';

import AuthorizationDetailsDataGrid from 'components/AuthorizationDetailsDataGrid';

const styles = {
  paddingTop: 20,
  paddingBottom: 20,
  borderBottom: '2px solid black'
};
export default class DataGridComponentsDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noBusinessLineopen: false,
      BusinessLineopen: false,
      ChooseGoodsStoreDialogOpen: false
    }
  }

  render() {
    return (
      <div className='datagrid-components-demo'>
        <div>DataGrid公共组件演示</div>

        <div style={styles}>------------授权详情列表------------
          <AuthorizationDetailsDataGrid AuthorizeOrganizationId={1000} AuthorizedOrganizationId={1001} dataGridType='0' />
        </div>

        <div style={styles}>------------合作伙伴列表------------
          <CooperativePartnerDataGrid AuthorizedOrganizationId={1001} dataGridType='0' />
        </div>

        <div style={styles}>------------定价管理------------
          <MakePriceGoodsDataGrid AuthorizedOrganizationId={1001} dataGridType='0' />
        </div>

        <div style={styles}>------------信用查询列表------------
          <CreditQueryDataGrid AuthorizedOrganizationId={900000000207} />
        </div>

        <div style={styles}>------------临时信用查询列表------------
          <TempCreditQueryDataGrid AuthorizeOrganizationId={900000000216} AuthorizedOrganizationId={900000000217} />
        </div>
      </div>
    )
  }

}

