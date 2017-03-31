/**
 * Created by NXQ on 2/23/2017.
 */
import React, { Component, PropTypes } from 'react';

import Card from 'components/StandardUI/StandardCard';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import './PushServiceSettingsCard.scss';

import _ from 'lodash';

/**
 * 场景说明：推送服务设置Card
 */
export default class PushServiceSettingsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalTime: '',
      intervalTimeFlag: true,   // 此标志位为了达到异步请求到了升级间隔时间数据后，赋值一次
    }
  }
  static propTypes = {
    type: PropTypes.string,     // card类型 '0'表示个推服务 '1'表示短信推送 '2'表示语音推送 '3'表示邮件推送
    pushDataObject: PropTypes.object,
    callback: PropTypes.func.isRequired
  }
  static defaultProps = {
    type: '0',
    pushDataObject: {}
  }
  componentWillMount = () => {

  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type === '1' && this.state.intervalTimeFlag) {
      this.setState({
        intervalTimeFlag: false,
        intervalTime: this.props.pushDataObject.SJXXSJJG / 60000
      })
    }
  }
  /**
   * 获取推送服务对应的值
   */
  getPushServiceObject = () => {
    let obj = {};
    switch (this.props.type) {
      case '0':
        obj = {
          imgSrc: '/PushServiceSettings/pushServiceIcon.png',
          title: 'APP内推送通知',
          style: {
            width: '2.4rem',
            height: '2.9rem'
          },
          color: '#FF9336'
        };
        break;
      case '1':
        obj = {
          imgSrc: '/PushServiceSettings/messagePushIcon.png',
          title: '短信推送',
          style: {
            width: '2.9rem',
            height: '2.6rem'
          },
          color: '#4CCCC1',
          subTitle: '开启短信服务'
        };
        break;
      case '2':
        obj = {
          imgSrc: '/PushServiceSettings/voicePushIcon.png',
          title: '语音推送',
          style: {
            width: '1.9rem',
            height: '2.9rem'
          },
          subTitle: '开启语音服务'
        };
        break;
      case '3':
        obj = {
          imgSrc: '/PushServiceSettings/mailboxPushIcon.png',
          title: '邮件推送',
          style: {
            width: '3.0rem',
            height: '2.4rem'
          },
          subTitle: '开启邮箱服务'
        };
        break;
      default:
        obj = {
          imgSrc: '/PushServiceSettings/pushServiceIcon.png',
          title: 'APP内推送通知',
          style: {
            width: '2.4rem',
            height: '2.9rem'
          }
        };
        break;
    }
    return obj;
  }
  /**
   * 间隔时间onChange
   */
  handleIntervalTimeChange = (event, newValue) => {
    this.setState({
      intervalTime: newValue
    })
    this.props.callback(newValue);
  }
  render() {
    return (
      <div style={{ marginRight: '20px', marginBottom: '10px' }}>
        <Card
          containerStyle={{ width: '26.1rem', height: '32.1rem', padding: '0px' }}
          CardStyle={{ width: '26.1rem', height: '32.1rem', marginBottom: '10px' }}
          CardTextStyle={{ width: '100%', height: '100%' }}
          topStyle={{ display: 'none' }}
        >
          <div className='push-service-settings-card'>
            <div className='push-up-content'>
              <div className='push-up-top-content'>
                <img src={this.getPushServiceObject().imgSrc} alt='' style={{ ...this.getPushServiceObject().style }} />
                <span className='push-service-title'>{this.getPushServiceObject().title}</span>
              </div>
              {
                (() => {
                  if (this.props.type === '1') {
                    return (<div className='push-up-bottom-content'>
                      <img src='/PushServiceSettings/intervaltimePushIcon.png' alt='' style={{ width: '2.2rem', height: '2.4rem' }} />
                      <div style={{ marginLeft: '40px' }}>
                        <TextField
                          id='_push_service_textField'
                          type='number' style={{ width: '3.1rem' }}
                          onChange={this.handleIntervalTimeChange}
                          value={this.state.intervalTime}
                        />
                        <span className='push-service-interval-time'>分钟</span>
                      </div>
                      <span className='push-service-warm-text'>
                              *APP内推送通知发送后多少分钟后始终未读，<br />
                              发送短信推送提醒
                            </span>
                    </div>)
                  }
                })()
              }
              {
                (() => {
                  if (this.props.type === '2' || this.props.type === '3') {
                    return (<div className='push-up-bottom-developing-content'>
                      <span className='push-service-developing'>开发中</span>
                      <span className='push-service-developing'>敬请期待</span>
                      <span className='push-service-developing'>.....</span>
                    </div>)
                  }
                })()
              }

            </div>
            {
              (() => {
                if (this.props.type === '0' || this.props.type === '1') {
                  const usedAmount = _.has(this.props.pushDataObject, 'FSSL') ? Number(this.props.pushDataObject.FSSL) : 0;
                  const surplusAmount = _.has(this.props.pushDataObject, 'SYSL') ? Number(this.props.pushDataObject.SYSL) : 0;
                  const amount = _.has(this.props.pushDataObject, 'ZSL') ? Number(this.props.pushDataObject.ZSL) : 0;
                  const width = amount === 0 ? '0' : `${String((usedAmount / amount) * 100)}%`;
                  return (<div className='push-down-content'>
                    <span className='push-down-top-content'>
                      <span className='used-total' style={{ color: this.getPushServiceObject().color }}>{`已使用${usedAmount}条`}</span>
                      <span className='residue-total'>{`剩余${surplusAmount}条`}</span>
                    </span>
                    <span className='push-down-bottom-content'>
                      <i style={{ backgroundColor: this.getPushServiceObject().color, width }} />
                    </span>
                  </div>)
                } else {
                  return <div className='push-down-content' style={{ backgroundColor: '#f2f2f2', borderTop: 'none' }} />
                }
              })()
            }
          </div>
        </Card>
        {
          (() => {
            if (this.props.type !== '0') {
              return (<div className='push-service-settings-card-checkbox-content' style={{ display: 'none' }}>
                <Checkbox
                  style={{ width: '1.3rem', height: '1.3rem' }}
                  inputStyle={{ width: '1.3rem', height: '1.3rem', overflow: 'hidden' }}
                  labelStyle={{ width: '1.3rem', height: '1.3rem', overflow: 'hidden' }}
                  disabled={this.props.type !== '1'}
                />
                <span className='push-service-settings-sub-title'>{this.getPushServiceObject().subTitle}</span>
              </div>)
            }
          })()
        }

      </div>
    )
  }
}
