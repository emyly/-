
/**
 * Created by NXQ on 12/2/2016.
 */


import React, { Component, PropTypes } from 'react';

import './EchartsPie.scss';

import ReactEcharts from 'echarts-for-react';

/**
 * 使用场景:Echart饼状图
 */
export default class EchartsPie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: `{a} <br/>{b}: {c} ${this.props.isSimpleShow ? '' : '({d}%)'}`
        },
        series: [
          {
            name: '额度使用情况',
            type: 'pie',
            radius: ['70%', '85%'],
            avoidLabelOverlap: false,
            clockwise: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
            },
            data: []
          }
        ]
      }
    }
  }
  static defaultProps = {
    /**
     * 注:挑选了部分常用属性，如使用到其他属性自行添加入参及入参默认值
     */
    isSimpleShow: false,
    label: '总信用额度'
  };
  static propTypes = {
    /**
     * 是否是显示一个简单的饼状
     */
    isSimpleShow: PropTypes.bool,
    /**
     * 饼图中间的label
     */
    label: PropTypes.string
  };
  componentWillMount = () => {
    this.state.option.series[0].data = this.props.seriesData;
    this.setState({ option: this.state.option });
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.seriesData) {
      this.state.option.series[0].data = nextProps.seriesData;
      this.setState({ option: this.state.option });
    }
  };
  /**
   * 百分比转换
   */
  Percentage = (num, total) => {
    if (total === 0) {
      return '0%'
    } else {
      return (`${Math.round(num / total * 10000) / 100.00}%`);// 小数点后两位百分比
    }
  };
  render() {
    return (
      <div className='echarts-pie' style={{ justifyContent: this.props.isSimpleShow ? 'center' : 'space-between' }}>
        {
            (() => {
              if (!this.props.isSimpleShow) {
                return (<div className='echarts-pie-container-left'>
                  <div className='used-credit-content credit-content'>
                    <span className='used-credit-point credit-point' />
                    <span className='used-credit-percentage'>
                      {
                                 this.Percentage((this.props.creditObj.XYED - this.props.creditObj.YXED) || 0, this.props.creditObj.XYED || 0)
                               }
                    </span>
                  </div>
                  <div className='used-credit-contentFloat'>
                            已用额度： {Number((this.props.creditObj.XYED || 0) - (this.props.creditObj.YXED || 0)).toFixed(0)}
                  </div>
                </div>)
              }
            })()
          }
        <div style={{ height: '100%' }}>
          <ReactEcharts option={this.state.option} style={{ height: '264px', width: '264px' }} />
          <div style={{ display: 'block', height: '7.1rem', marginTop: '-14rem' }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden', height: '40px', lineHeight: '40px' }}>
              <span style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', color: '#FFFFFF', paddingTop: '1.1rem' }}>￥</span>
              <span className='echartFont' style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#FFFFFF' }}>{this.props.creditObj.XYED || 0}</span>
            </div>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1px', marginTop: '7px', marginBottom: '8px', marginLeft: 'auto', marginRight: 'auto' }}>
              <span style={{ width: '90%', backgroundColor: '#f2f2f2', height: '1px' }} />
            </div>
            <div style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', color: '#FFFFFF', display: 'flex', justifyContent: 'center' }}>{this.props.label}</div>
          </div>
        </div>
        {
            (() => {
              if (!this.props.isSimpleShow) {
                return (<div className='echarts-pie-container-right'>
                  <div className='not-used-credit-content credit-content'>
                    <span className='not-used-credit-point credit-point' />
                    <span className='not-used-credit-percentage'>
                      {
                                 this.Percentage(this.props.creditObj.YXED || 0, this.props.creditObj.XYED || 0)
                               }
                    </span>
                  </div>
                  <div className='used-credit-contentFloat'>
                            可用额度： {Number(this.props.creditObj.YXED || 0).toFixed(0)}
                  </div>
                </div>)
              }
            })()
          }
      </div>
    )
  }
}
