import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMeals } from '../actions/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class MealList extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  renderMeals() {
    return _.map(this.props.meals, meal => {
      return (
        <li key={meal.id}>
          <Link to={`/meals/${meal.id}`}>
            {meal.name}
          </Link>
          <div>
            <img src={meal.images} width="200" height="200" />
          </div>
          <div>
            {meal.description}
          </div>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.meals);
    return (
      <div>
        <h1>List of Food</h1>
        <ul>
          {this.renderMeals()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { meals: state.meals };
}

export default connect(mapStateToProps, { fetchMeals: fetchMeals })(MealList);
