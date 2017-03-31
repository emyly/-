/**
 * Created by sjf on 2016/11/1.
 */
import React, { Component, PropTypes } from 'react';
import SaleTable from './SaleTable'
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import SaleInfoDialog from './SaleInfoDialog';
import FilterTabs from 'components/FilterTabs';

export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label_represents: '销售代表',
      label_assistant: '销售助理',
      value: true,
      orderState: 0,
      role_dialog_open: false,
      labelValue: '',
      dataValue: '',
      verify: false,
      agencys: [],
      Index: ''
    }
  }
  static propTypes = {
    organizationId: PropTypes.number,
    CreatList: PropTypes.func,
    agencyList: PropTypes.array,
    fecthSalelist: PropTypes.func,
    EditList: PropTypes.func,
    CreatListChangeIsFetching: PropTypes.func,
    EditListChangeIsFetching: PropTypes.func,
    globalStore: PropTypes.object,
    totalCount: PropTypes.number,
    AgencyList: PropTypes.func,
    saleList: PropTypes.array,
  };
  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value });
    this.setState({ dataValue: value });
    this.props.fecthSalelist(this.props.globalStore.organizationId, value, 1);
    if (value === 0) {
      this.setState({
        labelValue: '添加销售代表'
      });
    } else {
      this.setState({
        labelValue: '添加销售助理'
      });
    }
  };
  handleSaleDialogToggle = () => {
    this.setState({
      role_dialog_open: !this.state.role_dialog_open,
      verify: false,
      agencys: [],
      hospital: this.state.newdata,
      Index: ''
    });
  };
  componentWillMount = () => {
    this.props.fecthSalelist(this.props.globalStore.organizationId, this.state.orderState, 1);
    if (this.state.orderState === 0) {
      this.setState({
        labelValue: '添加销售代表'
      });
      this.setState({
        dataValue: 0
      });
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.createIsFetching) {
      this.props.fecthSalelist(this.props.globalStore.organizationId, this.state.orderState, 1);
      this.props.CreatListChangeIsFetching();
    }
    if (nextProps.editIsFetching) {
      this.props.fecthSalelist(this.props.globalStore.organizationId, this.state.orderState, 1);
      this.props.EditListChangeIsFetching();
    }
  };
  render() {
    const filter = <FilterTabs inkBarStyle={{ width: '6rem' }} tabs={['销售代表', '销售助理']} callback={this.handleOrderStateDropDownMenuChange} />;
    const actions =
        (<nav>
          <RaisedButton
            label={this.state.labelValue}
            onTouchTap={this.handleSaleDialogToggle}
            buttonStyle={{ backgroundColor: '#00A0FF' }}
            labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
          />
        </nav>);
    const moreActions = '';
    return (
      <div style={{ height: '100%' }}>
        <StandardDataGrid
          title='销售代表及助理管理' message='...' filter={filter} actions={actions} moreActions={moreActions} iconPosition='-150px -90px'
          filterTitle='按订单状态筛选：'
        >
          <SaleInfoDialog
            organizationId={this.props.globalStore.organizationId}
            Index={this.state.Index} EditListChangeIsFetching={this.props.EditListChangeIsFetching}
            CreatListChangeIsFetching={this.props.CreatListChangeIsFetching} requredStatus={this.state.orderState}
            fecthSalelist={this.props.fecthSalelist} title={this.state.labelValue} CreatList={this.props.CreatList}
            open={this.state.role_dialog_open} handleSaleDialogToggle={this.handleSaleDialogToggle}
            agencyList={this.props.agencyList}
          />
          <SaleTable
            totalCount={this.props.totalCount}
            organizationId={this.props.globalStore.organizationId}
            requredStatus={this.state.orderState} saleListData={this.props.saleList}
            AgencyList={this.props.AgencyList} agencyListData={this.props.agencyList}
            CreatList={this.props.CreatList} EditList={this.props.EditList}
          />
        </StandardDataGrid>
      </div>
    )
  }
}

