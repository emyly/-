/**
 * Created by NXQ on 12/14/2016.
 */
import React, { Component, PropTypes } from 'react';
import './PersonalTemplateRouter.scss';

/*
*   场景说明：个性化模板
*/
export default class PersonalTemplateRouter extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    )
  }
}
