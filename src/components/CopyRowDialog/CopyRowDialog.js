/**
 * Create by wangming 2016.11.30
 *
 */
import React from 'react'
import {
	Dialog,
	RaisedButton,
	FlatButton,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeaderColumn
} from 'material-ui'

export default class CopyRowDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnValue: {},
      lastCheckRow: {}
    }
  }

  static defaultProps = {

  };

  static propTypes = {
    tableData: React.PropTypes.array,
    open: React.PropTypes.bool,
    closeCallBack: React.PropTypes.func,
    addCallBack: React.PropTypes.func
  };

  componentWillMount = () => {

  };

  componentWillReceiveProps = (nextProps) => {

  };

  handleAdd = () => {
    this.props.addCallBack(Object.assign({}, this.state.lastCheckRow));
    this.setState({ lastCheckRow: {} });
  };

  handleClose =() => {
    this.props.closeCallBack();
  };

  onCellClick = (row) => {
    console.debug('onCellClick:', row);
    this.state.lastCheckRow.checked = false;
    this.props.tableData[row].checked = true;
    this.setState({ lastCheckRow: this.props.tableData[row] });
		// this.setState({returnValue: this.props.tableData[row]});
  };

  showTable = () => {
    const tableHeader = [
			{ name: '商品批号' },
			{ name: '库存数量' }
    ];

    return (<Table selectable onCellClick={this.onCellClick}>
      <TableHeader displaySelectAll adjustForCheckbox={false}>
        <TableRow>
          {
						tableHeader.map((value, index) => (<TableHeaderColumn key={index}>{value.name}</TableHeaderColumn>))
					}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox>
        {
					console.debug('CopyRowDialog:', this.props.tableData)
				}
        {
					this.props.tableData.map((value, index) => {
  value.KCSL = value.SL;
  return (<TableRow key={index} selected={value.checked}>
    <TableRowColumn>{value.SPPH}</TableRowColumn>
    <TableRowColumn>{value.KCSL}</TableRowColumn>
  </TableRow>)
})
				}
      </TableBody>
    </Table>)
  };

  render() {
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='确定'
        primary
        keyboardFocused
        onTouchTap={this.handleAdd}
      />
    ];

    return (
      <Dialog
        title='复制本行'
        modal={false}
        actions={actions}
        open={this.props.open}
        autoScollBodyContent
      >
        <div style={{ height: '600px', overflow: 'auto' }}>
          {
						this.showTable()
					}
        </div>
      </Dialog>
    )
  }
}
