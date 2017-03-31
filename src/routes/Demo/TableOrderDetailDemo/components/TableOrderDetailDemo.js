import React, { Component, PropTypes } from 'react';
import UrgentDetailTable from 'components/UrgentDetailTable';
import DiscountDetailTable from 'components/DiscountDetailTable';
import BaddebtsDetailTable from 'components/BaddebtsDetailTable';
import BillingDetailTable from 'components/BillingDetailTable';
import GatheringDetailTable from 'components/GatheringDetailTable';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm';
import OperationPersonnelInfoForm from 'components/OperationPersonnelInfoForm';
import {
  ProductSelection
} from 'components/ProductSelectionDataGrid';

export default class TableOrderDetailDemo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: 'scroll', width: '100%', height: '90%' }}>
        <div>
          <UrgentDetailTable orderId={900000000120} orgId={0} />
          <DiscountDetailTable orderId={900000000120} orgId={0} />
          <BaddebtsDetailTable orderId={900000000120} orgId={0} />
          <BillingDetailTable orderId={900000000120} ifBillinged={false} />
          <BillingDetailTable orderId={900000000120} ifBillinged />
          <GatheringDetailTable orderId={900000000120} orgId={0} ifGatheringed />
          <GatheringDetailTable orderId={900000000120} orgId={0} ifGatheringed={false} />
          <OrderBasicInfoForm orderId={900000000120} orgId={0} />
          <OperationPersonnelInfoForm orderId={900000000120} orgId={0} />
        </div>
      </div>
    )
  }
}
