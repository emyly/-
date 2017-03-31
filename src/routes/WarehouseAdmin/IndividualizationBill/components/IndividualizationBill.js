

import React, { Component } from 'react';

import './IndividualizationBill.scss';

import StandardDataGrid from 'components/StandardDataGrid';

export default class IndividualizationBill extends Component {

  render() {
    return (
      <StandardDataGrid
        title='个性化单据管理'
        iconPosition='-210px -30px'
      >
        <div className='individualization-bill' >内容正在开发中...</div>
      </StandardDataGrid>
    )
  }

}

