/**
 * Created by sjf on 2016/11/16.
 */
import { connect } from 'react-redux'

/* Dispatch function */
import { fecthSalelist } from '../modules/Sale';
import { AgencyList } from '../modules/Agency'
import { CreatList, CreatListChangeIsFetching } from '../modules/Creat'
import { EditList, EditListChangeIsFetching } from '../modules/Edit'
// import { createSale } from '../modules/CreateEmployee'
// import { deleteEmployeeRemote } from '../modules/DeleateEmployee'

/*
 *  container component: only responsible for wiring in the actions
 *  ant state necessary to render a presentaional component
 */
import Sale from 'components/Sale'

const mapDispatchToProps = {
  fecthSalelist,
  AgencyList,
  CreatList,
  EditList,
  EditListChangeIsFetching,
  CreatListChangeIsFetching
  // createEmployeeRemote,
  // editEmployeeInfo,
  // deleteEmployeeRemote
};
/* NOTE: reducer's hiearchy */
const mapStateToProps = state => ({
  saleList: state.sale.fecthSalelist.saleList,
  totalCount: state.sale.fecthSalelist.totalCount,
  currentPage: state.sale.fecthSalelist.currentPage,
  agencyList: state.sale.agencyList.agencyList,
  creatListData: state.sale.creatList.creatListData,
  editListData: state.sale.editList.editListData,
  editIsFetching: state.sale.editList.isSave,
  createIsFetching: state.sale.creatList.isFetching,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(Sale)
