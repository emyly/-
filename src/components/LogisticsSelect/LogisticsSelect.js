/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './LogisticsSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const items = [];

for (let i = 0; i < 15; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`物流公司 ${i}`} />);
}

/**
 * 使用场景：选择物流公司
 */
export default class LogisticsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.callBack(value)
  };
  componentWillMount() {
    this.props.getLogisticsCompanyData()
  }
  static propTypes = {
    callBack: PropTypes.func.isRequired,
    getLogisticsCompanyData: PropTypes.func.isRequired,
    MenuItemStyle: PropTypes.object,
    SelectFieldStyle: PropTypes.object,
    logisticSelect: PropTypes.object,
  }
  render() {
    return (
      <div>
        <SelectField value={this.state.value} hintText='选择物流公司' className='AtTextFieldStyle' onChange={this.handleChange} maxHeight={200} style={this.props.SelectFieldStyle}>
          {
            this.props.logisticSelect.logisticsData.map((value, index) => (
              <MenuItem value={value} key={index} primaryText={`物流公司: ${value.GSMC}`} style={this.props.MenuItemStyle} />
              ))
          }
        </SelectField>
      </div>
    )
  }
}
