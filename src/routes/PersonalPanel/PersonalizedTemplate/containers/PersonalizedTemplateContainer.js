/**
 * Created by NXQ on 12/14/2016.
 */

import { connect } from 'react-redux';

import {
  getPersonalizedTemplateData,
  deletePersonalizedSingleTemplateData
} from '../modules/personalizedTemplate';

import PersonalizedTemplate from '../components/PersonalizedTemplate';

const mapDispatchToProps = {
  getPersonalizedTemplateData,
  deletePersonalizedSingleTemplateData
};

const mapStateToProps = state => ({
  personalizedTemplate: state.template.personalizedTemplate,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalizedTemplate)

