import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import co from 'co';

const log = require('debug')('app:BdMap')

class BdMap extends Component {
  static selected = Symbol('selected');
  static isMarker = Symbol('isMarker');

  static propTypes = {
    id: PropTypes.string,
    // onSelect: PropTypes.func,
    // navTo: PropTypes.func,
    // marker: PropTypes.array,
    // scale: PropTypes.number,
    style: PropTypes.object,
    // city: PropTypes.string,
    // gpsPath: PropTypes.object,
    // mouseScale: PropTypes.bool,
    centerMarker: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.id = props.id || 'allmap';
    this.loadComplete = false;
  }

  loadJScript = () => {
    log('loadJScript...')
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.map.baidu.com/api?v=2.0&ak=V7AzRhlEeb8jFurQWWRqanqUGpMESGlZ&s=1&callback=initMap';
    document.body.appendChild(script);
  }

  initMap = () => {
    log('initMap...');
    const BMap = window.BMap;
    // 创建地址解析器实例
    this.geoc = new BMap.Geocoder();
    const myMap = this.myMap = new BMap.Map(this.id);
    myMap.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    myMap.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    myMap.addControl(new BMap.OverviewMapControl());              // 添加缩略地图控件
    if (this.state.mouseScale) {
      myMap.enableScrollWheelZoom();                            // 启用滚轮放大缩小
    }
    myMap.addControl(new BMap.MapTypeControl());          // 添加地图类型控件
    myMap.addEventListener('click', this.onSelect);
    // myMap.centerAndZoom(new BMap.Point(116.331398, 39.897445), this.props.scale);
    myMap.centerAndZoom(new BMap.Point(120.143835, 30.275817), this.state.scale);
    // myMap.centerAndZoom(this.props.city, this.props.scale);
    myMap.addEventListener('tilesloaded', () => {
      if (!this.loadComplete) {
        this.initPointAndPath();
      }
      this.loadComplete = true;
    });

      // 添加定位控件
    const geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener('locationSuccess', (e) => {
      // 定位成功事件
      log(e.message);
    });
    geolocationControl.addEventListener('locationError', (e) => {
    // 定位失败事件
      log(e.message);
    });
    myMap.addControl(geolocationControl);
  }

  initPointAndPath = () => {
    this.parseMarker(this.state.marker, this.state.city);
    // this.myMap.clearOverlays();
    // this.marker(...this.state.marker);
    // if (!_.isNil(this.state.gpsPath)) {
    //   this.gpsPath(this.state.gpsPath);
    // }
  }

  onSelect = (e) => {
    if (!e.overlay || !e.overlay.point[BdMap.isMarker]) {
      co(function *(self) {
        const rs = yield self.getLocation(e.point);
        self.state.onSelect(rs[0], rs[1], e, rs[2]);
      }(this));
    } else {
      this.state.onSelect(e.overlay.point, e.overlay.getLabel().content, e);
    }
  }

  /**
   * 地标关键字搜索
   * @memberOf BdMap
   */
  search = (keyword) => {
    const local = new window.BMap.LocalSearch(this.myMap, {
      renderOptions: { map: this.myMap },
      onInfoHtmlSet: (poi) => {
        if (_.isFunction(this.state.onSelect)) {
          this.state.onSelect(keyword, poi.marker.getPosition());
        }
      }
    });
    local.search(keyword);
  }

  pathSearchHandle = (drv, cb) => {
    if (!_.isFunction(cb)) return;
    return (res) => {
      cb(res);
      // if (drv.getStatus() !== window.BMAP_STATUS_SUCCESS) {
      //   return;
      // }
      // if (drv.getStatus() === window.BMAP_STATUS_SUCCESS) {
      // }
    }
  }

  /**
   * 在地图上画出2点间的导航路线,第三个参数表示检索2点间优先按哪种算法：0:最少时间(默认)，1:最短距离，2:避开高速
   * @memberOf BdMap
   */
  gpsPath = ({ start, end, policy = 0 }) => {
    if (_.isNil(start) || _.isNil(end)) return;
    // 三种驾车策略：最少时间，最短距离，避开高速
    const routePolicy = [
      window.BMAP_DRIVING_POLICY_LEAST_TIME,
      window.BMAP_DRIVING_POLICY_LEAST_DISTANCE,
      window.BMAP_DRIVING_POLICY_AVOID_HIGHWAYS,
    ];
    // 实例化一个驾车导航用来生成路线
    const drv = new window.BMap.DrivingRoute(this.myMap, {
      renderOptions: {
        map: this.myMap,
        autoViewport: true,
        enableDragging: true, // 起终点可进行拖拽
        panel: 'gpsPath',
      },
      policy: routePolicy[policy],
      // onSearchComplete: this.pathSearchHandle(drv),
    });
    drv.search(start, end);
  }

