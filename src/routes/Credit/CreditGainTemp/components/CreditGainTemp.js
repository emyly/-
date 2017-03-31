

import React, { Component, PropTypes } from 'react';

import './CreditGainTemp.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import moment from 'lib/moment';

import EchartsPie from 'components/EchartsPie';

import echarts from 'echarts';

import Card from 'components/StandardUI/StandardCard';


/**
 * 使用场景：获取授信与我的公司列表及信用详情
 * 接口： 信用.md --> 获取授信于我的公司列表 --> /JXSXYB/:id/SQ
 */
export default class CreditGainTemp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectCreditValue: 0,
      selectCreditOrganization: [],
      creditDetailData: {},
      validDate: {},
      gainCreditData: []
    }
  }
  static propTypes = {
    /**
     * mapDispatchToProps
     */
    getCreditOrganizationToMeListData: PropTypes.func.isRequired,
    getCreditQueryData: PropTypes.func.isRequired,
    /**
     * mapStateToProps
     */
    creditGainTemp: PropTypes.object.isRequired,
    globalStore: PropTypes.object.isRequired
  }

  componentWillMount = () => {
    this.props.getCreditOrganizationToMeListData(this.props.globalStore.organizationId);
  };

  componentWillReceiveProps = (nextProps) => {
    const creditDataArray = nextProps.creditGainTemp.gainCreditData;
    creditDataArray.map((value) => {
      value.echartsData = [];
      value.echartsData.push({
        value: (value.XYED || 0) - (value.YXED || 0),
        name: '已用额度',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: '#fee8a3' // 0% 处的颜色
            }, {
              offset: 1, color: '#f5a959' // 100% 处的颜色
            }], false)
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: '#fee8a3' // 0% 处的颜色
            }, {
              offset: 1, color: '#f5a959' // 100% 处的颜色
            }], false)
          }
        }
      });
      value.echartsData.push({
        value: value.YXED || 0,
        name: '可用额度',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: '#93eb6e' // 0% 处的颜色
            }, {
              offset: 1, color: '#59e6da' // 100% 处的颜色
            }], false)
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: '#93eb6e' // 0% 处的颜色
            }, {
              offset: 1, color: '#59e6da' // 100% 处的颜色
            }], false)
          }
        }
      });
    });
    this.setState({
      gainCreditData: creditDataArray
    });
  };

  render() {
    return (
      <div className='credit-gain-temp'>
        <StandardDataGrid
          title='我获得的信用'
          iconPosition={'-150px -60px'}
        >
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            {
              (() => {
                if (this.state.gainCreditData.length) {
                  return this.state.gainCreditData.map((value, index) =>
                    <div key={index} className='col-lg-6 col-md-6 col-sm-12'>
                      <Card key={index} expanded containerStyle={{ paddingBottom: '0px' }} title={value.JGMC || ''} avatar='/orderCheckIcon/icon-08.png' topStyle={{ boxShadow: 'none' }} titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '20px', color: '#fff', lineHeight: '57px' }} CardTextStyle={{ height: '33.9rem' }}>

                        <div className='credit-card-container'>
                          <EchartsPie seriesData={value.echartsData} creditObj={value} />
                          <div className='credit-container-bottom'>
                            <div className='credit-info' style={{ backgroundColor: '#e5f8f5' }}>
                              <span className='credit-info-span'>
                                <span className='credit-title'>长期信用额度: </span>
                                <span className='credit-detail'>￥{value.GDED || 0}</span>
                              </span>
                              <span className='credit-info-span'>
                                <span className='credit-title'>信用周期: </span>
                                <span className='credit-detail'>{Number(value.GD_YXQS) === -1 ? '-' : moment(Number(value.GD_YXQS)).format('YYYY-MM-DD')}</span>
                                <span className='credit-title'> 至 </span>
                                <span className='credit-detail'>{Number(value.GD_YXQZ) === -1 ? '-' : moment(Number(value.GD_YXQZ)).format('YYYY-MM-DD')}</span>
                              </span>
                            </div>
                            <div className='credit-info' style={{ backgroundColor: '#e5f5ff' }}>
                              <span className='credit-info-span'>
                                <span className='credit-title'>临时信用额度: </span>
                                <span className='credit-detail'>￥{value.LSED || 0}</span>
                              </span>
                              <span className='credit-info-span'>
                                <span className='credit-title'>信用周期: </span>
                                <span className='credit-detail'>{Number(value.LS_YXQS) === -1 ? '-' : moment(Number(value.LS_YXQS)).format('YYYY-MM-DD')}</span>
                                <span className='credit-title'> 至 </span>
                                <span className='credit-detail'>{Number(value.LS_YXQZ) === -1 ? '-' : moment(Number(value.LS_YXQZ)).format('YYYY-MM-DD')}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                 );
                } else {
                  return <div style={{ margintop: '50px', marginLeft: '20px', fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px' }}>暂无获得的信用数据...</div>
                }
              })()
            }
          </div>
        </StandardDataGrid>

      </div>
    )
  }
}

