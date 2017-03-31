/**
 * Created by wmt on 2016/11/29.
 */
import React, { Component, PropTypes } from 'react'
import OrderDetailForm from 'components/OrderDetailForm';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import AtSelect from 'components/AtSelect'
import AtMessage from 'components/AtMessage'
import CardUI from 'components/StandardUI/StandardCard';
import OrderGoodsDetailDateGrid from 'components/OrderGoodsDetailDateGrid';
import TextField from 'material-ui/TextField';
import GoBackButton from 'components/GoBackButton';

export default class ProcurementReviewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atSelect: [],
      atMessage: '',
      reviewMessage: ''
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleReviewMessageChange =(event) => {
    this.setState({ reviewMessage: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.procurementReviewDetail.result) {
      this.handleBack()
      this.props.initStore()
    }
  }

  handleAtSelectCallback =(result) => {
    this.setState({ atSelect: result })
  }

  handleAtMessageCallback =(result) => {
    this.setState({ atMessage: result })
  }

  handleBack =() => {
    this.context.router.push({
      pathname: '/procurementReview',
    });
  }

  handleReject =() => {
    this.props.postReview(this.props.params.id, '2', this.state.reviewMessage, this.state.atMessage, this.state.atSelect.map(o => o.id))
  }

  handleAgress =() => {
    this.props.postReview(this.props.params.id, '1', this.state.reviewMessage, this.state.atMessage, this.state.atSelect.map(o => o.id))
  }

  renderReview() {
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    const AtAddIcon = {
      top: '0'
    }
    return (
      <div className='col-lg-6 col-md-6 col-sm-12'>
        <CardUI expanded title='采购复核' avatar='/logistIcon/icon-07.png' label='必填' topStyle={topStyle}>
          <div className='cardSlectWrite' style={{margin:'0 auto'}}>
            <div className='inforFlex orderSlect' style={{marginTop:'3rem'}}>
              <span className='textFlexadd'>审核意见：</span>
              <div style={{ display: 'inline-block' }}>
                <TextField hintText='审核意见' className="AtTextFieldStyle" value={this.state.reviewMessage} onChange={this.handleReviewMessageChange}  />
              </div>
            </div>
            <div className='inforFlex orderSlect'>
              <span className='textFlexadd' style={{ lineHeight:'66px' }}>选择@谁：</span>
              <div style={{ display: 'inline-block' }}>
                <AtSelect style={{ height: '58px' }} className="AtTextFieldStyle"  AtAddIcon={AtAddIcon} organizationId={this.props.globalStore.organizationId} callback={this.handleAtSelectCallback} />
              </div>
            </div>
            <div className='inforFlex orderSlect'>
              <span className='textFlexadd'> 填写备注：</span>
              <div style={{ display: 'inline-block' }}>
                <AtMessage className="AtTextFieldStyle"  callback={this.handleAtMessageCallback} />
              </div>
            </div>
          </div>
        </CardUI>
      </div>
    )
  }

  render() {
    const { organizationId } = this.props.globalStore
    const goback = <GoBackButton />
    const actions =
      (<nav>
        <div style={{ display: 'inline-block' }}>
          <FlatButton label='返回' onTouchTap={this.handleBack} style={{marginRight:'20px'}}/>&nbsp;
        </div>
        <div style={{ display: 'inline-block' }}>
          <RaisedButton onTouchTap={this.handleReject} label='复核退回' style={{marginRight:'20px'}} labelColor='#fff' backgroundColor='#FF625B' buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }} />&nbsp;
        </div>
        <div style={{ display: 'inline-block' }}>
          <RaisedButton onTouchTap={this.handleAgress} label='复核通过' backgroundColor='#00BE9C' labelColor='#fff' buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }} />
        </div>
      </nav>);
    return (
      <StandardForm iconPosition={'-150px -120px'} title='采购复核' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='采购复核' actions={this.props.params.state == '0' ? actions : goback} showStep={false} expanded>
            <OrderDetailForm orderId={Number(this.props.params.id)} orgId={organizationId} position={0} sort={['OrderBasicInfoForm']}>
              {this.props.params.state == '0' ? this.renderReview() : ''}
            </OrderDetailForm>
            <OrderGoodsDetailDateGrid requredStatus={0} organizationID={organizationId} orderId={Number(this.props.params.id)} style={{ marginTop: '40px' }} />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    );
  }
}
