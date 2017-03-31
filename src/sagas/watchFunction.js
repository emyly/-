export {
  watchGetPartnerData
} from 'components/PartnerSelect/modules/saga'
export {
  watchGetLogisticData
} from 'components/LogisticsSelect/modules/saga'
export {
  watchGetSendReceiveAddData
} from 'components/SendReceiveAddSelect/modules/saga'
export {
  watchGetOrderRecheckListData
} from 'components/OrderRecheckList/modules/saga'
export {
  watchGetOrderDetailData,
  watchGetTurnOrderDetailData
} from 'components/OrderBasicInfoForm/modules/saga'
export {
  watchGetLogisticsAddressData,
  watchPostChooseReceiveAddressData,
  watchPostDeleteAddress,
  watchPutEditAddressData,
  watchAddOrganizationAddressData
} from 'routes/WarehouseAdmin/WarehouseGeneral/components/ChooseReceiveAddress/modules/saga'
export {
  watchGetPickingProductionData
} from 'components/PickingProductionList/modules/saga'
export {
  watchGetRegistrationCertificatenData
} from 'components/RegistrationCertificateDialog/modules/saga'
export {
  watchOperationReceiveData
} from 'components/OperationReceiveList/modules/saga'
export {
  watchOperationReceiveRecheckData
} from 'components/OperationReceiveRecheckList/modules/saga'
export {
  watchProductionDeliverList
} from 'components/ProductionDeliverList/modules/saga'
export {
  watchGetLogisticsDetailData
} from 'components/LogisticsDetailDialog/modules/saga'
export {
  watchGetStorageOutRecheckData
} from 'components/StorageOutRecheckList/modules/saga'
export {
  watchGetWarehouseOutDetailData
} from 'components/WarehouseOutDetailDialog/modules/saga'
export {
  watchGetWarehouseInDetailData
} from 'components/WarehouseInDetailDialog/modules/saga'
export {
  watchOPGetOrderDetailData
} from 'components/OperationPersonnelInfoForm/modules/saga'
export {
  watchGetLocationIdData,
  watchGetWarehouseDetailData,
  watchPutWarehouseDetailData,
  watchPostCreateNewWarehouse
} from 'components/EditWarehouseDialog/modules/saga'
export {
  watchGetLocationStorageDialogData,
  watchPutEditLocationStorageData,
  watchPostCreateNewLocationStorage
} from 'components/EditLocationStorageDialog/modules/saga'
export {
  watchGetReceiveProductionData
} from 'components/ReceiveProductionList/modules/saga'
export {
  watchGetUrgentDetailData
} from 'components/UrgentDetailTable/modules/saga'

export {
  watchGetBaddebtsDetailData,
} from 'components/BaddebtsDetailTable/modules/saga'

export {
  watchGetOrderBillingedDetailData,
  watchGetOrderUnbillingDetailData
} from 'components/BillingDetailTable/modules/saga'

export {
  watchGetOrderGatheringedDetailData,
  watchGetOrderUngatheringDetailData
} from 'components/GatheringDetailTable/modules/saga'

export {
  watchChartGetData,
} from '../routes/Demo/ChartDemo/modules/saga'

export {
  watchPageGridGetData
} from '../routes/Demo/PageGridDemo/modules/saga'

export {
  watchMultiTreeDemoGetData
} from '../routes/Demo/MultiTreeDemo/modules/saga'

export {
  watchGetAtSelectData
} from 'components/AtSelect/modules/saga'
export {
  watchGetLogisticsRData
} from 'components/LogisticsRecordDateGrid/modules/saga'
export {
  watchGetPickingRecordData
} from 'components/PickingRecordDateGrid/modules/saga'
export {
  watchGetOrderGoods
} from 'components/OrderGoodsDetailDateGrid/modules/saga'
export {
  watchGetGoodsSetData
} from 'components/OrderGoodsDetailSetDateGrid/modules/saga'
export {
  watchGetLOBData
} from 'components/LOBSelect/modules/saga'

export {
  watchGetBrandData
} from 'components/BrandSelect/modules/saga'

export {
  watchGetDlryOrdersGoodsData
} from 'components/DeliveryOrdersGoodsDetailDataGrid/modules/saga'

export {
  watchGetPutOrdersGoodsData
} from 'components/PutGoodsDetailDataGrid/modules/saga'

export {
  watchGetgetBillSmmryData
} from 'components/BillSummaryDataGrid/modules/saga'

export {
  watchGetToken
} from 'layouts/components/GlobalStore/modules/saga'

export {
  watchGetPersonalBasicInfoData, watchPutPersonalBasicInfoData, watchExit
} from 'components/PersonalBasicInformationDialog/modules/saga'

export {
  watchGetCreditQueryData
} from 'components/CreditQueryDataGrid/modules/saga'

