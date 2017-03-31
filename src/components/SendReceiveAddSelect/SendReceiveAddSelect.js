/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './SendReceiveAddSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const items = [];

for (let i = 0; i < 15; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`地址 ${i}`} />);
}

/**
 * 使用场景：选择收货发货地址
 */
export default class SendReceiveAddSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendValue: null,
      receiveValue: null,
      addressArray: []
    };
  }

  static propTypes = {
    // 当前组织机构ID
    organizationId: PropTypes.number.isRequired,
    // 仓库ID
    warehouseId: PropTypes.number.isRequired,
    // 查发货传["0"], 查收货传["1"]，都查传["0","1"]
    sendReceiveType: PropTypes.array.isRequired
  }


  receiveHandleChange = (event, index, value) => {
    this.setState({
      receiveValue: value
    });
  };

  sendHandleChange = (event, index, value) => {
    this.setState({
      sendValue: value
    });
  };
  // 900000000207
  componentWillMount() {
    this.props.getSendReceiveAddData(this.props.organizationId, this.props.sendReceiveType)
  }
  componentWillReceiveProps(nextValue) {
    this.setState({ addressArray: nextValue.sendReceiveAddSelect.sendReceiveAddData });
  }
  render() {
    return (
      <div>
        <div>
          <SelectField hintText='选择发货地址' value={this.state.sendValue} onChange={this.sendHandleChange} maxHeight={200}>
            {
              this.state.addressArray.map((value, index) => (<MenuItem value={index} key={index} primaryText={value.DZ} />))
            }
          </SelectField>
        </div>
        <div>
          <SelectField hintText='选择收货地址' value={this.state.receiveValue} onChange={this.receiveHandleChange} maxHeight={200}>
            {
              this.state.addressArray.map((value1, index) => (<MenuItem value={index} key={index} primaryText={value1.DZ} />))
            }
          </SelectField>
        </div>
      </div>
    )
  }
}
