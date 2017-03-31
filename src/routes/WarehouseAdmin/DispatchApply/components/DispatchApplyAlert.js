import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import DataGrid from 'components/DataGrid';
import ChooseGoodsAuthDialog from 'components/ChooseGoodsAuthDialog';
import DepotSelectDialogByText from 'components/DepotSelectDialogByText';
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import DatePicker from 'components/ChineseDatePicker'
import MessageDialog from 'components/StandardUI/StandardDialog'
import StandardBusinessDialog from 'components/StandardUI/StandardBusinessDialog'
import './DispatchApply.scss';

class DispatchApplyAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProductionDialogOpen: false,
      atSelect: [],
      atMessage: '',
      executeIndex: null,
      alertDialogConfirmLoading: false,
      dataSource: [],
      messageDialogOpen: false,
      messageDialogTitle: '',
      messageDialogMessage: ''
    };
    this.SP = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dispatchApplyAlert.Code == 0) {
      this.props.getDispatchApplyList(this.props.globalStore.userId, 0, 1)
      this.props.handleAlertDialogClose()
      this.props.initStore()
    }
  }

  handleAddProductionDialogOpen = () => {
    this.setState({ addProductionDialogOpen: true });
  }

  handleAddProductionDialogClose = () => {
    this.setState({ addProductionDialogOpen: !this.state.addProductionDialogOpen });
  }

  handleExecuteCallback = (returnValue) => {
    this.setState({ executeIndex: returnValue.id });
  }

  handleAtMessageCallback = (returnValue) => {
    this.setState({ atMessage: returnValue });
  }

  handleAtSelectCallback = (returnValue) => {
    this.setState({ atSelect: returnValue });
  }

  handleChooseGoodsAuthDialogCallback = (returnValue) => {
    returnValue.forEach((prod) => {
      if (!this.SP.length || !this.SP.some((production, index) => {
        if (production.GUID === prod.id) {
          this.SP[index].SL += prod.choosedAmount;
          return true;
        }
      })) {
        prod.GUID = Number(prod.id);
        prod.SL = prod.choosedAmount;
        this.SP.push(prod);
      }
    })
    this.setState({
      dataSource: this.SP
    })
  }

  handleNumberChange =(row, event) => {
    this.SP.some((production, index) => {
      if (production.GUID == row.GUID) {
        this.SP[index].SL = Number(event.target.value);
        this.setState({ dataSource: this.SP });
        return true;
      }
    })
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
    this.props.postDispatchApply(this.state.executeIndex, this.state.date, this.state.atMessage, this.state.atSelect.map(user => user.id), this.SP)
  }

  handleDelete =(row) => {
    this.SP.some((production, index) => {
      if (production.GUID == row.GUID) {
        this.SP.splice(index, 1);
        this.setState({ dataSource: this.SP })
      }
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
        attr: 'GUID'
      }, {
        label: '商品名称',
        attr: 'name'
      }, {
        label: '商品规格',
        attr: 'desc'
      }, {
        label: '数量',
        attr: 'SL',
        render: row => (
          <input type='number' style={{ width: 50 }} min='1' defaultValue={row.choosedAmount} onBlur={(event) => { this.handleNumberChange(row, event) }} />
        )
      }, {
        label: '操作',
        key: 'operate',
        render: row => <FlatButton label='删除' onTouchTap={() => { this.handleDelete(row) }} />
      }]
    }
    const organizationId = Number(this.props.globalStore.organizationId);
    return (
      <div className='dispatchApplyAlert'>
        <StandardBusinessDialog
          title='申请调拨'
          modal={this.state.alertDialogConfirmLoading}
          actions={[<FlatButton label='取消' style={{ marginRight: '10px' }} primary onTouchTap={() => { this.setState({ dataSource: [] }); this.props.handleAlertDialogClose() }} />,
            <RaisedButton label='提交申请' primary onTouchTap={this.handleAlertDialogOk} disabled={this.state.alertDialogConfirmLoading} />]}
          open={this.props.alertDialogOpen}
          onRequestClose={this.props.handleAlertDialogClose}
        >
          <div>
            <div className='span-desc'>
              <span>调入仓库<DepotSelectDialogByText currentOrg={1} ifStorage={false} callback={this.handleExecuteCallback} /></span>
              <span style={{ width: 280 }} className='space-between'> 要求送达时间：
                 <DatePicker
                   textFieldStyle={{ width: 90 }}
                   onChange={(event, date) => { this.setState({ date: new Date(date).getTime() }) }}
                   hintText='日期'
                   disableYearSelection={false}
                 /></span>
              <AtSelect title={'选择@谁'} organizationId={organizationId} callback={this.handleAtSelectCallback} />
              <AtMessage hintText={'填写留言'} callback={this.handleAtMessageCallback} />
              <RaisedButton labelPosition='after' primary icon={<ContentAddCircle />} onTouchTap={this.handleAddProductionDialogOpen} label='添加商品' />
            </div>
            <DataGrid options={options} dataSource={this.state.dataSource} />
            <ChooseGoodsAuthDialog haveBusinessLineIdAndBrandId={false} getSelectionCallback={this.handleChooseGoodsAuthDialogCallback} AuthorizedOrganizationId={organizationId} open={this.state.addProductionDialogOpen} handleDialog={this.handleAddProductionDialogClose} />
          </div>
        </StandardBusinessDialog>
        <MessageDialog open={this.state.messageDialogOpen} title={this.state.messageDialogTitle} actions={<RaisedButton onTouchTap={() => this.setState({ messageDialogOpen: !this.state.messageDialogTitle })} label='确定' />}>
          {this.state.messageDialogMessage}
        </MessageDialog>
      </div>
    )
  }
}


export default DispatchApplyAlert
