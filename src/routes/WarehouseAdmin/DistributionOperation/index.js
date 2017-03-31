import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import DistributionOperation from './components/DistributionOperation';
import DOSummary from './components/DOSummary';
import StockOutDetailBeforeSelect from './containers/StockOutDetailBeforeSelectContainer';
import SelectingGoods from './containers/SelectingGoodsContainer';
import StockOutDetailAfterSelect from './components/StockOutDetailAfterSelect';
import HistoryOutBoundDetail from './components/HistoryOutBoundDetail';
import CurrentOutBoundDetail from './components/CurrentOutBoundDetail';
import SelectPrintRouter from './components/SelectPrintRouter';


export default store => ({
  path: 'distributionOperation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const distributionSummary = require('./modules/distributionSummary').default;
      const selectProduction = require('./modules/selectProduction').default;
      const stockOutDetailBefore = require('./modules/stockOutDetailBeforeSelect').default;
      const selectingGoods = require('./modules/selectingGoods').default;
      const selectOtherDialog = require('./modules/selectOtherDialog').default;
      const temporaryStorage = require('./modules/temporaryStorage').default;
      const preMatchingDialog = require('./modules/preMatchingDialog').default;
      const selectMethodFlow = require('./modules/selectMethodFlow').default;

      injectReducer(store, {
        key: 'distributionOperation',
        reducer: combineReducers({
          distributionSummary,
          selectProduction,
          selectingGoods,
          stockOutDetailBefore,
          selectOtherDialog,
          temporaryStorage,
          selectMethodFlow,
          preMatchingDialog,
        })
      });
      cb(null, DistributionOperation);
    }, 'DistributionOperation')
  },
  indexRoute: { component: DOSummary },
  childRoutes: [
    {
      path: 'DODetailBeforeSelect/:id',
      component: StockOutDetailBeforeSelect
    },
    {
      path: 'selectingGoods/:id',
      component: SelectingGoods
    },
    {
      path: 'DODetailAfterSelect',
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

