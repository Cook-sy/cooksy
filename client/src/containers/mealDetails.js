import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealDetail, reviewMeal } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';

import {
  renderTextAreaField,
  renderTimeField,
  renderTextField,
  renderDateField,
  isZipcode
} from '../utils/FormHelper';
import './MealDetails.css';

class MealDetails extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    values.mealId = this.props.meal.id;
    this.props.reviewMeal(values);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  render() {
    const { meal, handleSubmit, pristine, submitting } = this.props;
    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <Card>
        <CardHeader
          title={meal.chef.username}
          subtitle="Chef"
          avatar={meal.chef.image}
        />
        <CardMedia
          overlay={<CardTitle title={this.props.meal.name} subtitle={meal.chef.username} />}
        >
          <img src={this.props.meal.images} alt="meal" width="500" height="500" />
        </CardMedia>
        <CardTitle title="Meal Details" subtitle="Description" />
        <CardText>
          {this.props.meal.description}
        </CardText>
        <CardTitle subtitle="Pickup Information" />
        <CardText>
          {this.props.meal.pickupInfo}
        </CardText>
        <CardActions>
          <FlatButton label="Purchase" />
          <FlatButton label={<Link to={'/meals'} style={{color: 'black', textDecoration: 'none'}}>Back To Meals</Link>} />
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ meals }, ownProps) {
  return { meal: meals[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchMealDetail })(MealDetails);
