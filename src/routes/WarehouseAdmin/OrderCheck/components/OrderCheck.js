/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import DepotSelectDialogByText from 'components/DepotSelectDialogByText';
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid';
import PrintOrderGoodsDetailDataGrid from '../containers/PrintOrderGoodsDetailDataGridContainer'
import PrintOrderDetailTable from '../containers/PrintOrderDetailTableContainer'
import SuccessRaisedButton from '../containers/SuccessRaisedButtonContainer';
import BackRaisedButton from '../containers/BackRaisedButtonContainer';
import RaisedButton from 'material-ui/RaisedButton';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import CardUI from 'components/StandardUI/StandardCard';
import OrderDetailForm from 'components/OrderDetailForm';
import './OrderCheck.scss'
import GoBackButton from 'components/GoBackButton';

export default class orderCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Index: null, // 出库仓库id
      atMessage: '', // 留言
      atSelect: [], // 被通知人id数组
      SelectDialogexpanded: true,
      OrderGoodsexpanded: true,
      title: '订单审核',
      lable: '必填',
      avatar: '',
      error: '',
      verify: false
    }
  }

  static propTypes = {
    /**
     * 当前订单id
     */
    // orderId: React.PropTypes.number.isRequired,
    /**
     * 当前组织机构id
     */
    // orgId: React.PropTypes.number.isRequired
    style: PropTypes.object,
    params: PropTypes.object,
    globalStore: PropTypes.object,
    location: PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleButtonClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleCallback = (returnValue) => {
    this.setState({ Index: returnValue.id });
  };

  handleAtMessageCallback = (returnValue) => {
    this.setState({ atMessage: returnValue });
  };

  handleAtSelectCallback= (returnValue) => {
    this.setState({ atSelect: returnValue });
  };

  handleForwarding = () => {
    this.context.router.push('/orderCheckList/OrderForwarding');
  };

  callbackComponentArray =(componentArray) => {
    // 注意：禁止在此处回传空数组
    this.setState({ componentArray: componentArray.slice(0) })
  }
// 基本信息
  OrderDetailForm = () => <div>
    <OrderDetailForm
      orderId={Number(this.props.params.id)}
      orgId={this.props.globalStore.organizationId}
      position={0} sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}
    >
      {this.SelectDialog()}
    </OrderDetailForm>
  </div>
    // return  <div>
    //   <OrderBasicInfoForm orderId={Number(this.props.params.id)}/>
    // </div>
  ;
  handleSelectDialogOnExpandChange = (expanded) => {
    this.setState({
      SelectDialogexpanded: expanded
    })
  };
  handleOrderGoodsOnExpandChange = (expanded) => {
    this.setState({
      OrderGoodsexpanded: expanded
    })
  };

// 选择发货仓库//@谁//留言
  SelectDialog = () => {
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    // const spanIcon = {
    //   display: 'inline-block',
    //   width: '36px',
    //   height: '36px',
    //   background: 'url(/orderCheckIcon/icon-11.png) no-repeat'
    // }
    return (<div>
      {
        (
          () => {
            if (Number(this.props.location.state.orderState) === 0) {
              return (
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <CardUI expanded topStyle={topStyle} title='订单审核' avatar='/logistIcon/icon-07.png' label='必填' CardTextStyle={{ overflowY: 'auto' }}>
                    <div className='cardSlectWrite orderSlectTop' style={{ margin: '0 auto' }}>
                      <div className='inforFlex orderSlect' style={{ marginTop: '3rem' }}>
                        <span className='textFlexadd'>选择发货仓库：</span>
                        <div style={{ display: 'inline-block' }}>
                          <DepotSelectDialogByText
                            ifShowOutStockTips isShowAddIcon className='AtTextFieldStyle'
                            errorText={this.state.verify && !this.state.Index && <div className='warning'>请选择出库仓库</div>}
                            style={{ width: '100%', paddingRight: '24px' }}
                            orderId={Number(this.props.params.id)}
                            currentOrg={this.props.globalStore.organizationId}
                            ifStorage={false} ifShowOrder callback={this.handleCallback}
                          />
                        </div>
                      </div>
                      <div className='inforFlex orderSlect'>
                        <span className='textFlexadd'>选择@谁：</span>
                        <div style={{ display: 'inline-block' }} >
                          <AtSelect
                            className='AtTextFieldStyle'
                            organizationId={this.props.globalStore.organizationId}
                            callback={this.handleAtSelectCallback} isShowAddIcon
                          />
                        </div>
                      </div>
                      <div className='inforFlex'>
                        <span className='textFlexadd'>填写备注：</span>
                        <div style={{ display: 'inline-block' }}>
                          <AtMessage className='AtTextFieldStyle' callback={this.handleAtMessageCallback} rowsMax={8} />
                        </div>
                      </div>
                    </div>
                  </CardUI>
                </div>
              )
            }
          }
        )()
      }
    </div>)
  };
