/**
 * Created by 123 on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './ContractTypeChooseDialog.scss';

import Dialog from 'components/StandardUI/StandardDialog';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
/**
 * 使用场景：选择合同类型Dialog
 */
export default class ContractTypeChooseDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      ContractData: this.props.ContractData,
      SelectTypeValue: 0,
      ContractType: [
        '手术', '备货'
      ]
    }
  }

  static propTypes = {
    /**
     * 当前Dailog开关状态
     */
    open: PropTypes.bool.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 切换当前Dailog开关状态
   */
  handleTouchTapDialogOpen = () => {
    if (!this.state.open) {
      this.setState({
        ContractData: {},
        SelectTypeValue: 0
      });
    }
    this.props.handleTouchContractTypeChooseDialogOpen();
    this.setState({ open: !this.state.open });
  };
  /**
   * 开始签约
   */
  handleTouchTapStartSign = () => {
    this.setState({ open: !this.state.open });
    this.context.router.push({ pathname: '/contractAndAuthorization/contractAdd', state: { ...this.state.ContractData, type: this.state.SelectTypeValue } });
  };

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      open: nextProps.open,
      ContractData: nextProps.ContractData
    });
    if (nextProps.open === false) {
      this.setState({
        ContractData: {},
        SelectTypeValue: 0
      });
    }
  };
  /**
   * 合同类型选择
   */
  handleChangeSelectType = (event, index, value) => {
    this.setState({ SelectTypeValue: value });
  };
  render() {
    const actions = [
      <FlatButton
        label='取消'
        style={{ marginRight: 10, color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        primary
        onTouchTap={this.handleTouchTapDialogOpen}
      />,
      <FlatButton
        label='开始签约'
        primary
        style={{ marginRight: 10, color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        onTouchTap={this.handleTouchTapStartSign}
      />
    ];
    return (
      <div className='contract-type-choose-dialog'>
        <Dialog
          title='请选择合同类型'
          actions={actions}
          modal
          open={this.state.open}
        >
          <div className='contractRadioButton' style={{ marginTop: 30 }}>
            <RadioButtonGroup style={{ width: '100%' }} name='SelectTypeValue' defaultSelected={this.state.SelectTypeValue} onChange={this.handleChangeSelectType}>
              {
              this.state.ContractType.map((value, index) => (
                <RadioButton
                  key={index}
                  value={index}
                  uncheckedIcon={{ border: 'none' }}
                  style={{ float: 'left', display: 'inline-block', width: '30%' }}
                  label={value}
                  labelStyle={{ width: 120, textAlgin: 'center', fontFamily: 'PingFangSC-Regular', fontSize: 16, color: '#4A4A4', lineHeight: '24px' }}
                />
              ))
            }
            </RadioButtonGroup>
            {/* <SelectField
             value={this.state.SelectTypeValue}
             hintText='合同类型选择'
             onChange={this.handleChangeSelectType}
             maxHeight={200}
             >
             {
             this.state.ContractType.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
             }
             </SelectField>*/}
          </div>
        </Dialog>
      </div>
    )
  }
}

