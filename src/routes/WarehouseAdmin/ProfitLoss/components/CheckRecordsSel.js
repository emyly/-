/**
 * Created by liuyali on 2017/3/15.
 */
import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CheckRecordsSel extends Component {

  state = {
    value: null,
  };
  static propTypes = {
    checkRecords: React.PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired,
    text: PropTypes.string,
  }
  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.callback(value, this.props.checkRecords[index].PDCK, this.props.checkRecords[index].PDCKMC);
  }

  render() {
    return (
      <div className='selectInvt'>
        <div style={{ lineHeight: '2rem' }} className='CardSelecttext'>
          {this.props.text}：
        </div>
        <div style={{ width: '80%' }}>
          <SelectField
            labelStyle={{ lineHeight: '30px' }}
            maxHeight={200}
            menuStyle={{ overflow: 'hidden' }}
            style={{ marginRight: 15, height: 40, width: 'inherit' }}
            hintText='' floatingLabelText='' value={this.state.value} onChange={this.handleChange}
          >
            { this.props.checkRecords.map((op, index) => <MenuItem value={op.GUID} key={index} primaryText={op.PDMC} />)}
          </SelectField>
        </div>
      </div>
    )
  }
}
