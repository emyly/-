

import React, { Component, PropTypes } from 'react';

import './DepotSelectDialogDemo.scss';
import BarCodeTextField from 'components/BarCodeTextField';
import DepotSelectDialog from 'components/DepotSelectDialog';
import DepotSelectDialogByText from 'components/DepotSelectDialogByText';
import moment from 'components/Moment';

const a = 1;
export default class DepotSelectDialogDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Index: 0
    }
  }

  componentWillMount = () => {
    // let newMoment = new Moment(1);
  }

  handleButtonClick = () => {
    console.log('handleButtonClick');
    this.setState({ open: !this.state.open });
  };

  handleCallback = (returnValue) => {
    console.log(returnValue.id);
    this.setState({ Index: returnValue.id });
  };

  barcodeChange = (event) => {
    console.log('barcodeChange:', event);
  };

  render() {
    return (
      <div>
        <div className='DepotSelectDialogDemo'>
          <button onClick={this.handleButtonClick}>testDialogDepotSelect</button>

          <DepotSelectDialog handleButtonClick={this.handleButtonClick} open={this.state.open} orderId={900000000120} ifStorage ifShowOrder callback={this.handleCallback} />
          <div>
            {
              this.state.Index
            }
          </div>
          <BarCodeTextField onChange={this.barcodeChange} hintText={'测试扫描框'} inOut StorageId={0} />
        </div>
        <div className={'row'}>
          <div className={'col-sm-6'} style={{ backgroundColor: 'red' }}>{moment().format('YYYY-MM-DD')}</div>
          <div className={'col-sm-2'} style={{ backgroundColor: 'yellow' }}>{moment('').format('YYYY-MM-DD')}</div>
          <div className={'col-sm-4'} style={{ backgroundColor: 'blue' }}>3</div>
        </div>
      </div>
    )
  }

}


// function MomentInterval(x){
//   this.x = x;
// }

// MomentInterval.prototype = ParenMoment();
// MomentInterval.prototype.format = function(y){
//   return y;
// }

