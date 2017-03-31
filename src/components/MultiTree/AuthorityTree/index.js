/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/25.
 */
import { connect } from 'react-redux'
import { getAuthority, destoryAuthority } from './modules/AuthorityTreeActions'
import AuthorityTree from './AuthorityTree';

const mapStateToProps = state => ({
  dataSource: state.authorityTree.dataSource,
  checkedData: state.authorityTree.checkedData
})

const mapDispatchToProps = {
  getAuthority,
  destoryAuthority
}

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps)

const withRef = true;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef })(AuthorityTree);
