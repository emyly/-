import React, { Component, PropTypes } from 'react';
import OrderDetailForm from 'components/OrderDetailForm';
import TextField from 'material-ui/TextField';

export default class OrderDetailFormDemo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: 'scroll', width: '100%', height: '90%', marginTop: '20px' }}>
        <div>
          <OrderDetailForm orderId={900000000327} orgId={0} position={14} sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm', 'UrgentDetailTable', 'GatheringDetailTable', 'unGatheringDetailTable', 'BillingDetailTable', 'unBillingDetailTable', 'DiscountDetailTable', 'BaddebtsDetailTable']}>
            <div className='col-lg-6' style={{ height: '28.6rem' }}>
              <TextField value='测试' />
              <TextField value='测试' />
              <TextField value='测试' />
            </div>
          </OrderDetailForm>
        </div>
      </div>
    )
  }
}
