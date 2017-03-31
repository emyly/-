/**
 * Created by chenming on 2016/12/1.
 */
import React, { Component, PropTypes } from 'react';
import StandardDataGrid from 'components/StandardDataGrid';

export default class WarehouseGeneral extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }
  render() {
    return (
      <StandardDataGrid iconPosition='0px -120px' message='' title='仓库概况' filterTitle='按发货状态筛选：'>
        {this.props.children}
      </StandardDataGrid>
    )
  }

}
