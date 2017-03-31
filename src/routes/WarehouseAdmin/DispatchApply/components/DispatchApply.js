import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import PageGrid from 'components/PageGrid'
import StandardDataGrid from 'components/StandardDataGrid'
import moment from 'lib/moment'
import StandardBusinessDialog from 'components/StandardUI/StandardBusinessDialog'
import DispatchApplyAlert from '../containers/DispatchApplyAlertContainer'
import DispatchApplyDetail from '../containers/DispatchApplyDetailContainer'
import './DispatchApply.scss'
import FilterTabs from 'components/FilterTabs';

class DispatchApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDialogOpen: false,
      alertDialogOpen: false,
      currentPage: 1,
      dispatchState: '0'
    }
  }

  componentWillMount() {
    this.props.getDispatchApplyList(this.props.globalStore.userId, this.state.dispatchState, this.state.currentPage)
  }

  handleAlertDialogOpen = () => {
    this.setState({ alertDialogOpen: true });
  };

  handleDetailDialogClose = () => {
    this.setState({ detailDialogOpen: false });
  };

  handleWatchDetail = (row) => {
    this.setState({ applyId: row.GUID, detailDialogOpen: true });
  }

  handleDispatchStateDropDownMenuChange = (value) => {
    this.setState({ dispatchState: value.toString() });
    this.props.getDispatchApplyList(this.props.globalStore.userId, value)
  };

  render() {
    const actions =
        (<nav>
          <RaisedButton labelPosition='after' primary icon={<ContentAddCircle />} onTouchTap={this.handleAlertDialogOpen} label='申请调拨' />
        </nav>)
    const filter = <FilterTabs tabs={['待审核', '已审核', '未通过', '已完成']} callback={this.handleDispatchStateDropDownMenuChange} />;

    const options = {
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
      columnOptions: [{
        label: '申请ID',
        attr: 'GUID'
      }, {
        label: '申请人',
        attr: 'CJRXM'
      }, {
        label: '申请时间',
        attr: 'CJSJ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm', 's')
          return ('-')
        }
      }, {
        label: '要求送达时间',
        attr: 'DHRQ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D')
          return ('-')
        }
      }, {
        label: '审批时间',
        attr: 'WBSHSJ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm', 's')
          return ('-')
        }
      }, {
        label: '申请仓库（调入仓库）',
        attr: 'RKCKMC'
      }, {
        label: '执行仓库（调出仓库）',
        attr: 'CKCKMC'
      }, {
        label: '状态',
        attr: 'status',
        render: (row) => {
          switch (Number(row.DDZT)) {
            case 0:
              return ('已提交申请，待审核')
            case 1:
              return ('审核通过，正在发货')
            case 2:
              return ('审核未通过')
            case 4:
              return ('已完成')
          }
        }
      }, {
        label: '操作',
        attr: 'operate',
        render: row => <RaisedButton label='查看' primary onTouchTap={() => this.handleWatchDetail(row)} labelColor={{ color: '#fffff' }} buttonStyle={{ background: 'rgb(0, 190, 156)', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: '2px' }} />
      }]
    }

    const pagination = {
      currentPage: this.state.currentPage,
      totalCount: this.props.dispatchApply.Result.Total || 0,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.setState({ currentPage: page })
        this.props.getDispatchApplyList(this.props.globalStore.userId, this.state.dispatchState, page)
      }
    }

    return (
      <div className='dispatchApply'>
        <StandardDataGrid iconPosition={'-180px -30px'} title='调拨申请' message='您可以从这里申请查看调拨' actions={actions} filter={filter} filterTitle='按调拨申请状态筛选：'>
          <PageGrid options={options} dataSource={this.props.dispatchApply.Result.DDB || []} pagination={pagination} />
        </StandardDataGrid>
        <DispatchApplyAlert alertDialogOpen={this.state.alertDialogOpen} handleAlertDialogClose={() => { this.setState({ alertDialogOpen: !this.state.alertDialogOpen }) }} />
        <StandardBusinessDialog
          title='申请调拨商品明细'
          open={this.state.detailDialogOpen}
          onRequestClose={this.handleDetailDialogClose}
          actions={[<RaisedButton label='关闭' primary onTouchTap={this.handleDetailDialogClose} />]}
        >
          <DispatchApplyDetail applyId={this.state.applyId} />
        </StandardBusinessDialog>
      </div>
    );
  }
}

export default DispatchApply
