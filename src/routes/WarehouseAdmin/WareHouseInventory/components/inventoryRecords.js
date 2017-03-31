/**
 * Created by liuyali on 2016/10/21.
 */


import React, { Component } from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PageGrid from '../../../../components/PageGrid';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import DialogMini from 'components/StandardUI/StandardDialog';
import TextField from 'material-ui/TextField';
import moment from 'moment'

/* 公共组件*/
import StandardDataGrid from 'components/StandardDataGrid';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import AtSelect from 'components/AtSelect'

import './WareHouseInventory.scss';
import AtMessage from 'components/AtMessage'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import CloseInventoryCheck from './CloseInventoryCheck';
import DepotSelectDialog from './DepotSelectDialog';

// 盘存记录子路由
export default class InventoryRecords extends Component {

  state = {
    informPersons: [],
    add_employee_dialog_open: false,
    select_inventory_dialog_open: false,
    remark: '',
    message: '',
    openError: false,
    inventoryId: '',
    hintDialogOpen: false,
    hintMessage: ''
  };
  static propTypes = {
    setBeginInventoryInit: React.PropTypes.func.isRequired,
    checkInventoryStatus: React.PropTypes.func.isRequired,
    DbeginInventoryRecords: React.PropTypes.func.isRequired,
    DgetInventoryRecordsData: React.PropTypes.func.isRequired,
    DendInventoryRecords: React.PropTypes.func.isRequired,
    beginInventoryRecords: React.PropTypes.object.isRequired,
    getinventoryRecords: React.PropTypes.object.isRequired,
    globalStore: React.PropTypes.object.isRequired,
    personalBasicInfo: React.PropTypes.object.isRequired,
  }
    // 关闭弹出框
  dialogClose = () => {
    this.setState({ add_employee_dialog_open: false });
  };
  handleRequestClose = () => {
    this.props.setBeginInventoryInit();
    this.setState({
      openError: false
    });
  };
    // 打开弹出框
  dialogOpen = () => {
    this.props.setBeginInventoryInit();
    this.setState({ add_employee_dialog_open: true });
  };
  getInventoryId = (id) => {
    this.setState({ inventoryId: id });
    this.props.checkInventoryStatus(id);
  }
  PCAUTH = () => {
    if (!document.getElementById('name').value.trim().length > 0) {
      this.setState({ message: '盘点名称不能为空！', openError: true });
      return;
    }
    if (Object.prototype.toString.call(this.state.inventoryId) !== '[object Number]') {
      this.setState({ message: '请选择盘存仓库！', openError: true });
      return;
    }

      /* 数据验证*/
    const PDMC = document.getElementById('name').value;
    const PDCK = this.state.inventoryId;
    const PDMS = this.state.remark;
    const BTZR = this.state.informPersons.map((person, index) => person.id);
    this.props.DbeginInventoryRecords(
      {
        KCPDB: {
          PDCK, // 盘点仓库
          PDMS, // 盘点描述， 即页面上的 备注 字段
          PDMC
        },
        TZ: {
          TZNR: this.state.remark,
          BTZR: BTZR || [] // 被通知人id数组
        }
      }
        );
  }
  correctInventoryStatus = () => {
    this.setState({
      hintDialogOpen: false,
      hintMessage: null
    });
    this.PCAUTH();
  }
  errorInventoryStatus = () => {
    this.setState({
      hintDialogOpen: false,
    });
  }
    /* 开始盘存+数据验证*/
  dialogBegin = () => {
    if (this.props.beginInventoryRecords.checkInstatus) {
      this.PCAUTH();
    } else {
      this.setState({
        hintMessage: this.props.beginInventoryRecords.checkInerror.response.Message,
        hintDialogOpen: true,
      })
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.beginInventoryRecords.status) {
      this.setState({ add_employee_dialog_open: false });
    }

    if (!nextProps.beginInventoryRecords.status && nextProps.beginInventoryRecords.error) {
      this.setState({
        openError: true,
        message: nextProps.beginInventoryRecords.error.response.Message
      })
    }
  }
  componentWillMount() {
    this.props.DgetInventoryRecordsData();
  }
  fecthValue =(value) => {
    this.setState({
      remark: value
    })
  }
  dealTime =(value, sformat) => {
    sformat = sformat || 'YYYY-MM-DD';
    return moment(value).format(sformat);
  }
  getTableData =() => ({
    columnOptions: [
      {
        label: '盘存名称',
        attr: 'inventory',
        style: { textAlign: 'center' }
      }, {
        label: '盘存仓库',
        attr: 'PCLJ',
        style: { textAlign: 'center' }
      },
      {
        label: '开始盘存日期',
        attr: 'inventoryStartDate',
        formater: (value) => {
          if (value === 0) {
            return '-';
          }
          return moment(value).format('YYYY-MM-DD')
        },
        style: { textAlign: 'center' }
      },
      {
        label: '结束盘存日期',
        attr: 'inventoryEndDate',
        formater: (value) => {
          if (value === 0) {
            return '-';
          }
          return moment(value).format('YYYY-MM-DD')
        },
        style: { textAlign: 'center' }
      }, {
        label: '盘存操作人',
        attr: 'inventoryOperator',
        style: { textAlign: 'center' }
      },
      {
        label: '状态',
        attr: 'status',
        style: { textAlign: 'center' }
      }, {
        label: '操作',
        attr: 'operator',
        style: { textAlign: 'center', width: 300 },
        tableHeaderColumnStyle: { textAlign: 'center', width: 300 }
      }
    ],
    dataSource: this.props.getinventoryRecords.data || [],
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
      currentPage: this.props.getinventoryRecords.currentPage || 1,
      totalCount: this.props.getinventoryRecords.total || 0,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.DgetInventoryRecordsData(page)
      }
    }
  })
  dealData = (tableData) => {
    // const operatorBtnStyle = {textAlign:'left'};
    tableData.dataSource.map((result, index) => {
      const status = result.PDZT === '1' ? '盘存已结束' : '正在盘存';
      const operator = result.PDZT === '1' ? (<div><Link to='profitLoss/checkInProfitLost'>
        <RaisedButton label='登记损溢' labelColor='white' backgroundColor='#E64C4C' /></Link></div>) : (<div>
          <Link
            to={{ pathname: 'wareHouseInventory/printInventoryRecords',
              state: { id: result.GUID, name: result.inventory, date: moment(result.inventoryStartDate).format('YYYY-MM-DD') } }}
          >
            <RaisedButton
              style={{ marginRight: '.5rem' }}
              backgroundColor='#F5A959'
              labelColor='white'
              label='打印盘存单'
            />
          </Link>
          <CloseInventoryCheck
            getinventoryRecords={this.props.getinventoryRecords}
            DendInventoryRecords={this.props.DendInventoryRecords} id={result.GUID}
          />
        </div>);
      tableData.dataSource[index].operator = operator;
      tableData.dataSource[index].status = status;
    });
    return tableData;
  }
  nextInform = (user) => {
    this.setState({
      informPersons: user
    })
  }
  render() {
      // 开始盘存弹窗按钮
    const actions_add = [
      <FlatButton
        label='关闭'
        onTouchTap={this.dialogClose}
      />,
      <FlatButton
        primary
        label='开始盘存'
        onTouchTap={this.dialogBegin}
      />,
    ];
    const btns = [
      <FlatButton
        label='取消'
        onTouchTap={this.errorInventoryStatus}
      />,
      <FlatButton
        primary
        label='继续'
        onTouchTap={this.correctInventoryStatus}
      />,
    ];
    const actions =
          (<nav>
            <RaisedButton
              label='开始盘存'
              primary
              icon={<ContentAddCircle />}
              onTouchTap={this.dialogOpen}
            />
          </nav>)
        ;
    const filter =
      <div />;

    return (
      <StandardDataGrid
        iconPosition='0px -60px' title='仓库盘存' message='...
' actions={actions} filter={filter} filterTitle=''
      >
        <PageGrid options={this.dealData(this.getTableData())} />
        <Dialog
          label='Modal Dialog'
          title='开始盘存'
          actions={actions_add}
          modal
          open={this.state.add_employee_dialog_open}
          onRequestClose={this.dialogClose}
          titleClassName='dialogTitle'
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='infoWrapper'>
              <img src='WarehouseInventory/ckpc_sj.png' alt='' />
              <span className='tagTitle'>开始盘存时间</span><span>{this.dealTime(new Date())}</span>
            </div>
            <div className='infoWrapper'>
              <img src='WarehouseInventory/所在地icon.png' alt='' />
              <span className='tagTitle'>操作人</span><span>{this.props.personalBasicInfo.userdata.name}</span>
            </div>
            <div className='infoWrapper'>
              <img src='WarehouseInventory/仓库名称icon.png' alt='' />
              <span className='tagTitle'>盘存名称</span>
              <TextField id='name' hintText='' style={{ width: 'calc(100%)' }} />
            </div>
            <DepotSelectDialog callback={this.getInventoryId} />
            <div className='infoWrapper'>
              <img src='WarehouseInventory/ckpc_@shui.png' alt='' />
              <img className='selectAdd' src='orderCheckIcon/icon-11.png' alt='' />
              <span className='tagTitle'>@谁</span>
              <div style={{ display: 'inline-block', width: 'calc(100%)' }}>
                <AtSelect style={{ width: '100%' }} callback={this.nextInform} organizationId={Number(this.props.globalStore.organizationId)} />
              </div>
            </div>
            <div className='infoWrapper'>
              <img src='WarehouseInventory/描述icon.png' alt='' />
              <span className='tagTitle'>留言</span>
              <div style={{ display: 'inline-block', width: 'calc(100%)' }}>
                <AtMessage style={{ width: '100%' }} callback={this.fecthValue} />
              </div>
            </div>

          </div>
          <br />
          <DialogMini
            label='Modal Dialog'
            title='仓库状态'
            actions={btns}
            modal
            open={this.state.hintDialogOpen}
            onRequestClose={this.dialogClose}
            titleClassName='dialogTitle'
          >
            <p>{this.state.hintMessage}</p>
          </DialogMini>
        </Dialog>
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>
    )
  }
}
