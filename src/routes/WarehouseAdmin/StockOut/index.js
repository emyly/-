import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import StockOut from './components/StockOut';
import StockOutSummary from './components/StockOutSummary';
import StockOutDetailBeforeSelect from './containers/StockOutDetailBeforeSelectContainer';
import SelectingGoods from './containers/SelectingGoodsContainer';
import StockOutDetailAfterSelect from './components/StockOutDetailAfterSelect';
import HistoryOutBoundDetail from './components/HistoryOutBoundDetail';
import CurrentOutBoundDetail from './components/CurrentOutBoundDetail';
import SelectPrintRouter from './components/SelectPrintRouter';

// Sync route definition
export default store => ({
  path: 'stockOut',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const distributionSummary = require('./modules/distributionSummary').default;
			// const outBoundDetail = require('./modules/outBoundDetail').default;
      const selectProduction = require('./modules/selectProduction').default;
      const stockOutDetailBefore = require('./modules/stockOutDetailBeforeSelect').default;
      const selectingGoods = require('./modules/selectingGoods').default;
			// const outBoundDetail = require('./modules/outBoundDetail').default;
			// const stockOutDetail = require('./modules/stockOutDetail').default;
      injectReducer(store, {
        key: 'stockOut',
        reducer: combineReducers({
          distributionSummary,
					// outBoundDetail,
          selectProduction,
          selectingGoods,
          stockOutDetailBefore,
					// outBoundDetail
					// stockOutDetail
        })
      });
      cb(null, StockOut);
    }, 'StockOut')
  },
  indexRoute: { component: StockOutSummary },
  childRoutes: [
    {
      path: 'stockOutDetailBeforeSelect/:id',
      component: StockOutDetailBeforeSelect
    },
    {
      path: 'selectingGoods/:id',
      component: SelectingGoods
    },
    {
      path: 'stockOutDetailAfterSelect',
      component: StockOutDetailAfterSelect
    },
    {
      path: 'historyOutBoundDetail',
      component: HistoryOutBoundDetail
    },
    {
      path: 'currentOutBoundDetail',
      component: CurrentOutBoundDetail
    },
    {
      path: 'SelectPrintRouter/:id',
      component: SelectPrintRouter
    }
  ]
});

