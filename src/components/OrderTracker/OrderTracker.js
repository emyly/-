/**
 * Created by zhanglei on 2016/11/2.
 */
import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import { Step, StepButton, Stepper } from 'material-ui/Stepper';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


import './OrderTracker.scss';

export default class OrderTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }

  static defaultProps = {
    stepIndex: 0, // 当前步骤节点
    completeIndex: 0, // 已经完成节点
    showIndex: 0, //
    orderId: 0, // 订单ID
    organizationId: 0, // 组织机构ID
    orderType: 0, // 订单类型
    avatar: null,
    onlyShowCompleted: true,
  };

  static propTypes = {
    orderId: PropTypes.number.isRequired,
    organizationId: PropTypes.number.isRequired,
  }

  componentWillReceiveProps = (nextProps) => {

  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  changeActivities(index) {
    return () => {
      this.setState({
        stepIndex: index,
      })
    }
  }

  render() {
    const { stepIndex } = this.state;
    const completeIndex = this.props.completeIndex;
    const stdCardHeader =
      {
        lineHeight: '30px',
        color: '#999999',
      }
    const stdCard =
      {
        marginBottom: '10px',
      }

    const data =
      {
        steps: [
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: true,
          },
          {
            stepName: '创建订单',
            stepActivities: 3,
            complete: true,
          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: true,
          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: true,
          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
          {
            stepName: '创建订单',
            stepActivities: 1,
            complete: false,

          },
        ],
      }

    // <OrderTrackerSteper changeActivities={this.changeActivities(0)}></OrderTrackerSteper>

    console.log(completeIndex);

    return (
      <Card style={stdCard}>
        <CardHeader
          title='订单跟踪'
          subtitle=''
          subtitleStyle={stdCardHeader}
          avatar={this.props.avatar}
        />
        <Stepper linear={false} activeStep={stepIndex} style={{ flexWrap: 'wrap' }}>
          {
            data.steps.filter((child, idx) => {
              console.log(child);
              if (this.props.onlyShowCompleted) {
                return child.complete == true
              } else {
                return true
              }
            }
            ).map((child, idx) => {
              let content = '';
              if (child.stepActivities > 1) {
                content =
                  (<Badge
                    badgeContent={10}
                    primary
                    badgeStyle={{ top: 0, right: -5 }}
                  >
                    {child.stepName}
                  </Badge>);
              } else { content = child.stepName; }

              return (
                <Step key={`stp_${idx}`} active={stepIndex === idx} completed={child.complete}>
                  <StepButton onClick={this.changeActivities(idx)}>
                    {content}
                  </StepButton>
                </Step>
              )
            })
          }
        </Stepper>
        <CardText>
          <div>
            <p>{this.getStepContent(stepIndex)}</p>
          </div>
        </CardText>
      </Card>
    );
  }

}

/*
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 0})}>
 创建订单
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 1})}>
 买方审核
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 2})}>
 卖方审核
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 3})}>
 拣货配货
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 4})}>
 出库复核
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 5})}>
 物流发货
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 6})}>
 手术回收
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 7})}>
 回收复核
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 8})}>
 结算订单
 </StepButton>
 </Step>
 <Step>
 <StepButton onClick={() => this.setState({stepIndex: 9})}>
 <Badge
 badgeContent={10}
 badgeStyle={{top: 12, right: 0}}
 >
 完成订单
 </Badge>
 </StepButton>
 </Step>

 */
