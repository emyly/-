/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import FlatButton from 'material-ui/FlatButton';
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';
import DepotSelectDialog from 'components/DepotSelectDialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

/**
 * 使用场景：自选库位对话框
 */
export default class SelfSelectDepotDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDepotDialog: false,
      addStorage: [],
      openErr: false,
      errorMsg: '',
    }
  }

  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    orderId: PropTypes.number.isRequired,
    storageId: PropTypes.array.isRequired,
    selfSelectDialogSubmitCallback: PropTypes.func.isRequired,
  };

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {

  }

  depotSelectDialogSubmit = () => {

  }

  // 关闭自选库位对话框
  // closeDepotSelectDialog = () => {
  //   // this.setState({ temporaryDialogOpen: false });
  //   this.props.closeDepotSelectCallback();
  // };

  closeErrorDialog = () => {
    this.setState({ openErr: false, errorMsg: '' });
  };

  depotCallBack = (returnValue) => {
    const dataArray = this.state.addStorage;
    let flag = false;
    dataArray.map((value) => {
      if (Number(value.id === returnValue.id)) {
        flag = true;
      }
    });

    if (flag) {
      this.setState({ errorMsg: '该库位已选过，请选择其他库位', openErr: true });
    } else {
      dataArray.push(returnValue);
      this.setState({ addStorage: dataArray });
    }
  };

  // 添加库位
  addStorage = () => {
    this.setState({ openDepotDialog: true });
  };

  // 确认提交
  selectDialogSubmit = () => {
    this.props.selfSelectDialogSubmitCallback(this.state.addStorage.map(value => value.id));
    this.setState({
      openDepotDialog: false,
      addStorage: [],
      openErr: false,
      errorMsg: '',
    });
  };

  closeDepotDialog = () => {
    this.setState({ openDepotDialog: false });
  };

  showSelectTable = () => {
    const selectTableHeader = [
      {
        name: '仓库'
      },
      {
        name: '库位'
      }
    ];
    const style = {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '16px',
      color: '#53504F',
      textAlign: 'center'
    }
    return (
      <Table allRowsSelected={false} selectable={false} multiSelectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow style={{ background: '#364356', color: '#6D93C1', fontFamily: 'SourceHanSansCN-Bold', fontSize: 18 }}>{
            selectTableHeader.map((value, index) => (
              <TableHeaderColumn
                key={index}
                style={{ textAlign: 'center', color: '#6D93C1', fontFamily: 'SourceHanSansCN-Bold', fontSize: 18 }}
              >
                {value.name}
              </TableHeaderColumn>))
          }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.state.addStorage.map((value, index) => <TableRow key={index}>
              <TableRowColumn style={style}>{value.curDepot.name}</TableRowColumn>
              <TableRowColumn style={style}>{value.name}</TableRowColumn>
            </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  };

  render() {
    const actions = [
      <FlatButton
        label='添加库位'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 16, color: '#00BE9C' }}
        onTouchTap={this.addStorage}
      />,
      <FlatButton
        label='确定'
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 16, color: '#00A0FF' }}
        onTouchTap={this.selectDialogSubmit}
      />,
    ];
    return (<div>
      <BusinessDialog
        title='请选择库位'
        modal
        actions={actions}
        open={this.props.dialogOpen}
        titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 20, color: 'rgba(0,0,0,0.87)' }}
        autoScollBodyContent
        bodyStyle={{ height: '200px' }}
      >
        <div style={{ height: '250px', overflow: 'auto' }}>
          {
            this.showSelectTable()
          }
        </div>
      </BusinessDialog>

      <DepotSelectDialog
        storageId={this.props.storageId} ifShowOutStockTips ifChildDepotId ifStorage ifShowOrder orderId={this.props.orderId}
        callback={this.depotCallBack} open={this.state.openDepotDialog} handleButtonClick={this.closeDepotDialog}
      />
      <ErrorSnackBar
        message={this.state.errorMsg} open={this.state.openErr}
        onRequestClose={this.closeErrorDialog}
      />
    </div>)
  }
}

