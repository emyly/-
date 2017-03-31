
import React, { Component, PropTypes } from 'react'
import StandardDataGrid from 'components/StandardDataGrid';
import DepositImprestDetailsDataGrid from 'components/DepositImprestDetailsDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import DepositImprestRegisterDialog from 'components/DepositImprestRegisterDialog';

export default class ImprestDetail extends Component {
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
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
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
        label={'预付款'}
        message={`您正在查看<${this.props.location.state.JGMC}>预付款明细`}
        iconPosition={'-0px -150px'}
      >
        <DepositImprestDetailsDataGrid isShowDeposit={false} location={this.props.location} />
        <DepositImprestRegisterDialog
          open={this.state.DepositImprestDialogOpen}
          type={this.state.DialogType}
          partnerObj={{ id: this.props.location.state.ZJXSID, name: this.props.location.state.JGMC }}
          handleTouchTapDialog={this.handleTouchRegisterDialog}
        />
      </StandardDataGrid>
    )
  }

}
