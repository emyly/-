/**
* Component: ProductSelectionTable
* Description: Constuct a ProductSelection table within data passed in and
* some other configurations
*
*
* Author: Yechen Huang huangyc@firstgrid.cn
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

export default class ProductSelectionTable extends React.Component {
  constructor(props) {
    super(props)
  }

  constructOptionalColumn = () => {
    if(this.props.operationColumn) {
      this.buttonHeaderColumn =
      <TableHeaderColumn>{ this.props.operationColumn.name }</TableHeaderColumn>

      this.buttonRowColumn =
      <TableRowColumn>
        <RaisedButton label='其他可选库位' onTouchTap = { this.props.handleOpenDialog } />
      </TableRowColumn>
    }
  }

  constructHeader = () => (
    <TableHeader { ...this.props.tableHeaderConfig }>
      <TableRow>
        <TableHeaderColumn>{ this.props.stockData.StockPositonName }</TableHeaderColumn>
      </TableRow>
      <TableRow>
        { this.props.headerTitles.map((column, index) =>
          <TableHeaderColumn key={index}>{column.title}</TableHeaderColumn>
        )}
        { this.buttonHeaderColumn }
      </TableRow>
    </TableHeader>
  )

  constructRow = (item, index, materialID, listLength) => {
    /* Has to stay here since it check index of the row */
    let itemIDColumn
    if(index === 0) {
      itemIDColumn = (
        <TableRowColumn rowSpan={listLength} >{ materialID }</TableRowColumn>
      )
    }

    return (
      <TableRow key={index} >
        { itemIDColumn }
        <TableRowColumn>{ item.BatchID }</TableRowColumn>
        <TableRowColumn>{ item.ProductionDate }</TableRowColumn>
        <TableRowColumn>{ item.StockNumber }</TableRowColumn>
        { this.buttonRowColumn }
      </TableRow>
    )
  }

  constructBody = () => (
    <TableBody { ...this.props.tableBodyConfig }>
      {
        /* first map material by ID */
        this.props.stockData.ProductListByMaterialID.map(
          /* Second map material list by BatchID */
          (product, index) => product.ProductListByBatchID.map(
            /* construct each row */
            (item, index, array) => this.constructRow(item, index, product.MaterialID, array.length)
          )
        )
      }
    </TableBody>
  )

  render() {
    this.constructOptionalColumn()

    return (
      <Table { ...this.props.tableConfig } >
        { this.constructHeader() }
        { this.constructBody() }
      </Table>
    )
  }
}

ProductSelectionTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object.isRequired,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
  operationColumn: React.PropTypes.object,
  handleOpenDialog: React.PropTypes.func
}
