/**
 * Created by liuyali on 2016/10/21.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PageGrid from '../../../../components/PageGrid';
import moment from 'moment'
import CheckProfitLossDialog from './CheckProfitLossDialog'
import StandardDataGrid from 'components/StandardDataGrid';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';


import './ProfitLoss.scss';

export default class ProfitLoss extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    checkSingleProfitLossDetail: React.PropTypes.func.isRequired,
    checkSingleProfitLossDetailData: PropTypes.object.isRequired,
    profitLossListData: PropTypes.object.isRequired,
    getProfitLossList: React.PropTypes.func.isRequired,
  }
  handleClick = (e) => {
    this.context.router.push('/profitLoss/checkInProfitLost');
  }
  state = {
    checkProfitLostData: []
  }
  getCheckProfitLostData = id => () => {
    this.props.checkSingleProfitLossDetail(id)
  }
  getTableData =(tableData) => {
    const dealData = tableData.map((SY, index) => ({
      ...SY,
      operator: <div><CheckProfitLossDialog
        detail={SY}
        id={SY.profitAndLostID} callback={this.getCheckProfitLostData(SY.profitAndLostID)} tableData={this.props.checkSingleProfitLossDetailData.data}
      /></div>
    }));

    return {
      columnOptions: [
        {
          label: '损溢ID',
          attr: 'profitAndLostID',
          style: { textAlign: 'center' }
        },
        {
          label: '损溢登记日期',
          attr: 'checkInDate',
          formater: (value) => {
            if (value === 0) {
              return '-';
            }
            return moment(value).format('YYYY-MM-DD  HH:mm:ss')
          },
          style: { textAlign: 'center' }
        },
        {
          label: '损溢操作人',
          attr: 'profitAndLostOperator',
          style: { textAlign: 'center' }
        }, {
          label: '损溢描述',
          attr: 'describe',
          style: { textAlign: 'center' }
        },
        {
          label: '状态',
          attr: 'status',
          style: { textAlign: 'center' }
        }, {
          label: '操作',
          attr: 'operator',
          style: { textAlign: 'center' },
        }
      ],
      dataSource: dealData || [],
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },
      showIndex: true,
      pagination: {
        currentPage: this.props.profitLossListData.currentPage || 1,
        totalCount: this.props.profitLossListData.total || 0,
        prePageCount: 10,
        pageLength: 4,
        pageFunc: (page) => {
          this.props.getProfitLossList(page)
        }
      }
    };
  }
  componentWillMount() {
    this.props.getProfitLossList();
  }
  componentWillReceiveProps(nextProp) {
    if (this.props.checkSingleProfitLossDetailData.status) {
      this.setState({ checkProfitLostData: this.props.checkSingleProfitLossDetailData.data });
    }
  }
  render() {
    const actions =
          (<nav>
            <RaisedButton
              label='登记损溢'
              primary
              icon={<ContentAddCircle />}
              style={{ marginLeft: '5px' }}
              onTouchTap={this.handleClick}
            />
          </nav>)
        ;
    const filter =
      <div />;

    return (
      <StandardDataGrid iconPosition='0px -30px' title='损溢管理' message='...' actions={actions} filter={filter} filterTitle=''>
        <PageGrid options={this.getTableData(this.props.profitLossListData.data)} />
      </StandardDataGrid>
    )
  }
}
