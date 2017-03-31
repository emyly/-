/**
 * Created by sjf on 2016/11/1.
 */
import React, { Component, PropTypes } from 'react';
import SaleInfoDialog from './SaleInfoDialog';
import RaisedButton from 'material-ui/RaisedButton';
/**
 * 销售人员编辑按钮弹窗
 * */
export default class EditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sale_dialog_open: false,
      tabValue: this.props.tabValue,
      labelValue: '',
      agencyList: [],

    };
  }
  handleEditEmployeeDialogToggle = () => {
    this.props.AgencyList(this.props.organizationId, '');
    this.setState({ sale_dialog_open: !this.state.sale_dialog_open });
  };
  static propTypes = {
    AgencyList: PropTypes.func,
    CreatList: PropTypes.func,
    EditList: PropTypes.func,
    organizationId: PropTypes.number,
    saleId: PropTypes.number,
    hospital: PropTypes.array,
    name: PropTypes.string,
    requredStatus: PropTypes.number,
    tabValue: PropTypes.number.isRequired
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.tabValue === 0) {
      this.setState({
        labelValue: '编辑销售代表信息'
      })
    } else {
      this.setState({
        labelValue: '编辑销售助理信息'
      })
    }
    if (nextProps.agencyListData.length) {
      this.setState({
        agencyList: nextProps.agencyListData
      })
    }
  };
  //
  componentWillMount = () => {
    if (this.props.tabValue === 0) {
      this.setState({
        labelValue: '编辑销售代表信息'
      });
    } else {
      this.setState({
        labelValue: '编辑销售助理信息'
      });
    }
    this.props.AgencyList(this.props.organizationId, '');
  };
  render() {
    return (
      <span>
        <RaisedButton
          label='编辑' style={{ marginRight: 15 }}
          onTouchTap={this.handleEditEmployeeDialogToggle} buttonStyle={{ backgroundColor: '#00BE9C' }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
        />
        <SaleInfoDialog
          organizationId={this.props.organizationId}
          saleId={this.props.saleId} title={this.state.labelValue}
          CreatList={this.props.CreatList}
          EditList={this.props.EditList} requredStatus={this.props.requredStatus}
          open={this.state.sale_dialog_open} hospital={this.props.hospital}
          handleSaleDialogToggle={this.handleEditEmployeeDialogToggle}
          tabValue={this.props.tabValue} name={this.props.name} agencyList={this.state.agencyList}
        />
      </span>
    )
  }
}
