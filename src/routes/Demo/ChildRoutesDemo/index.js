/**
 * Created by NXQ on 2016/10/20.
 */
import ChildRoutesLayoutDemo from './components/ChildRoutesLayoutDemo';
import OrderDetail from './components/OrderDetail';
import OrderListDemo from './components/OrderListDemo';

/**
 * 使用场景：当出现'内容层'还要继续分层childRoutes的Demo
 */
// Sync route definition
export default {
  path: 'childRoutesDemo',
  component: ChildRoutesLayoutDemo,
  indexRoute: { component: OrderListDemo },
  childRoutes: [
    {
      path: 'orderdetail/:id',
      component: OrderDetail

    }
  ]
}
