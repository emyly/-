/**
 * Created by SJF on 2016/11/7.
 */
import React, { Component, PropTypes } from 'react';
import DataGrid from 'components/DataGrid';
import './RecycledGoodsSummary.scss';

export default class RecycledGoodsSummary extends Component {

  constructor(props) {
    super(props);
    // 出入库：术后回收——商品的回收汇总
    this.state = {
      goodsexpanded: true
    }
  }

  static propTypes = {
    tableData: PropTypes.array,
  };
  handleGoods = (expanded) => {
    this.setState({
      goodsexpanded: expanded
    })
  };
  options = () => ({
    columnOptions: [
      {
        label: '物料编号',
        attr: 'SPBH',
      },
      {
        label: '商品名称',
        attr: 'SPMC',
      },
      {
        label: '商品批号',
        attr: 'SPPH',
      },
      {
        label: '商品描述',
        attr: 'SPMS',
      },
      {
        label: '订单总数量',
        attr: 'DGSL',
      },
      {
        label: '已使用数量',
        attr: 'LCSY',
      },
      {
        label: '已回收数量',
        attr: 'LCHS',
      },
      {
        label: '未回收数量',
        attr: 'WHS',
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    dataSource: this.props.tableData || [],
    showIndex: true
  });
  render() {
    return (
    // <Card expanded={this.state.goodsexpanded} onExpandChange={this.handleGoods}>
    //   <CardHeader
    //     title="回收商品汇总"
    //     actAsExpander={true}
    //     showExpandableButton={true}
    //     style={{borderBottom:'1px solid #EFEBE9'}}
    //
    //   />
    //   <CardText expandable={true}>

      <DataGrid
        options={this.options()}
        dataSource={this.props.tableData}
        dataGridStyle={{ margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
      />

        // <Table displaySelectAll={false} selectable={false}>
        //   <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        //     <TableRow>
        //       <TableHeaderColumn >物料编号</TableHeaderColumn>
        //       <TableHeaderColumn >商品名称</TableHeaderColumn>
        //       <TableHeaderColumn >商品批号</TableHeaderColumn>
        //       <TableHeaderColumn >商品描述</TableHeaderColumn>
        //       <TableHeaderColumn >订单总数量</TableHeaderColumn>
        //       <TableHeaderColumn >已使用数量</TableHeaderColumn>
        //       <TableHeaderColumn >已回收数量</TableHeaderColumn>
        //       <TableHeaderColumn >未回收数量</TableHeaderColumn>
        //     </TableRow>
        //   </TableHeader>
        //   <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
        //     {
        //       this.props.tableData.map((value, index) => {
        //         return (
        //           <TableRow key={value.SPBH}>
        //             <TableRowColumn>{value.SPBH}</TableRowColumn>
        //             <TableRowColumn>{value.SPMC}</TableRowColumn>
        //             <TableRowColumn>
        //               {value.SPPH}
        //             </TableRowColumn>
        //             <TableRowColumn>
        //               {value.SPMS}
        //             </TableRowColumn>
        //             <TableRowColumn>{value.DGSL}</TableRowColumn>
        //             <TableRowColumn>{value.LCSY}</TableRowColumn>
        //             <TableRowColumn>{value.LCHS}</TableRowColumn>
        //             <TableRowColumn>{value.WHS}</TableRowColumn>
        //           </TableRow>
        //         )
        //       })
        //     }
        //   </TableBody>
        // </Table>
    //   </CardText>
    // </Card>
    )
  }

}
