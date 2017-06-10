import React, { Component } from 'react';

class MealList extends Component {

  componentDidMount() {
  }

  render() {
    return (

    );
  }
}

function mapStateToProps(state) {
  return {
    purchases: state.purchases
  };
}

export default connect(mapStateToProps, { getPurchases })(UserProfile);
