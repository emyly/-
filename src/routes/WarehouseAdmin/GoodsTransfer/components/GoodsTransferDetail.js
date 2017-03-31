/**
 * Created by niexq on 17/3/25.
 */


import React, { Component } from 'react';

import './GoodsTransferList.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import GoBackButton from 'components/GoBackButton';

/**
 * 使用场景：商品转移单条记录列表
 */
export default class GoodsTransferDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static defaultProps = {

  };
  static propTypes = {

  };
  componentWillReceiveProps = (nextProps) => {

  };
  componentWillMount = () => {

  };

  render() {
    const actions = (
      <nav>
        <GoBackButton style={{ width: '95px', marginRight: '0px' }} />
      </nav>
    )
    return (
      <StandardDataGrid
        title='商品转移'
        actions={actions}
        iconPosition={'0px 0px'}
      >
        <div>商品转移详情开发中...</div>
      </StandardDataGrid>
    )
  }
}