  /**
   * 增加点
   * @memberOf BdMap
   */
  addPoint = (point, add, e) => {
    // this.markerPlace(e);
    const overlays = this.state.overlays;
    overlays.push([point, add]);
    this.setState({ overlays });
  }

  /**
   * 删除点
   * @memberOf BdMap
   */
  removePoint = (e) => {
    const overlay = e.overlay;
    if (overlay) {
      this.myMap.removeOverlay(overlay);
    }
  }

  /**
   * 替换点
   * @memberOf BdMap
   */
  replacePoint = (point, add, e) => {
    const overlays = [[point, add]];
    this.setState({ overlays });
  }

  /**
   * 选中已存在的点(多选)
   * @memberOf BdMap
   */
  addSelectPoint = (e) => {
    const overlay = e.overlay;
    if (overlay) {
      const pt = e.overlay.point;
      pt[BdMap.selected] = true;
      this.addMarker(pt, overlay.getLabel().content);
      this.myMap.removeOverlay(overlay);
    }
  }

  /**
   * 选中已存在的点(单选)
   * @memberOf BdMap
   */
  selectOnePoint = (e) => {
    const overlay = e.overlay;
    const pt = e.overlay.point;
    if (overlay) {
      this.myMap.getOverlays().map((o) => {
        if (o === overlay) {
          pt[BdMap.selected] = true;
          o.setIcon(this.getSelectedIcon());
        } else {
          pt[BdMap.selected] = false;
          if (_.isFunction(o.setIcon)) {
            o.setIcon(this.getSelectedIcon(false));
          }
        }
      });
    }
  }

  /**
   * 标记点
   * @memberOf BdMap
   */
  markerPlace = (e, replace = false) => {
    co(function *(self) {
      const rs = yield self.getLocation(e.point);
      if (replace) {
        self.myMap.clearOverlays();
      }
      self.addMarker(e.point, rs.address);
    }(this));
  }

  /**
   * 定位到地址
   * @memberOf BdMap
   */
  nav2Address = (add, cb) => {
    this.geoc.getPoint(add, (pt) => {
      if (pt) {
        this.myMap.clearOverlays();
        this.myMap.centerAndZoom(pt, this.state.scale);
        this.addMarker(pt, add);
      }
      if (cb) cb(pt, add);
    }, this.state.city);
  }

  /**
   * 定位到点（经纬度）
   * @memberOf BdMap
   */
  nav2Point = (pt, cb) => {
    this.geoc.getLocation(pt, (rs) => {
      let add;
      if (rs) {
        this.myMap.clearOverlays();
        this.myMap.centerAndZoom(pt, this.state.scale);
        add = this.getNormalAddress(rs);
        this.addMarker(pt, add);
      }
      if (cb)cb(add, pt);
    });
  }

  /**
   * 异步获取地址对应的坐标点
   * @memberOf BdMap
   */
  getPoint = (add, city) => {
    log('add===', add, city);
    return new Promise((resolve, reject) => {
      this.geoc.getPoint(add.address, (pt) => {
        if (pt) {
          pt[BdMap.selected] = add[BdMap.selected];
          if (this.props.centerMarker) {
            this.myMap.centerAndZoom(pt, this.state.scale);
          }
          resolve([pt, add.address, add]);
        } else {
          reject();
        }
      }, city);
    });
  }

  /**
   * 异步获取点对应的地址
   * @memberOf BdMap
   */
  getLocation = apt => new Promise((resolve, reject) => {
    this.geoc.getLocation(apt, (add) => {
      if (add) {
        const address = this.getNormalAddress(add);
        if (this.props.centerMarker) {
          this.myMap.centerAndZoom(apt, this.state.scale);
        }
        resolve([apt, address, add]);
      } else {
        reject();
      }
    });
  })

  /**
   * 结构化地址转普通文本地址
   * @memberOf BdMap
   */
  getNormalAddress = add =>
    // return `${addComp.province},${addComp.city},${addComp.district},${addComp.street},${addComp.streetNumber}`;
     add.address

  /**
   * 在地图上标记一组点（经纬度）
   * @memberOf BdMap
   */
  markerPoints = (...pts) => {
    pts.forEach((ptItem) => {
      const pt = ptItem.point;
      const apt = new window.BMap.Point(pt.lng, pt.lat);
      this.geoc.getLocation(apt, (rs) => {
        if (rs) {
          if (!_.isNil(ptItem.selected)) {
            apt[BdMap.selected] = ptItem.selected;
          }
          const add = this.getNormalAddress(rs);
          this.addMarker(apt, add);
        }
      });
    });
  }

