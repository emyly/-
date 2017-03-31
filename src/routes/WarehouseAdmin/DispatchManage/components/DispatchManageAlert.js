import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import DatePicker from 'components/ChineseDatePicker'
import TimePicker from 'material-ui/TimePicker'
import DataGrid from 'components/DataGrid'
import DepotSelectDialogByText from 'components/DepotSelectDialogByText'
import ChooseGoodsStoreDialog from 'components/ChooseGoodsStoreDialog'
import AtSelect from 'components/AtSelect'
import _ from 'lodash'
import MessageDialog from 'components/StandardUI/StandardDialog'
import StandardBusinessDialog from 'components/StandardUI/StandardBusinessDialog'
import './DispatchManage.scss'

class DispatchManageAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProductionDialogOpen: false,
      selectedIndex: 0,
      alertDialogConfirmLoading: false,
      productionList: [],
      atSelect: [], // 被通知人id数组
      messageDialogOpen: false,
      messageDialogTitle: '',
      messageDialogMessage: '',
      beginWareHouseObj: {}
    };
    this.SP = [];
    this.dataSource = [];
  }

  handleAtSelectCallback= (returnValue) => {
    this.setState({ atSelect: returnValue });
  };

  handleAddProductionDialogClose = () => {
    this.setState({ addProductionDialogOpen: false });
  }
  handleAddProductionDialogOpen = () => {
    this.setState({ addProductionDialogOpen: true });
  }

  handleApplyCallback = (returnValue) => {
    this.setState({
      applyIndex: returnValue.id,
      beginWareHouseObj: {
        isWareHouse: Number(returnValue.type) !== 1,    // true表示是仓库false表示是库位, 必传
        GUID: returnValue.id, // GUID表示仓库或库位GUID 必传
        name: returnValue.name // 必传
      }
    });
  }

  handleExecuteCallback = (returnValue) => {
    this.setState({ executeIndex: returnValue.id });
  }

  handleTouchTapStoreDialogOpen = () => {
    this.setState({ addProductionDialogOpen: !this.state.addProductionDialogOpen });
  }

  handleAlertDialogOk =() => {
    if (!this.SP.some((production) => {
		    if (production.SL) {
		      return true;
		    }
		  })) {
      this.setState({
			  messageDialogOpen: true,
			  messageDialogTitle: '警告',
			  messageDialogMessage: '至少添加一件商品'
      })
		  return;
    }
    this.props.handleAlertDialogClose()
    this.props.postDispatchManage(this.state.executeIndex, this.state.applyIndex, this.state.atSelect.map(user => user.id), this.SP, this.dataSource.map((o) => { delete o.GUID; return o; }), this.state.date)
  }

  handleDelete =(row) => {
    this.SP.some((production, index) => {
      if (production.GUID == row.GUID) {
        this.SP.splice(index, 1);
        this.dataSource.splice(index, 1);
        this.setState({ dataSource: this.dataSource })
      }
    })
  }

  handleNumberChange =(row, event) => {
    this.SP.some((production, index) => {
      if (production.GUID == row.GUID) {
        this.SP[index].SL = Number(event.target.value);
        this.dataSource[index].SL = Number(event.target.value);
        this.setState({ dataSource: this.dataSource });
        return true;
      }
    })
  }

  handleChooseGoodsStoreDialogCallback = (productionList) => {
    productionList.forEach((kw) => {
      kw.dataSource.forEach((production) => {
        production.totalSL = production.SL
        production.SL = production.XZSL
        // 判断商品重复
        if (!this.SP.length || !this.SP.some((prod, index) => {
          if (prod.GUID == production.GUID) {
            this.SP[index].SL += prod.SL;
            this.dataSource[index].SL += prod.SL;
            return true;
          }
        })) {
          this.SP.push({
            GUID: production.SPID,
            SL: production.SL
          })
          this.dataSource.push(_.merge(production, _.pick(kw, ['KWMC', 'CKMC'])))
        }
        this.setState({ dataSource: this.dataSource })
      })
    })
  }

  render() {
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
      tableAttrs: {
        selectable: false
      },
      columnOptions: [{
        label: '物料号',
        attr: 'SPBH'
      }, {
        label: '商品名称',
        attr: 'SPMC',
        style: { overflow: 'hidden' }
      }, {
        label: '商品规格',
        attr: 'SPMS',
        style: { overflow: 'hidden' }
      }, {
        label: '批号',
        attr: 'SPPHID'
      }, {
        label: '仓库名称',
        attr: 'CKMC'
      }, {
        label: '库位名称',
        attr: 'KWMC'
      }, {
        label: '数量',
        attr: 'SL',
        render: row => <input style={{ width: 50 }} type='number' min='1' max={row.totalSL} defaultValue={row.SL} onBlur={(event) => { this.handleNumberChange(row, event) }} />
      }, {
        label: '操作',
        attr: 'operate',
        render: row => <FlatButton onTouchTap={() => { this.handleDelete(row) }} label='删除' />
      }]
    }
    const organizationId = Number(this.props.globalStore.organizationId);
    return (
      <div className='dispatchManageAlert'>
        <StandardBusinessDialog
          title='新建调拨命令'
          actions={[<FlatButton label='取消' style={{ marginRight: '10px' }} primary onTouchTap={() => { this.setState({ dataSource: [] }); this.props.handleAlertDialogClose() }} />,
            <RaisedButton label='确认调拨' primary onTouchTap={this.handleAlertDialogOk} disabled={this.state.alertDialogConfirmLoading} />]}
          open={this.props.alertDialogOpen}
          modal={this.state.alertDialogConfirmLoading}
          onRequestClose={this.props.handleAlertDialogClose}
        >
          <div>
            <div className='space-between'>
              <span style={{ marginRight: 15 }}>调出人: <AtSelect organizationId={organizationId} callback={this.handleAtSelectCallback} /></span>
              <span style={{ width: 280 }} className='space-between'> 要求送达时间：
                <DatePicker
                  textFieldStyle={{ width: 80 }}
                  onChange={(event, date) => { this.setState({ date: new Date(date).getTime() }) }}
                  hintText='日期'
                  disableYearSelection={false}
                /></span>
            </div>
            <div className='space-between'>
              <span>调出仓库<DepotSelectDialogByText currentOrg={organizationId} ifStorage callback={this.handleApplyCallback} /></span>
              <span>调入仓库<DepotSelectDialogByText currentOrg={organizationId} ifStorage={false} callback={this.handleExecuteCallback} /></span>
            </div>
            <RaisedButton labelPosition='after' primary icon={<ContentAddCircle />} onTouchTap={this.handleAddProductionDialogOpen} label='添加商品' />
            <DataGrid options={options} dataSource={this.state.dataSource} />
            <ChooseGoodsStoreDialog beginWareHouseObj={this.state.beginWareHouseObj} callback={this.handleChooseGoodsStoreDialogCallback} CurrentOrganizationId={organizationId} ParentWareHouseId={0} open={this.state.addProductionDialogOpen} isOnlyInventoryGoods handleDailog={this.handleTouchTapStoreDialogOpen} />
          </div>
        </StandardBusinessDialog>
        <MessageDialog open={this.state.messageDialogOpen} title={this.state.messageDialogTitle} actions={<RaisedButton onTouchTap={() => this.setState({ messageDialogOpen: !this.state.messageDialogTitle })} label='确定' />}>
          {this.state.messageDialogMessage}
        </MessageDialog>
      </div>
    )
  }
}


export default DispatchManageAlert
