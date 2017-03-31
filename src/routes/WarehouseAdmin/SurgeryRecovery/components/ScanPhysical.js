/**
 * Created by SJF on 2016/11/8.
 */
import React, { Component, PropTypes } from 'react';
import RecycleGood from './RecycleGood';
import RaisedButton from 'material-ui/RaisedButton';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import BarCodeTextField from 'components/BarCodeTextField';

export default class ScanPhysical extends Component {
  state = {
    title: ''
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    addOrSubstractSurgeryRecoveryGoodsNum: PropTypes.func,
    surgeryRecoveryGoodsSummaryClearAll: PropTypes.func,
    surgeryRecoveryGoodsSummary: PropTypes.func,
    submitRecoveryGoods: PropTypes.func,
    editUnSurgeryRecoveryGoods: PropTypes.func,
    surgeryRecoveryGoodsSummaryData: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object,
    filterRecoveryGoods: PropTypes.func,
  };
  componentWillMount = () => {
    this.props.surgeryRecoveryGoodsSummary(this.props.params.id);
    if (this.props.location.state.type === 2) {
      this.setState({
        title: '扫描条形码'
      })
    } else {
      this.setState({
        title: '扫描实物'
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.surgeryRecoveryGoodsSummaryData.subStatus) {
      this.props.surgeryRecoveryGoodsSummaryClearAll();
      this.context.router.push('/surgeryRecovery');
    }
  }
  handleComplete = () => {
    this.props.submitRecoveryGoods(this.props.params.id, this.props.surgeryRecoveryGoodsSummaryData.data, this.props.location.state.params);
  }

  /* 扫描部分*/
  saomiaoDeal = (value) => {
    if (this.props.location.state.type === 1) {
      this.props.addOrSubstractSurgeryRecoveryGoodsNum(this.props.location.state.type, value.SPPHID, value.SL);
    } else {
      this.props.addOrSubstractSurgeryRecoveryGoodsNum(this.props.location.state.type, value.SPPHID, value.SL);
    }
  }
  /* 筛选商品*/
  filterGoods = () => {
    return (event) => {
      const filtStr = document.querySelector('#search').value;
      if (filtStr.trim().length > 0) { this.props.filterRecoveryGoods(filtStr) }
    }
  }
  render() {
    const filter = <div />;
    const scanStyle = {
      textAlign: 'right',
      height: '70px',
      background: '#EEECEC',
      padding: 20,
      boxShadow: '0 1px 5px #978c8c',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
    const actions =
      (<nav style={{ display: 'flex', alignItems: 'center' }}>
        <RaisedButton
          backgroundColor='#00A0FF'
          labelColor='#FFF'
          label='完成'
          style={{ marginLeft: '5px', color: 'white' }}
          onTouchTap={this.handleComplete}
        />
      </nav>);
    const moreActions = '';
    const otherActions = (<div style={scanStyle}>
      <BarCodeTextField
        showHint={false}
        style={{ height: '40px' }}
        buttonStyle={{ height: 40, borderRadius: '0 2px 2px 0' }}
        btnStyle={{ boxShadow: 'none',
          height: '40px',
          minWidth: '30px',
          lineHeight: '40px',
          position: 'relative',
          top: '-1px',
          marginLeft: 0,
          width: 60 }}
        definitionStyle={{
          inputStyle: { paddingLeft: '30px', background: 'url(/surgeryRecovery/saomiao.png) no-repeat 1% 50%' },
          hintStyle: { paddingLeft: '30px',
            top: '8px',
            fontFamily: 'SourceHanSansCN-Regular',
            fontSize: '14px',
            color: '#808080',
            letterSpacing: 0.5 }
        }}
        hintText={'扫描区域'} inOut={false} orderId={Number(this.props.params.id)} orderType={'2'} onChange={this.saomiaoDeal}
      />
      <div className='surgerySearchWrapper'>
        <input id='search' className='surgerySearch' placeholder='关键词查找' type='text' />
        <RaisedButton
          labelColor='#fff'
          backgroundColor='#00BE9C'
          onClick={this.filterGoods()}
          buttonStyle={{ height: 40, borderRadius: '0px' }}
          style={{ boxShadow: 'none', height: '40px', minWidth: '30px', lineHeight: '40px' }}
          label='搜索'
        />
      </div>
    </div>);
    return (
      <StandardForm iconPosition='-60px -60px' title={this.state.title} message='...' filter={filter} moreActions={moreActions}>
        <StandardFormCardList activeStep={1}>
          <StandardFormCard stepName='查看详情' showStep={false} completed showContent={false} />
          <StandardFormCard
            message={`您当前正在处理的订单号为<${this.props.params.id}>`}
            title='手术' stepName='回收' otherActions={otherActions} actions={actions} avatar='fg-128.jpg' showContent showStep={false} expanded
          >
            <div>
              <RecycleGood
                editUnRecovery={this.props.editUnSurgeryRecoveryGoods}
                currentID={this.props.surgeryRecoveryGoodsSummaryData.currentID}
                addOrSubstractSurgeryRecoveryGoodsNum={this.props.addOrSubstractSurgeryRecoveryGoodsNum}
                tableData={this.props.surgeryRecoveryGoodsSummaryData.data} valueData={this.props.location.state.type}
              />
            </div>
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    )
  }
}
