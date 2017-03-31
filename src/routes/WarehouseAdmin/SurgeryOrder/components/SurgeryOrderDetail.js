/**
 * Created by wmt on 2016/11/29.
 */
import React, { Component, PropTypes } from 'react'
import OrderDetailForm from 'components/OrderDetailForm'
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import StandardForm from 'components/StandardForm'
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import GoBackButton from 'components/GoBackButton';

export default class SurgeryOrder extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    const { organizationId } = this.props.globalStore;
    const actions = <GoBackButton />;
    return (
      <StandardForm iconPosition={'-120px -120px'} title='手术订单详情' message='...'>
        <StandardFormCardList>
          <StandardFormCard actions={actions} showStep={false} expanded title='手术' message={'您当前正在处理订单号为<' + `${this.props.params.id}` + '>的订单'}>
            <OrderDetailForm position={4} sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']} orderId={Number(this.props.params.id)} orgId={organizationId} />
            <OrderGoodsDetailDateGrid requredStatus={0} organizationID={organizationId} orderId={Number(this.props.params.id)} />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    );
  }
}
