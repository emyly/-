import {
	connect,
} from 'react-redux';
import {
  loadUserList,
} from '../modules/MyPageGrid';
import PageGridDemo from '../components/PageGridDemo';

const mapDispatchToProps = {
  getPageData: (page = 1) => loadUserList(page),
};

const mapStateToProps = state => ({
  pgd: state.pgd,
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGridDemo);
