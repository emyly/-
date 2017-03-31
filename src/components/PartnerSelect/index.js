import {
  connect
} from 'react-redux'
import {
  getPartnerData,
} from './modules/partnerSelect'
import PartnerSelect from './PartnerSelect'

// 绑定action
const mapDispatchToProps = {
  getPartnerData: (id, type) => getPartnerData(id, type)
};

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  partnerSelect: state.partnerSelect
});
export default connect(mapStateToProps, mapDispatchToProps)(PartnerSelect)

