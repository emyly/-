/**
* Created by sjf on 2016/11/7.
*/
import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ReceivingLogisticsHistory from './ReceivingLogisticsHistory'
import DataGrid from 'components/DataGrid'
import StandardForm from 'components/StandardForm'
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import OrderDetailForm from 'components/OrderDetailForm'
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import { updateReturnOrderRecheck } from '../module/returnOrderRecheck'
import FromValidationDialog from 'components/FormValidationDialog'
import CardUI from 'components/StandardUI/StandardCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import LogisticsOrderDetailDialog from './logisticsOrderDetailDialog'
import { connect } from 'react-redux'
import { setSelectedReturnOrderLogistics } from '../module/selectedReturnOrderLogistics'
import { fetchSurgeryOrderReturnList } from '../module/surgeryOrderReturnList'
import { fetchSurgeryRecheckOrderDetail } from '../module/surgeryRecheckOrderDetail'
import GoBackButton from 'components/GoBackButton'
import Constant from 'lib/constant'
// import _ from 'lodash'

class SurgeryRecoveryRecheckDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderId: this.props.params.id,
      atSelectPeople: [],
      atMessage: '',
      orderDetailDialogOpen: false,
      selectDialogOpen: false,
      orderGoodsListOptions: {
        columnOptions: [
          { label: '物料编号', attr: 'SPBH' },
          { label: '商品名称', attr: 'SPMC' },
          { label: '商品批号', attr: 'SPPH' },
          { label: '商品描述', attr: 'SPMS' },
          { label: '订购总数量', attr: 'SL' },
          { label: '已使用数量', attr: 'YSYSL' },
          { label: '已回收数量', attr: 'YHSSL' },
          { label: '未回收数量', attr: 'WHSSL' }
        ],
        tableAttrs: {
          selectable: false
        },
        tableHeaderAttrs: {
          displaySelectAll: false,
          showCheckboxes: false,
          adjustForCheckbox: false,
        },
        tableBodyAttrs: {
          displayRowCheckbox: false
        },
        showIndex: true
      },
    }
  }

  componentDidMount = () => {
    this.props.fetchSurgeryOrderReturnList(this.state.orderId)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.logisticsOrderList !== nextProps.logisticsOrderList) {
      const logisticsIds =
        nextProps.logisticsOrderList
          .map(obj => (String(obj.SHZT) === Constant.SAAS.CRK.WAIT_RECHECK ? obj.GUID : -1))
          .filter(element => element !== -1)

      this.props.fetchSurgeryRecheckOrderDetail(this.state.orderId, logisticsIds)
    }

    /* When fetching finished on this API call, redirect to print page */
    if (this.props.recheckStatus !== nextProps.recheckStatus && nextProps.recheckStatus) {
      this.props.setSelectedReturnOrderLogistics([])  /* when API returned from Approve check, clear selected item */
      this.context.router.push({
        pathname: `/surgeryRecoveryRecheck/${this.state.orderId}/WarehousingGuide`,
        state: { goodsList: nextProps.goodsList }
      })
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    params: PropTypes.object.isRequired,

    /* action dispatcher */
    fetchSurgeryOrderReturnList: PropTypes.func.isRequired,
    setSelectedReturnOrderLogistics: PropTypes.func.isRequired,
    updateReturnOrderRecheck: PropTypes.func.isRequired,
    fetchSurgeryRecheckOrderDetail: PropTypes.func.isRequired,

    checkedOrdersArray: PropTypes.array.isRequired,
    logisticsOrderList: PropTypes.array.isRequired,
    logisticsOrderDetail: PropTypes.array.isRequired,
    goodsList: PropTypes.array.isRequired,
    recheckStatus: PropTypes.bool.isRequired,

    orgId: PropTypes.number
  }

  handleApprove = () => {
    this.props.updateReturnOrderRecheck(
      this.props.checkedOrdersArray,
      Constant.SAAS.CRK.ORDER_APPROVE,
      this.state.orderId,
      this.state.atMessage,
      this.state.atSelectPeople
    )
  }

  handleReject = () => {
    this.props.updateReturnOrderRecheck(
      this.props.checkedOrdersArray,
      Constant.SAAS.CRK.ORDER_REJECT,
      this.state.orderId,
      this.state.atMessage,
      this.state.atSelectPeople
    )
    this.props.setSelectedReturnOrderLogistics([])  /* clear selected item */
    this.context.router.push('/surgeryRecoveryRecheck')
  }

  handleRecheck = () => {
    if (this.props.checkedOrdersArray.length < 1) {
      this.setState({
        selectDialogOpen: true
      })
      return
    }
    // /* Open dialog */
    this.setState({
      orderDetailDialogOpen: true,
    })
  }

  closeOrderDetailDialog = () => {
    this.setState({
      orderDetailDialogOpen: false
    })
  }

  closeSelectDialog = () => {
    this.setState({
      selectDialogOpen: false
    })
  }

  handleAtSelect = (people) => {
    this.setState({
      atSelectPeople: people.map(person => person.id)
    })
  }

  handleAtMessage = (message) => {
    this.setState({
      atMessage: message
    })
  }

  getOrderReminder = () => {
    const topStyle = {
      backgroundColor: '#00A0FF'
    }

    return (
      <CardUI title='订单提醒' avatar='/logistIcon/icon-07.png' label='' topStyle={topStyle} CardTextStyle={{ height: '23rem' }}>
        <div className='cardSlectWrite' style={{ marginTop: '4.8rem' }}>
          <div className='inforFlex'style={{ marginBottom: '2.8rem' }}>
            <span className='textFlexadd'>选择@谁：</span>
            <div style={{ display: 'inline-block' }}>
              <AtSelect organizationId={this.props.orgId} className='AtTextFieldStyle' callback={this.handleAtSelect} />
            </div>
          </div>
          <div className='inforFlex'>
            <span className='textFlexadd'>选择留言：</span>
            <div style={{ display: 'inline-block' }}>
              <AtMessage className='AtTextFieldStyle' callback={this.handleAtMessage} />
            </div>
          </div>
        </div>
      </CardUI>
    )
  }

  render() {
    const rechecked = parseInt(this.props.params.orderState, 10) === 0
    const orderId = parseInt(this.props.params.id, 10)
    const actions = rechecked
      ? (
        <nav>
          <GoBackButton />
          <RaisedButton
            label='复核' buttonStyle={{ backgroundColor: '#01BD9C' }}
            labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }}
            onTouchTap={this.handleRecheck}
          />
        </nav>
      )
      : []
    return (
      <StandardForm iconPosition='-0px -90px' title='手术回收订单复核'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='订单详情' message='' actions={actions} showStep={false} expanded>
            <OrderDetailForm
              orderId={orderId} orgId={this.props.orgId} position={0}
              sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}
            >
              {/* 订单提醒 */}
              { rechecked ? <div className='col-lg-6 col-md-6 col-sm-12'> {this.getOrderReminder()} </div> : <div /> }
              {/* 回收记录列表 */}
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <ReceivingLogisticsHistory orderId={orderId} />
              </div>
            </OrderDetailForm>
            {/* 回收复核验证对话框 */}
            <FromValidationDialog
              open={this.state.selectDialogOpen} closeCallback={this.closeSelectDialog}
              title='未选择需要复核的入库单' errorMessage='请选择入库单进行复核'
            />
            {/* 回收复核商品列表 */}
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <DataGrid
                options={this.state.orderGoodsListOptions} dataSource={this.props.logisticsOrderDetail}
                dataGridStyle={{ margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
              />
            </div>
            {/* 回收记录复核对话框 */}
            <LogisticsOrderDetailDialog
              cancelCallback={this.closeOrderDetailDialog} rejectCallback={this.handleReject} approveCallback={this.handleApprove}
              checkedOrdersArray={this.props.checkedOrdersArray} orderId={orderId} open={this.state.orderDetailDialogOpen}
            />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    )
  }
}
const mapStateToProps = state => ({
  checkedOrdersArray: state.selectedReturnOrderLogisticsReducer.checkedOrdersArray,
  orgId: state.globalStore.organizationId,
  logisticsOrderList: state.surgeryOrderReturnListReducer.receivingList,
  logisticsOrderDetail: state.surgeryRecheckOrderDetailReducer.result,
  goodsList: state.returnOrderRecheckReducer.goodsList,
  recheckStatus: state.surgeryReturnReceivingRecheckReducer.succeed
})

const mapDispatchToProps = {
  setSelectedReturnOrderLogistics,
  fetchSurgeryRecheckOrderDetail,
  fetchSurgeryOrderReturnList,
  updateReturnOrderRecheck
}

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryRecoveryRecheckDetail)
