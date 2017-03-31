/**
 * Created by zhanglei on 2016/11/1.
 */

import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import './StandardForm.scss';

export default class StandardFormCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  static defaultProps = {
    activeStep: 0,
    showCardContent: true
  };
  /**
   * 获取label背景颜色
   */
  getLabelBackgroundColor = (type) => {
    switch (type) {
      case '铺货':
        return {
          backgroundColor: 'pink'
        };
      case '备货':
        return {
          backgroundColor: '#00be9c'
        };
      case '手术':
        return {
          backgroundColor: '#ff625b'
        };
      case '借货':
        return {
          backgroundColor: '#58909c'
        };
      case '调货':
        return {
          backgroundColor: '#58909c'
        };
      case '铺货补货':
        return {
          backgroundColor: '#58909c'
        };
      case '铺货销售':
        return {
          backgroundColor: '#58909c'
        };
      case '调拨':
        return {
          backgroundColor: '#58909c'
        };
      default:
        return {
          backgroundColor: '#ff625b'
        };
    }
  };
  render() {
    const stdCardHeader =
      {
        lineHeight: '30px',
        color: '#999999',
      }
    const stdCard =
      {
        marginBottom: '10px',
      }

    const stepArray = [];
    const childArray = [];
    React.Children.map(this.props.children, (child) => {
      if (child.props.showStep !== false) {
        stepArray.push(child);
      }
      childArray.push(child);
    });
    return (
      <div className='standard-form-card-list'>
        <Card >
          <div className='container-card'>
            {
              (() => {
                if (childArray.length) {
                  return (<div className='content-left' style={{ maxWidth: stepArray.length ? '25%' : '50%' }}>
                    <span className='label' style={{ background: this.getLabelBackgroundColor(childArray[this.props.activeStep].props.title).backgroundColor }}>{childArray[this.props.activeStep].props.title || ''}</span>
                    <span className='message' title={childArray[this.props.activeStep].props.message || ''}>{childArray[this.props.activeStep].props.message || '' }</span>
                  </div>)
                }
              })()
            }
            {
              (() => {
                if (stepArray.length) {
                  return (<Stepper linear={false} activeStep={this.props.activeStep} style={{ width: '60%', margin: 'auto', height: '100%', background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: '5px', paddingLeft: '5px' }}>
                    {
                        React.Children.map(stepArray, child => (
                          <Step completed={child.props.completed}>
                            <StepLabel iconContainerStyle={{ color: '#00A0FF', fill: '#00A0FF' }} style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#00BCD4', paddingRight: '0px', paddingLeft: '0px', height: 'auto', justifyContent: 'center', flexDirection: 'column' }}>{child.props.stepName}</StepLabel>
                          </Step>
                          ))
                      }
                  </Stepper>)
                }
              })()
            }
            {
              (() => {
                if (childArray.length) {
                  return (<CardActions
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      display: 'flex',
                      alignItem: 'center',
                      padding: '0px'
                    }}
                  >
                    {childArray[this.props.activeStep].props.actions}
                  </CardActions>)
                }
              })()
            }
          </div>

          {
              (() => {
                if (childArray.length && childArray[this.props.activeStep].props.otherActions) {
                  return (<div className='container-other'>
                    {childArray[this.props.activeStep].props.otherActions}
                  </div>)
                }
              })()
            }
        </Card>
        {this.props.children}
      </div>
    );
  }

}
