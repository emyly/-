import React, { Component, PropTypes } from 'react';
import PartnerSelect from 'components/PartnerSelect';
import AtSelect from 'components/AtSelect';
import debug from 'debug';
const log = debug('app:ReduxDemo');

export default class ReduxDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      PartnerId: ''
    }
  }

  handlePartnerData=(result) => {
    log(result)
  }

  render() {
    return (
      <div style={{ overflow: 'scroll', width: '100%', height: '90%' }}>
        <div>
          <PartnerSelect distributorId={900000000206} partnerType={'J'} callback={this.handlePartnerData} />
          <AtSelect organizationId={900000000207} callback={(result) => { console.log(result) }} />
        </div>
      </div>
    )
  }
}
