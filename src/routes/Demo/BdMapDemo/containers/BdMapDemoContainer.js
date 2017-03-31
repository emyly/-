import {
	connect,
} from 'react-redux';
import {
  fetchRemoteData,
} from '../modules/BdMapDemoModule';
import BdMapDemo from '../components/BdMapDemo';

const mapDispatchToProps = {
  getData: () => fetchRemoteData(),
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(BdMapDemo);
