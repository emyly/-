/**
 * Created by NXQ on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './ContractAndAuthorizationHome.scss';

import CooperativePartnerDataGrid from 'components/CooperativePartnerDataGrid';

export default class ContractAndAuthorizationHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='contract-and-authorization-home'>
        <CooperativePartnerDataGrid dataGridType='0' />
      </div>
    )
  }

}
