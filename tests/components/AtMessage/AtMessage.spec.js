import React from 'react'
import { bindActionCreators } from 'redux'
import AtMessage from 'components/AtMessage/AtMessage'
import { mount,shallow ,render} from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('(Component) AtMessage', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {}
    _props = {
      className: 'test',
      style: {foo:'bar'},
      divStyle: {foo1:'bar1'},
      textareaStyle: {foo2:'bar2'},
      callback: (_spies.callback=sinon.spy()),
      hintText: 'test',
      rowsMax: 2,
      
    }
    _wrapper = shallow(<AtMessage {..._props}/>)
  })

  it('AtMessage包含一个TextField', () => {
    expect(_wrapper.find('TextField')).to.have.lengthOf(1)
  })

  it('组件的props应该和传入的一致', () => {
    expect(_wrapper.find('TextField').props().className).to.equal(_props.className);
    expect(_wrapper.find('TextField').props().style).to.deep.equal({ ..._props.style, fontFamily: 'SourceHanSansCN-Regular' });
    expect(_wrapper.find('TextField').props().hintText).to.equal(_props.hintText);
    expect(_wrapper.find('TextField').props().textareaStyle).to.deep.equal(_props.textareaStyle);
    expect(_wrapper.find('TextField').props().rowsMax).to.deep.equal(_props.rowsMax);
    expect(_wrapper.props().style).to.equal(_props.divStyle);
  })

  it('测试组件state的更新', () => {
    _wrapper.setState({ value: 'hello' })
     expect(_wrapper.find('TextField').props().value).to.equal('hello')
     _wrapper.find('TextField').props().onChange({target:{value:'world'}})
     expect(_wrapper.find('TextField').props().value).to.equal('world')
     _spies.callback.should.have.been.called
  })
})
