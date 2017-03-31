<%
const names = pascalEntityName.split('/');
const className = names[names.length-1];
const today = new Date();
const todayStr = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
%>/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on <%= todayStr %>.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const propTypes = {
};

class <%= className %> extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

<%= className %>.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= className %>);
