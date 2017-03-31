
import React, { Component, PropTypes } from 'react'
import StandardDataGrid from 'components/StandardDataGrid';
import DepositImprestDetailsDataGrid from 'components/DepositImprestDetailsDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import DepositImprestRegisterDialog from 'components/DepositImprestRegisterDialog';

export default class DepositDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DepositImprestDialogOpen: false,
      DialogType: '0'   // '0'表示押金收款 '1'表示押金退款
    }
  }

  componentWillMount() {

  }
  /**
   * 登记Dialog
   */
  handleRegisterDialogOpen = type => () => {
    this.setState({
      DepositImprestDialogOpen: true,
      DialogType: type
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
    const actions = (<nav style={{ display: 'flex', flexFlow: 'row nowrap' }}>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        label='退款登记' onTouchTap={this.handleRegisterDialogOpen('1')}
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#FF625B' buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
      <RaisedButton
        label='收款登记' onTouchTap={this.handleRegisterDialogOpen('0')}
        style={{ width: '120px' }} backgroundColor='#00BE9C' labelColor='#fff'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='押金管理'
        actions={actions}
        label={'押金'}
        message={`您正在查看<${this.props.location.state.JGMC}>押金明细`}
        iconPosition={'-210px -120px'}
      >
        <DepositImprestDetailsDataGrid isShowDeposit location={this.props.location} />
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
