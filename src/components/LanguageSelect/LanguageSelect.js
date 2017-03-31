/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './LanguageSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const items = [];

for (let i = 0; i < 15; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`语言 ${i}`} />);
}

/**
 * 使用场景：选择语言
 */
export default class LanguageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  static propTypes = {
    style: PropTypes.object,
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <SelectField value={this.state.value} hintText='选择语言' onChange={this.handleChange} maxHeight={200} style={this.props.style}>
          {items}
        </SelectField>
      </div>
    )
  }
}
