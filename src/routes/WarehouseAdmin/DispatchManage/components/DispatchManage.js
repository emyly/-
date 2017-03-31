import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import PageGrid from 'components/PageGrid'
import StandardDataGrid from 'components/StandardDataGrid'
import moment from 'lib/moment'

import DispatchManageAlert from '../containers/DispatchManageAlertContainer'
import DispatchManageVerify from '../containers/DispatchManageVerifyContainer'
import './DispatchManage.scss'
import FilterTabs from 'components/FilterTabs';

class DispatchManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyDialogOpen: false,
      alertDialogOpen: false,
      manageState: 0,
      currentPage: 1,
      status: true
    }
  }

  componentWillMount() {
    this.props.getDispatchManageList(this.props.globalStore.organizationId, this.state.manageState)
  }

  handleAlertDialogOpen = () => {
    this.setState({ alertDialogOpen: true });
  };

  handleVerifyDialogOpen = (row) => {
    this.setState({ verifyDialogOpen: true, applyId: row.GUID });
  };

  handleManageStateDropDownMenuChange = (value) => {
    if (!value) {
      this.setState({
        status: true
      })
    } else {
      this.setState({
        status: false
      })
    }
    this.setState({ manageState: value });
    this.props.getDispatchManageList(this.props.globalStore.organizationId, value)
  };

  render() {
    const actions =
      (<nav>
        <RaisedButton labelPosition='after' primary icon={<ContentAddCircle />} onTouchTap={this.handleAlertDialogOpen} label='新建调拨命令' />
      </nav>)

    const filter = <FilterTabs tabs={['待审核', '已审核', '未通过', '已完成']} callback={this.handleManageStateDropDownMenuChange} />;

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
        label: '申请仓库（调入仓库）',
        attr: 'RKCKMC'
      }, {
        label: '执行仓库（调出仓库）',
        attr: 'CKCKMC'
      }, {
        label: '申请时间',
        attr: 'CJSJ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm', 's')
          return ('-')
        }
      }, {
        label: '审批时间',
        attr: 'SSRQ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm', 's')
          return ('-')
        }
      }, {
        label: '要求送达时间',
        attr: 'DHRQ',
        formater: (value, row) => {
          if (value) return moment(value).formatStandard('Y', 'M', 'D', 'h', 'm', 's')
          return ('-')
        }
      }, {
        label: this.state.status ? '操作' : '状态',
        attr: 'status',
        render: (row) => {
          switch (Number(row.DDZT)) {
            case 0:
              return (<RaisedButton onTouchTap={() => this.handleVerifyDialogOpen(row)} primary label='审核' labelColor={{ color: '#fffff' }} buttonStyle={{ background: 'rgb(0, 190, 156)', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: '2px' }} />)
            case 1:
              return ('审核通过，正在发货')
            case 2:
              return ('审核未通过')
            case 4:
              return ('已完成')
          }
        }
      }]
    }

    const pagination = {
      currentPage: this.state.currentPage,
      totalCount: this.props.dispatchManage.Result.Total || 0,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.setState({ currentPage: page })
        this.props.getDispatchManageList(this.props.globalStore.organizationId, this.state.manageState, page)
      }
    }

    return (
      <div className='dispatchManage'>
        <StandardDataGrid iconPosition={'-60px -30px'} title='调拨管理' message='您可以从这里管理调拨' actions={actions} filter={filter} filterTitle={'按调拨状态筛选：'}>
          <PageGrid options={options} dataSource={this.props.dispatchManage.Result.DDB || []} pagination={pagination} />
        </StandardDataGrid>
        <DispatchManageAlert alertDialogOpen={this.state.alertDialogOpen} handleAlertDialogClose={() => { this.setState({ alertDialogOpen: !this.state.alertDialogOpen }) }} />
        <DispatchManageVerify applyId={this.state.applyId} verifyDialogOpen={this.state.verifyDialogOpen} handleVerifyDialogClose={() => { this.setState({ verifyDialogOpen: !this.state.verifyDialogOpen }) }} />
      </div>
    );
  }
}


export default DispatchManage
