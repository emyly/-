

import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import PageBar from 'components/PageBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import FilterTabs from 'components/FilterTabs';

export default class TableGridUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_body_data: {},
      orderState: 1
    }
  }

  handleOrderStateDropDownMenuChange = value => this.setState({ orderState: value });

  render() {
    const style = {
      margin: 12,
    };

    const pagination = {
      currentPage: 1,
      totalCount: 40,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.getPageData(page)
      }
    }
    const filter = <FilterTabs tabs={['待审核订单', '已审核订单', '全部订单']} callback={this.handleOrderStateDropDownMenuChange} />;

    const actions =
        (<nav>
          <RaisedButton
            label='创建某某'
            primary
            icon={<ContentAddCircle />}
            style={{ marginLeft: '5px' }}
          />
          <RaisedButton
            label='创建某某'
            primary
            icon={<ContentAddCircle />}
            style={{ marginLeft: '5px' }}
          />
        </nav>)
      ;

    const moreActions = [
      <MenuItem primaryText='更多1' key='btn1' />,
      <MenuItem primaryText='更多2' key='btn2' />
    ]
      ;

    return (
      <div>
        <StandardDataGrid
          avatar={'/topNavIcon/0-0-01.png'}
          title='订单审核' message='您可以从这里审核您的经销商或您的销售代表提交的订单，也可以查看已经通过审核的订单
' filter={filter} actions={actions} moreActions={moreActions} filterTitle='按订单状态筛选：'
        >
          <Table displaySelectAll={false} selectable={false} onCellClick={this.handleCellClick}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>供货商</TableHeaderColumn>
                <TableHeaderColumn>物流单号</TableHeaderColumn>
                <TableHeaderColumn>入库单号</TableHeaderColumn>
                <TableHeaderColumn>入库时间</TableHeaderColumn>
                <TableHeaderColumn>入库仓库</TableHeaderColumn>
                <TableHeaderColumn>操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows showRowHover>
              <TableRow>
                <TableRowColumn>xxxxxxx有限公司</TableRowColumn>
                <TableRowColumn>121212121212</TableRowColumn>
                <TableRowColumn>12121212121</TableRowColumn>
                <TableRowColumn>2012/12/12</TableRowColumn>
                <TableRowColumn>12</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label='审核订单' style={style} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <PageBar {...pagination} />
        </StandardDataGrid>
      </div>
    )
  }
}
