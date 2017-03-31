// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import WelcomeHome from './WelcomePage'
import ContractAndAuthorization from './PartnersManagement/ContractAndAuthorization';
import FirstBusinessRegistration from './PartnersManagement/FirstBusinessRegistration';
import CreditHome from './Credit/CreditHome';
import CreditGainTemp from './Credit/CreditGainTemp';
import Employee from './BusinessManagement/Employee';
import Role from './BusinessManagement/Role';
import OrderCheck from './WarehouseAdmin/OrderCheck';
import StockOut from './WarehouseAdmin/StockOut';
import DistributionOperation from './WarehouseAdmin/DistributionOperation';
import ReceivingWarehousing from './WarehouseAdmin/ReceivingWarehousing';
import OutWarehouseCheck from './WarehouseAdmin/OutWarehouseCheck';
import LogisticsDelivery from './WarehouseAdmin/LogisticsDelivery';
import WareHouseInventory from './WarehouseAdmin/WareHouseInventory';
import ProfitLoss from './WarehouseAdmin/ProfitLoss';
import IndividualizationBill from './WarehouseAdmin/IndividualizationBill';
import Sale from './BusinessManagement/Sale';
import BasicInformation from './BusinessManagement/BasicInformation'
import SurgeryRecovery from './WarehouseAdmin/SurgeryRecovery';
import DispatchApply from './WarehouseAdmin/DispatchApply';
import DispatchManage from './WarehouseAdmin/DispatchManage';
import SurgeryRecoveryRecheck from './WarehouseAdmin/SurgeryRecoveryRecheck'
import WarehouseGeneral from './WarehouseAdmin/WarehouseGeneral'
import inventorySee from './WarehouseAdmin/InventorySee'
import ProcurementReview from './WarehouseAdmin/ProcurementReview'
import PersonalizedTemplate from './PersonalPanel/PersonalizedTemplate'
import OrderTrack from './WarehouseAdmin/OrderTrack'
import Baddebts from './FinancialAdmin/Baddebts'
import Billing from './FinancialAdmin/Billing'
import Deposit from './FinancialAdmin/Deposit'
import Discount from './FinancialAdmin/Discount'
import Gathering from './FinancialAdmin/Gathering'
import Imprest from './FinancialAdmin/Imprest'
import Logistics from './FinancialAdmin/Logistics'
import Urgent from './FinancialAdmin/Urgent'
import Verification from './FinancialAdmin/Verification'
import PushServiceSettings from './PushServiceSettings'
import DistributionOrder from './OrderManagement/DistributionOrder'
import GoodsTransfer from './WarehouseAdmin/GoodsTransfer';

/**
 * demos
 */
import ChartDemo from './Demo/ChartDemo';
import BdMapDemo from './Demo/BdMapDemo';
import DataGridDemo from './Demo/DataGridDemo';
import PageGridDemo from './Demo/PageGridDemo';
import ComponentsDemo from './Demo/ComponentsDemo';
import ChildRoutesDemo from './Demo/ChildRoutesDemo';
import DialogComponentsDemo from './Demo/DialogComponentsDemo';
import DataGridComponentsDemo from './Demo/DataGridComponentsDemo';
import DepotSelectDialogDemo from './Demo/DepotSelectDialogDemo';
import TableOrderDetailDemo from './Demo/TableOrderDetailDemo';
import OrderDetailFormDemo from './Demo/OrderDetailFormDemo';
import ReduxDemo from './Demo/ReduxDemo';
import MultiTreeDemo from './Demo/MultiTreeDemo';
import TableGridUIDemo from './Demo/TableGridUIDemo';
import FormUIDemo from './Demo/FormUIDemo';
import WarehousingFormDemo from './Demo/WarehousingFormDemo'
import SurgeryOrder from './WarehouseAdmin/SurgeryOrder'
import StockOrder from './WarehouseAdmin/StockOrder'
import ConsignmentOrder from './OrderManagement/ConsignmentOrder'
import CardUIDemo from './Demo/CardUIDemo'
import NotificationDemo from './Demo/Notification/notificationDemo'
import ValidationDemo from './Demo/ValidationDemo'
import BillingUpload from './Demo/BillingUpload'
import DetectionBills from './Demo/DetectionBills'
import OrderlistForDetection from './DetectionBills'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: WelcomeHome,
  childRoutes: [
    OrderlistForDetection(store),
    DetectionBills(store),
    BillingUpload(store),
    OrderTrack(store),
    inventorySee(store),
    ContractAndAuthorization(store),
    FirstBusinessRegistration(store),
    CreditHome(store),
    CreditGainTemp(store),
    Employee(store),
    Role(store),
    OrderCheck(store),
    StockOut(store),
    BasicInformation(store),
    DistributionOperation(store),
    ReceivingWarehousing(store),
    OutWarehouseCheck,
    LogisticsDelivery,
    WareHouseInventory(store),
    OutWarehouseCheck(store),
    LogisticsDelivery(store),
    WareHouseInventory,
    ProfitLoss(store),
    IndividualizationBill,
    DispatchApply(store),
    DispatchManage(store),
    Sale(store),
    SurgeryRecovery(store),
    SurgeryRecoveryRecheck,
    WarehouseGeneral(store),
    SurgeryOrder(store),
    StockOrder(store),
    ConsignmentOrder(store),
    ProcurementReview(store),
    PersonalizedTemplate(store),
    Baddebts(store),
    Billing(store),
    Deposit(store),
    Discount(store),
    Gathering(store),
    Imprest(store),
    Logistics(store),
    Urgent(store),
    Verification(store),
    PushServiceSettings(store),
    DistributionOrder(store),
    GoodsTransfer(store),
    /**
     * demos
     */
    ChartDemo(store),
    BdMapDemo(store),
    DataGridDemo,
    PageGridDemo(store),
    ComponentsDemo,
    DialogComponentsDemo,
    DataGridComponentsDemo,
    DepotSelectDialogDemo,
    TableOrderDetailDemo,
    OrderDetailFormDemo,
    ChildRoutesDemo,
    MultiTreeDemo(store),
    TableGridUIDemo,
    FormUIDemo,
    ReduxDemo,
    WarehousingFormDemo,
    WarehousingFormDemo,
    CardUIDemo,
    NotificationDemo,
    ValidationDemo(store)
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
