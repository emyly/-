
import {
  connect
} from 'react-redux'
import {
  getWarehouseForNeedData,
  getLocation,
  getChildLocation,
  getWarehouseData,
  getLocationForNeedData,
  initIsTopWarehouseStatus
} from './modules/depotSelectDialog'
import DepotSelectDialog from './DepotSelectDialog'

const mapDispatchToProps = {
  getWarehouseForNeedData: (id, crkid) => getWarehouseForNeedData(id, crkid),
  getLocation: id => getLocation(id),
  getChildLocation: id => getChildLocation(id),
  getWarehouseData: id => getWarehouseData(id),
  getLocationForNeedData,
  initIsTopWarehouseStatus
};

const mapStateToProps = state => ({
  depotSelectDialog: state.depotSelectDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(DepotSelectDialog)
