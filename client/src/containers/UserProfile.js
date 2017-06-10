import React, { Component } from 'react';

class MealList extends Component {

  componentDidMount() {
  }

  render() {
    return (

    );
  }
}

function mapStateToProps({ meals, auth: { user } }) {
  return {
    purchases: purchases
  };
}

export default connect(mapStateToProps, { fetchPurchases })(UserProfile);