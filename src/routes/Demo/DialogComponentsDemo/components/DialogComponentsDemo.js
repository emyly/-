/**
 * Created by NXQ on 10/20/2016.
 */
import React, { Component, PropTypes } from 'react';
import './DialogComponentsDemo.scss';
import ChooseGoodsAuthDialog from 'components/ChooseGoodsAuthDialog';
import ChooseGoodsStoreDialog from 'components/ChooseGoodsStoreDialog';
import RaisedButton from 'material-ui/RaisedButton';
import WarehouseOutDetailDialog from 'components/WarehouseOutDetailDialog'
import WarehouseInDetailDialog from 'components/WarehouseInDetailDialog'
import LogisticsDetailDialog from 'components/LogisticsDetailDialog';
import LogisticsEditDialog from 'components/LogisticsEditDialog';

export default class DialogComponentsDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noBusinessLineopen: false,
      BusinessLineopen: false,
      ChooseGoodsStoreDialogOpen: false,
      locationResultArray: [],
      warehouseOutOpen: false,
      warehouseInOpen: false,
      logisticsCheckOpen: false,
      logisticsEditOpen: false,
      currentLocation: '',
    }
  }
  clickConfirm = () => {
    this.setState({ warehouseOutOpen: false,
      warehouseInOpen: false,
      logisticsCheckOpen: false,
      logisticsEditOpen: false });
  }
  warehouseOutHandleOpen = () => {
    this.setState({ warehouseOutOpen: true,
      warehouseInOpen: false,
      logisticsCheckOpen: false,
      logisticsEditOpen: false });
  }

  warehouseInHandleOpen = () => {
    this.setState({ warehouseInOpen: true,
      warehouseOutOpen: false,
      logisticsCheckOpen: false,
      logisticsEditOpen: false });
  }
  logisticsCheckHandleOpen = () => {
    console.debug('=======================');
    console.debug(this.state.logisticsCheckOpen);
    this.setState({ logisticsCheckOpen: true,
      warehouseInOpen: false,
      warehouseOutOpen: false,
      logisticsEditOpen: false });
  }
  logisticsEditHandleOpen = () => {
    this.setState({ logisticsEditOpen: true,
      logisticsCheckOpen: false,
      warehouseInOpen: false,
      warehouseOutOpen: false, });
  }
  handleTouchTapNoBusinessLine = () => {
    this.setState({ noBusinessLineopen: !this.state.noBusinessLineopen });
  }
  handleTouchTapBusinessLine = () => {
    this.setState({ BusinessLineopen: !this.state.BusinessLineopen });
  }
  handleTouchTapStoreDialogOpen = () => {
    this.setState({ ChooseGoodsStoreDialogOpen: !this.state.ChooseGoodsStoreDialogOpen });
  }
  handleCallBackChooseGoodsStore = (locationResultArray) => {
    this.setState({ locationResultArray });
    console.log('~~~locationResult~~~~', locationResultArray);
  };

  getChoosedGoodsCallback = (choosedGoods) => {}

  render() {
    return (
      <div className='dialog-components-demo'>
        <div>弹框公共组件演示</div>
        <div style={{ marginTop: 20 }}>
          <RaisedButton
            label='弹出不传入业务线和品牌的--根据授权选择商品Dialog'
            style={{ marginTop: 15, marginRight: 15 }}
            primary
            onTouchTap={this.handleTouchTapNoBusinessLine}
          />
          <RaisedButton
            label='弹出传入业务线和品牌的--根据授权选择商品Dialog'
            style={{ marginTop: 15, marginRight: 15 }}
            primary
            onTouchTap={this.handleTouchTapBusinessLine}
          />
          <ChooseGoodsAuthDialog
            haveBusinessLineIdAndBrandId={false} contractType={2}
            AuthorizeOrganizationId={900000000207} AuthorizedOrganizationId={900000000204}
            open={this.state.noBusinessLineopen} handleDialog={this.handleTouchTapNoBusinessLine}
            getSelectionCallback={this.getChoosedGoodsCallback}
          />
          <ChooseGoodsAuthDialog
            haveBusinessLineIdAndBrandId contractType={2} notShowBusinessLine
            AuthorizeOrganizationId={900000000207} AuthorizedOrganizationId={900000000204}
            businessLineName={'业务线1'} businessLineId={1} brandName={'品牌100'} brandId={100}
            open={this.state.BusinessLineopen} handleDialog={this.handleTouchTapBusinessLine}
            getSelectionCallback={this.getChoosedGoodsCallback}
          />
        </div>
        <div>
          <RaisedButton
            label='根据库存选择商品'
            style={{ marginTop: 15, marginRight: 15 }}
            primary
            onTouchTap={this.handleTouchTapStoreDialogOpen}
          />
          {
            this.state.locationResultArray.map((value, index) => (
              <div key={index}>
                <span>{`已选择商品库位${index + 1}: `}</span>
                <span>{value.KWMC}</span>
              </div>
            ))
          }
          <ChooseGoodsStoreDialog callback={this.handleCallBackChooseGoodsStore} CurrentOrganizationId={2000} ParentWareHouseId={0} open={this.state.ChooseGoodsStoreDialogOpen} handleDailog={this.handleTouchTapStoreDialogOpen} />
        </div>
        <div>
          <RaisedButton label='物流单详情(查看)' onTouchTap={this.logisticsCheckHandleOpen} />

          <LogisticsDetailDialog CKDID={380} confirmCallBack={this.clickConfirm} open={this.state.logisticsCheckOpen} />

          <RaisedButton label='出库单详情' onTouchTap={this.warehouseOutHandleOpen} />
          <WarehouseOutDetailDialog paramsObj={[{ DDID: 900000000306, CRKDID: 571 }, { DDID: 900000000306, CRKDID: 569 }]} confirmCallBack={this.clickConfirm} isShowRecheckBtn={false} open={this.state.warehouseOutOpen} />

          <RaisedButton label='入库单详情' onTouchTap={this.warehouseInHandleOpen} />
          <WarehouseInDetailDialog paramsObj={[{ DDID: 900000000306, CRKDID: 571 }, { DDID: 900000000306, CRKDID: 569 }]} confirmCallBack={this.clickConfirm} isShowRecheckBtn={false} open={this.state.warehouseInOpen} />
          <RaisedButton label='物流单详情(编辑) 已取消做公共组件' onTouchTap={this.logisticsEditHandleOpen} />
          <LogisticsEditDialog open={this.state.logisticsEditOpen} />
        </div>
      </div>
    )
  }

}
