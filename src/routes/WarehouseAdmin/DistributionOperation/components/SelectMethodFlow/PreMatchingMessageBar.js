
/**
 * Created by wangming on 2016/10/19.
 */
import React, {
  Component
} from 'react'
import FlatButton from 'material-ui/FlatButton';

export class PreMatchingMessageBar extends Component {
  render() {
    return (
      <div
        className='row'
        style={{
          width: '100%',
          height: '85px',
          paddingLeft: '49px',
          lineHeight: '85px',
          fontFamily: 'SourceHanSansCN-Regular',
          color: '#00A0FF',
          fontSize: '16px',
        }}
      >
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          订购数量：x种 x件
        </div>
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          已选中：x种  x件
        </div>
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          待拣货：x种 x件
        </div>
        <div className='col-xs-3' />
        <div className='col-xs-3'>
          <FlatButton label='取消' onTouchTap={this.handleDialogClose} />
          <FlatButton label='确定' primary onTouchTap={this.handleDialogClose} />
        </div>
      </div>
    )
  }
}
