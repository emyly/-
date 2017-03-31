/**
 * Created by NXQ on 12/14/2016.
 */
import PersonalizedTemplateContainer from './containers/PersonalizedTemplateContainer';
import PersonalTemplateRouter from './components/PersonalTemplateRouter';
import PersonalizedTemplateDetailContainer from './containers/PersonalizedTemplateDetailContainer';
import { injectReducer } from 'store/reducers';
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'personalizedTemplate',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const personalizedTemplate = require('./modules/personalizedTemplate').default;
      const personalizedTemplateDetail = require('./modules/personalizedTemplateDetail').default;

      injectReducer(store, {
        key: 'template',
        reducer: combineReducers({
          personalizedTemplate,
          personalizedTemplateDetail
        })
      });
      cb(null, PersonalTemplateRouter);
    }, 'PersonalizedTemplate')
  },
  indexRoute: { component: PersonalizedTemplateContainer },
  childRoutes: [
    {
      path: ':id',
      component: PersonalizedTemplateDetailContainer
    }
  ]
})

