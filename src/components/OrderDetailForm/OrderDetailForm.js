/**
 * Created by WMT on 2016/10/28.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './OrderDetailForm.scss'
import OrderBasicInfoForm from '../OrderBasicInfoForm';
import OperationPersonnelInfoForm from '../OperationPersonnelInfoForm';
import BillSummaryDataGrid from '../BillSummaryDataGrid';
import UrgentDetailTable from '../UrgentDetailTable'
import GatheringDetailTable from '../GatheringDetailTable'
import BillingDetailTable from '../BillingDetailTable'
import DiscountDetailTable from '../DiscountDetailTable'
import BaddebtsDetailTable from '../BaddebtsDetailTable'
import OrderGoodsDetailDateGrid from '../OrderGoodsDetailDateGrid'
import LogisticsRecordDateGrid from '../LogisticsRecordDateGrid'

/**
 * 使用场景：订单详情
 */
export default class OrderDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ZDHZ: this.props.BillSmmryData.data,
      DDLX: this.props.orderBasicInfoForm.orderData.DDLX
    };
  }

  static defaultProps ={
    position: 2,
    sort: []
  }

  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired,
    // 插入组件
    children: React.PropTypes.element,
    // 选择插入组件位置，默认在OperationPersonnelInfoForm之下(值为2)
    position: React.PropTypes.number,
    sort: React.PropTypes.array
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ZDHZ: nextProps.BillSmmryData.data, DDLX: nextProps.orderBasicInfoForm.orderData.DDLX, DDZT: nextProps.orderBasicInfoForm.orderData.DDZT })
  }

  render() {
    const { orderId, orgId } = this.props;
    const components = {
      OrderBasicInfoForm: <div className='col-lg-6 col-md-6 col-sm-12'><OrderBasicInfoForm key='orderDetailForm_1' orderId={orderId} orgId={orgId} /></div>,
      OperationPersonnelInfoForm: <div className='col-lg-6 col-md-6 col-sm-12'><OperationPersonnelInfoForm key='orderDetailForm_2' orderId={orderId} orgId={orgId} style={this.state.DDLX == '2' ? {} : { display: 'none' }} /></div>,
      BillSummaryDataGrid: <div className='col-lg-6 col-md-6 col-sm-12'><BillSummaryDataGrid
        key='orderDetailForm_4' ddid={orderId} orgId={orgId} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && Object.keys(this.state.ZDHZ).some(o => Number(this.state.ZDHZ[o]) > 0)
? {} : { display: 'none' }}
      /></div>,
      UrgentDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><UrgentDetailTable key='orderDetailForm_5' orderId={orderId} orgId={orgId} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.state.ZDHZ.jjje > 0 ? {} : { display: 'none' }} /></div>,
      GatheringDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><GatheringDetailTable key='orderDetailForm_6' orderId={orderId} orgId={orgId} ifGatheringed style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.props.gatheringDetailTable.gatheringData.length > 0 ? {} : { display: 'none' }} /></div>,
      unGatheringDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><GatheringDetailTable key='orderDetailForm_7' orderId={orderId} orgId={orgId} ifGatheringed={false} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.props.gatheringDetailTable.unGatheringData.length > 0 ? {} : { display: 'none' }} /></div>,
      BillingDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><BillingDetailTable key='orderDetailForm_8' orderId={orderId} orgId={orgId} ifBillinged style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.props.billingDetailTable.billingData.length > 0 ? {} : { display: 'none' }} /></div>,
      unBillingDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><BillingDetailTable key='orderDetailForm_9' orderId={orderId} orgId={orgId} ifBillinged={false} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.props.billingDetailTable.unBillingData.length > 0 ? {} : { display: 'none' }} /></div>,
      DiscountDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><DiscountDetailTable key='orderDetailForm_10' orderId={orderId} orgId={orgId} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.state.ZDHZ.zkje > 0 ? {} : { display: 'none' }} /></div>,
      BaddebtsDetailTable: <div className='col-lg-6 col-md-6 col-sm-12'><BaddebtsDetailTable key='orderDetailForm_11' orderId={orderId} orgId={orgId} style={this.state.DDLX !== 7 && this.state.DDLX !== 8 && this.props.baddebtsDetailTable.baddebtsData.length > 0 ? {} : { display: 'none' }} /></div>,
      LogisticsRecordDateGrid: <div className='col-lg-12 col-md-12 col-sm-12'><LogisticsRecordDateGrid key='orderDetailForm_3' organizationId={orgId} orderId={orderId} FHZT={1} style={(this.state.DDZT == '1') && this.props.logisticsRecordDateGrid.logisticsRecordDate.length > 0 ? {} : { display: 'none' }} /></div>

    }
    const formList = [];
    if (this.props.sort.length) {
      this.props.sort.forEach((o) => {
        formList.push(components[o])
      })
    } else {
      for (const component in components) {
        formList.push(components[component])
      }
    }
    if (this.props.children) {
      formList.splice(this.props.position, 0, this.props.children)
    }
    return (
      <div>
        {formList}
      </div>
    )
  }
}