export {
  watchGetTempCreditQueryData,
  watchDeleteTempCreditQueryData
} from 'components/TempCreditQueryDataGrid/modules/saga'

export {
  watchGetHistoryWarehousingData
} from 'components/HistoryWarehousingDataGrid/modules/saga'
export {
  watchGetOrderData
} from 'components/OrderSelect/modules/saga'

export {
  watchFetchEmployeeList,
  watchEditEmployeeInfo,
  watchAddEmployeeInfo,
  watchDeleteEmployeeInfo,
  watchEmployeeRoleEditInfo
} from 'routes/BusinessManagement/Employee/saga/Saga'

export {
  watchGetSingleWareHouseChildData,
  watchGetSingleLocationChildData,
  watchGetSingleLocationGoodsData
} from 'components/ChooseGoodsStoreDialog/modules/saga'

export { watchPostOutWarehouseCheck } from 'routes/WarehouseAdmin/OutWarehouseCheck/modules/saga'
// export { watchRoleOrderData } from 'routes/BusinessManagement/Role/saga/Saga'

export { watchGetPickProductionData } from 'components/PickProductionDialog/modules/saga'

export {
  watchGetCreditOrganizationToMeListData,
  watchGetCreditDetailData
} from 'routes/Credit/CreditGainTemp/modules/saga'

export {
  watchgetSelectProductionRecord
} from 'components/SelectProductionRecordTable/modules/saga'

export {
  watchPutBasicInfoData,
  watchGetCorporationBasicInfo,
  watchPutCorporationBasicInfo
} from 'routes/BusinessManagement/BasicInformation/saga/saga'

export { watchPostOrderCheckAgree, watchPostOrderCheckBack } from 'routes/WarehouseAdmin/OrderCheck/modules/saga'

export {
  watchGetDiscountDetailData
} from 'components/DiscountDetailTable/modules/saga'

export {
  watchGetCreditSeeData,
  watchGetCreditSeeDetailData,
  watchDeleteFixedCreditDetailData,
  watchCreateCreditData
} from 'routes/Credit/CreditHome/modules/creditSeeSaga'
export {
  watchPatchForbidAndUseWarehouse,
  watchGetSingleLocationWarehouseData
} from 'routes/WarehouseAdmin/WarehouseGeneral/modules/saga'

export {
  watchPostSingleNewContractData
} from 'routes/PartnersManagement/ContractAndAuthorization/modules/contractAddSaga'
export {
  watchBeiginInventoryRecords, watchCheckInventoryStatus
} from 'routes/WarehouseAdmin/WareHouseInventory/saga/beginInventoryRecordsSaga'

export {
  watchEndInventoryRecords
} from 'routes/WarehouseAdmin/WareHouseInventory/saga/endInventoryRecordsSaga'

export {
  watchGetInventoryRecords
} from 'routes/WarehouseAdmin/WareHouseInventory/saga/getInventoryRecordsSaga'

export {
  watchPrintInventoryRecords
} from 'routes/WarehouseAdmin/WareHouseInventory/saga/printInventoryRecordsSaga'

export {
  watchPostLogisticsDeliverySend
} from 'routes/WarehouseAdmin/LogisticsDelivery/modules/logisticsDeliveryDetailSaga'

export {
  watchGetWareHouseForNeedData,
  watchGetLocation,
  watchGetChildLocation,
  watchGetWarehouseData
} from 'components/DepotSelectDialog/modules/saga'

export {
  watchPostDispatchApply,
  watchGetDispatchApplyList,
  watchGetDispatchApplyDetail
} from 'routes/WarehouseAdmin/DispatchApply/modules/saga'

export {
  watchPostDispatchManage,
  watchGetDispatchManageList,
  watchPostDispatchManageVerify,
  watchGetDispatchManageOrderDetail
} from 'routes/WarehouseAdmin/DispatchManage/modules/saga'

export {
  watchGetCooperativePartnerData
} from 'components/CooperativePartnerDataGrid/modules/saga'

export {
  watchGetBarcodeOutData,
  watchGetBarcodeInData,
  watchGetTranGood
} from 'components/BarCodeTextField/modules/saga'
export {
  watchFetchSingleLogisticsDetail, watchFetchOrderLogisticsInfo, watchUpdateReceivingGoods
} from '../components/WarehousingForm/moudles/saga'

export {
  watchGetWarehouseInOutGoodsSummary
} from 'routes/WarehouseAdmin/StockOut/modules/distributionSummarySaga'

export {
  watchFetchSaleList,
  watchAgencyList,
  watchEditList,
  watchCreatList
} from 'routes/BusinessManagement/Sale/saga/saga'

