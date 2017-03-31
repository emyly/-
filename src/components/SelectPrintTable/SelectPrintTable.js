/**
* file name: SelectPrintTable.js
* author: wangming
* create date: 2016-12-12
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
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import './SelectPrintTable.scss';

const HeaderInfo = [
  {
    title: '物料号',
    dataIndex: 'WLH'
  },
  {
    title: '订购',
    dataIndex: 'SPSL'
  },
  {
    title: '批号',
    dataIndex: 'HWPH'
  },
  {
    title: '生产日期',
    dataIndex: 'SCRQ'
  },
  {
    title: '数量',
    dataIndex: 'SPSL'
  }

];

export default class SelectPrintTable extends React.Component {
  constructor(props) {
    super(props)
  }

  print = () => {
    console.debug('print');
    this.Printpart('selectArea');
  };

  cancelPrint = () => {
    window.history.back();
  };

  Printpart = (id_str) =>// id-str 内容中的id
	{
    const el = document.getElementById(id_str);
    console.debug(el);
    const iframe = document.createElement('IFRAME');
    let doc = null;
		// iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    doc.write(`<div>${el.innerHTML}</div>`);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    if (navigator.userAgent.indexOf('MSIE') > 0)		{
      document.body.removeChild(iframe);
    }

        // let body = window.document.body.innerHTML;
        // let printContent = document.getElementById(id_str).innerHTML;
        // window.document.body.innerHTML = printContent;
        // window.print();
        // window.document.body.innerHTML = body;
        // location.reload()
  };

    // showButton = () => {
    //     return <div><FlatButton key="print" label="打印" onTouchTap={this.print}
    //                 labelStyle={{fontFamily: 'SourceHanSansCN-Medium', fontSize: '18px', color: '#000000', letterSpacing: '0.64px'}} />
    //             </div>
    // };

  showPrintHeader = () => <div style={{ marginTop: '2.5rem' }}><h2 style={{ width: '100%', textAlign: 'center' }}>拣货推荐表</h2></div>;

  showPrintBody = () => this.props.stockData.map(
                (stock, index) => (
                  <PrintTable
                    key={index}
                    stockData={stock}
                    tableConfig={{ selectable: false }}
                    tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
                    tableBodyConfig={{ displayRowCheckbox: false, stripedRows: false }}
                    headerTitles={HeaderInfo}
                  />
                )
        );

  render() {
    return (
      <div style={{ height: '100%', overflow: 'auto', marginTop: '2rem' }}>
        <div id='selectArea'>
          { this.showPrintHeader() }
          { this.showPrintBody() }
        </div>
      </div>
    )
  }
}

SelectPrintTable.propTypes = {
  stockData: React.PropTypes.array.isRequired
}


/**
* Component name: PrintTable
* author: wangming
* create date: 2016/12/12
*/
class PrintTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockData: []
    }
  }

  componentWillMount = () => {
    console.debug('select 660', this.props.stockData);
    this.setState({ stockData: this.props.stockData });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ stockData: nextProps.stockData })
  };

  showStockName = (value) => {
    const data = value.split('-');
    return data[data.length - 1];
  };

  constructHeader = () => {
    let StyleShowStockName;

    StyleShowStockName = { background: '#FFFFFF' };

    return (<TableHeader {...this.props.tableHeaderConfig} >
      <TableRow style={StyleShowStockName} className='tableHeaderRowStyle'>
        <TableHeaderColumn
          style={{ fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '20px', color: '#000000', letterSpacing: '0.71px' }} colSpan={this.props.headerTitles.length}
        >
          {
						this.showStockName(this.state.stockData.StockPositonName)
					}
        </TableHeaderColumn>
      </TableRow>
      <TableRow className='tableHeaderRowStyle'>
        { this.props.headerTitles.map((column, index) =>
          <TableHeaderColumn
            key={index} style={{ fontFamily: 'SourceHanSansCN-Bold', paddingLeft: 3, paddingRight: 3, fontSize: '18px',
              color: '#333333', letterSpacing: '0.26px', textAlign: 'center' }}
          >{column.title}</TableHeaderColumn>)
				}
      </TableRow>
    </TableHeader>)
  }


  constructRow = (item, index, orderIndex, productObject, listLength) => {
		/* Has to stay here since it check index of the row */
    let itemIDColumn,
      itemNumColumn;
        // const TableRowColumnStyle = {fontFamily: 'SourceHanSansCN-Regular!important',
        //     fontSize: '16px!important',color: '#53504F',letterSpacing: '0.23px'};

    console.debug('constructRow 1:', orderIndex, index);
    if (index === 0) {
      itemIDColumn = (
        <TableRowColumn rowSpan={listLength} className='tableRowColumnStyle'>{ productObject.MaterialID }</TableRowColumn>
			)
    }

    if (index === 0) {
      itemNumColumn = (
        <TableRowColumn rowSpan={listLength} className='tableRowColumnStyle'>{String(productObject.LastNumber)}</TableRowColumn>
            )
    }

    return (
      <TableRow key={`${orderIndex}+${index}`} >
        { itemIDColumn }
        { itemNumColumn }
        <TableRowColumn className='tableRowColumnStyle'>{ item.SPPH }</TableRowColumn>
        <TableRowColumn className='tableRowColumnStyle'>{ moment(item.SCRQ).format('YYYY-MM-DD') }</TableRowColumn>
        <TableRowColumn className='tableRowColumnStyle'>{ item.KCSL }</TableRowColumn>
      </TableRow>
    )
  }

  constructBody = () => (
    <TableBody {...this.props.tableBodyConfig}>
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
  AlreadySelect: product.AlreadySelect
}, array.length)
						)
}
				)
			}
    </TableBody>
	)

  render() {
    return (
      <div style={{ marginTop: '1.8rem' }} className='tableStyle'>
        <Table {...this.props.tableConfig}>
          { this.constructHeader() }
          { this.constructBody() }
        </Table>
      </div>
    )
  }
}

PrintTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
}

