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
    purchase: state.purchase
  };
}

export default connect(mapStateToProps, { getPurchases })(UserProfile);
