/**
 * Component: ProductSelectionTable
 * Description: Constuct a ProductSelection table within data passed in and
 * some other configurations
 *
 *
 * Author: Yechen Huang huangyc@firstgrid.cn
 * modify: wangming for stockout
 */
import React from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeaderColumn
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox';
import CardUI from 'components/StandardUI/StandardCard';

export default class SelectProductionTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockData: []
    }
  }

  componentWillMount = () => {
    console.log('componentWillMount');
    console.debug('select 660', this.props.stockData);
    this.setState({ stockData: this.props.stockData });
  };

  componentWillReceiveProps = (nextProps) => {
    console.debug('select 661:', nextProps);
    this.setState({ stockData: nextProps.stockData })
  };

  showDialog = (value) => {
    console.debug('showDialog 1:', value);
    this.props.handleOpenDialog(value);
  };

  constructOptionalColumn = () => {
    if (this.props.operationColumn) {
      this.buttonHeaderColumn =
				(<TableHeaderColumn
  style={{ fontFamily: 'SourceHanSansCN-Bold', backgroundColor: 'rgba(53,67,87,0.10)', paddingLeft: 3, paddingRight: 3, fontSize: '18px',
    color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center' }}
				>{ this.props.operationColumn.name }</TableHeaderColumn>)
			// this.buttonRowColumn =
			// 	<TableRowColumn style={{ textAlign : 'center' }}>
			// 		<RaisedButton label='其他可选库位' onTouchTap = { this.showDialog } />
			// 	</TableRowColumn>
    }
  };

  constructSelectColumn = () => {
    if (this.props.operationSelect) {
      if (this.props.ifActive) {
        return (<TableHeaderColumn
          style={{ textAlign: 'right', fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '20px', color: '#FFFFFF', letterSpacing: '0.71px' }}
        >
					正在对此库位拣货
				</TableHeaderColumn>)
      } else {
        return (<TableHeaderColumn style={{ textAlign: 'right' }}>
          <RaisedButton
            labelStyle={{ fontFamily: 'PingFangSC-Medium', fontSize: '14px', color: '#FFFFFF',
              letterSpacing: '0.5px', lineHeight: '14px' }} backgroundColor={'#00A0FF'}
            label={this.props.operationSelect.name} onTouchTap={this.props.handleSelectProduction}
          />
        </TableHeaderColumn>)
      }
    }
  };

  showStockName = (value) => {
    const data = value.split('-');
    return data[data.length - 1];
  };

  showCheckBox = (index, item) => {
    if (this.props.ifSelectble) {
      if (Object.prototype.toString.call(item.checked) === '[object Undefined]') {
        item.checked = false;
      }
      console.debug('select 44:', item);
      return (<TableRowColumn style={{ textAlign : 'center' }} key={`${index}0`} >
        <Checkbox
          label=''
          checked={item.checked}
        /></TableRowColumn>)
    }
  };


  constructHeader = () => {
    let StyleShowStockName;
    if (this.props.ifActive) {
      StyleShowStockName = { background: '#00A0FF' };
    } else {
      StyleShowStockName = { background: '#CACACA' };
    }

    return (<TableHeader {...this.props.tableHeaderConfig} >
      <TableRow style={StyleShowStockName} onClick={this.props.handleSelectProduction}>
        <TableHeaderColumn
          style={{ fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '20px', color: '#FFFFFF', letterSpacing: '0.71px' }} colSpan={this.props.headerTitles.length}
        >
          {
						this.showStockName(this.state.stockData.StockPositonName)
					}
        </TableHeaderColumn>
        {
					this.constructSelectColumn()
				}
      </TableRow>
      <TableRow>
        { this.props.headerTitles.map((column, index) =>
          <TableHeaderColumn
            key={index} style={{ fontFamily: 'SourceHanSansCN-Bold', backgroundColor: 'rgba(53,67,87,0.10)', paddingLeft: 3, paddingRight: 3, fontSize: '18px',
              color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center' }}
          >{column.title}</TableHeaderColumn>)
				}
        { this.buttonHeaderColumn }
      </TableRow>
    </TableHeader>)
  }

  changeDataFormat = (date, flag) => {
    const tempDate = new Date(date);
    const yy = `${tempDate.getFullYear()}-`;
    const mm = `${tempDate.getMonth() + 1}-`;
    const dd = `${tempDate.getDate()} `;
    const hh = `${tempDate.getHours()}:`;
    const ii = `${tempDate.getMinutes()}:`;
    const ss = tempDate.getSeconds();
    if (flag) {
      return (yy + mm + dd + hh + ii + ss);
    } else {
      return (yy + mm + dd);
    }
  };

  constructRow = (item, index, orderIndex, productObject, listLength) => {
		/* Has to stay here since it check index of the row */
    let itemIDColumn,
      itemNumColumn;
    console.debug('constructRow 1:', orderIndex, index);
    if (index === 0) {
      itemIDColumn = (
        <TableRowColumn style={{ textAlign : 'center' }} rowSpan={listLength} >{ productObject.MaterialID }</TableRowColumn>
			)
    }

    if (index === 0) {
      if (!this.props.ifSelectble) {
        itemNumColumn = (
          <TableRowColumn style={{ textAlign : 'center' }} rowSpan={listLength} >{ String(productObject.AlreadySelect) }/{String(productObject.UnselectNum)}</TableRowColumn>
				)
      }
    }

    return (
      <TableRow key={`${orderIndex}+${index}`} >
        { this.showCheckBox(`${orderIndex}+${index}`, item)}
        { itemIDColumn }
        { itemNumColumn }
        <TableRowColumn style={{ textAlign : 'center' }}>{ item.SPPH }</TableRowColumn>
        <TableRowColumn style={{ textAlign : 'center' }}>{ this.changeDataFormat(item.SCRQ) }</TableRowColumn>
        <TableRowColumn style={{ textAlign : 'center' }}>{ item.KCSL }</TableRowColumn>
        {
					(() => {
  if (this.props.operationColumn) {
    console.debug('select 3:', item);
    return (<TableRowColumn style={{ textAlign : 'center' }}>
      <RaisedButton label='其他可选库位' 
                    onTouchTap={this.props.handleOpenDialog(item)} 
                    style={{ margin:'3px',width:'100px' }} 
                    buttonStyle={{ width:'100px' }} labelStyle={{ width:'100px',padding:'0px' }}/>
      <RaisedButton label='复制本行' 
                    onTouchTap={this.props.handleCopyRow(item)} 
                    style={{ margin:'3px',width:'100px' }} 
                    buttonStyle={{ width:'100px' }} labelStyle={{ width:'100px',padding:'0px' }}/>
    </TableRowColumn>)
  }
})()
				}
      </TableRow>
    )
  }

  constructBody = () => <TableBody {...this.props.tableBodyConfig} >
    {
				/* first map material by ID */
				this.state.stockData.ProductListByMaterialID.map(
					/* Second map material list by BatchID */
					(product, index) => {
  const orderIndex = index;
  return product.ProductListByBatchID.map(
							/* construct each row */
							(item, index, array) => this.constructRow(item, index, orderIndex, {
  MaterialID: product.MaterialID,
  LastNumber: product.LastNumber,
  AlreadySelect: product.AlreadySelect,
  UnselectNum: product.UnselectNum
}, array.length)
						)
}
				)
			}
  </TableBody>

  findNodeByRow = (row) => {
    const tpArray = [];
    const stateStock = this.state.stockData;
    stateStock.ProductListByMaterialID.map(
			(product, index) => product.ProductListByBatchID.map(
				(item, index) => {
  tpArray.push(item);
}
			)
		);

    console.debug('select 34:', tpArray[row].checked);
    tpArray[row].checked = !tpArray[row].checked;
    console.debug('select 35:', tpArray[row].checked);
    this.setState({ stockData: stateStock });
    console.debug('select 36:', tpArray);
  };

  getStockData = (row, col, outData) => {
    if (this.props.ifSelectble) {
      console.debug('getStockData:', row, col);
      this.findNodeByRow(row);
			// this.props.rowClickCallBack(outData);
    }
  };

  cellClick = (row, col) => {
    const outData = [];
    this.getStockData(row, col, outData);
  };

  render() {
    this.constructOptionalColumn()

    return (
      <div style={{ marginTop: '1.8rem' }}>
        <Table {...this.props.tableConfig} onCellClick={this.cellClick}>
          { this.constructHeader() }
          { this.constructBody() }
        </Table>
      </div>
    )
  }
}

SelectProductionTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
  operationColumn: React.PropTypes.object,
  handleOpenDialog: React.PropTypes.func,
  handleSelectProduction: React.PropTypes.func,
  operationSelect: React.PropTypes.object,
  ifActive: React.PropTypes.bool,
  activeCallback: React.PropTypes.func
}
