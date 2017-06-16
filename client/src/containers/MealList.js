import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import _ from 'lodash';

import { fetchMeals, getUserDetails } from '../actions/index';
import './MealList.css';
import SearchBar from './SearchBar';

const styles = {
  smallIcon: {
    width: 20,
    height: 20
  },
  small: {
    width: 30,
    height: 30,
    padding: 6
  },
};

class MealList extends Component {
  componentDidMount() {
    this.props.fetchMeals();
    this.props.getUserDetails();
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="meals-buttons">
              <Link to="/meals">
                <RaisedButton label="ALL Meals" primary={true} />
              </Link>

              <Link className="nearby-button" to="/nearby-meals">
                <RaisedButton label="Nearby Meals" />
              </Link>
            </div>
          </div>

          <div className="pull-right col-md-3">
            <SearchBar />
          </div>
        </div>
        <div className="all-meals">
          {_.map(this.props.meals, (meal) => (
            <Card
              key={meal.id}
              className="meals-card"
            >
              <CardHeader
                title={meal.chef.username}
                subtitle={<span>{meal.city}, {meal.state}</span>}
                avatar={meal.chef.image}
              />
              <CardMedia>
                <img className="meals-image" src={meal.images} alt={meal.name} />
              </CardMedia>

              <CardText>
                <p className="meals-name">{meal.name}</p>
                <Rating
                  value={Math.ceil(meal.rating)}
                  max={5}
                  readOnly={true}
                  itemStyle={styles.small}
                  itemIconStyle={styles.smallIcon}
                />
                <p className="meals-date">{moment(meal.deliveryDateTime).format('dddd, MMMM D, YYYY')}</p>
              </CardText>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meals, auth: { user } }) {
  return {
    meals: meals,
    user: user
  };
}

export default connect(mapStateToProps, { fetchMeals, getUserDetails })(MealList);
