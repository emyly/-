/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './PartnerSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * 使用场景：选择合作伙伴
 */
export default class PartnerSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  static defaultProps = {
    partnerType: 'all',
  };

  static propTypes = {
    // 合作伙伴类型
    partnerType: PropTypes.oneOf(['J', 'Y', 'all']),
    // 当前经销商Id
    distributorId: PropTypes.number.isRequired,
    // 父组件回调获取子组件值
    callback: PropTypes.func,
    style: PropTypes.object,
  };

  // 首次加载组件之前
  componentWillMount() {
    this.props.getPartnerData(this.props.distributorId, this.props.partnerType)
  }

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    if (nextProps.distributorId !== this.props.distributorId || nextProps.partnerType !== this.props.partnerType) {
      this.props.getPartnerData(nextProps.distributorId, nextProps.partnerType)
    }
  }

  handleChange = (event, index, value) => {
    this.props.callback(value);
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <SelectField value={this.state.value} hintText='选择合作伙伴' onChange={this.handleChange} maxHeight={200} style={this.props.style}>
          {this.props.partnerSelect.partnerData.map(info => <MenuItem value={info} key={info.GUID} primaryText={info.JGMC} />)}
        </SelectField>
      </div>
    )
  }
}
