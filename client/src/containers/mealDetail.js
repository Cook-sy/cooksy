import React, { Component } from 'react';
import { connect } from 'react-redux';

class MealDetail extends Component {
  render() {
    if (!this.props.meal) {
      return <div>Select a meal to get Started!</div>;
    }

    return (
      <div>
        <h3>{this.props.meal.name}</h3>
        <img src={this.props.meal.img} width="300" height="200" />
        <h5> Description </h5>
        <div>{this.props.meal.description}</div>
        <h5>Pick Up Info</h5>
        <div>{this.props.meal.pickup_info}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    meal: state.activeMeal
  };
}

export default connect(mapStateToProps)(MealDetail);