  /**
   * 在地图上标记一组地址
   * @memberOf BdMap
   */
  markerAddress = (...adds) => {
    adds.forEach((addItem) => {
      const add = addItem.address;
      this.geoc.getPoint(add, (pt) => {
        if (pt) {
          if (!_.isNil(addItem.selected)) {
            pt[BdMap.selected] = addItem.selected;
          }
          this.addMarker(pt, add);
        }
      }, this.state.city);
    });
  }

  /**
   * 批量解析地址，返回promise
   * @memberOf BdMap
   */
  parseAddress = (city, ...adds) => adds.map((add) => {
    if (!_.isNil(add.selected)) {
      add[BdMap.selected] = add.selected;
    }
    return this.getPoint(add, city);
  })

  /**
   * 批量解析点，返回promise
   * @memberOf BdMap
   */
  parsePoints = (...pts) => {
    const a = pts.map((pt) => {
      const apt = new window.BMap.Point(pt.point.lng, pt.point.lat);
      if (!_.isNil(pt.selected)) {
        apt[BdMap.selected] = pt.selected;
      }
      return this.getLocation(apt);
    });
    return a;
  }

  /**
   * 解析输入的点
   * @memberOf BdMap
   */
  parseMarker = (markers, city) => {
    if (_.isNil(markers)) return;
    const points = this.parsePoints(...markers.filter(item => !_.isNil(item.point)));
    const address = this.parseAddress(city, ...markers.filter(item => !_.isNil(item.address)));
    co(function *(self) {
      const realPoints = yield [...points, ...address];
      self.setState({ overlays: realPoints });
    }(this));
  }

  marker = (...add) => {
    if (_.isNil(add)) return;
    add.forEach((item) => {
      if (!_.isNil(item.point)) {
        this.markerPoints(item);
      } else if (!_.isNil(item.address)) {
        this.markerAddress(item);
      }
    });
  }

  /**
  * 添加标记
  * @memberOf BdMap
  */
  addMarker = (point, add) => {
    let icon;
    if (point[BdMap.selected]) {
      icon = this.getSelectedIcon();
    } else {
      icon = this.getSelectedIcon(false);
    }
    point[BdMap.isMarker] = true;
    const marker = new window.BMap.Marker(point, { icon });
    this.myMap.addOverlay(marker);
    const label = new window.BMap.Label(add, { offset: new window.BMap.Size(20, -10) });
    marker.setLabel(label);
  }

  /**
   * 获取选中状态的图标
   * @memberOf BdMap
   */
  getSelectedIcon = (isSelected = true) => {
    const offsetY = isSelected ? (-10 * 25) : (-11 * 25)
    return new window.BMap.Icon('http://api.map.baidu.com/img/markers.png', new window.BMap.Size(23, 25), {
      offset: new window.BMap.Size(10, 25), // 指定定位位置
      anchor: new window.BMap.Size(10, 25), // 指定基准位置
      imageOffset: new window.BMap.Size(0, offsetY) // 设置图片偏移
    });
  };

  markOverlays = (overlays = []) => {
    log('overlays===', overlays);
    if (this.myMap) {
      this.myMap.clearOverlays();
    }
    overlays.map((row) => {
      this.addMarker(row[0], row[1]);
    });
  }

  // componentWillMount () {
    // _.extend(BMapLib.LuShu.prototype, {
    // })
    // const script1 = document.createElement('script');
    // script1.src = 'http://api.map.baidu.com/api?v=2.0&ak=V7AzRhlEeb8jFurQWWRqanqUGpMESGlZ';
    // script1.type = 'text/javascript';
    // script1.async = true;
    // document.head.appendChild(script1);
    // script1.onload = function () {
      // const script2 = document.createElement('script');
      // script2.async = true;
      // script2.type = 'text/javascript';
      // script2.src = 'http://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js';
      // document.head.appendChild(script2);
      // alert(123);
      // log(BMapLib);
    // }
  // }

  componentWillMount() {
    log('componentWillMount...');
    this.setState({ ...this.props });
    // window.onload = BdMap.loadJScript;
  }

  componentDidMount() {
    log('componentDidMount...');
    // window.onload = BdMap.loadJScript;
    this.initMap();
    // this.setState({...this.props});
  }

  componentWillReceiveProps(nextProps) {
    log('componentWillReceiveProps...');
    this.parseMarker(nextProps.marker, nextProps.city);
    // this.setState({...nextProps});
    // this.initPointAndPath();
    // this.initMap();
  }

  shouldComponentUpdate(nextProps, nextState) {
    log('shouldComponentUpdate...');
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    log('componentWillUpdate...');
  }

  render() {
    log('render...');
    this.markOverlays(this.state.overlays);
    return (<div><div id={this.id} style={{ ...this.props.style }} /><div id='gpsPath' /></div>);
  }
}

export default BdMap;
