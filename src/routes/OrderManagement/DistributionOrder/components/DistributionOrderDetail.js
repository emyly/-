/**
 * Created by qyf on 2017/3/14.
 */
import React, { Component, PropTypes } from 'react'
import OrderDetailForm from 'components/OrderDetailForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardForm from 'components/StandardForm';
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid'
import GoBackButton from 'components/GoBackButton';


export default class DistributionOrderDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  static propTypes = {
    globalStore: PropTypes.object,
    params: PropTypes.object,
  }

  render() {
    const { organizationId } = this.props.globalStore;
    const actions = <GoBackButton />;
    return (
      <StandardForm iconPosition={'-210px 0'} title='铺货订单详情' message='...'>
        <StandardFormCardList>
          <StandardFormCard
            actions={actions}
            showStep={false}
            expanded
            title='铺货'
            message={`您当前正在处理订单号为<${this.props.params.id}>的订单`}
          >
            <OrderDetailForm
              position={4}
              sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}
              orderId={Number(this.props.params.id)} orgId={organizationId}
            />
            <OrderGoodsDetailDateGrid requredStatus={0} organizationID={organizationId} orderId={Number(this.props.params.id)} />
          </StandardFormCard>
        </StandardFormCardList>

      </StandardForm>
    );
  }
}
