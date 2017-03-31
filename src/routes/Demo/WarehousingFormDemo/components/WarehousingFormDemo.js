/**
 * Created by qyf on 2016/11/12.
 */
import React, { Component, PropTypes } from 'react';
import WarehousingForm from 'components/WarehousingForm'

export default class WarehousingFormDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Index: 0
    }
  }


  render() {
    return (
      <div >
        <WarehousingForm orderID={1212} />
      </div>
    )
  }

}
