
/**
 * Created by NXQ on 12/14/2016.
 */

import { connect } from 'react-redux';

import {
  getPersonalizedSingleTemplateGoodsData
} from '../modules/personalizedTemplateDetail';

import PersonalizedTemplateDetail from '../components/PersonalizedTemplateDetail';

const mapDispatchToProps = {
  getPersonalizedSingleTemplateGoodsData
};

const mapStateToProps = state => ({
  personalizedTemplateDetail: state.template.personalizedTemplateDetail,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalizedTemplateDetail)

