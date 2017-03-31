/**
 * Created by qyf on 2016/12/6.
 */
/**
 * Created by zhanglei on 2016/10/31.
 */


import React, { Component, PropTypes } from 'react';
import CardUI from 'components/StandardUI/StandardCard';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import OrderBasicInfoForm from 'components/OrderBasicInfoForm'
export default class DataGridDemo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CardUI expanded title={this.props.title} avatar={this.props.avatar} label={this.props.label}>
          <OrderBasicInfoForm requredStatus={1} organizationID={900000000207} currentPageCount={13} pageCountPerPage={21} />
        </CardUI>
      </div>
    )
  }

}

