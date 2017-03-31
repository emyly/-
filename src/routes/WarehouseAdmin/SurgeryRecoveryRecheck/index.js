/**
 * Created by sjf on 2016/11/7.
 */
import SurgeryRecoveryRecheck from './components/SurgeryRecoveryRecheck';
import SurgeryRecoveryRecheckDetail from './components/SurgeryRecoveryRecheckDetail';
import SurgeryRecoveryRecheckSummary from './components/SurgeryRecoveryRecheckSummary';
import WarehousingGuide from './components/WarehousingGuide'

export default {
  path: 'surgeryRecoveryRecheck',
  component: SurgeryRecoveryRecheck,
  indexRoute: { component: SurgeryRecoveryRecheckSummary },
  childRoutes: [
    {
      path: ':id/WarehousingGuide',
      component: WarehousingGuide
    },
    {
      path: ':id/:orderState',
      component: SurgeryRecoveryRecheckDetail
    }
  ]
}
