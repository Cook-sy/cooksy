import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMeal } from '../actions/index';
import { bindActionCreators } from 'redux'; //flows through all reducers

class Meallist extends Component {
  renderList() {
    console.log(this.props);
    return this.props.meals.map(meal => {
      return (
        <li
          key={meal.name}
          onClick={() => this.props.selectMeal(meal)}
          className="list-group-item"
        >
          <h3>{meal.name}</h3>
          {meal.description}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>List of Food</h1>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    meals: state.meals
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectMeal: selectMeal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Meallist);
