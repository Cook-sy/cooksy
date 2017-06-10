import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPurchases } from '../actions/purchaseActions';

class UserProfile extends Component {

  componentDidMount() {

    console.log(this.props.getPurchases);

  }

  render() {
    return (
      <h1>{this.props.purchase}</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    purchase: state.purchase
  };
}

export default connect(mapStateToProps, { getPurchases })(UserProfile);
