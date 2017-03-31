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

const propTypes = {
};

export default class <%= className %> extends Component {
  render() {
    return (<div/>);
  }
}

<%= className %>.propTypes = propTypes;
