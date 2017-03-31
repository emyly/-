/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/30.
 */
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import co from 'co';
import BdMap from 'components/BdMap';

const log = require('debug')('app:BdMapDemo');

/**
 * 百度地图demo
 * @export
 * @class BdMapDemo
 * @extends {Component}
 */
export default class BdMapDemo extends Component {

  static propTypes = {
    getData: PropTypes.func.isRequired,
    data: PropTypes.object,
  };

  componentWillMount() {
    this.setState({
      marker: [
        { address: '杭州市西湖区文一路115号', selected: true },
        { point: { lat: 30.294264, lng: 120.138427 }, selected: true },
        { point: { lat: 30.299602, lng: 120.139821 } },
        { point: { lat: 30.294488, lng: 120.141115 } },
        { point: { lat: 30.294488, lng: 120.142115 } },
      ]
    });
  }

  // onSelect = (address, point, e) => {
  //   log(address);
  //   log(point);
    // if (!e.overlay) {
    //   this.setState({marker: [...this.state.marker, {point, selected: true}]});
    // }
  // }

  onSelect = (point, add, e) => {
    log(point);
    log(add);
    if (!e.overlay) {
      // this.refs.myBdMap.replacePoint(point, add, e);
      // this.refs.myBdMap.addPoint(point, add, e);
      this.setState({ marker: [{ point, selected: true }] });
    } else {
      // log(e.overlay.point);
      // log(e.overlay.getLabel().content);
      this.refs.myBdMap.selectOnePoint(e);
    }
  }

  render() {
    log('render...');
    return (
      <div>
        <BdMap
          id='myBdMap' ref='myBdMap' city='杭州市' scale={14} style={{ height: 600 }}
          // gpsPath={{start: '白荡海', end: '浙二医院'}}
          mouseScale={false}
          onSelect={this.onSelect}
          marker={this.state.marker}
        />
      </div>
    );
  }
}
