import React, { Component, PropTypes } from 'react'

export default class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {this.props.children}
      </div>
    )
  }

}