export {
  watchCheckSingleProfitLossDetail, watchGetProfitLossList, watchCheckInProfitLoss, watchgetEndInventoryRecords
} from 'routes/WarehouseAdmin/ProfitLoss/saga/saga'

export {
  watchGetSelectAdvice,
  watchGetOtherStorage,
  watchcopySelectTableRow
} from 'routes/WarehouseAdmin/StockOut/modules/selectProductionSaga'

export {
  watchCreateOutStockData
} from 'routes/WarehouseAdmin/StockOut/modules/selectingGoodsSaga'

export {
  watchDOGetWarehouseInOutGoodsSummary
} from 'routes/WarehouseAdmin/DistributionOperation/modules/distributionSummarySaga'

export {
  watchDOcopySelectTableRow
} from 'routes/WarehouseAdmin/DistributionOperation/modules/selectProductionSaga'

export {
  watchDOCreateOutStockData
} from 'routes/WarehouseAdmin/DistributionOperation/modules/selectingGoodsSaga'

export {
  watchGetCurrentContractAuthorizedQueryData
} from 'components/AuthorizationDetailsDataGrid/modules/saga'

export {
  watchGetAllContractAuthorizedQueryData
} from 'components/AuthorizationAllContractDetailsDataGrid/modules/saga'
export {
  watchGetRecevingListData
} from '../routes/WarehouseAdmin/ReceivingWarehousing/modules/saga'

export {
  watchFetchFirstClassSelection,
  watchFetchSecondClassSelection,
  watchFetchThirdClassSelection,
  watchFetchAuthorizationSelectionGoods,
  watchSearchAuthorizedGoods
} from 'components/ChooseGoodsAuthDialog/saga/saga'

export {
  watchThreeCategoryFetchFirstClassSelection,
  watchThreeCategoryFetchSecondClassSelection,
  watchThreeCategoryFetchThirdClassSelection
} from 'components/ThreeCategorySelector/modules/saga';

export {
  watchCreateOrg, watchgetRelatedOrg, watchgetOrgCertificate, watchgetEnterpriseInfor
} from 'routes/PartnersManagement/FirstBusinessRegistration/saga/saga'

export { watchGetCurrencySelectDate } from 'components/CurrencySelect/modules/saga'

export { watchRoleActions } from 'components/MultiTree/RoleTree/modules/saga'

export { watchAuthorityActions } from 'components/MultiTree/AuthorityTree/modules/saga'

export {
  watchSurgeryRecoveryGoodsSummary, watchSubmitSurgeryRecoveryData
} from 'routes/WarehouseAdmin/SurgeryRecovery/saga/surgeryRecoveryGoodsSummarySaga'

export {
  watchRoleList,
  watchRoleDataList,
  watchCreatRoleList,
  watchAuthorizationSet,
  watchEditRoleList,
  watchEditRoleName
} from '../routes/BusinessManagement/Role/saga/Saga'
export {
  watchHistoryRecoveryRecords
} from 'routes/WarehouseAdmin/SurgeryRecovery/saga/historyRecoveryRecordsSaga'
export {
  watchGetMakePriceGoodsQueryData,
  watchPutMakePriceGoodsDataGridQueryData
} from 'components/MakePriceGoodsDataGrid/modules/saga'
export {
  watchFetchSurgeryOrderReturnList,
  watchFetchSurgeryRecheckOrderDetail,
  watchUpdateReturnOrderRecheck,
  watchUpdateSurgeryReturnReceivingRecheck,
  watchFetchSingleReceivingOrderDetail,
  watchFetchSurgeryLogisticsOrderDetailList,
} from 'routes/WarehouseAdmin/SurgeryRecoveryRecheck/saga/saga'
export {
  watchPutMakePriceAddSingleGoodsQueryData
} from 'components/MakePriceAddSingleGoodsDialog/modules/saga'
export {
  watchgetMakePriceSingleGoodsDialogQueryData,
  watchdeleteMakePriceSingleGoodsDialogQueryData,
  watchgetMakePriceSingleGoodsLineChartQueryData
} from 'components/MakePriceSingleGoodsDialog/modules/saga'
export {
  watchInventorySee,
} from 'routes/WarehouseAdmin/InventorySee/saga/saga'
export {
  watchLocation, watchGetCityOrAreaData, watchGetAllLocation
} from 'components/Location/modules/saga'

export { watchGetDistribution, watchGetProductionList, watchPostSurgeryOrder, watchGetSaleListAPI, watchGetDoctorList, watchGetAuthorizeOrganization, watchGetAuthorizeTypes, watchGetOperateName, watchGetAuthorizeTemplets, watchGetOperatePart, watchGetOperateIntoRoad, watchGetReceiveAddress } from 'routes/WarehouseAdmin/SurgeryOrder/modules/saga'

