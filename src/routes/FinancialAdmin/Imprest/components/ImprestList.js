
import React, { Component, PropTypes } from 'react'
import StandardDataGrid from 'components/StandardDataGrid';
import DepositImprestDataGrid from 'components/DepositImprestDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import DepositImprestRegisterDialog from 'components/DepositImprestRegisterDialog';

export default class ImprestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DepositImprestDialogOpen: false,
      DialogType: '2'   // '2'表示预付款收款登记
    }
  }

  componentWillMount() {

  }

  /**
   * 登记Dialog
   */
  handleRegisterDialogOpen = () => () => {
    this.setState({
      DepositImprestDialogOpen: true
    });
  };
  /**
   * 切换当前登记Dailog开关状态
   */
  handleTouchRegisterDialog = () => {
    this.setState({
      DepositImprestDialogOpen: !this.state.DepositImprestDialogOpen
    });
  };
  render() {
    const actions = (<nav>
      <RaisedButton
        label='收款登记' onTouchTap={this.handleRegisterDialogOpen()}
        style={{ width: '120px' }} backgroundColor='#00BE9C' labelColor='#fff'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='预付款管理'
        actions={actions}
        iconPosition={'-0px -150px'}
      >
        <DepositImprestDataGrid isShowDeposit={false} />
        <DepositImprestRegisterDialog
          open={this.state.DepositImprestDialogOpen}
          type={this.state.DialogType}
          partnerObj={{}}
          handleTouchTapDialog={this.handleTouchRegisterDialog}
        />
      </StandardDataGrid>
    )
  }

}
