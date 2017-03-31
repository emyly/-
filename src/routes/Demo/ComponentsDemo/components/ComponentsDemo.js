import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import LOBSelect from 'components/LOBSelect'
import BrandSelect from 'components/BrandSelect'
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import SendReceiveAddSelect from 'components/SendReceiveAddSelect'
import LogisticsSelect from 'components/LogisticsSelect'
import PartnerSelect from 'components/PartnerSelect'
import OrderSelect from 'components/OrderSelect'
import OrderMessage from 'components/OrderMessage'
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid';
import OrderGoodsDetailSetDateGrid from 'components/OrderGoodsDetailSetDateGrid';
import WarehouseInDetailDialog from 'components/WarehouseInDetailDialog'
import RaisedButton from 'material-ui/RaisedButton';
import LogisticsDetailDialog from 'components/LogisticsDetailDialog';
import LogisticsEditDialog from 'components/LogisticsEditDialog';
import OrderRecheckList from 'components/OrderRecheckList'
import PickingProductionList from 'components/PickingProductionList'
import StorageOutRecheckList from 'components/StorageOutRecheckList'
import OperationReceiveList from 'components/OperationReceiveList'
import ReceiveProductionList from 'components/ReceiveProductionList'
import OperationReceiveRecheckList from 'components/OperationReceiveRecheckList'
import WarehouseOutDetailDialog from 'components/WarehouseOutDetailDialog'
import ProductionDeliverList from 'components/ProductionDeliverList'
import DateRangePicker from 'components/DateRangePicker'
import CurrencySelect from 'components/CurrencySelect'
import LanguageSelect from 'components/LanguageSelect'
import DeliveryOrdersGoodsDetailDataGrid from 'components/DeliveryOrdersGoodsDetailDataGrid'
import PutGoodsDetailDataGrid from 'components/PutGoodsDetailDataGrid'
import PickOrderDetailList from 'components/PickOrderDetailList'
import PickProductionDialog from 'components/PickProductionDialog'
import PickingRecordDateGrid from 'components/PickingRecordDateGrid'
import BillSummaryDataGrid from 'components/BillSummaryDataGrid'
import HistoryWarehousingDataGrid from 'components/HistoryWarehousingDataGrid'
import Location from '../../../../components/Location';

const styles = {
  margin: '15px 0 15px',
  border: '1px solid #333'
};
export default class ComponentsDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }
  handleClick = (value) => {
    console.log(value);
  }
  getValue = (location) => {
    console.log('location ==== ', location);
  }
  render() {
    return (
      <div style={{ overflow: 'scroll', position: 'fixed', width: '80%', height: '100%' }}>
        <Location
          callback={
            this.getValue
          }
        />

        订单审核列表
        <OrderRecheckList rowClick={this.handleClick} requredStatus={1} organizationID={900000000207} currentPageCount={13} pageCountPerPage={21} />
        <div style={styles} />
        拣货/配货列表
        <PickingProductionList rowClick={this.handleClick} requredStatus={1} organizationID={12} currentPageCount={13} pageCountPerPage={32} />
        <div style={styles} />
        出库复核列表
        <StorageOutRecheckList rowClick={this.handleClick} requredStatus={0} organizationID={12} currentPageCount={13} pageCountPerPage={32} />
        <div style={styles} />
        收货入库列表
        <ReceiveProductionList rowClick={this.handleClick} requredStatus={0} organizationID={900000000312} currentPageCount={13} pageCountPerPage={4} />
        <div style={styles} />
        手术回收列表
        <OperationReceiveList rowClick={this.handleClick} requredStatus={0} organizationID={12} currentPageCount={13} pageCountPerPage={32} />
        <div style={styles} />
        手术回收复核列表
        <OperationReceiveRecheckList rowClick={this.handleClick} requredStatus={0} organizationID={12} currentPageCount={13} pageCountPerPage={32} />
        <div style={styles} />
        物流发货列表
        <ProductionDeliverList rowClick={this.handleClick} requredStatus={0} organizationID={12} currentPageCount={13} pageCountPerPage={32} />
        <div style={styles} />

        {/* <RaisedButton label="出库单详情" onTouchTap={this.warehouseOutHandleOpen} />
         <WarehouseOutDetailDialog confirmCallBack={this.clickConfirm} isShowRecheckBtn={false} CRKDIDArray = {['1','2']} open = {this.state.warehouseOutOpen}/>*/}
        <div style={styles} />

        {/* <WarehouseInDetailDialog open = {this.state.warehouseInOpen}/>*/}
        <div style={styles} />
        <RaisedButton label='物流单详情(查看)' onTouchTap={this.logisticsCheckHandleOpen} />
        {/* <LogisticsDetailDialog open={this.state.logisticsCheckOpen}/>*/}
        <div style={styles} />
        <RaisedButton label='物流单详情(编辑) 已取消做公共组件' onTouchTap={this.logisticsEditHandleOpen} />
        <LogisticsEditDialog open={this.state.logisticsEditOpen} />
        <div style={styles} />

        订单中商品明细表格
        <OrderGoodsDetailDateGrid requredStatus={0} organizationID={0} orderId={900000000261} />
        <div style={styles} />
        订单中结算商品明细表格
        <OrderGoodsDetailSetDateGrid requredStatus={1} organizationID={0} orderId={900000000035} />
        <div style={styles} />
        获取订单的出库商品详情汇总
        <DeliveryOrdersGoodsDetailDataGrid
          GUID={900000000316} DDLX='2' CKRK='0'
        />

        <div style={styles} />
        个人基本信息
        {/* <PersonalBasicInformationDialog />*/}
        {/* <PersonalBasicInformationDialog orgId={900000000207} id = {9000000000003} />*/}
        <div style={styles} />
        获取订单的出库商品详情汇总
        <PutGoodsDetailDataGrid />
        <div style={styles} />
        账单汇总
        <BillSummaryDataGrid ddid={900000000217} />
        <PickProductionDialog KWID={900000000002} callback={(result) => {}} />
        <div>
          <DateRangePicker />
        </div>
        <br /> <br /> <br />
        <div>
          <p>角色权限管理</p>


        </div>
        <br /> <br /> <br />
        <div>
          <p>员工机构管理</p>
          {/* <EmployeeTable_DataGrid/>*/}
        </div>
        <br /> <br /> <br /><br /> <br /> <br />
        物流拣货记录
        <PickingRecordDateGrid FHZT='2' GUID={900000000074} organizationId={0} orderId={0} rowClick={this.handleClick} pickingData={this.handleClick2} />
        物流发货记录(这个组件不用了)
        {/* <LogisticsRecordDateGrid  FHZT="1" GUID={900000000197} organizationId={0} orderId={0}   rowClick={this.handleClick}/>*/}
        <HistoryWarehousingDataGrid CGRK='1' orderId={900000000312} />

      </div>
    )
  }

}