export { watchPostStockOrder, watchStockOrderGetReceiveAddress, watchStockOrderGetAuthorizeOrganization } from 'routes/WarehouseAdmin/StockOrder/modules/saga'

export { watchConsignmentOrderGetAuthorizeOrganization, watchConsignmentOrderGetReceiveAddress, watchConsignmentOrderPostStockOrder, watchConsignmentOrderGetProductionList } from 'routes/OrderManagement/ConsignmentOrder/modules/saga'

export { watchProcurementReviewPostReview, watchProcurementReviewReviewListData } from 'routes/WarehouseAdmin/ProcurementReview/modules/saga'
export { watchgetFilterOrderListData } from 'routes/WarehouseAdmin/OrderTrack/module/saga'

export {
  watchGetPersonalizedTemplateData,
  watchDeleteSingleTemplateData,
  watchGetSingleTemplateGoodsData
} from 'routes/PersonalPanel/PersonalizedTemplate/modules/saga'

export {
  watchDOGetSingleWareHouseOutDetail,
  watchDOGetSingleWareHouseOutProductionDetail
} from 'components/OutBoundDetail/modules/saga'

export {
  watchUploadBilling, watchGetBillingData, watchDeleteFP
} from 'components/BillingUpload/modules/saga'

export {
  watchGetDepositImprestData
} from 'components/DepositImprestDataGrid/modules/saga'

export {
  watchGetDepositImprestDetailsData
} from '../components/DepositImprestDetailsDataGrid/modules/saga'
// export {
//   watchGetOrderGoodsDetailAndBills
// } from 'routes/Demo/DetectionBills/modules/saga'
export {
  watchGetDepositImprestPartnerData,
  watchPostDepositImprestData
} from 'components/DepositImprestRegisterDialog/modules/saga'

export {
  watchGetFinancialListData
} from 'components/FinancialDataGrid/modules/saga'

export {
  watchGetOrderCheckDetail
} from 'components/FinancialBillingDetail/modules/saga'

export {
  watchGetFinancialOrderGoodsData
} from 'components/FinancialOrderGoodsDetailsDateGrid/modules/saga'

export {
  watchGetFinancialBillSmmryData
} from 'components/FinancialBillSummaryDataGrid/modules/saga'

export { watchUserLogin, watchSendMess, watchResetPW } from 'layouts/components/Login/modules/saga'

export {
  watchPostFinancialExpressOrLogisticsData
} from 'components/FinancialSubmitDialog/modules/saga'

export {
  watchPostFinancialVerificationData
} from 'routes/FinancialAdmin/Verification/modules/saga'

export {
  watchGetOrderGoodsDetailAndBills, watchOrderlistForDetection, watchGetRelatedOrgNoPage
} from '../routes/DetectionBills/modules/saga'

export {
  watchGetWarehouseOutStockGoodsData
} from 'components/WarehouseOutStockGoodsDialog/modules/saga'

export {
  watchPostBillingBatchSubmitData
} from '../routes/FinancialAdmin/Billing/modules/billingBatchSubmitSaga'

export {
  watchPostGatheringSubmitData,
  watchGetGatheringOneDepositData,
  watchGetGatheringBatchSalesOrderData
} from '../routes/FinancialAdmin/Gathering/modules/gatheringSubmitSaga'
export {
  watchGetAllMenuBar, watchGetUserMenuBar
} from '../layouts/components/MenuBar/modules/saga'

export {
  watchGetPushServiceSettingsData,
  watchUpdatePushServiceSettingsData
} from 'routes/PushServiceSettings/modules/saga'

export {
  watchDOGetOtherStorage
} from 'routes/WarehouseAdmin/DistributionOperation/modules/selectOtherDialogSaga'

export {
  watchDOSetTemporaryStorage
} from 'routes/WarehouseAdmin/DistributionOperation/modules/temporaryStorageSaga'

export {
  watchGetDistriButionOrganization,
  watchGetDistriButionAddress,
  watchgetSearchContracts,
  watchPostDisorderData,
  watchgetAuthorizationsContracts
} from 'routes/OrderManagement/DistributionOrder/modules/saga'

export {
  watchGetGoodsTransferListDataData,
  watchGetGoodsTransferOperatingData,
  watchGetGoodsTransferLocationGoodsData,
  watchPostProductionTran,
  watchGetGoodsTransferSearchData
} from '../routes/WarehouseAdmin/GoodsTransfer/modules/saga'

export {
  watchGetPrematchingStorage,
} from 'routes/WarehouseAdmin/DistributionOperation/modules/preMatchingDialogSaga'

export {
  watchDOGetTemporaryData,
  watchDOGetSelectAdvice,
} from 'routes/WarehouseAdmin/DistributionOperation/modules/selectMethodFlowSaga'
