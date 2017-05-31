import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealDetail } from '../actions/index';
import { Link } from 'react-router-dom';

class MealDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  render() {
    const { meal } = this.props;

    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/meals">Back to meals</Link>
        <h3>{this.props.meal.name}</h3>
        <img src={this.props.meal.images} width="300" height="200" />
        <h5> Description </h5>
        <div>{this.props.meal.description}</div>
        <h5>Pick Up Info</h5>
        <div>{this.props.meal.pickupInfo}</div>
      </div>
    );
  }
}

function mapStateToProps({ meals }, ownProps) {
  return { meal: meals[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchMealDetail })(MealDetails);
