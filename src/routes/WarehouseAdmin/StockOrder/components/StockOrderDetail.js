/**
 * Created by wmt on 2016/11/29.
 */
import React, { Component, PropTypes } from 'react'
import OrderDetailForm from 'components/OrderDetailForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import StandardForm from 'components/StandardForm';
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import DataGrid from 'components/DataGrid'
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid'
import GoBackButton from 'components/GoBackButton';

export default class StockOrderDetail extends Component {
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
      <StandardForm iconPosition={'-210px 0'} title='备货订单详情' message='...'>
        <StandardFormCardList>
          <StandardFormCard actions={actions} showStep={false} expanded title='备货' message={'您当前正在处理订单号为<' + `${this.props.params.id}` + '>的订单'}>
            <OrderDetailForm position={4} sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']} orderId={Number(this.props.params.id)} orgId={organizationId} />
            <OrderGoodsDetailDateGrid requredStatus={0} organizationID={organizationId} orderId={Number(this.props.params.id)} />
          </StandardFormCard>
        </StandardFormCardList>

      </StandardForm>
    );
  }
}
