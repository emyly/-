/**
 * Author: wangming 2017/2/20
 **/
import React from 'react'
import {
Table,
TableHeader,
TableBody,
TableRow,
TableRowColumn,
TableHeaderColumn
} from 'material-ui/Table';
import moment from 'lib/moment';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default class SelectOtherTable extends React.Component {
  constructHeader = () => (
    <TableHeader {...this.props.tableHeaderConfig}>
      <TableRow className='outBoundDetailHeadderStyle'>{
        this.props.headerTitles.map((column, index) =>
          <TableHeaderColumn key={index}>{column.title}</TableHeaderColumn>
      )}
      </TableRow>
    </TableHeader>
  )

  constructRow = (item, index, productObject, listLength) => {
  /* Has to stay here since it check index of the row */
    let itemIDColumn;

    if (index === 0) {
      itemIDColumn = (
        <TableRowColumn rowSpan={listLength} >{ productObject.MaterialID }</TableRowColumn>
      )
    }

    if (Object.prototype.toString.call(item.SL) === '[object Undefined]') {
      item.SL = 0;
    }


    return (
      <TableRow key={index} selected={item.selected}>
        { itemIDColumn }
        <TableRowColumn>{ item.SPPH }</TableRowColumn>
        <TableRowColumn>{ moment(item.SCRQ).formatStandard('Y', 'M', 'D') }</TableRowColumn>
        <TableRowColumn>{ item.KCSL }</TableRowColumn>
      </TableRow>
    )
  };

  constructBody = () => (
    <TableBody {...this.props.tableBodyConfig}>
      {
        /* first map material by ID */
        this.props.stockData.ProductListByMaterialID.map(
          /* Second map material list by BatchID */
          (product, index) => product.ProductListByBatchID.map(
            /* construct each row */
            (item, index, array) => this.constructRow(
              item,
              index,
              { MaterialID: product.MaterialID, LastNumber: product.LastNumber, AlreadySelect: product.AlreadySelect },
              array.length
            )
          )
        )
      }
    </TableBody>
  );


  render() {
    return (
      <div className='outBoundDetailStyle'>
        <Card id='cardBorderStyle' initiallyExpanded >
          <CardHeader
            title={this.props.stockData.StockPositonName}
            actAsExpander
            showExpandableButton
            titleStyle={{ color: '#00A0FF', fontSize: '20px', fontFamily: 'SourceHanSansCN-Regular' }}
          />
          <CardText expandable className='outBound'>
            <Table {...this.props.tableConfig} onRowSelection={this.props.handleSelectedRows}>
              { this.constructHeader() }
              { this.constructBody() }
            </Table>
          </CardText>
        </Card>
      </div>
    )
  }
}

SelectOtherTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
  handleSelectedRows: React.PropTypes.func,
};
