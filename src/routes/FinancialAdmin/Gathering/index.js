
import Gathering from './components/Gathering'
import GatheringList from './components/GatheringList'
import NotGatheringDetail from './components/NotGatheringDetail'
import GatheringAbleDetail from './components/GatheringAbleDetail'
import GatheringBatchSubmitContainer from './containers/GatheringBatchSubmitContainer'
import GatheringSubmitContainer from './containers/GatheringSubmitContainer'
import gatheringSubmit from './modules/gatheringSubmit';
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'gathering',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {
        key: 'gathering',
        reducer: combineReducers({
          gatheringSubmit
        })
      });
      cb(null, Gathering);
    }, 'Gathering')
  },
  indexRoute: { component: GatheringList },
  childRoutes: [
    {
      path: 'gatheringAble/:id',
      component: GatheringAbleDetail
    },
    {
      path: 'notGathering/:id',
      component: NotGatheringDetail
    },
    {
      path: 'batchSubmit',
      component: GatheringBatchSubmitContainer
    },
    {
      path: 'submit',
      component: GatheringSubmitContainer
    },
  ]
});
