

import React, { Component, PropTypes } from 'react';
import { ProductSelection } from 'components/ProductSelectionDataGrid'
import './Picking.scss';

export default class Picking extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div className='picking' >拣货/配货内容</div>
        <div>
          <ProductSelection />
        </div>
      </div>
    )
  }

}
