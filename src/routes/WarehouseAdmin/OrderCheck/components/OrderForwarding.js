/**
 * Created by sjf on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import OperationPersonnelInfoForm from 'components/OperationPersonnelInfoForm';
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import OrderGoodsDetailSetDateGrid from 'components/OrderGoodsDetailSetDateGrid';
import ForwardingRisedButton from './ForwardingRisedButton'
import './OrderForwarding.scss'

export default class orderCheckSuccess extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ overflow: 'scroll', position: 'fixed', width: '80%', height: '100%' }} >
        <OrderBasicInfoForm orderId='1' />
        <OperationPersonnelInfoForm orderId='2' />
        <div style={{ marginTop: 20 }}>
          <AtSelect />
          <AtMessage />
        </div>
        <OrderGoodsDetailSetDateGrid requredStatus='0' organizationID='1' orderId='1' />
        <ForwardingRisedButton />
      </div>
    )
  }
}