// //基本信息
//    OperationPersonnelInfoForm = () =>{
//      return  <div>
//        <OperationPersonnelInfoForm  orderId={Number(this.props.params.id)} orgId={this.props.globalStore.organizationId} position={1}/>
//      </div>
//    };
  // 商品清单
  OrderGoodsDetailDateGrid = () => <div>
    <OrderGoodsDetailDateGrid
      requredStatus={0}
      organizationID={this.props.globalStore.organizationId}
      orderId={Number(this.props.params.id)}
      style={{ marginTop: '40px' }}
    />
  </div>;
  // 数据显示

  showdata = () => <div className='OrderCheck-content'>
    <div >
      {this.OrderDetailForm()}
    </div>
    {this.OrderGoodsDetailDateGrid()}
  </div>;

  handleSuccessRaisedButtonClick=() => {
    this.setState({ verify: true });
  }
  print = () => {
    const printDom = document.getElementById('printWrapper');
    const root = document.querySelector('#root');
    root.style.display = 'none';
    document.body.appendChild(printDom);
    printDom.style.display = 'block';
    window.print();
    // document.body.removeChild(printDom);
    root.style.display = 'block';
    printDom.style.display = 'none';
    // window.document.body.innerHTML = body;
    // location.reload();
  }
  render() {
    const style = {
      float: 'right',
      width: '120px',
      marginRight: '28px'
    };
    const actions =
      (<nav style={{ display: 'flex', alignItems: 'center' }}>
        <GoBackButton style={{ width: '120px', height: '36px', marginRight: '30px' }} />
        <div style={{ display: 'inline-block' }}>
          <RaisedButton
            label='打印'
            labelColor='#fff'
            backgroundColor='#FFA95D'
            buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
            style={style}
            onTouchTap={this.print}
          />
        </div>
        <div style={{ display: 'inline-block' }}>
          <RaisedButton
            label='转单'
            labelColor='#fff'
            backgroundColor='#FFA95D'
            buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
            onTouchTap={this.handleForwarding}
            style={style}
            disabled
          />
        </div>
        <div style={{ display: 'inline-block' }}>
          <BackRaisedButton orderId={Number(this.props.params.id)} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <SuccessRaisedButton
            orderId={Number(this.props.params.id)}
            CKCK={this.state.Index} TZNR={this.state.atMessage}
            BTZR={this.state.atSelect.map(user => user.id)}
            onClick={this.handleSuccessRaisedButtonClick}
          />
        </div>
      </nav>);
    const checkedActions = (<nav style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'inline-block' }}>
        <RaisedButton
          label='打印'
          labelColor='#fff'
          backgroundColor='#FFA95D'
          buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
          style={style}
          onTouchTap={this.print}
        />
      </div>
    </nav>);
    return (
      <StandardForm iconPosition='-30px 0' title='订单审核' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard
            title='订单详情'
            message=''
            actions={Number(this.props.location.state.orderState) === 0 ? actions : checkedActions}
            showStep={false} expanded
          >
            {
              this.showdata()
            }
            <div id='printWrapper' style={{ display: 'none' }}>
              <div id='printContent'>
                <PrintOrderDetailTable orderId={Number(this.props.params.id)} />
                <PrintOrderGoodsDetailDataGrid />
              </div>
            </div>

          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>

    )
  }
}
