import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Push from 'push.js'

class NotificationDemo extends React.Component {
  /*
   * NOTE:
   * more available options: https://github.com/Nickersoft/push.js
   */

  handleCloseAutoTouchTap = () => {
    Push.create('Close within a timeout', {
      timeout: 5000
    })
  }

  handleCloseSpecificTouchTap = () => {
    Push.create('Close me by tag!', {
      tag: 'noti_1'
    })

    setTimeout(() => {
      Push.close('noti_1')
    }, 3000)
  }

  handleClosePromiseTouchTag = () => {
    const promise = Push.create('Close with the promise returned!', {
      timeout: 3000
    })

    promise.then((notification) => {
      notification.close()
    })
  }

  handleCloseAllTouchTap = () => {
    Push.create('I am push #1')
    Push.create('I am push #2')
    Push.create(`We have overall ${Push.count()} notifications`)

    setTimeout(() => {
      Push.clear()
    }, 2000);
  }

  render() {
    const style = {
      margin: 12
    }

    return (
      <div>
        <RaisedButton label='自动关闭' onTouchTap={this.handleCloseAutoTouchTap} style={style} />
        <RaisedButton label='以Tag关闭' onTouchTap={this.handleCloseSpecificTouchTap} style={style} />
        <RaisedButton label='用Promise关闭' onTouchTap={this.handleClosePromiseTouchTag} style={style} />
        <RaisedButton label='全部关闭' onTouchTap={this.handleCloseAllTouchTap} style={style} />
      </div>
    )
  }
}

export default {
  path: 'notification',
  component: NotificationDemo
}
