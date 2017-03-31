
import Discount from './components/Discount'
import DiscountList from './components/DiscountList'
import NotDiscountDetail from './components/NotDiscountDetail'
import DiscountAbleDetail from './components/DiscountAbleDetail'
import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'discount',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Discount);
    }, 'Discount')
  },
  indexRoute: { component: DiscountList },
  childRoutes: [
    {
      path: 'discountAble/:id',
      component: DiscountAbleDetail
    },
    {
      path: 'notDiscount/:id',
      component: NotDiscountDetail
    },
  ]
});
