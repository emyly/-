import {
	connect,
} from 'react-redux';
import {
  fetchRemoteData,
} from '../modules/MultiTreeDemoModule';
import MultiTreeDemo from '../components/MultiTreeDemo';

const mapDispatchToProps = {
  getData: () => fetchRemoteData(),
};

const mapStateToProps = state => ({
  mtree: state.mtree,
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiTreeDemo);
