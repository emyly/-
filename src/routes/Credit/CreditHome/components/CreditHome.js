/**
 * Created by NXQ on 10/28/2016.
 */

import React, { Component, PropTypes } from 'react';

import './CreditHome.scss';

import CreditQueryDataGrid from 'components/CreditQueryDataGrid';

export default class CreditHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='credit-home'>
        <CreditQueryDataGrid AuthorizedOrganizationId={Number(this.props.globalStore.organizationId)} />

      </div>
    )
  }

}
